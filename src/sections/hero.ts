import { C } from '../content';

function urdu(text: string): string {
  return `<span class="urdu" dir="rtl" lang="ur"><bdi>${text}</bdi></span>`;
}

export function buildBanner(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'banner glass';
  el.innerHTML = `
    <span class="banner-badge">${C.banner.badge}</span>
    <span class="banner-text">${C.banner.text} <em>${C.banner.sub}</em></span>
    <a class="banner-link" href="#pricing-table">${C.banner.link}</a>
  `;
  return el;
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
  const chips = C.hero.trustChips
    .map(
      (c) => `<div class="trust-chip glass"><h4>${c.title}</h4><p>${c.body}</p></div>`
    )
    .join('');
  el.innerHTML = `
    <div class="container hero-layout">
      <div class="hero-copy">
        <div class="hero-badges">
          <span class="pill glass">${C.hero.pill1}</span>
          <span class="pill glass pill-accent">${C.hero.pill2}</span>
        </div>
        <h1 class="hero-h1">
          ${C.hero.h1a} <span class="hero-hub">${C.brand.latin}</span> ${urdu(C.brand.urdu)}<br />
          ${C.hero.h1b}<br />
          <span class="hero-muted">${C.hero.h1c}</span>
        </h1>
        <p class="hero-sub">${C.hero.sub}</p>
        <div class="hero-cta">
          <a class="btn btn-primary" href="#final-cta">${C.hero.ctaPrimary}</a>
          <a class="btn btn-ghost" href="#pricing-table">${C.hero.ctaSecondary}</a>
        </div>
      </div>
      <div class="trust-chips">${chips}</div>
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
