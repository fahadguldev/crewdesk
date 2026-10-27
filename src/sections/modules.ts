import { C } from '../content';

const MODULE_DATA: Record<string, { src: string; fallbackAlt: string; urlPath: string }> = {
  'business-analysis': {
    src: '/images/business-analyst.png',
    fallbackAlt: 'Business Analysis — Profit per Project Dashboard',
    urlPath: 'business-analyst'
  },
  'overview': {
    src: '/images/admin.png',
    fallbackAlt: 'Hub دفتر Overview Dashboard',
    urlPath: ''
  },
  'attendance': {
    src: '/images/attendence-management.png',
    fallbackAlt: 'Attendance & Leave Management Dashboard',
    urlPath: 'attendance-management'
  },
  'projects': {
    src: '/images/project-management.png',
    fallbackAlt: 'Projects & Milestones Management Dashboard',
    urlPath: 'projects'
  },
  'vault': {
    src: '/images/password-vault.png',
    fallbackAlt: 'Client Password Vault — AES-256 Encrypted Dashboard',
    urlPath: 'credentials'
  },
  'time': {
    src: '/images/time-tracking.png',
    fallbackAlt: 'Developer Time Tracking Dashboard',
    urlPath: 'time-tracking'
  },
  'workload': {
    src: '/images/workload.png',
    fallbackAlt: 'Team Workload & Capacity Balancing Dashboard',
    urlPath: 'workload'
  },
  'team': {
    src: '/images/team-management.png',
    fallbackAlt: 'Employee Management & People Directory Dashboard',
    urlPath: 'team'
  }
};

export function buildModules(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'modules pin-section';
  el.id = 'modules';

  const demoBaseUrl = (C.modules as any).demoUrl ?? 'https://demo.daftarhub.app/';

  const slabs = C.modules.items
    .map((m) => {
      const moduleUrl = (m as any).url || demoBaseUrl;
      const modInfo = MODULE_DATA[m.id] ?? {
        src: '/images/admin.png',
        fallbackAlt: `${m.title} Dashboard`,
        urlPath: ''
      };

      return `<article class="module-slab glass" data-id="${m.id}" style="--c:var(--${m.color})">
        <div class="slab-top">
          <span class="slab-num">MODULE ${m.n}</span>
          <span class="slab-role">${m.role}</span>
        </div>
        <div class="slab-header-row">
          <h3 class="slab-title">${m.title}</h3>
          <span class="slab-badge">${C.modules.availableLabel}</span>
        </div>
        
        <!-- Live Dashboard Preview Frame with Bigger Image -->
        <div class="slab-preview-frame">
          <div class="slab-frame-bar">
            <div class="slab-dots" aria-hidden="true">
              <span class="slab-dot red"></span>
              <span class="slab-dot yellow"></span>
              <span class="slab-dot green"></span>
            </div>
            <span class="slab-frame-url">demo.daftarhub.app/${modInfo.urlPath}</span>
          </div>
          <div class="slab-img-wrap">
            <img
              src="${modInfo.src}"
              alt="${m.title} Screenshot"
              class="slab-dashboard-img"
              loading="lazy"
              decoding="async"
              width="1800"
              height="930"
            />
            <a href="${moduleUrl}" target="_blank" rel="noopener noreferrer" class="slab-img-overlay" title="Open live ${m.title} screen">
              <span class="slab-overlay-pill">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>Live Screen</span>
              </span>
            </a>
          </div>
        </div>

        <!-- Compact Bottom Bar Without Extra Space -->
        <div class="slab-bottom-bar">
          <p class="slab-desc">${m.desc}</p>
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
      <div class="slab-header-row">
        <h3 class="slab-title">${C.modules.ai.title} <span class="ai-status">(${C.modules.ai.status})</span></h3>
      </div>
      
      <!-- AI Preview Frame -->
      <div class="slab-preview-frame slab-ai-preview-frame">
        <div class="slab-frame-bar">
          <div class="slab-dots" aria-hidden="true">
            <span class="slab-dot" style="background: var(--indigo); opacity: 0.9;"></span>
            <span class="slab-dot" style="background: var(--indigo); opacity: 0.6;"></span>
            <span class="slab-dot" style="background: var(--indigo); opacity: 0.3;"></span>
          </div>
          <span class="slab-frame-url">ai-copilot.engine</span>
        </div>
        <div class="slab-ai-visual">
          <div class="ai-neural-grid">
            <div class="ai-node is-active"><span>Task Rebalance</span><small>Auto-suggested</small></div>
            <div class="ai-connector"></div>
            <div class="ai-node is-pulse"><span>Loss Risk Flag</span><small>Project margin alert</small></div>
          </div>
          <span class="ai-visual-tag">Planned · Included in all plans with agency API key</span>
        </div>
      </div>

      <!-- Compact Bottom Bar for AI -->
      <div class="slab-bottom-bar">
        <div class="slab-ai-desc-wrap">
          <p class="slab-desc">${C.modules.ai.desc}</p>
          <ul class="ai-bullets">${C.modules.ai.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
        </div>
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
