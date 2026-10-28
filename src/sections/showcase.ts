/* ------------------------------------------------------------------ */
/* Shared Showcase Component                                          */
/* Used identically by both 4 Roles Dashboard & 8 Modules Showcase   */
/* ------------------------------------------------------------------ */

export type ShowcaseItem = {
  id: string;
  name: string;
  tagline: string;
  desc?: string;
  url: string;
  image: string;
  iconSvg: string;
  urlPath: string;
  statusBadge: string;
  buttonText: string;
};

export type ShowcaseConfig = {
  sectionId: string; // e.g. "roles" or "modules"
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ShowcaseItem[];
  eventName: string; // e.g. "roles:set" or "modules:set"
  datasetAttr: string; // e.g. "activeRole" or "activeModule"
  layoutExtraClass?: string;
};

const esc = (v: unknown): string =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ]!,
  );

export function buildShowcaseSection(config: ShowcaseConfig): HTMLElement {
  const {
    sectionId,
    eyebrow,
    title,
    subtitle,
    items,
    eventName,
    datasetAttr,
    layoutExtraClass,
  } = config;

  const el = document.createElement("section");
  el.className = `${sectionId} pin-section`;
  el.id = sectionId;
  el.setAttribute("aria-labelledby", `${sectionId}-title`);

  const tabs = items
    .map(
      (item, i) => `
      <button type="button" class="role-tab${i === 0 ? " is-active" : ""}" role="tab"
        id="${sectionId}-tab-${esc(item.id)}" aria-controls="${sectionId}-panel-${esc(item.id)}"
        aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-index="${i}">
        <span class="role-icon">${item.iconSvg}</span>
        <span class="role-tab-text"><b>${esc(item.name)}</b><small>${esc(item.tagline)}</small></span>
      </button>`,
    )
    .join("");

  const panels = items
    .map(
      (item, i) => `
      <article class="role-card${i === 0 ? " is-active" : ""}" role="tabpanel"
        id="${sectionId}-panel-${esc(item.id)}" aria-labelledby="${sectionId}-tab-${esc(item.id)}"
        data-index="${i}" ${i === 0 ? "" : "hidden"}>
        <header class="role-card-head">
          <span class="role-icon is-lg">${item.iconSvg}</span>
          <div>
            <h3>${esc(item.name)}</h3>
            <p>${esc(item.desc ?? item.tagline)}</p>
          </div>
        </header>

        <!-- Dashboard Browser Mockup Frame (Identical card size) -->
        <div class="rc-browser-frame">
          <div class="rc-browser-bar">
            <div class="rc-window-dots" aria-hidden="true">
              <span class="rc-dot rc-dot-red"></span>
              <span class="rc-dot rc-dot-yellow"></span>
              <span class="rc-dot rc-dot-green"></span>
            </div>
            <div class="rc-browser-url">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>demo.daftarhub.app/${esc(item.urlPath)}</span>
            </div>
            <div class="rc-browser-status">
              <span class="rc-status-chip">
                <span class="rc-live-pulse" aria-hidden="true"></span>
                <span>${esc(item.statusBadge)}</span>
              </span>
            </div>
          </div>
          <div class="rc-browser-body">
            <img
              src="${item.image}"
              alt="${esc(item.name)} Dashboard Screenshot"
              class="rc-dashboard-img"
              loading="eager"
              width="1800"
              height="930"
            />
            <a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer" class="rc-open-overlay" title="Open live ${esc(item.name)} screen">
              <span class="rc-open-pill">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>View Live ${esc(item.buttonText.split('/')[0].trim())} Screen</span>
              </span>
            </a>
          </div>
        </div>

        <footer class="role-card-foot">
          <a class="btn btn-primary rc-demo-btn" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">
            <span>Open Live ${esc(item.buttonText.split('/')[0].trim())} Demo</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </footer>
      </article>`,
    )
    .join("");

  el.innerHTML = `
    <div class="${sectionId}-inner">
      <header class="${sectionId}-head">
        <span class="${sectionId}-eyebrow">${esc(eyebrow)}</span>
        <h2 id="${sectionId}-title">${esc(title)}</h2>
        <p>${esc(subtitle)}</p>
      </header>
      <div class="${sectionId}-layout ${layoutExtraClass ?? ""}">
        <div class="role-tabs" role="tablist" aria-label="${esc(title)}" aria-orientation="vertical">${tabs}</div>
        <div class="roles-stage">${panels}</div>
      </div>
    </div>`;

  /* ---------------- Tab Switch Behavior & Keyboard Navigation ---------------- */

  const tabEls = Array.from(
    el.querySelectorAll<HTMLButtonElement>(".role-tab"),
  );
  const cardEls = Array.from(el.querySelectorAll<HTMLElement>(".role-card"));
  let current = -1;

  const setActive = (index: number, focus = false): void => {
    const next = (index + items.length) % items.length;
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
    el.dataset[datasetAttr] = items[next].id;

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

  const tabsContainer = el.querySelector(".role-tabs");
  if (tabsContainer) {
    tabsContainer.addEventListener("keydown", (e) => {
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
        setActive(items.length - 1, true);
      }
    });
  }

  // Listen for scroll choreography and external set events
  window.addEventListener(eventName, (e) => {
    const detail = (e as CustomEvent<number>).detail;
    if (typeof detail === "number" && detail >= 0 && detail < items.length) {
      setActive(detail, false);
    }
  });
  el.addEventListener(eventName, (e) => {
    const detail = (e as CustomEvent<number>).detail;
    if (typeof detail === "number" && detail >= 0 && detail < items.length) {
      setActive(detail, false);
    }
  });

  setActive(0);
  return el;
}
