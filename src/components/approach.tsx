'use client';
import { useEffect, useRef, useState } from 'react';
import { steps } from '@/lib/config';

const RAYS = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  return {
    x1: 200 + Math.cos(a) * 175,
    y1: 200 + Math.sin(a) * 175,
    x2: 200 + Math.cos(a) * 26,
    y2: 200 + Math.sin(a) * 26,
  };
});

const STAIRS =
  'M40 340 L120 340 L120 270 L200 270 L200 200 L280 200 L280 120 L360 120';

// One illustrated scene per step; remounted on activation so it replays.
function Scene({ index }: { index: number }) {
  if (index === 0)
    return (
      <g className="sc sc-discover">
        <circle cx="200" cy="200" r="170" className="ln dash" />
        <circle cx="200" cy="200" r="110" className="ln" />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="200"
            cy="200"
            r="30"
            className="ripple"
            style={{ animationDelay: `${i * 0.9}s` }}
          />
        ))}
        <circle cx="200" cy="200" r="9" className="dot" />
      </g>
    );
  if (index === 1)
    return (
      <g className="sc sc-imagine">
        {RAYS.map((r, i) => (
          <line
            key={i}
            {...r}
            className="ray"
            style={{ animationDelay: `${i * 0.06}s` }}
          />
        ))}
        <circle cx="200" cy="200" r="14" className="dot pulse" />
      </g>
    );
  if (index === 2)
    return (
      <g className="sc sc-build">
        {Array.from({ length: 16 }, (_, i) => {
          const r = Math.floor(i / 4);
          const c = i % 4;
          return (
            <rect
              key={i}
              x={52 + c * 80}
              y={52 + r * 80}
              width="56"
              height="56"
              rx="8"
              className={(r + c) % 3 === 0 ? 'cell fill' : 'cell'}
              style={{ animationDelay: `${(r + c) * 0.18}s` }}
            />
          );
        })}
      </g>
    );
  return (
    <g className="sc sc-evolve">
      <path d={STAIRS} className="stairs" pathLength={1} />
      <circle
        r="10"
        className="dot rider"
        style={{ offsetPath: `path("${STAIRS}")` }}
      />
    </g>
  );
}

export function Approach() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = stepsRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement));
        }),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      const r = root.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, (innerHeight * 0.5 - r.top) / r.height),
      );
      barRef.current?.style.setProperty('--p', String(p));
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      removeEventListener('scroll', onScroll);
    };
  }, []);

  const step = steps[active];

  return (
    <section className="process" id="approach">
      <div className="container">
        <div className="section-topline" data-reveal>
          <span>04 / HOW WE THINK</span>
          <span>LESS NOISE. MORE SIGNAL.</span>
        </div>
        <div className="process-grid">
          <div className="process-sticky">
            <h2 data-reveal>
              GOOD WORK
              <br />
              IS <em>INTENTIONAL.</em>
            </h2>
            <div className="process-stage" aria-hidden="true">
              <svg viewBox="0 0 400 400">
                <Scene key={active} index={active} />
              </svg>
            </div>
            <div className="process-count" aria-hidden="true">
              <strong key={active}>{step.n}</strong>
              <span>/ 04</span>
              <span className="process-label">{step.title.toUpperCase()}</span>
              <span className="process-bar">
                <span ref={barRef} />
              </span>
            </div>
          </div>
          <div className="process-steps" ref={stepsRef}>
            {steps.map((s, i) => (
              <article
                key={s.n}
                data-step
                className={
                  i === active ? 'process-step is-active' : 'process-step'
                }
              >
                <span className="process-num" aria-hidden="true">
                  {s.n}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
