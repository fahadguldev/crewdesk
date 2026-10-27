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
/* Role Definitions                                                    */
/* ------------------------------------------------------------------ */

type RoleDef = {
  id: string;
  name: string;
  tagline: string;
  url: string;
  points: string[];
  image: string;
};

const cfg = C.roles as unknown as Record<string, any>;

const roles: RoleDef[] = [
  {
    id: "admin",
    name: "Agency Owner / Admin",
    tagline: "Full executive command center with live business analysis and encrypted vault.",
    url: "https://demo.daftarhub.app/?role=admin",
    points: [
      "Encrypted credential vault",
      "Executive overview & profit margins",
      "Salaries & rates private from other roles",
    ],
    image: "/images/admin.png",
  },
  {
    id: "hr",
    name: "HR Manager",
    tagline: "People operations without spreadsheets or chaotic WhatsApp threads.",
    url: "https://demo.daftarhub.app/?role=hr",
    points: [
      "Leave approvals in one click",
      "Live attendance & late flag tracking",
      "Employee directory & team structure",
    ],
    image: "/images/hr.png",
  },
  {
    id: "pm",
    name: "Project Manager",
    tagline: "Delivery clarity — see active projects, tasks, and real capacity.",
    url: "https://demo.daftarhub.app/?role=pm",
    points: [
      "Real-time task delegation & sprints",
      "Workload balancing across developers",
      "Delivery risk flags & milestones",
    ],
    image: "/images/pm.png",
  },
  {
    id: "employee",
    name: "Employee & Developer",
    tagline: "Clean, distraction-free workspace. Everything personal, nothing extra.",
    url: "https://demo.daftarhub.app/?role=employee",
    points: [
      "One-tap daily attendance punch in",
      "Leave balance & instant requests",
      "Active task list & time logging",
    ],
    image: "/images/employee.png",
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

        <ul class="role-points" aria-label="Key Capabilities">
          ${r.points
            .map(
              (p) =>
                `<li><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg><span>${esc(
                  p,
                )}</span></li>`,
            )
            .join("")}
        </ul>

        <!-- Dashboard Browser Mockup -->
        <div class="rc-browser-frame">
          <div class="rc-browser-bar">
            <div class="rc-window-dots" aria-hidden="true">
              <span class="rc-dot rc-dot-red"></span>
              <span class="rc-dot rc-dot-yellow"></span>
              <span class="rc-dot rc-dot-green"></span>
            </div>
            <div class="rc-browser-url">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>demo.daftarhub.app/?role=${esc(r.id)}</span>
            </div>
            <div class="rc-browser-status">
              <span class="rc-status-chip">
                <span class="rc-live-pulse" aria-hidden="true"></span>
                <span>${esc(r.id.toUpperCase())} SCREEN</span>
              </span>
            </div>
          </div>
          <div class="rc-browser-body">
            <img
              src="${r.image}"
              alt="${esc(r.name)} Dashboard Screenshot"
              class="rc-dashboard-img"
              loading="eager"
              width="1800"
              height="930"
            />
            <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" class="rc-open-overlay" title="Open ${esc(r.name)} interactive screen">
              <span class="rc-open-pill">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>Test Live ${esc(r.name.split('/')[0].trim())} Screen</span>
              </span>
            </a>
          </div>
        </div>

        <footer class="role-card-foot">
          <a class="btn btn-primary rc-demo-btn" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
            <span>Open Live ${esc(r.name.split('/')[0].trim())} Demo</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>
          <span class="rc-foot-hint">Pre-configured sample data · Instant live screen access</span>
        </footer>
      </article>`,
    )
    .join("");

  el.innerHTML = `
    <div class="roles-inner">
      <header class="roles-head">
        <span class="roles-eyebrow">${esc(cfg?.eyebrow ?? "Role-Based Access by Design")}</span>
        <h2 id="roles-title">${esc(cfg?.title ?? "4 Dedicated Role Dashboards")}</h2>
        <p>${esc(cfg?.subtitle ?? "Each person gets exactly the screen they need — fewer buttons, less training, and no salary or rate exposure to the wrong role.")}</p>
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

  setActive(0);
  return el;
}
