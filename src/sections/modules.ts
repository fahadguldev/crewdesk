import { C } from '../content';

const ART: Record<string, string> = {
  bars: `<div class="art-bars"><i style="height:40%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:62%"></i></div>`,
  rows: `<div class="art-rows"><i></i><i></i><i></i><i></i></div>`,
  toggles: `<div class="art-toggles"><i></i><i></i><i></i></div>`,
  board: `<div class="art-board"><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
  lock: `<div class="art-lock"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><i></i></div>`,
  ring: `<div class="art-ring"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" /><circle cx="18" cy="18" r="15" class="ring-fill"/></svg></div>`,
  gauge: `<div class="art-gauge"><i style="width:82%"></i></div>`
};

export function buildModules(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'modules pin-section';
  el.id = 'modules';

  const slabs = C.modules.items
    .map(
      (m) => `<article class="module-slab glass" data-id="${m.id}" style="--c:var(--${m.color})">
        <div class="slab-top">
          <span class="slab-num">MODULE ${m.n}</span>
          <span class="slab-role">${m.role}</span>
        </div>
        <h3 class="slab-title">${m.title}</h3>
        <span class="slab-badge">${C.modules.availableLabel}</span>
        <div class="slab-art">${ART[m.art] ?? ''}</div>
        <p class="slab-desc">${m.desc}</p>
      </article>`
    )
    .join('');

  const ai = `<article class="module-slab module-ai glass" data-id="${C.modules.ai.id}">
      <span class="ai-badge">${C.modules.ai.badge}</span>
      <div class="slab-top">
        <span class="slab-num">${C.modules.ai.title.toUpperCase()}</span>
        <span class="slab-role">${C.modules.ai.role}</span>
      </div>
      <h3 class="slab-title">${C.modules.ai.title} <span class="ai-status">(${C.modules.ai.status})</span></h3>
      <p class="slab-desc">${C.modules.ai.desc}</p>
      <ul class="ai-bullets">${C.modules.ai.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
    </article>`;

  const picker = C.modules.picker.enabled ? buildPicker() : '';

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
    <div class="container">${picker}</div>
  `;
  return el;
}

function buildPicker(): string {
  const opts = C.modules.items
    .map(
      (m) => `<button type="button" class="pick-opt glass" data-id="${m.id}">
        <span class="pick-name">${m.title.replace(' Module', '')}</span>
        <span class="pick-role">${m.role}</span>
      </button>`
    )
    .join('');
  return `<div class="picker glass">
    <h3>${C.modules.picker.title}</h3>
    <p class="pick-sub">${C.modules.picker.sub}</p>
    <div class="pick-grid">${opts}</div>
    <p class="pick-hint">${C.modules.picker.hint}</p>
    <div class="pick-foot">
      <span class="pick-count">0 / ${C.modules.picker.max} selected</span>
      <button type="button" class="btn btn-primary pick-cta" disabled>${C.modules.picker.cta}</button>
    </div>
  </div>`;
}
