'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type Msg = { role: 'user' | 'assistant'; content: string };

const suggestions = [
  'What services do you offer?',
  'I need a new website',
  'How can AI help my business?',
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);
    const setLast = (fn: (c: string) => string) =>
      setMessages((m) =>
        m.map((x, i) =>
          i === m.length - 1 ? { ...x, content: fn(x.content) } : x,
        ),
      );
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-20) }),
      });
      if (!res.body) throw new Error('no body');
      if (!res.ok) {
        setLast(
          () =>
            'Sorry, the assistant is unavailable right now. Please use the contact form.',
        );
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        setLast((c) => c + chunk);
      }
    } catch {
      setLast(() => 'Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <>
      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Chat with our assistant'}
        aria-expanded={open}
        aria-controls="chat-panel"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
      {open && (
        <section
          id="chat-panel"
          className="chat-panel"
          role="dialog"
          aria-label="Chat assistant"
        >
          <header>
            <strong>Ask BYTELAMP</strong>
            <span>AI assistant</span>
          </header>
          <div className="chat-log" ref={log} aria-live="polite">
            {messages.length === 0 && (
              <>
                <p className="chat-msg bot">
                  Hi! Tell me about your project, or ask about our services.
                </p>
                <div className="chat-chips">
                  {suggestions.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}
            {messages.map((m, i) => (
              <p
                key={i}
                className={`chat-msg ${m.role === 'user' ? 'me' : 'bot'}`}
              >
                {m.content || '…'}
              </p>
            ))}
          </div>
          <form onSubmit={onSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
              maxLength={1000}
              aria-label="Your message"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
