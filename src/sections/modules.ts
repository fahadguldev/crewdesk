import { C } from '../content';

const ART: Record<string, string> = {
  bars: `<div class="art-bars"><i style="height:40%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:62%"></i></div>`,
  rows: `<div class="art-rows"><i></i><i></i><i></i><i></i></div>`,
  toggles: `<div class="art-toggles"><i></i><i></i><i></i></div>`,
  board: `<div class="art-board"><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
  lock: `<div class="art-lock"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><i></i></div>`,
  ring: `<div class="art-ring"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" /><circle cx="18" cy="18" r="15" class="ring-fill"/></svg></div>`,
  gauge: `<div class="art-gauge"><i style="width:82%"></i></div>`,
  coins: `<div class="art-coins"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18 8a6 6 0 0 1-5 5.91"/><path d="m8 6 4 4"/><circle cx="16" cy="16" r="6"/></svg><i></i></div>`
};

export function buildModules(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'modules pin-section';
  el.id = 'modules';

  const demoBaseUrl = (C.modules as any).demoUrl ?? 'https://daftarhubdemo.vercel.app/';

  const slabs = C.modules.items
    .map((m) => {
      const moduleUrl = (m as any).url || demoBaseUrl;
      return `<article class="module-slab glass" data-id="${m.id}" style="--c:var(--${m.color})">
        <div class="slab-top">
          <span class="slab-num">MODULE ${m.n}</span>
          <span class="slab-role">${m.role}</span>
        </div>
        <h3 class="slab-title">${m.title}</h3>
        <span class="slab-badge">${C.modules.availableLabel}</span>
        <div class="slab-art">${ART[m.art] ?? ''}</div>
        <p class="slab-desc">${m.desc}</p>
        <div class="slab-actions">
          <a class="btn btn-outline-demo slab-demo-btn" href="${moduleUrl}" target="_blank" rel="noopener noreferrer">
            <span>View Live Demo</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </article>`;
    })
    .join('');

  const aiUrl = (C.modules.ai as any).url || demoBaseUrl;
  const ai = `<article class="module-slab module-ai glass" data-id="${C.modules.ai.id}">
      <span class="ai-badge">${C.modules.ai.badge}</span>
      <div class="slab-top">
        <span class="slab-num">${C.modules.ai.title.toUpperCase()}</span>
        <span class="slab-role">${C.modules.ai.role}</span>
      </div>
      <h3 class="slab-title">${C.modules.ai.title} <span class="ai-status">(${C.modules.ai.status})</span></h3>
      <p class="slab-desc">${C.modules.ai.desc}</p>
      <ul class="ai-bullets">${C.modules.ai.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      <div class="slab-actions">
        <a class="btn btn-outline-demo slab-demo-btn slab-waitlist-btn" href="#final-cta">
          <span>Join waitlist</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </article>`;

  el.innerHTML = `
    <div class="modules-stage container">
      <div class="mod-head">
        <span class="eyebrow">${C.modules.eyebrow}</span>
        <h2 class="h-sec">${C.modules.title}</h2>
        <p class="sub-sec">${C.modules.sub}</p>
      </div>
      <div class="module-viewport">
        <div class="module-ring">${slabs}${ai}</div>
      </div>
    </div>
  `;
  return el;
}
