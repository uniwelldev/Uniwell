'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    // The marquee speeds up with scroll speed and runs backwards when scrolling up.
    const marquee = document
      .querySelector('.marquee-track')
      ?.getAnimations?.()[0];
    let target = 1;
    let rate = 1;
    if (marquee) {
      lenis.on('scroll', ({ velocity }: { velocity: number }) => {
        target = 1 + velocity * 0.35;
      });
    }
    const eased = () => {
      if (!marquee) return;
      target += (1 - target) * 0.04;
      rate += (target - rate) * 0.12;
      if (Math.abs(rate - marquee.playbackRate) > 0.01) {
        marquee.playbackRate = rate;
      }
    };
    gsap.ticker.add(eased);
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-reveal]',
        { y: 65, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.13,
          ease: 'power3.out',
          delay: 0.12,
        },
      );
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) =>
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          },
        ),
      );
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) =>
        gsap.to(el, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }),
      );
    }, ref);
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.remove(eased);
      lenis.destroy();
      ctx.revert();
    };
  }, []);
  return <div ref={ref}>{children}</div>;
}
