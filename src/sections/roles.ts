import { C } from '../content';

export function buildRoles(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'roles pin-section';
  el.id = 'roles';

  const faces = `
    <!-- 1. Admin Dashboard Face -->
    <div class="cube-face glass mock-dashboard" data-id="admin" style="--c:var(--emerald)">
      <div class="dash-window-header">
        <div class="window-dots" aria-hidden="true">
          <span class="w-dot red"></span>
          <span class="w-dot amber"></span>
          <span class="w-dot green"></span>
        </div>
        <div class="dash-title-badge">
          <span class="dash-role-icon">👑</span>
          <span class="role-badge">Admin Dashboard</span>
        </div>
        <div class="dash-status-pill">
          <span class="status-pulse"></span> Executive Clearance
        </div>
      </div>

      <div class="dash-body">
        <div class="dash-meta">
          <h3>Daftar Owner / Admin View</h3>
          <p>Full executive command center with live margins, team workload, and password vault.</p>
        </div>

        <div class="dash-bento-grid">
          <div class="bento-card bento-highlight">
            <span class="bento-label">Project Profit Margin</span>
            <div class="money-row">
              <span class="money-value" data-real="${C.roles.redaction.value}" data-mask="${C.roles.redaction.hidden}">${C.roles.redaction.value}</span>
              <span class="bento-trend positive">↑ 28.4%</span>
            </div>
            <span class="bento-caption">Real-time revenue vs developer cost</span>
          </div>

          <div class="bento-card">
            <span class="bento-label">Team Capacity</span>
            <div class="bento-metric">18 / 20 <small>Active</small></div>
            <div class="bento-bar"><div class="bento-fill" style="width: 90%;"></div></div>
            <span class="bento-caption">2 developers available for new sprints</span>
          </div>

          <div class="bento-card">
            <span class="bento-label">Client Password Vault</span>
            <div class="bento-metric">16 <small>Vaults</small></div>
            <div class="bento-sub"><span class="vault-lock">🔒</span> AES-256 Encrypted</div>
            <span class="bento-caption">Audit logging on every reveal</span>
          </div>
        </div>

        <div class="dash-project-row">
          <div class="dp-header">
            <span class="dp-name">Fintech Mobile App (Sprint 12)</span>
            <span class="dp-margin">74% Target Margin</span>
          </div>
          <div class="dp-progress-bar"><div class="dp-fill" style="width: 74%;"></div></div>
        </div>
      </div>

      <div class="dash-footer">
        <p class="money-cap">${C.roles.redaction.captionAdmin}</p>
        <div class="role-chips">
          <span>Overall Progress</span>
          <span>Profit Margins</span>
          <span>Password Vault</span>
          <span>Workload</span>
        </div>
      </div>
    </div>

    <!-- 2. HR Dashboard Face -->
    <div class="cube-face glass mock-dashboard" data-id="hr" style="--c:var(--indigo)">
      <div class="dash-window-header">
        <div class="window-dots" aria-hidden="true">
          <span class="w-dot red"></span>
          <span class="w-dot amber"></span>
          <span class="w-dot green"></span>
        </div>
        <div class="dash-title-badge">
          <span class="dash-role-icon">👥</span>
          <span class="role-badge">HR Dashboard</span>
        </div>
        <div class="dash-status-pill">
          <span class="status-pulse"></span> People Operations
        </div>
      </div>

      <div class="dash-body">
        <div class="dash-meta">
          <h3>HR Manager View</h3>
          <p>Streamlined people operations, attendance, working hours, and employee onboarding.</p>
        </div>

        <div class="dash-bento-grid">
          <div class="bento-card">
            <span class="bento-label">Today's Attendance</span>
            <div class="bento-metric">18 <small>Present</small></div>
            <div class="bento-attendance-breakdown">
              <span class="att-chip pres">18 on-time</span>
              <span class="att-chip late">2 late</span>
              <span class="att-chip wfh">1 WFH</span>
            </div>
          </div>

          <div class="bento-card">
            <span class="bento-label">Office Hours Logged</span>
            <div class="bento-metric">3,420 <small>hrs/mo</small></div>
            <div class="bento-bar"><div class="bento-fill" style="width: 96%; background: var(--indigo);"></div></div>
            <span class="bento-caption">98.2% on-time attendance rate</span>
          </div>

          <div class="bento-card bento-action-card">
            <span class="bento-label">Leave Approvals</span>
            <div class="leave-item">
              <div class="leave-user">
                <span class="user-avatar">HA</span>
                <div class="user-info">
                  <strong>Hamza Ali</strong>
                  <small>Casual Leave</small>
                </div>
              </div>
              <div class="leave-btns">
                <button type="button" class="mini-btn approve" aria-label="Approve">✓</button>
                <button type="button" class="mini-btn reject" aria-label="Reject">✕</button>
              </div>
            </div>
          </div>
        </div>

        <div class="money-row redacted">
          <span class="money-label">${C.roles.redaction.label}</span>
          <span class="money-mask">${C.roles.redaction.hidden}</span>
        </div>
      </div>

      <div class="dash-footer">
        <p class="money-cap">${C.roles.redaction.captionEmployee}</p>
        <div class="role-chips">
          <span>Employee Onboarding</span>
          <span>Team Structure</span>
          <span>Attendance & Leaves</span>
          <span>Working Hours</span>
        </div>
      </div>
    </div>

    <!-- 3. PM Dashboard Face -->
    <div class="cube-face glass mock-dashboard" data-id="pm" style="--c:var(--blue)">
      <div class="dash-window-header">
        <div class="window-dots" aria-hidden="true">
          <span class="w-dot red"></span>
          <span class="w-dot amber"></span>
          <span class="w-dot green"></span>
        </div>
        <div class="dash-title-badge">
          <span class="dash-role-icon">📊</span>
          <span class="role-badge">PM Dashboard</span>
        </div>
        <div class="dash-status-pill">
          <span class="status-pulse"></span> Delivery Hub
        </div>
      </div>

      <div class="dash-body">
        <div class="dash-meta">
          <h3>Project Manager View</h3>
          <p>Execution hub: track sprints, rebalance team workloads, and manage deliverables.</p>
        </div>

        <div class="dash-bento-grid">
          <div class="bento-card">
            <span class="bento-label">Sprint Velocity</span>
            <div class="bento-metric">28 / 40 <small>Tasks</small></div>
            <div class="bento-bar"><div class="bento-fill" style="width: 70%; background: var(--blue);"></div></div>
            <span class="bento-caption">70% sprint deliverables completed</span>
          </div>

          <div class="bento-card">
            <span class="bento-label">Workload Balance</span>
            <div class="workload-list">
              <div class="wl-row">
                <span>Zubair (Dev)</span>
                <span class="wl-badge peak">90% Peak</span>
              </div>
              <div class="wl-row">
                <span>Ayesha (Dev)</span>
                <span class="wl-badge free">45% Available</span>
              </div>
            </div>
          </div>

          <div class="bento-card">
            <span class="bento-label">Sprint Deadline</span>
            <div class="bento-metric">3 <small>Days Left</small></div>
            <span class="bento-sub">Sprint 14 Delivery</span>
            <span class="bento-caption">Zero blocking bottlenecks</span>
          </div>
        </div>

        <div class="money-row redacted">
          <span class="money-label">${C.roles.redaction.label}</span>
          <span class="money-mask">${C.roles.redaction.hidden}</span>
        </div>
      </div>

      <div class="dash-footer">
        <p class="money-cap">${C.roles.redaction.captionEmployee}</p>
        <div class="role-chips">
          <span>Project Milestones</span>
          <span>Task Delegation</span>
          <span>Workload Rebalance</span>
          <span>Sprint Tracking</span>
        </div>
      </div>
    </div>

    <!-- 4. Developer & Employee Workspace Face -->
    <div class="cube-face glass mock-dashboard" data-id="employee" style="--c:var(--teal)">
      <div class="dash-window-header">
        <div class="window-dots" aria-hidden="true">
          <span class="w-dot red"></span>
          <span class="w-dot amber"></span>
          <span class="w-dot green"></span>
        </div>
        <div class="dash-title-badge">
          <span class="dash-role-icon">💻</span>
          <span class="role-badge">Employee Dashboard</span>
        </div>
        <div class="dash-status-pill">
          <span class="status-pulse"></span> My Workspace
        </div>
      </div>

      <div class="dash-body">
        <div class="dash-meta">
          <h3>Employee & Developer View</h3>
          <p>Distraction-free workspace for tasks, attendance punch, and time tracking without salary leaks.</p>
        </div>

        <div class="dash-bento-grid">
          <div class="bento-card">
            <span class="bento-label">Daily Attendance</span>
            <button type="button" class="mock-punch-btn is-punched" id="mock-punch-btn">
              🟢 Punched In (09:14 AM)
            </button>
            <span class="bento-caption">1-click punch in/out with auto-flags</span>
          </div>

          <div class="bento-card">
            <span class="bento-label">Active Task Timer</span>
            <div class="timer-display">
              <span class="timer-digits">02:45:18</span>
              <span class="timer-task">API Auth Middleware</span>
            </div>
            <span class="bento-caption">Tracks hours without timesheet fatigue</span>
          </div>

          <div class="bento-card">
            <span class="bento-label">Sprint Checklist</span>
            <div class="task-checklist">
              <span class="task-check done">✓ Setup routes</span>
              <span class="task-check active">▶ Unit tests</span>
            </div>
          </div>
        </div>

        <div class="money-row redacted">
          <span class="money-label">${C.roles.redaction.label}</span>
          <span class="money-mask">${C.roles.redaction.hidden}</span>
        </div>
      </div>

      <div class="dash-footer">
        <p class="money-cap">${C.roles.redaction.captionEmployee}</p>
        <div class="role-chips">
          <span>Assigned Tasks</span>
          <span>1-Click Punch In</span>
          <span>Time Tracker</span>
          <span>Fast Leave Form</span>
        </div>
      </div>
    </div>
  `;

  const tabs = [
    { id: 'admin', icon: '👑', label: 'Owner / Admin', badge: 'Full Access', color: 'var(--emerald)' },
    { id: 'hr', icon: '👥', label: 'HR Manager', badge: 'People Ops', color: 'var(--indigo)' },
    { id: 'pm', icon: '📊', label: 'Project Manager', badge: 'Delivery Hub', color: 'var(--blue)' },
    { id: 'employee', icon: '💻', label: 'Developer', badge: 'Distraction-Free', color: 'var(--teal)' }
  ];

  const roleTabButtons = tabs
    .map(
      (t, i) => `
      <button type="button" class="role-tab-btn${i === 0 ? ' is-active' : ''}" data-i="${i}" role="tab" aria-selected="${i === 0}">
        <span class="tab-icon">${t.icon}</span>
        <span class="tab-label">${t.label}</span>
        <span class="tab-badge" style="--tb-color: ${t.color}">${t.badge}</span>
      </button>`
    )
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

      <!-- Interactive Segmented Role Switcher -->
      <div class="role-switcher-wrap">
        <div class="role-tabs-bar" role="tablist" aria-label="Select role dashboard">
          ${roleTabButtons}
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

      <!-- Live Permission & Security Status Callout -->
      <div class="role-security-badge is-admin" id="role-security-badge">
        <span class="sec-icon">🔓</span>
        <span class="sec-text"><strong>Executive Clearance Active:</strong> Real-time project margins and developer costs fully visible.</span>
      </div>
    </div>
  `;
  return el;
}
