'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Custom cursor: a dot plus a trailing ring that grows over links/buttons and
// shows a label for elements with data-cursor="LABEL". Skipped on touch
// devices and for reduced motion, where the native cursor stays.
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const ringEl = ring.current!;
    const dotEl = dot.current!;
    const labelEl = label.current!;
    document.documentElement.classList.add('has-cursor');
    const rx = gsap.quickTo(ringEl, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ringEl, 'y', { duration: 0.45, ease: 'power3' });
    const dx = gsap.quickTo(dotEl, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(dotEl, 'y', { duration: 0.08 });

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      ringEl.dataset.visible = 'true';
      dotEl.dataset.visible = 'true';
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>('[data-cursor]');
      const interactive = t.closest('a, button, summary, [role="button"]');
      labelEl.textContent = labelled?.dataset.cursor ?? '';
      ringEl.dataset.state = labelled
        ? 'label'
        : interactive
          ? 'hover'
          : 'idle';
    };
    const leave = () => {
      ringEl.dataset.visible = 'false';
      dotEl.dataset.visible = 'false';
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
