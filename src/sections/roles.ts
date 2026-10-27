import { C } from "../content";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const esc = (v: unknown): string =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ]!,
  );

const icon = (paths: string): string =>
  `<svg class="role-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" focusable="false">${paths}</svg>`;

const roleIcons: Record<string, string> = {
  admin: icon(`<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>`),
  hr: icon(
    `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  ),
  pm: icon(
    `<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>`,
  ),
  employee: icon(
    `<rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" x2="22" y1="20" y2="20"/>`,
  ),
};
const fallbackIcon = icon(
  `<circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>`,
);

/* ------------------------------------------------------------------ */
/* Role types and mockups                                              */
/* ------------------------------------------------------------------ */

type RoleDef = {
  id: string;
  name: string;
  tagline: string;
  url: string;
  points: string[];
  mockup: () => string;
};

const cfg = C.roles as unknown as Record<string, any>;

const adminMockup = (): string => `
  <div class="rc-preview-box">
    <div class="mock-head"><span class="mock-title">Executive Overview</span><span class="rc-sample-tag">Sample data</span></div>
    <div class="money-row">
      <div class="mr-left">
        <span class="mr-indicator-dot"></span>
        <span class="money-label">${esc(C.roles.redaction.label)}</span>
      </div>
      <div class="mr-right">
        <span class="money-value"
          data-real="${esc(C.roles.redaction.value)}"
          data-mask="${esc(C.roles.redaction.hidden)}"
          aria-live="polite">${esc(C.roles.redaction.value)}</span>
        <button type="button" class="money-toggle" aria-pressed="false" aria-label="Toggle redaction">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
    </div>
    <div class="rc-preview-pills">
      <span class="rc-metric-pill is-ok"><span class="k">Vault</span><span class="v">AES-256 armed</span></span>
      <span class="rc-metric-pill is-ok"><span class="k">Attendance</span><span class="v">100% synced</span></span>
      <span class="rc-metric-pill is-pos"><span class="k">Net margin</span><span class="v">+34.2%</span></span>
    </div>
  </div>`;

const hrMockup = (): string => `
  <div class="rc-preview-box">
    <div class="mock-head">
      <span class="mock-title">Leave requests</span>
      <span class="mock-badge">2 pending</span>
      <span class="rc-sample-tag">Sample data</span>
    </div>
    <ul class="mock-list compact">
      <li><span class="avatar">AK</span><div class="mock-meta"><b>Ayesha Khan</b><small>Annual · 3 days</small></div><span class="status is-warn">Pending</span></li>
      <li><span class="avatar">BS</span><div class="mock-meta"><b>Bilal Sheikh</b><small>Sick · 1 day</small></div><span class="status is-ok">Approved</span></li>
    </ul>
    <div class="meter" role="img" aria-label="Team attendance 94 percent">
      <div class="meter-top"><span>Team attendance</span><b>94%</b></div>
      <div class="meter-track"><span style="width:94%"></span></div>
    </div>
  </div>`;

const pmMockup = (): string => `
  <div class="rc-preview-box">
    <div class="mock-head">
      <span class="mock-title">Profit per project</span>
      <span class="mock-badge is-pos">+18% MoM</span>
      <span class="rc-sample-tag">Sample data</span>
    </div>
    <div class="bars">
      <div class="bar-row"><span>Atlas</span><div class="meter-track"><span style="width:82%"></span></div><b>$12.4k</b></div>
      <div class="bar-row"><span>Nimbus</span><div class="meter-track"><span style="width:61%"></span></div><b>$9.1k</b></div>
      <div class="bar-row"><span>Orbit</span><div class="meter-track"><span style="width:38%"></span></div><b>$5.7k</b></div>
    </div>
    <div class="rc-preview-pills">
      <span class="rc-metric-pill is-ok"><span class="k">On track</span><span class="v">5 projects</span></span>
      <span class="rc-metric-pill is-warn"><span class="k">At risk</span><span class="v">1 project</span></span>
    </div>
  </div>`;

const employeeMockup = (): string => `
  <div class="rc-preview-box">
    <div class="mock-head">
      <span class="mock-title">Today</span>
      <span class="mock-badge is-pos">Clocked in 09:02</span>
      <span class="rc-sample-tag">Sample data</span>
    </div>
    <div class="ring-row">
      <div class="ring" style="--p:72" role="img" aria-label="Workload 72 percent"><b>72%</b><small>workload</small></div>
      <ul class="mock-list compact">
        <li><span class="dot is-ok"></span>Sprint review · 11:00</li>
        <li><span class="dot is-warn"></span>Report due · 16:00</li>
        <li><span class="dot"></span>Leave balance · 12 days</li>
      </ul>
    </div>
  </div>`;

