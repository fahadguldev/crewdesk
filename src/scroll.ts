import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import type { Env } from './scene/quality';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initScroll(env: Env): Lenis | null {
  // Reduced motion or low quality → native scroll, no smooth-scroll hijack
  if (env.reducedMotion || env.quality === 'low') {
    return null;
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToTarget(target: string, offset = -70) {
  const el = document.querySelector(target);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset, duration: 1.2 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
  }
}

export { gsap, ScrollTrigger };
