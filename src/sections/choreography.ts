import { gsap, ScrollTrigger } from '../scroll';
import { C } from '../content';
import type { Env } from '../scene/quality';

// Scroll Map (desktop unless noted) — see SCROLL_MAP.md for full pin budget:
//   hero        static centered product message
//   pain        pin 250vh (NO pin on mobile)  cards fly in, collapse out
//   modules     pin ~640vh (8 slabs x 80vh, NO pin on mobile)  horizontal slab track
//   roles       pin 400vh (NO pin on mobile)  cube rotates 90° per 100vh
//   final-cta   pin 100vh (NO pin on mobile)  form settles in
export function initChoreography(env: Env): void {
  const staticOnly = env.reducedMotion || env.quality === 'low';

  if (staticOnly) {
    // No pins, no scrub: everything stays visible in normal flow
    document.querySelectorAll('.module-slab, .plan').forEach((el) => el.classList.add('in'));
    return;
  }

  const mobile = env.isMobile;
  ScrollTrigger.config({ ignoreMobileResize: true });

  // ---- Pain: fly-through tunnel, collapse (desktop only) ----
  if (!mobile) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.pain',
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      })
      .from('.pain-card', {
        x: (i) => (i % 2 === 0 ? -220 : 220),
        y: 140,
        rotate: (i) => (i % 2 === 0 ? -6 : 6),
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        duration: 0.6
      })
      .to('.pain-card', { scale: 0.94, opacity: 0.3, stagger: 0.06, duration: 0.4 }, 0.75);
  }

  // ---- Modules: horizontal slab track (desktop only, ~80vh per slab) ----
  const stage = document.querySelector<HTMLElement>('.modules-stage');
  const ring = document.querySelector<HTMLElement>('.module-ring');
  if (!mobile && stage && ring) {
    stage.classList.add('pin-mode');
    const slabCount = C.modules.items.length + 1; // 7 modules + AI Copilot
    const distance = () => Math.max(0, ring.scrollWidth - (ring.parentElement?.clientWidth ?? 0));
    gsap.to(ring, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: () => `+=${Math.round(slabCount * 0.8 * window.innerHeight)}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });
  }

  // ---- Roles: cube rotates 90° per role (desktop only, ~400vh) ----
  if (!mobile) {
    ScrollTrigger.create({
      trigger: '.roles',
      start: 'top top',
      end: `+=${C.roles.items.length * 100}%`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const step = Math.min(C.roles.items.length - 1, Math.floor(self.progress * C.roles.items.length));
        window.dispatchEvent(new CustomEvent('roles:set', { detail: step }));
      }
    });
  }

  // ---- Final CTA: pinned ~100vh, form settles in (desktop only) ----
  if (!mobile) {
    gsap.fromTo(
      '.final-form',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.final-cta',
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      }
    );
  }

  // Recalc after fonts settle (Nastaliq changes metrics)
  window.addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
}