const roles: RoleDef[] = [
  {
    id: "admin",
    name: "Agency Owner / Admin",
    tagline: "Full control, with sensitive numbers redacted by default.",
    url: "https://demo.daftarhub.app/?role=admin",
    points: [
      "Encrypted credential vault",
      "Role-based data redaction",
      "Company-wide profit view",
    ],
    mockup: adminMockup,
  },
  {
    id: "hr",
    name: "HR Manager",
    tagline: "People operations without the spreadsheets.",
    url: "https://demo.daftarhub.app/?role=hr",
    points: [
      "Leave approvals in one click",
      "Live attendance tracking",
      "Team workload at a glance",
    ],
    mockup: hrMockup,
  },
  {
    id: "pm",
    name: "Project Manager",
    tagline: "See which projects earn and which ones drain.",
    url: "https://demo.daftarhub.app/?role=pm",
    points: ["Profit per project", "Workload balancing", "Delivery risk flags"],
    mockup: pmMockup,
  },
  {
    id: "employee",
    name: "Employee & Developer",
    tagline: "Everything personal, nothing extra.",
    url: "https://demo.daftarhub.app/?role=employee",
    points: [
      "One-tap attendance",
      "Leave balance and requests",
      "Your own tasks and workload",
    ],
    mockup: employeeMockup,
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function buildRoles(): HTMLElement {
  const el = document.createElement("section");
  el.className = "roles pin-section";
  el.id = "roles";
  el.setAttribute("aria-labelledby", "roles-title");

  const tabs = roles
    .map(
      (r, i) => `
      <button type="button" class="role-tab${i === 0 ? " is-active" : ""}" role="tab"
        id="role-tab-${esc(r.id)}" aria-controls="role-panel-${esc(r.id)}"
        aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-index="${i}">
        <span class="role-icon">${roleIcons[r.id] ?? fallbackIcon}</span>
        <span class="role-tab-text"><b>${esc(r.name)}</b><small>${esc(r.tagline)}</small></span>
      </button>`,
    )
    .join("");

  const panels = roles
    .map(
      (r, i) => `
      <article class="role-card${i === 0 ? " is-active" : ""}" role="tabpanel"
        id="role-panel-${esc(r.id)}" aria-labelledby="role-tab-${esc(r.id)}"
        data-index="${i}" ${i === 0 ? "" : "hidden"}>
        <header class="role-card-head">
          <span class="role-icon is-lg">${roleIcons[r.id] ?? fallbackIcon}</span>
          <div>
            <h3>${esc(r.name)}</h3>
            <p>${esc(r.tagline)}</p>
          </div>
        </header>

        <ul class="role-points">
          ${r.points
            .map(
              (p) =>
                `<li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>${esc(
                  p,
                )}</li>`,
            )
            .join("")}
        </ul>

        ${r.mockup()}

        <footer class="role-card-foot">
          <a class="btn btn-primary rc-demo-btn" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
            <span>See Live Demo</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </footer>
      </article>`,
    )
    .join("");

  el.innerHTML = `
    <div class="roles-inner">
      <header class="roles-head">
        <span class="roles-eyebrow">${esc(cfg?.eyebrow ?? "Built for every seat")}</span>
        <h2 id="roles-title">${esc(cfg?.title ?? "4 Dedicated Role Dashboards")}</h2>
        <p>${esc(cfg?.subtitle ?? "Each role sees exactly what it needs, and nothing it should not.")}</p>
      </header>
      <div class="roles-layout">
        <div class="role-tabs" role="tablist" aria-label="Roles" aria-orientation="vertical">${tabs}</div>
        <div class="roles-stage">${panels}</div>
      </div>
    </div>`;

  /* ---------------- behaviour ---------------- */

  const tabEls = Array.from(
    el.querySelectorAll<HTMLButtonElement>(".role-tab"),
  );
  const cardEls = Array.from(el.querySelectorAll<HTMLElement>(".role-card"));
  let current = -1;

  const setActive = (index: number, focus = false): void => {
    const next = (index + roles.length) % roles.length;
    if (next === current && cardEls[current] && !cardEls[current].hidden) {
      return;
    }
    current = next;
    tabEls.forEach((t, i) => {
      const on = i === next;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (on) {
        if (focus) t.focus();
        t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    });
    cardEls.forEach((c, i) => {
      const on = i === next;
      c.classList.toggle("is-active", on);
      c.hidden = !on;
    });
    el.dataset.activeRole = roles[next].id;

    if (focus) {
      const activeCard = cardEls[next];
      if (activeCard) {
        const rect = activeCard.getBoundingClientRect();
        if (rect.bottom > window.innerHeight || rect.top < 65) {
          activeCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  };

  tabEls.forEach((t, i) => t.addEventListener("click", () => setActive(i, true)));

  el.querySelector(".role-tabs")!.addEventListener("keydown", (e) => {
    const k = (e as KeyboardEvent).key;
    if (k === "ArrowDown" || k === "ArrowRight") {
      e.preventDefault();
      setActive(current + 1, true);
    } else if (k === "ArrowUp" || k === "ArrowLeft") {
      e.preventDefault();
      setActive(current - 1, true);
    } else if (k === "Home") {
      e.preventDefault();
      setActive(0, true);
    } else if (k === "End") {
      e.preventDefault();
      setActive(roles.length - 1, true);
    }
  });

  // Listen for scroll choreography and external role change events
  window.addEventListener("roles:set", (e) =>
    setActive((e as CustomEvent<number>).detail),
  );
  el.addEventListener("roles:set", (e) =>
    setActive((e as CustomEvent<number>).detail),
  );

  // Redaction toggle
  const value = el.querySelector<HTMLElement>(".money-value");
  const toggle = el.querySelector<HTMLButtonElement>(".money-toggle");
  toggle?.addEventListener("click", () => {
    if (!value) return;
    const masked = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(masked));
    value.textContent = masked
      ? (value.dataset.mask ?? "")
      : (value.dataset.real ?? "");
    value.classList.toggle("is-masked", masked);
  });

  setActive(0);
  return el;
}
