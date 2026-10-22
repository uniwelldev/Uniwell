'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const HeroOrb3D = dynamic(() => import('./hero-orb-3d'), { ssr: false });

function CssOrb() {
  return (
    <>
      <div className="orb-inner" />
      <div className="orb-ring ring-one" />
      <div className="orb-ring ring-two" />
    </>
  );
}

// 3D orb only on larger, non-touch screens, loaded after the page is idle so it
// never competes with first paint. The CSS orb is the server-rendered and
// fallback version, and phones keep it.
export function HeroOrb() {
  const [use3d, setUse3d] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      matchMedia('(pointer: coarse)').matches ||
      innerWidth < 900
    )
      return;
    try {
      const c = document.createElement('canvas');
      if (!(c.getContext('webgl2') || c.getContext('webgl'))) return;
    } catch {
      return;
    }
    const start = () =>
      'requestIdleCallback' in window
        ? requestIdleCallback(() => setUse3d(true), { timeout: 3000 })
        : setTimeout(() => setUse3d(true), 1500);
    if (document.readyState === 'complete') start();
    else addEventListener('load', start, { once: true });
    return () => removeEventListener('load', start);
  }, []);

  // Stop rendering while the hero is scrolled out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="hero-orb" data-3d={use3d} aria-hidden="true">
      {use3d ? <HeroOrb3D visible={visible} /> : <CssOrb />}
    </div>
  );
}
