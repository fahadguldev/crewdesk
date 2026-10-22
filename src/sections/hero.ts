import { C } from '../content';

function urdu(text: string): string {
  return `<span class="urdu" dir="rtl" lang="ur"><bdi>${text}</bdi></span>`;
}

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
        <img src="logo.png" alt="${C.brand.name}" width="50" height="30" />
      </a>
      <nav class="nav-links" aria-label="Primary">${links}</nav>
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
        <a class="btn btn-primary nav-cta" href="#final-cta">${C.nav.cta}</a>
      </div>
    </div>
  `;
  return el;
}

export function buildHero(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'hero pin-section';
  el.id = 'hero';

  const heroCards = [
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>',
      tag: 'DAY 1 READY',
      title: '8 Core Operational Modules',
      body: 'Attendance, , projects, client password vault, time tracking, workload, profit margins & employee management directory.',
      color: 'emerald'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      tag: 'ZERO CONFUSION',
      title: 'First-Week Onboarding',
      body: 'Guided setup, employee migration, and hands-on team training so your office is comfortable from day one.',
      color: 'indigo'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
      tag: 'ROLE PRIVACY',
      title: 'Zero Salary or Rate Leaks',
      body: '4 dedicated role screens for Owner, HR, PM, and Employee. AES-256 encrypted vault with access logs.',
      color: 'teal'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>',
      tag: 'SUPPORT SLA',
      title: 'Issue Resolution SLA',
      body: 'Attendance or vault outages resolved the same day; all other customer-reported issues within 2 working days.',
      color: 'amber'
    }
  ];

  const cardsHtml = heroCards
    .map(
      (c, i) => `
        <article class="hero-card glass" data-i="${i}" style="--c:var(--${c.color})">
          <div class="hc-glow" aria-hidden="true"></div>
          <div class="hc-top">
            <span class="hc-icon" aria-hidden="true">${c.icon}</span>
            <span class="hc-tag">${c.tag}</span>
          </div>
          <h3 class="hc-title">${c.title}</h3>
          <p class="hc-body">${c.body}</p>
        </article>
      `
    )
    .join('');

  el.innerHTML = `
    <!-- First View Screen: Only the core headline visible -->
    <div class="hero-first-screen">
      <div class="container hero-center-wrap">
        <h1 class="hero-h1" id="hero-headline" aria-label="Manage your whole دفتر from 1 Hub not disconnected tools and sheets">
          <span class="typewriter-text" id="typewriter-text"></span><span class="typing-cursor" id="typing-cursor" aria-hidden="true">|</span>
        </h1>
        <div class="hero-proof-line">
          <span class="hero-proof-pill">
            <span class="proof-dot"></span> Built by an agency, used daily by our own team.
          </span>
        </div>
      </div>
    </div>

    <!-- Below Cards: fly in from left and right on scroll with micro-interactions -->
    <div class="hero-below-cards container">
      <div class="hero-cards-grid">
        ${cardsHtml}
      </div>
    </div>
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
