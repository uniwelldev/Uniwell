'use client';
import { useEffect, useRef } from 'react';

// Selectors that get pulled slightly toward the pointer.
const MAGNETIC =
  '.nav-cta, .round-arrow, .sv-hero-cta, .st-next, .t-send, .text-link, .chat-fab, .svc-link, .send-orb';
const TRAIL_MS = 380;

// Cursor: an "inversion lens" that flips the colours beneath it, a short comet
// trail, and magnetic buttons. Plain canvas + transforms (no libraries), and the
// frame loop sleeps whenever nothing is moving. Skipped on touch and for
// reduced motion, where the native cursor stays.
export function Cursor() {
  const lensRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      matchMedia('(pointer: coarse)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const lens = lensRef.current!;
    const label = labelRef.current!;
    const canvas = trailRef.current!;
    const ctx = canvas.getContext('2d')!;
    document.documentElement.classList.add('has-cursor');

    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#fff';
    };
    resize();

    let mx = -200;
    let my = -200;
    let lx = -200;
    let ly = -200;
    let size = 16;
    let target = 16;
    let raf = 0;
    const pts: { x: number; y: number; t: number }[] = [];

    const frame = (now: number) => {
      raf = 0;
      lx += (mx - lx) * 0.3;
      ly += (my - ly) * 0.3;
      size += (target - size) * 0.2;
      lens.style.transform = `translate3d(${lx - 50}px,${ly - 50}px,0) scale(${size / 100})`;

      while (pts.length && now - pts[0].t > TRAIL_MS) pts.shift();
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 1; i < pts.length; i++) {
        const life = 1 - (now - pts[i].t) / TRAIL_MS;
        ctx.globalAlpha = life * 0.9;
        ctx.lineWidth = 2 + life * 9;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }

      const settled =
        Math.abs(mx - lx) < 0.1 &&
        Math.abs(my - ly) < 0.1 &&
        Math.abs(target - size) < 0.1;
      if (pts.length || !settled) raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      raf ||= requestAnimationFrame(frame);
    };

    let mag: HTMLElement | null = null;
    const release = (el: HTMLElement) => {
      const from = el.style.translate || '0px 0px';
      el.style.translate = '';
      el.animate([{ translate: from }, { translate: '0px 0px' }], {
        duration: 500,
        easing: 'cubic-bezier(.2,.8,.2,1)',
      });
    };

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      pts.push({ x: mx, y: my, t: performance.now() });
      lens.dataset.on = 'true';

      const el = (e.target as HTMLElement).closest<HTMLElement>(MAGNETIC);
      if (el !== mag) {
        if (mag) release(mag);
        mag = el;
      }
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2);
        const dy = my - (r.top + r.height / 2);
        mag.style.translate = `${dx * 0.25}px ${dy * 0.25}px`;
      }
      wake();
    };

    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>('[data-cursor]');
      const field = t.closest('input:not([type=radio]), textarea, select');
      const interactive = t.closest(
        'a, button, summary, label, [role="button"]',
      );
      label.textContent = labelled?.dataset.cursor ?? '';
      lens.classList.toggle('is-label', !!labelled);
      target = field ? 0 : labelled ? 96 : interactive ? 60 : 16;
      wake();
    };

    const leave = () => {
      lens.dataset.on = 'false';
      pts.length = 0;
      if (mag) release(mag);
      mag = null;
    };

    addEventListener('pointermove', move, { passive: true });
    addEventListener('pointerover', over, { passive: true });
    addEventListener('resize', resize);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      removeEventListener('pointermove', move);
      removeEventListener('pointerover', over);
      removeEventListener('resize', resize);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <>
      <canvas ref={trailRef} className="cur-trail" aria-hidden="true" />
      <div ref={lensRef} className="cur-lens" aria-hidden="true">
        <span ref={labelRef} />
      </div>
    </>
  );
}
