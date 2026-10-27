import { C } from '../content';
import { PLACEHOLDERS, getWhatsAppWalkthroughUrl } from '../config/placeholders';

export function buildNav(): HTMLElement {
  const el = document.createElement('header');
  el.className = 'nav';
  el.id = 'top-nav';

  const links = C.nav.links
    .map((l) => `<a class="nav-link" href="${l.href}" data-target="${l.href}">${l.label}</a>`)
    .join('');

  el.innerHTML = `
    <div class="nav-inner container">
      <a class="nav-logo" href="#hero" aria-label="${C.brand.name}">
        <img src="/logo.png" alt="${C.brand.name}" width="50" height="30" />
      </a>
      <nav class="nav-links" aria-label="Primary">
        ${links}
      </nav>
      <div class="nav-actions">
        <div class="currency-toggle" role="group" aria-label="Currency">
          <button class="cur-btn is-active" data-cur="pkr" type="button">${C.currency.pkr}</button>
          <button class="cur-btn" data-cur="usd" type="button">${C.currency.usd}</button>
        </div>
        <button class="btn btn-ghost theme-toggle" type="button" aria-label="Toggle light and dark theme">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
          </svg>
        </button>
        <a class="nav-login-link" href="${PLACEHOLDERS.APP_LOGIN_URL}" target="_blank" rel="noopener">Log in</a>
        <a class="btn btn-primary nav-cta" href="#final-cta">${C.nav.cta}</a>
        <button class="mobile-nav-toggle" id="mobile-nav-toggle" type="button" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-nav-drawer">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>
    <div class="mobile-nav-drawer" id="mobile-nav-drawer" aria-hidden="true">
      <div class="mobile-nav-inner container">
        <nav class="mobile-nav-links" aria-label="Mobile Navigation">
          ${links}
          <a class="mobile-nav-link mobile-login-link" href="${PLACEHOLDERS.APP_LOGIN_URL}" target="_blank" rel="noopener">Log in</a>
        </nav>
        <div class="mobile-drawer-cta">
          <a class="btn btn-primary btn-block" href="#final-cta">${C.nav.cta}</a>
        </div>
      </div>
    </div>
  `;
  return el;
}

export function buildHero(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'hero pin-section';
  el.id = 'hero';

  const walkthroughUrl = getWhatsAppWalkthroughUrl();

  const trustStripIcons: Record<string, string> = {
    team: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
  };

  const trustChipsHtml = (C.hero.trustStrip ?? [
    { title: 'Built by an agency, used daily by our own team', icon: 'team' },
    { title: 'AES-256 encrypted client vault', icon: 'lock' },
    { title: 'Dedicated database per customer', icon: 'database' },
    { title: 'Flat pricing, no per-seat penalties', icon: 'shield' }
  ])
    .map(
      (chip) => `
        <div class="hero-trust-chip">
          <span class="htc-icon" aria-hidden="true">${trustStripIcons[chip.icon] ?? trustStripIcons.shield}</span>
          <span class="htc-text">${chip.title}</span>
        </div>
      `
    )
    .join('');

  const heroCards = C.hero.heroInfoCards ?? [
    {
      title: '8 Core Modules',
      body: 'Attendance, projects, vault, time, workload, profit and people directory.',
      color: 'emerald'
    },
    {
      title: 'First-Week Onboarding',
      body: 'Guided setup, employee migration and team training.',
      color: 'indigo'
    },
    {
      title: 'Private by Design',
      body: 'Four role screens. Salaries and rates stay hidden from the wrong roles.',
      color: 'teal'
    },
    {
      title: 'Support Included',
      body: 'Same-day fix for attendance or vault outages.',
      color: 'amber'
    }
  ];

  const cardsHtml = heroCards
    .map(
      (c, i) => `
        <article class="hero-card glass" data-i="${i}" style="--c:var(--${c.color})">
          <div class="hc-glow" aria-hidden="true"></div>
          <h3 class="hc-title">${c.title}</h3>
          <p class="hc-body">${c.body}</p>
        </article>
      `
    )
    .join('');

  el.innerHTML = `
    <!-- Hero Main: Centered Design matching Screenshot -->
    <div class="hero-main container hero-centered">
      <h1 class="hero-h1" id="hero-headline">
        <span id="typewriter-text"><span class="typing-line">Manage your whole <span class="type-urdu-green urdu" dir="rtl" lang="ur"><bdi>دفتر</bdi></span></span><br /><span class="typing-line">from one <span class="type-green-hub">Hub</span></span><br /><span class="typing-line hero-muted">not disconnected tools</span><br /><span class="typing-line hero-muted">and sheets</span></span><span id="typing-cursor" class="typing-cursor" aria-hidden="true">|</span>
      </h1>

      <div class="hero-actions">
        <a class="btn btn-primary btn-hero-primary" href="${walkthroughUrl}" target="_blank" rel="noopener noreferrer">
          ${C.hero.ctaPrimary}
        </a>
        <a class="btn btn-outline btn-hero-secondary" href="${PLACEHOLDERS.DEMO_URL}" target="_blank" rel="noopener">
          ${C.hero.ctaSecondary}
        </a>
      </div>

      <div class="hero-proof-pill">
        <span class="proof-dot"></span> Built by an agency, used daily by our own team.
      </div>

      <div class="hero-trust-strip">
        ${trustChipsHtml}
      </div>
    </div>

    <!-- Below Cards: 4 Clean Shortened Cards -->
    <div class="hero-below-cards container">
      <div class="hero-cards-grid">
        ${cardsHtml}
      </div>
    </div>

    <!-- Sticky Bottom CTA Bar (Mobile only, appears after scrolling past hero) -->
    <aside class="mobile-sticky-cta" id="mobile-sticky-cta" aria-hidden="true">
      <div class="container mobile-sticky-inner">
        <a class="btn btn-primary btn-block" href="${walkthroughUrl}" target="_blank" rel="noopener noreferrer">
          Book Free Walkthrough
        </a>
      </div>
    </aside>
  `;
  return el;
}

export function buildPain(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'pain pin-section';
  el.id = 'pain';
  const cards = C.pain.items
    .map(
      (it, i) => `<div class="pain-card glass" data-i="${i}">
        <div class="pain-icon" aria-hidden="true">${iconFor(it.icon)}</div>
        <p class="pain-quote">${it.quote}</p>
        <p class="pain-note">${it.note}</p>
      </div>`
    )
    .join('');
  el.innerHTML = `
    <div class="container">
      <div class="pain-head">
        <h2 class="h-sec">${C.pain.title}</h2>
        <p class="sub-sec">${C.pain.sub}</p>
      </div>
      <div class="pain-grid">${cards}</div>
    </div>
  `;
  return el;
}

function iconFor(kind: string): string {
  const paths: Record<string, string> = {
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    chat: '<path d="M5 6.5h14v9H9l-4 3v-12Z"/><path d="M8 10h8M8 13h5"/>',
    calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 9h16"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    chart: '<path d="M5 19V9M12 19V5M19 19v-7"/><path d="M3 19h18"/>',
    alert: '<path d="M12 4 3.5 19h17L12 4Z"/><path d="M12 9v4M12 16v.1"/>'
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[kind] ?? paths.alert}</svg>`;
}
