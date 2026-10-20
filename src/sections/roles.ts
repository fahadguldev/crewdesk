import { C } from '../content';

export function buildRoles(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'roles pin-section';
  el.id = 'roles';

  const fallbackIcon = `<svg class="role-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>`;
  const roleIcons: Record<string, string> = {
    admin: `<svg class="role-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`,
    hr: `<svg class="role-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    pm: `<svg class="role-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,
    employee: `<svg class="role-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" x2="22" y1="20" y2="20"/></svg>`
  };

  const roleMockups: Record<string, string> = {
    admin: `
      <div class="rc-preview-box">
        <div class="money-row">
          <div class="mr-left">
            <span class="mr-indicator-dot"></span>
            <span class="money-label">${C.roles.redaction.label}</span>
          </div>
          <span class="money-value" data-real="${C.roles.redaction.value}" data-mask="${C.roles.redaction.hidden}">${C.roles.redaction.value}</span>
        </div>
        <div class="rc-preview-pills">
          <span class="rc-metric-pill"><span>Vault:</span> AES-256 Armed</span>
          <span class="rc-metric-pill"><span>Attendance:</span> 100% Synced</span>
          <span class="rc-metric-pill"><span>Net Margin:</span> +34.2%</span>
        </div>
      </div>
      <p class="money-cap">${C.roles.redaction.captionAdmin}</p>
    `,
    hr: `
      <div class="rc-preview-box">
        <div class="money-row redacted">
          <div class="mr-left">
            <span class="mr-shield-icon">🔒</span>
            <span class="money-label">${C.roles.redaction.label}</span>
          </div>
          <span class="money-mask">${C.roles.redaction.hidden}</span>
        </div>
        <div class="rc-preview-pills">
          <span class="rc-metric-pill"><span>Daily Punch:</span> 42 Active</span>
          <span class="rc-metric-pill"><span>Pending Leaves:</span> 2</span>
          <span class="rc-metric-pill"><span>Salaries:</span> Restricted</span>
        </div>
      </div>
      <p class="money-cap">${C.roles.redaction.captionEmployee}</p>
    `,
    pm: `
      <div class="rc-preview-box">
        <div class="money-row redacted">
          <div class="mr-left">
            <span class="mr-shield-icon">🔒</span>
            <span class="money-label">${C.roles.redaction.label}</span>
          </div>
          <span class="money-mask">${C.roles.redaction.hidden}</span>
        </div>
        <div class="rc-preview-pills">
          <span class="rc-metric-pill"><span>Active Sprints:</span> 8</span>
          <span class="rc-metric-pill"><span>Capacity Guard:</span> Balanced</span>
          <span class="rc-metric-pill"><span>Margins:</span> Restricted</span>
        </div>
      </div>
      <p class="money-cap">${C.roles.redaction.captionEmployee}</p>
    `,
    employee: `
      <div class="rc-preview-box">
        <div class="money-row redacted">
          <div class="mr-left">
            <span class="mr-shield-icon">🔒</span>
            <span class="money-label">${C.roles.redaction.label}</span>
          </div>
          <span class="money-mask">${C.roles.redaction.hidden}</span>
        </div>
        <div class="rc-preview-pills">
          <span class="rc-metric-pill"><span>My Tasks:</span> 4 In Progress</span>
          <span class="rc-metric-pill"><span>Check-In:</span> 09:15 AM</span>
          <span class="rc-metric-pill"><span>Financials:</span> Hidden</span>
        </div>
      </div>
      <p class="money-cap">${C.roles.redaction.captionEmployee}</p>
    `
  };

  const faces = C.roles.items
    .map((r) => {
      const icon = roleIcons[r.id] ?? fallbackIcon;
      const demoUrl = (r as any).demoUrl ?? (C.roles as any).demoUrl ?? 'https://demo.crewdesk.com';
      const demoCta = (C.roles as any).demoCta ?? 'View Live Demo';
      const mockup = roleMockups[r.id] ?? roleMockups.employee;

      return `
        <div class="cube-face glass role-card" data-id="${r.id}" style="--c:var(--${r.color})">
          <div class="rc-header">
            <div class="rc-title-wrap">
              <span class="rc-icon" aria-hidden="true">${icon}</span>
              <div>
                <div class="rc-badge-row">
                  <span class="role-badge">${r.badge}</span>
                  <span class="rc-pulse-dot" aria-hidden="true"></span>
                </div>
                <h3 class="rc-title">${r.title}</h3>
              </div>
            </div>
            <span class="rc-access-pill ${r.seesMoney ? 'is-full' : 'is-prot'}">
              ${r.seesMoney ? '● Full Access' : '🔒 Protected'}
            </span>
          </div>

          <p class="rc-desc">${r.desc}</p>

          <div class="role-chips">
            ${r.chips.map((c) => `<span class="rc-chip">${c}</span>`).join('')}
          </div>

          ${mockup}

          <div class="rc-actions">
            <span class="rc-live-hint">
              <span class="live-dot"></span>
              Live sandbox ready
            </span>
            <a class="btn btn-primary rc-demo-btn" href="${demoUrl}" target="_blank" rel="noopener noreferrer">
              <span>${demoCta}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
      const icon = roleIcons[r.id] ?? fallbackIcon;
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
