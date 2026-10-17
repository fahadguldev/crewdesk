import { C } from '../content';

export function buildRoles(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'roles pin-section';
  el.id = 'roles';

  const faces = C.roles.items
    .map(
      (r) => `<div class="cube-face glass" data-id="${r.id}" style="--c:var(--${r.color})">
        <span class="role-badge">${r.badge}</span>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
        <div class="role-chips">${r.chips.map((c) => `<span>${c}</span>`).join('')}</div>
        ${
          r.seesMoney
            ? `<div class="money-row">
                 <span class="money-label">${C.roles.redaction.label}</span>
                 <span class="money-value" data-real="${C.roles.redaction.value}" data-mask="${C.roles.redaction.hidden}">${C.roles.redaction.hidden}</span>
               </div>
               <p class="money-cap">${C.roles.redaction.captionAdmin}</p>`
            : `<div class="money-row redacted">
                 <span class="money-label">${C.roles.redaction.label}</span>
                 <span class="money-mask">${C.roles.redaction.hidden}</span>
               </div>
               <p class="money-cap">${C.roles.redaction.captionEmployee}</p>`
        }
      </div>`
    )
    .join('');

  const dots = C.roles.items.map((r, i) => `<button type="button" class="cube-dot${i === 0 ? ' is-on' : ''}" data-i="${i}" aria-label="${r.title}"></button>`).join('');

  el.innerHTML = `
    <div class="container">
      <div class="roles-head">
        <span class="eyebrow">${C.roles.eyebrow}</span>
        <h2 class="h-sec">${C.roles.title}</h2>
        <p class="sub-sec">${C.roles.sub}</p>
      </div>
      <div class="cube-stage">
        <div class="cube-scene">
          <div class="cube" id="role-cube">${faces}</div>
        </div>
        <div class="cube-controls">
          <button type="button" class="btn btn-ghost cube-prev" aria-label="Previous role">&lsaquo;</button>
          <div class="cube-dots">${dots}</div>
          <button type="button" class="btn btn-ghost cube-next" aria-label="Next role">&rsaquo;</button>
        </div>
      </div>
    </div>
  `;
  return el;
}
