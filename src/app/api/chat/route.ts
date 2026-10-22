import { systemPrompt } from '@/lib/assistant';

export const runtime = 'nodejs';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// Any OpenAI-compatible chat API works (Gemini, Groq, OpenRouter, ...).
// Defaults to Google Gemini, which has a free tier via Google AI Studio.
const BASE_URL =
  process.env.CHAT_API_BASE_URL ??
  'https://generativelanguage.googleapis.com/v1beta/openai';
const MODEL = process.env.CHAT_MODEL ?? 'gemini-3.8-flash';

const MAX_MESSAGES = 20;
const MAX_CHARS = 1000;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

// Best-effort per-instance limiter; use a shared store (e.g. Upstash) if you
// deploy to several serverless instances.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES)
    return null;
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (
      !m ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string' ||
      !m.content.trim() ||
      m.content.length > MAX_CHARS
    )
      return null;
    out.push({ role: m.role, content: m.content });
  }
  return out[0].role === 'user' && out[out.length - 1].role === 'user'
    ? out
    : null;
}

export async function POST(req: Request) {
  const apiKey = process.env.CHAT_API_KEY;
  if (!apiKey) {
    return new Response(
      'The assistant is not set up yet. Please use the contact form below.',
      { status: 503 },
    );
  }
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'local';
  if (limited(ip)) {
    return new Response('Too many messages. Please wait a minute.', {
      status: 429,
    });
  }
  const messages = parseMessages(await req.json().catch(() => null));
  if (!messages) return new Response('Invalid request.', { status: 400 });

  let upstream: Response;
  try {
    upstream = await fetch(`${BASE_URL.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        max_tokens: 700,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
      }),
      signal: req.signal,
    });
  } catch (err) {
    console.error('chat upstream error', err);
    return new Response('The assistant is unavailable right now.', {
      status: 502,
    });
  }
  if (!upstream.ok || !upstream.body) {
    console.error(
      'chat upstream status',
      upstream.status,
      await upstream.text(),
    );
    return new Response(
      upstream.status === 429
        ? 'The assistant is busy right now. Please try again shortly.'
        : 'The assistant is unavailable right now.',
      { status: 502 },
    );
  }

  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const reader = upstream.body.getReader();
  const body = new ReadableStream({
    async start(controller) {
      let buf = '';
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const lines = buf.split('\n');
          buf = lines.pop() ?? '';
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const data = line.slice(5).trim();
            if (!data || data === '[DONE]') continue;
            try {
              const text = JSON.parse(data).choices?.[0]?.delta?.content;
              if (typeof text === 'string' && text)
                controller.enqueue(enc.encode(text));
            } catch {
              /* ignore partial or non-JSON lines */
            }
          }
        }
      } catch (err) {
        console.error('chat stream error', err);
        controller.enqueue(
          enc.encode('\n\nSomething went wrong. Please try the contact form.'),
        );
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel();
    },
  });
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
