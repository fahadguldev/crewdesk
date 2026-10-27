import { C } from '../content';
import { scrollToTarget } from '../scroll';

// PKR/USD toggle: rewrites every [data-pkr]/[data-usd] node
export function bindCurrency(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.cur-btn');
  const apply = (cur: 'pkr' | 'usd') => {
    document.querySelectorAll('[data-pkr][data-usd]').forEach((s) => {
      const el = s as HTMLElement;
      const val = cur === 'pkr' ? el.dataset.pkr! : el.dataset.usd!;
      if (el.classList.contains('plan-amount')) el.textContent = Number(val).toLocaleString();
      else el.textContent = val;
    });
    document.querySelectorAll('.plan-cur').forEach((el) => {
      el.textContent = cur === 'pkr' ? C.currency.pkr : '$';
    });
    buttons.forEach((b) => b.classList.toggle('is-active', b.dataset.cur === cur));
  };
  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.cur as 'pkr' | 'usd')));
}

// Light/dark theme: ?theme= override (QA), then persisted choice, then system preference
export function bindTheme(): void {
  const q = new URLSearchParams(window.location.search).get('theme');
  const saved = localStorage.getItem('dh-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial =
    q === 'light' || q === 'dark' ? q : saved === 'light' || saved === 'dark' ? saved : prefersLight ? 'light' : 'dark';
  document.documentElement.dataset.theme = initial;

  const btn = document.querySelector<HTMLButtonElement>('.theme-toggle');
  btn?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('dh-theme', next);
  });
}

// Smooth-scroll anchors (Lenis when active, native fallback)
export function bindAnchors(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      scrollToTarget(href, href === '#hero' ? 0 : -70);
    });
  });
}

// Nav behaviour: navigation, mobile hamburger drawer, and mobile sticky CTA bar
export function bindNav(): void {
  const nav = document.getElementById('top-nav');
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const stickyCta = document.getElementById('mobile-sticky-cta');

  // Sticky navbar & sticky mobile CTA bar scroll observer
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle('nav-scrolled', y > 40);
    }
    if (stickyCta) {
      const pastHero = y > 450;
      stickyCta.classList.toggle('is-visible', pastHero);
      stickyCta.setAttribute('aria-hidden', String(!pastHero));
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger menu toggle
  if (toggleBtn && drawer) {
    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggleBtn.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-nav-locked');
    };

    const openDrawer = () => {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggleBtn.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mobile-nav-locked');
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('is-open');
      if (isOpen) closeDrawer();
      else openDrawer();
    });

    // Close mobile drawer when any link is clicked
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeDrawer());
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  const sections = C.nav.links
    .map((l) => document.querySelector(l.href))
    .filter(Boolean) as Element[];
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('is-active'));
        document.querySelector(`.nav-link[data-target="#${en.target.id}"]`)?.classList.add('is-active');
      }),
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}

// Savings table: hub bar rises once at 60% visible; plans stagger in once
export function bindEntrances(): void {
  const table = document.querySelector('.pricing-table');
  if (table) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          table.querySelectorAll('.pt-hub').forEach((c) => c.classList.add('risen'));
          io.disconnect();
        });
      },
      { threshold: 0.6 }
    );
    io.observe(table);
  }

  const plans = document.querySelectorAll('.plan');
  if (plans.length) {
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          plans.forEach((pl, i) => {
            (pl as HTMLElement).style.transitionDelay = `${i * 80}ms`;
            pl.classList.add('in');
          });
          io2.disconnect();
        });
      },
      { threshold: 0.3 }
    );
    io2.observe(plans[0].closest('.pricing')!);
  }
}

/** Adds restrained pointer depth and light glare to cards without affecting touch layouts. */
export function bindPricingTilt(): void {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll<HTMLElement>('.plan, .hero-card, .pain-card, .role-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--tilt-x', `${(y * -5).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
      card.style.setProperty('--glare-x', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--glare-y', `${(y + 0.5) * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}
