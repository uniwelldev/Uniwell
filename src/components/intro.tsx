'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const WORDS = ['MADE.', 'BUILT.', 'DESIGNED.', 'AUTOMATED.', 'IMAGINED.'];
const LONGEST = WORDS.reduce((a, b) => (b.length > a.length ? b : a));
const PARAGRAPH =
  'We connect ambitious thinking with fearless execution. One creative partner for your brand, your digital world, and everything that comes next.'.split(
    ' ',
  );

function Chars({ text }: { text: string }) {
  return (
    <span className="word" aria-hidden="true">
      {text.split('').map((c, i) => (
        <span className="ch" key={i}>
          {c}
        </span>
      ))}
    </span>
  );
}

export function Intro() {
  const section = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const para = useRef<HTMLParagraphElement>(null);
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [seen, setSeen] = useState(false);

  // Rotating last word, only while the section is on screen.
  useEffect(() => {
    const el = section.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        timer ??= setInterval(() => {
          setIdx((i) => {
            setPrev(i);
            return (i + 1) % WORDS.length;
          });
        }, 2400);
      } else if (timer) {
        clearInterval(timer);
        timer = undefined;
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  // Letters lift and turn violet near the pointer.
  useEffect(() => {
    const root = headline.current;
    if (!root || matchMedia('(pointer: coarse)').matches) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>('.ch'));
    let spots: { el: HTMLElement; x: number; y: number }[] = [];
    // Page-space centres, measured once per entry/resize instead of per move.
    const measure = () => {
      spots = chars.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          el,
          x: r.left + r.width / 2 + scrollX,
          y: r.top + r.height / 2 + scrollY,
        };
      });
    };
    let raf = 0;
    let x = -9999;
    let y = -9999;
    const paint = () => {
      raf = 0;
      for (const c of spots) {
        const d = Math.hypot(x + scrollX - c.x, y + scrollY - c.y);
        c.el.style.setProperty('--f', Math.max(0, 1 - d / 170).toFixed(3));
      }
    };
    const enter = () => measure();
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      raf ||= requestAnimationFrame(paint);
    };
    const leave = () => {
      x = y = -9999;
      raf ||= requestAnimationFrame(paint);
    };
    root.addEventListener('pointerenter', enter);
    addEventListener('resize', measure);
    root.addEventListener('pointermove', move, { passive: true });
    root.addEventListener('pointerleave', leave);
    return () => {
      root.removeEventListener('pointerenter', enter);
      removeEventListener('resize', measure);
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Paragraph words light up as it scrolls through the viewport.
  useEffect(() => {
    const p = para.current;
    if (!p) return;
    const words = Array.from(p.querySelectorAll<HTMLElement>('span'));
    const update = () => {
      const r = p.getBoundingClientRect();
      const t = (innerHeight * 0.88 - r.top) / (innerHeight * 0.5);
      const lit = Math.min(1, Math.max(0, t)) * words.length;
      words.forEach((w, i) => {
        w.style.opacity = String(0.3 + 0.7 * Math.min(1, Math.max(0, lit - i)));
      });
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="intro2" id="about" ref={section}>
      <div className="container">
        <div className="section-topline" data-reveal>
          <span>01 / WHO WE ARE</span>
          <span>BYTELAMP® — THE NEW STANDARD</span>
        </div>

        <p className={seen ? 'intro2-tag in' : 'intro2-tag'}>
          NOT JUST <s>ANOTHER</s> AGENCY.
        </p>

        <h2
          className="intro2-head"
          ref={headline}
          aria-label="We believe the future is made."
        >
          <span className="line">
            <Chars text="WE" /> <Chars text="BELIEVE" />
          </span>
          <span className="line">
            <Chars text="THE" /> <Chars text="FUTURE" />
          </span>
          <span className="line">
            <Chars text="IS" />{' '}
            <span className="rot-wrap" aria-hidden="true">
              <span className="rot">
                <span className="rot-ghost">{LONGEST}</span>
                {prev !== null && prev !== idx && (
                  <span className="rot-word out" key={`o${prev}-${idx}`}>
                    {WORDS[prev]}
                    <svg
                      className="swoosh"
                      viewBox="0 0 240 14"
                      preserveAspectRatio="none"
                    >
                      <path d="M2 9 C 50 1, 130 14, 238 4" pathLength={1} />
                    </svg>
                  </span>
                )}
                <span className="rot-word" key={`i${idx}`}>
                  {WORDS[idx]}
                  <svg
                    className="swoosh"
                    viewBox="0 0 240 14"
                    preserveAspectRatio="none"
                  >
                    <path d="M2 9 C 50 1, 130 14, 238 4" pathLength={1} />
                  </svg>
                </span>
              </span>
            </span>
          </span>
        </h2>

        <div className="intro2-foot">
          <p className="intro2-para" ref={para}>
            {PARAGRAPH.map((w, i) => (
              <span key={i}>{w} </span>
            ))}
          </p>
          <div className="intro2-links">
            <a href="#approach" className="text-link">
              DISCOVER OUR APPROACH <ArrowUpRight size={18} />
            </a>
            <Link href="/work" className="text-link">
              SEE OUR WORK <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
