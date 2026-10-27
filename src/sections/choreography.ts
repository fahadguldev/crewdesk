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

  // ---- Hero Below Cards: fly in from alternating sides with tilt (if present) ----
  if (document.querySelectorAll('.hero-card').length > 0) {
    gsap.from('.hero-card', {
      scrollTrigger: {
        trigger: '.hero-below-cards',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      },
      x: (i) => (mobile ? (i % 2 === 0 ? -35 : 35) : (i % 2 === 0 ? -180 : 180)),
      y: mobile ? 45 : 95,
      rotate: (i) => (mobile ? (i % 2 === 0 ? -2 : 2) : (i % 2 === 0 ? -4 : 4)),
      opacity: 0,
      stagger: 0.1,
      duration: 0.75,
      ease: 'power2.out',
      clearProps: 'transform'
    });
  }

  // ---- Pain: fly-through tunnel, collapse (desktop only) ----
  if (!mobile) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.pain',
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      })
      .to('.chaos-canvas, .pain-head', { scale: 0.94, opacity: 0.35, ease: 'power1.in' }, 0)
      .to(
        '.pain-card',
        {
          scale: 0.82,
          y: -70,
          opacity: 0.15,
          stagger: 0.05,
          ease: 'power2.in'
        },
        0.2
      );
  } else {
    // Mobile pain: subtle cascade on scroll
    gsap.from('.pain-card', {
      scrollTrigger: {
        trigger: '.pain-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      rotate: (i) => (i % 2 === 0 ? -3 : 3),
      opacity: 0,
      stagger: 0.08,
      duration: 0.65,
      ease: 'power2.out',
      clearProps: 'transform'
    });
  }

  // ---- Modules: smooth step through 9 operational modules on desktop scroll ----
  // Pins the 2-column layout cleanly 80px below the viewport top (16px below the 64px sticky navbar)
  const modulesLayout = document.querySelector<HTMLElement>('.modules-layout');
  if (!mobile && modulesLayout) {
    let lastStep = -1;
    const moduleCount = 9; // 8 operational modules + AI Copilot
    ScrollTrigger.create({
      trigger: modulesLayout,
      start: 'top 80px',
      end: `+=${moduleCount * 65}%`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const step = Math.min(moduleCount - 1, Math.floor(self.progress * moduleCount));
        if (step !== lastStep) {
          lastStep = step;
          window.dispatchEvent(new CustomEvent('modules:set', { detail: step }));
        }
      }
    });
  }

  // ---- Roles: smooth step through 4 dashboards on desktop scroll ----
  // Pins the card layout centered in the visible viewport below the 64px sticky navbar
  const rolesLayout = document.querySelector<HTMLElement>('.roles-layout');
  if (!mobile && rolesLayout) {
    let lastStep = -1;
    ScrollTrigger.create({
      trigger: rolesLayout,
      start: () => `center ${Math.round((window.innerHeight + 64) / 2)}px`,
      end: `+=${C.roles.items.length * 70}%`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const step = Math.min(C.roles.items.length - 1, Math.floor(self.progress * C.roles.items.length));
        if (step !== lastStep) {
          lastStep = step;
          window.dispatchEvent(new CustomEvent('roles:set', { detail: step }));
        }
      }
    });
  }

  // ---- Comparison: cards and table fly in from alternating sides ----
  if (document.querySelectorAll('.cmp-desktop-only, .cmp-card').length > 0) {
    gsap.from('.cmp-desktop-only, .cmp-card', {
      scrollTrigger: {
        trigger: '.comparison',
        start: 'top 78%',
        toggleActions: 'play none none reverse'
      },
      x: (i) => (mobile ? (i % 2 === 0 ? -30 : 30) : (i % 2 === 0 ? -140 : 140)),
      y: mobile ? 40 : 90,
      rotate: (i) => (mobile ? (i % 2 === 0 ? -1.5 : 1.5) : (i % 2 === 0 ? -3 : 3)),
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power2.out',
      clearProps: 'transform'
    });
  }

  // ---- Pricing Plans: cards fly in from alternating sides with tilt ----
  if (document.querySelectorAll('.plans .plan').length > 0) {
    gsap.from('.plans .plan', {
      scrollTrigger: {
        trigger: '.pricing',
        start: 'top 78%',
        toggleActions: 'play none none reverse'
      },
      x: (i) => (mobile ? (i % 2 === 0 ? -35 : 35) : (i === 0 ? -190 : i === 1 ? 0 : 190)),
      y: mobile ? 50 : 120,
      rotate: (i) => (mobile ? (i % 2 === 0 ? -2 : 2) : (i === 0 ? -6 : i === 1 ? 0 : 6)),
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'transform'
    });
  }

  // ---- Pricing Table: savings matrix container flies in ----
  if (document.querySelectorAll('.pt-chart-card').length > 0) {
    gsap.from('.pt-chart-card', {
      scrollTrigger: {
        trigger: '.pricing-table',
        start: 'top 78%',
        toggleActions: 'play none none reverse'
      },
      y: 70,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      clearProps: 'transform'
    });
  }

  // ---- Onboarding: 4 cards fly in from alternating sides with tilt ----
  if (document.querySelectorAll('.ob-card').length > 0) {
    gsap.from('.ob-card', {
      scrollTrigger: {
        trigger: '.onboarding',
        start: 'top 78%',
        toggleActions: 'play none none reverse'
      },
      x: (i) => (mobile ? (i % 2 === 0 ? -35 : 35) : (i % 2 === 0 ? -180 : 180)),
      y: mobile ? 50 : 110,
      rotate: (i) => (mobile ? (i % 2 === 0 ? -2 : 2) : (i % 2 === 0 ? -5 : 5)),
      opacity: 0,
      stagger: 0.1,
      duration: 0.75,
      ease: 'power2.out',
      clearProps: 'transform'
    });
  }

  // ---- FAQ: only the items visible on screen cascade in from alternating sides ----
  ScrollTrigger.batch('.faq-item', {
    start: 'top 88%',
    onEnter: (batch) => {
      gsap.from(batch, {
        x: (_i, el) => {
          const all = Array.from(document.querySelectorAll('.faq-item'));
          const idx = all.indexOf(el as HTMLElement);
          return mobile ? (idx % 2 === 0 ? -30 : 30) : (idx % 2 === 0 ? -150 : 150);
        },
        y: 45,
        rotate: (_i, el) => {
          const all = Array.from(document.querySelectorAll('.faq-item'));
          const idx = all.indexOf(el as HTMLElement);
          return mobile ? (idx % 2 === 0 ? -1.5 : 1.5) : (idx % 2 === 0 ? -3 : 3);
        },
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform'
      });
    },
    once: false
  });

  // ---- Final CTA: smooth entrance, dead-center in viewport ----
  if (document.querySelectorAll('.final-inner').length > 0) {
    gsap.from('.final-inner', {
      scrollTrigger: {
        trigger: '.final-cta',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'transform'
    });
  }

  // Recalc after fonts settle (Nastaliq changes metrics)
  window.addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
}
