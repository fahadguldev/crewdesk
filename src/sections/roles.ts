import { C } from '../content';

export function buildRoles(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'roles pin-section';
  el.id = 'roles';

  const roleIcons: Record<string, string> = {
    admin: '👑',
    hr: '👥',
    pm: '📊',
    employee: '💻'
  };

  const faces = C.roles.items
    .map((r) => {
      const icon = roleIcons[r.id] ?? '👤';
      const demoUrl = (r as any).demoUrl ?? (C.roles as any).demoUrl ?? 'https://demo.crewdesk.com';
      const demoCta = (C.roles as any).demoCta ?? 'See Live Demo';

      return `
        <div class="cube-face glass role-card" data-id="${r.id}" style="--c:var(--${r.color})">
          <div class="rc-header">
            <div class="rc-title-wrap">
              <span class="rc-icon" aria-hidden="true">${icon}</span>
              <div>
                <span class="role-badge">${r.badge}</span>
                <h3 class="rc-title">${r.title}</h3>
              </div>
            </div>
            <span class="rc-access-pill ${r.seesMoney ? 'is-full' : 'is-prot'}">${r.seesMoney ? 'Full Access' : 'Protected'}</span>
          </div>

          <p class="rc-desc">${r.desc}</p>

          <div class="role-chips">
            ${r.chips.map((c) => `<span>${c}</span>`).join('')}
          </div>

          ${
            r.seesMoney
              ? `<div class="money-row">
                   <span class="money-label">${C.roles.redaction.label}</span>
                   <span class="money-value" data-real="${C.roles.redaction.value}" data-mask="${C.roles.redaction.hidden}">${C.roles.redaction.value}</span>
                 </div>
                 <p class="money-cap">${C.roles.redaction.captionAdmin}</p>`
              : `<div class="money-row redacted">
                   <span class="money-label">${C.roles.redaction.label}</span>
                   <span class="money-mask">${C.roles.redaction.hidden}</span>
                 </div>
                 <p class="money-cap">${C.roles.redaction.captionEmployee}</p>`
          }

          <div class="rc-actions">
            <a class="btn btn-primary rc-demo-btn" href="${demoUrl}" target="_blank" rel="noopener noreferrer">
              <span>${demoCta}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      `;
    })
    .join('');

  const tabs = C.roles.items
    .map((r, i) => {
      const icon = roleIcons[r.id] ?? '👤';
      const cleanLabel = r.badge.replace(' Dashboard', '');
      return `
        <button type="button" class="role-tab-btn${i === 0 ? ' is-active' : ''}" data-i="${i}" role="tab" aria-selected="${i === 0}">
          <span class="tab-icon">${icon}</span>
          <span class="tab-label">${cleanLabel}</span>
        </button>
      `;
    })
    .join('');

  const dots = C.roles.items
    .map(
      (r, i) =>
        `<button type="button" class="cube-dot${i === 0 ? ' is-on' : ''}" data-i="${i}" aria-label="${r.title}"></button>`
    )
    .join('');

  el.innerHTML = `
    <div class="container">
      <div class="roles-head">
        <span class="eyebrow">${C.roles.eyebrow}</span>
        <h2 class="h-sec">${C.roles.title}</h2>
        <p class="sub-sec">${C.roles.sub}</p>
      </div>

      <!-- Segmented Role Switcher Tabs -->
      <div class="role-switcher-wrap">
        <div class="role-tabs-bar" role="tablist" aria-label="Select role dashboard">
          ${tabs}
        </div>
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
