import {
  C,
  usdFromPKR
} from '../content';

interface TierChartConfig {
  seats: number;
  maxPKR: number;
  maxUSD: number;
  headlinePKR: string;
  headlineUSD: string;
  ticksPKR: string[];
  ticksUSD: string[];
  rows: {
    id: string;
    pkr: number;
    usd: number;
    widthPct: number;
  }[];
}

const CHART_DATA: Record<number, TierChartConfig> = {
  10: {
    seats: 10,
    maxPKR: 80000,
    maxUSD: 280,
    headlinePKR: 'PKR 12,000 per month',
    headlineUSD: '$43 per month',
    ticksPKR: ['PKR 0', 'PKR 20k', 'PKR 40k', 'PKR 60k', 'PKR 80k'],
    ticksUSD: ['$0', '$70', '$140', '$210', '$280'],
    rows: [
      { id: 'productive', pkr: 67200, usd: 240, widthPct: 76 },
      { id: 'teamwork', pkr: 56000, usd: 200, widthPct: 64 },
      { id: 'clickup-monthly', pkr: 53200, usd: 190, widthPct: 60 },
      { id: 'clickup-annual', pkr: 33600, usd: 120, widthPct: 38 },
      { id: 'hub-daftar', pkr: 12000, usd: 43, widthPct: 22 }
    ]
  },
  15: {
    seats: 15,
    maxPKR: 120000,
    maxUSD: 420,
    headlinePKR: 'PKR 18,000 per month',
    headlineUSD: '$64 per month',
    ticksPKR: ['PKR 0', 'PKR 30k', 'PKR 60k', 'PKR 90k', 'PKR 120k'],
    ticksUSD: ['$0', '$105', '$210', '$315', '$420'],
    rows: [
      { id: 'productive', pkr: 100800, usd: 360, widthPct: 86 },
      { id: 'teamwork', pkr: 84000, usd: 300, widthPct: 72 },
      { id: 'clickup-monthly', pkr: 79800, usd: 285, widthPct: 68 },
      { id: 'clickup-annual', pkr: 50400, usd: 180, widthPct: 43 },
      { id: 'hub-daftar', pkr: 18000, usd: 64, widthPct: 25 }
    ]
  },
  25: {
    seats: 25,
    maxPKR: 200000,
    maxUSD: 700,
    headlinePKR: 'PKR 30,000 per month',
    headlineUSD: '$107 per month',
    ticksPKR: ['PKR 0', 'PKR 50k', 'PKR 100k', 'PKR 150k', 'PKR 200k'],
    ticksUSD: ['$0', '$175', '$350', '$525', '$700'],
    rows: [
      { id: 'productive', pkr: 168000, usd: 600, widthPct: 96 },
      { id: 'teamwork', pkr: 140000, usd: 500, widthPct: 80 },
      { id: 'clickup-monthly', pkr: 133000, usd: 475, widthPct: 76 },
      { id: 'clickup-annual', pkr: 84000, usd: 300, widthPct: 48 },
      { id: 'hub-daftar', pkr: 30000, usd: 107, widthPct: 28 }
    ]
  }
};

export function buildPricingTable(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section pricing-table';
  el.id = 'pricing-table';

  el.innerHTML = `
    <div class="container">
      <div class="pt-head">
        <span class="eyebrow">PRICING, BENCHMARKED AGAINST THE FIELD</span>
        <h2 class="h-sec">All 8 agency modules, now <span class="pt-highlight" id="pt-headline-price" data-pkr="PKR 12,000 per month" data-usd="$43 per month">PKR 12,000 per month</span>.</h2>
        <p class="sub-sec">Dedicated database, attendance, client password vault, time tracking, real project profit and over 75% lower cost than ClickUp, Productive, and Teamwork — with zero seat penalties.</p>
      </div>

      <div class="pt-card glass">
        <div class="pt-card-header">
          <div class="pt-card-header-left">
            <h3 class="pt-card-title">Agency software cost vs the market</h3>
            <div class="pt-card-legend">
              <span class="pt-legend-item"><span class="pt-legend-dot pt-dot-other"></span> Other providers</span>
              <span class="pt-legend-item"><span class="pt-legend-dot pt-dot-hub"></span> <span class="brand-name" dir="ltr">Hub <span class="urdu" dir="rtl" lang="ur"><bdi>دفتر</bdi></span></span></span>
            </div>
          </div>
          <div class="pt-card-header-right">
            <span class="pt-unit-label" data-pkr="MONTHLY COST (PKR)" data-usd="MONTHLY COST (USD)">MONTHLY COST (PKR)</span>
            <div class="pt-tier-tabs" role="tablist" aria-label="Select agency team size">
              <button type="button" class="pt-tier-tab is-active" data-seats="10" role="tab" aria-selected="true">Team of 10</button>
              <button type="button" class="pt-tier-tab" data-seats="15" role="tab" aria-selected="false">Team of 15</button>
              <button type="button" class="pt-tier-tab" data-seats="25" role="tab" aria-selected="false">Team of 25</button>
            </div>
          </div>
        </div>

        <div class="pt-chart-stage">
          <div class="pt-grid-lines" aria-hidden="true">
            <span class="pt-grid-line" style="left: 0%;"></span>
            <span class="pt-grid-line" style="left: 25%;"></span>
            <span class="pt-grid-line" style="left: 50%;"></span>
            <span class="pt-grid-line" style="left: 75%;"></span>
            <span class="pt-grid-line" style="left: 100%;"></span>
          </div>

          <div class="pt-rows">
            <!-- Row 1: Productive -->
            <div class="pt-row" data-row-id="productive">
              <div class="pt-row-label">
                <span class="pt-row-name">Productive Professional</span>
                <span class="pt-row-sub">Billed annually ($24/seat/mo)</span>
              </div>
              <div class="pt-bar-track">
                <div class="pt-bar pt-bar-comp" style="width: 76%;">
                  <span class="pt-bar-val" data-pkr="PKR 67,200 /mo" data-usd="$240 /mo">PKR 67,200 /mo</span>
                </div>
              </div>
            </div>

            <!-- Row 2: Teamwork Grow -->
            <div class="pt-row" data-row-id="teamwork">
              <div class="pt-row-label">
                <span class="pt-row-name">Teamwork Grow</span>
                <span class="pt-row-sub">Billed annually ($20/seat/mo)</span>
              </div>
              <div class="pt-bar-track">
                <div class="pt-bar pt-bar-comp" style="width: 64%;">
                  <span class="pt-bar-val" data-pkr="PKR 56,000 /mo" data-usd="$200 /mo">PKR 56,000 /mo</span>
                </div>
              </div>
            </div>

            <!-- Row 3: ClickUp Business Monthly -->
            <div class="pt-row" data-row-id="clickup-monthly">
              <div class="pt-row-label">
                <span class="pt-row-name">ClickUp Business (Monthly)</span>
                <span class="pt-row-sub">Billed monthly ($19/seat/mo)</span>
              </div>
              <div class="pt-bar-track">
                <div class="pt-bar pt-bar-comp" style="width: 60%;">
                  <span class="pt-bar-val" data-pkr="PKR 53,200 /mo" data-usd="$190 /mo">PKR 53,200 /mo</span>
                </div>
              </div>
            </div>

            <!-- Row 4: ClickUp Business Annual -->
            <div class="pt-row" data-row-id="clickup-annual">
              <div class="pt-row-label">
                <span class="pt-row-name">ClickUp Business (Annual)</span>
                <span class="pt-row-sub">Billed annually ($12/seat/mo)</span>
              </div>
              <div class="pt-bar-track">
                <div class="pt-bar pt-bar-comp" style="width: 38%;">
                  <span class="pt-bar-val" data-pkr="PKR 33,600 /mo" data-usd="$120 /mo">PKR 33,600 /mo</span>
                </div>
              </div>
            </div>

            <!-- Row 5: Hub دفتر -->
            <div class="pt-row is-hub" data-row-id="hub-daftar">
              <div class="pt-row-label">
                <span class="pt-row-name"><span class="brand-name" dir="ltr">Hub <span class="urdu" dir="rtl" lang="ur"><bdi>دفتر</bdi></span></span> (Flat)</span>
                <span class="pt-row-sub">All 8 modules included · Dedicated DB</span>
              </div>
              <div class="pt-bar-track">
                <div class="pt-bar pt-bar-hub" style="width: 22%;">
                  <span class="pt-bar-val pt-val-hub" data-pkr="PKR 12,000 /mo" data-usd="$43 /mo">PKR 12,000 /mo</span>
                  <span class="pt-now-badge">NOW</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-axis" id="pt-axis">
            <span class="pt-axis-tick" style="left: 0%;" data-pkr="PKR 0" data-usd="$0">PKR 0</span>
            <span class="pt-axis-tick" style="left: 25%;" data-pkr="PKR 20k" data-usd="$70">PKR 20k</span>
            <span class="pt-axis-tick" style="left: 50%;" data-pkr="PKR 40k" data-usd="$140">PKR 40k</span>
            <span class="pt-axis-tick" style="left: 75%;" data-pkr="PKR 60k" data-usd="$210">PKR 60k</span>
            <span class="pt-axis-tick" style="left: 100%;" data-pkr="PKR 80k" data-usd="$280">PKR 80k</span>
          </div>
        </div>
      </div>

      <p class="pt-foot">*List prices verified October 2026 from official competitor pricing pages (ClickUp Business @ $12/user/mo annual, $19/user/mo monthly; Productive Professional @ $24/user/mo; Teamwork Grow @ $20/user/mo), converted at PKR 280/USD. In competitors, password vault tools and attendance typically require separate paid apps or add-ons.</p>
      <p class="pt-foot pt-foot-star">*Hub <span class="urdu" dir="rtl" lang="ur"><bdi>دفتر</bdi></span> includes attendance, client password vault, time tracking, project profit, and dedicated database per agency with zero seat-count penalties.</p>
      <p class="pt-foot" id="pt-hours-saved">Estimated founder hours saved per month: 10 seats: 18h · 15 seats: 24h · 25 seats: 30h. These are estimates based on consolidating multiple disconnected tools, not measured customer results.</p>
      <div class="pt-cta"><a class="btn btn-primary" href="#final-cta">Book Free 30-Min Walkthrough</a></div>
    </div>
  `;
  return el;
}

export function bindPricingChart(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.pt-tier-tab');
  if (!tabs.length) return;

  const getCurrency = (): 'pkr' | 'usd' => {
    const activeCurBtn = document.querySelector<HTMLButtonElement>('.cur-btn.is-active');
    return (activeCurBtn?.dataset.cur as 'pkr' | 'usd') || 'pkr';
  };

  const applyTier = (seats: number) => {
    const data = CHART_DATA[seats];
    if (!data) return;

    // 1. Update tab states
    tabs.forEach((tab) => {
      const isActive = Number(tab.dataset.seats) === seats;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    const cur = getCurrency();

    // 2. Update headline highlight
    const headline = document.getElementById('pt-headline-price');
    if (headline) {
      headline.dataset.pkr = data.headlinePKR;
      headline.dataset.usd = data.headlineUSD;
      headline.textContent = cur === 'pkr' ? data.headlinePKR : data.headlineUSD;
    }

    // 3. Update rows (bar width + values)
    data.rows.forEach((row) => {
      const rowEl = document.querySelector<HTMLElement>(`.pt-row[data-row-id="${row.id}"]`);
      if (!rowEl) return;
      const bar = rowEl.querySelector<HTMLElement>('.pt-bar');
      if (bar) {
        bar.style.width = `${row.widthPct}%`;
      }
      const valEl = rowEl.querySelector<HTMLElement>('.pt-bar-val');
      if (valEl) {
        const pkrStr = `PKR ${row.pkr.toLocaleString()} /mo`;
        const usdStr = `$${row.usd.toLocaleString()} /mo`;
        valEl.dataset.pkr = pkrStr;
        valEl.dataset.usd = usdStr;
        valEl.textContent = cur === 'pkr' ? pkrStr : usdStr;
      }
    });

    // 4. Update axis ticks
    const tickEls = document.querySelectorAll<HTMLElement>('.pt-axis-tick');
    tickEls.forEach((tick, idx) => {
      if (data.ticksPKR[idx] && data.ticksUSD[idx]) {
        tick.dataset.pkr = data.ticksPKR[idx];
        tick.dataset.usd = data.ticksUSD[idx];
        tick.textContent = cur === 'pkr' ? data.ticksPKR[idx] : data.ticksUSD[idx];
      }
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const seats = Number(tab.dataset.seats);
      applyTier(seats);
    });
  });

  // Re-apply active tier when currency changes
  window.addEventListener('currencychange', () => {
    const activeTab = document.querySelector<HTMLButtonElement>('.pt-tier-tab.is-active');
    const seats = activeTab ? Number(activeTab.dataset.seats) : 10;
    applyTier(seats);
  });
}

export function buildComparison(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section comparison';
  el.id = 'comparison';
  const c = C.comparison;

  const rows = c.rows
    .map(
      (r) => `<tr>
        <th scope="row" class="cmp-feature">${r.f}</th>
        <td class="cmp-hub ${r.hubState}">${r.hub}</td>
        <td class="cmp-cu ${r.cuState}">${r.cu}</td>
        <td class="cmp-other ${r.otherState}">${r.other}</td>
      </tr>`
    )
    .join('');

  const mobileCards = c.rows
    .map(
      (r) => `
        <div class="cmp-card glass">
          <div class="cmp-card-title">${r.f}</div>
          <div class="cmp-card-grid">
            <div class="cmp-card-col is-hub ${r.hubState}">
              <div class="cmp-card-col-head"><span class="cmp-col-tag"><span class="brand-name" dir="ltr">Hub <span class="urdu" dir="rtl" lang="ur"><bdi>دفتر</bdi></span></span></span></div>
              <div class="cmp-card-col-body">${r.hub}</div>
            </div>
            <div class="cmp-card-col is-comp ${r.cuState}" data-cu-state="${r.cuState}" data-other-state="${r.otherState}">
              <div class="cmp-card-col-head"><span class="cmp-col-tag cmp-active-comp-label">${c.cols[2] || "ClickUp Business"}</span></div>
              <div class="cmp-card-col-body cmp-active-comp-text" data-cu-text="${r.cu}" data-other-text="${r.other}">${r.cu}</div>
            </div>
          </div>
        </div>
      `
    )
    .join('');

  el.innerHTML = `
    <div class="container">
      <div class="cmp-head">
        <span class="eyebrow">${c.eyebrow}</span>
        <h2 class="h-sec">${c.title}</h2>
        <p class="sub-sec">${c.sub}</p>
      </div>

      <!-- Desktop Comparison Table (Screen width > 768px) -->
      <div class="cmp-wrap glass cmp-desktop-only">
        <table class="cmp-table">
          <thead><tr>${c.cols.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>

      <!-- Mobile Head-to-Head Switcher (Screen width <= 768px) -->
      <div class="cmp-mobile-only">
        <div class="cmp-mobile-switcher-wrap">
          <span class="cmp-mobile-switcher-label">Compare against:</span>
          <div class="cmp-mobile-tabs" role="tablist" aria-label="Select comparison tool">
            <button type="button" class="cmp-mobile-tab is-active" data-comp="cu" role="tab" aria-selected="true">
              ${c.cols[2] || "ClickUp Business"}
            </button>
            <button type="button" class="cmp-mobile-tab" data-comp="other" role="tab" aria-selected="false">
              Other Tools
            </button>
          </div>
        </div>
        <div class="cmp-mobile-cards">
          ${mobileCards}
        </div>
      </div>
    </div>
  `;
  return el;
}

export function bindComparisonMobile(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.cmp-mobile-tab');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetComp = tab.dataset.comp; // 'cu' | 'other'
      tabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      const compName = targetComp === 'cu' ? (C.comparison.cols[2] || 'ClickUp Business') : (C.comparison.cols[3] || 'Productive / Teamwork');

      document.querySelectorAll<HTMLElement>('.cmp-card-col.is-comp').forEach((col) => {
        const state = targetComp === 'cu' ? col.dataset.cuState : col.dataset.otherState;
        col.className = `cmp-card-col is-comp ${state ?? ''}`;

        const label = col.querySelector('.cmp-active-comp-label');
        if (label) label.textContent = compName;

        const body = col.querySelector<HTMLElement>('.cmp-active-comp-text');
        if (body) {
          body.textContent = targetComp === 'cu' ? body.dataset.cuText ?? '' : body.dataset.otherText ?? '';
        }
      });
    });
  });
}

function usdSaveForPlan(planId: string): string {
  switch (planId) {
    case 'starter':
      return 'Save ~$161/mo vs ClickUp Business*';
    case 'team':
      return 'Save ~$239/mo vs ClickUp Business*';
    case 'growth':
      return 'Save ~$404/mo vs ClickUp Business*';
    default:
      return 'Save vs ClickUp Business*';
  }
}

export function buildPricing(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section pricing';
  el.id = 'pricing';
  const p = C.pricing;

  const plans = p.plans
    .map(
      (pl, idx) => `<article class="plan glass${idx === 0 ? ' is-mobile-active' : ''}" data-id="${pl.id}">
        <h3 class="plan-name">${pl.name}</h3>
        <p class="plan-tag">${pl.tagline}</p>
        <div class="plan-price">
          <span class="plan-cur" data-pkr="PKR" data-usd="$">${C.currency.pkr}</span>
          <span class="plan-amount" data-pkr="${pl.pricePKR}" data-usd="${usdFromPKR(pl.pricePKR)}">${pl.pricePKR.toLocaleString()}</span>
          <span class="plan-per">/mo</span>
        </div>
        <p class="plan-seats">${pl.seatLabel}</p>
        ${pl.saveNote ? `<p class="plan-note plan-save"><span data-pkr="${pl.saveNote}" data-usd="${usdSaveForPlan(pl.id)}">${pl.saveNote}</span></p>` : ''}
        <ul class="plan-bullets">${pl.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
        <a class="btn btn-primary plan-cta" href="#final-cta">${pl.cta}</a>
      </article>`
    )
    .join('');

  const mobileTabs = p.plans
    .map(
      (pl, idx) => `
        <button type="button" class="plan-tab-btn${idx === 0 ? ' is-active' : ''}" data-id="${pl.id}" role="tab" aria-selected="${idx === 0}">
          <span>${pl.name.replace(' Plan', '')}</span>
        </button>
      `
    )
    .join('');

  el.innerHTML = `
    <div class="container">
      <div class="pricing-head">
        <span class="eyebrow">${p.eyebrow}</span>
        <h2 class="h-sec">${p.title}</h2>
        <p class="sub-sec">${p.sub}</p>
        <div class="pricing-proof-line">
          <span class="proof-dot"></span> Built by an agency, used daily by our own team.
        </div>
        <p class="seat-rule">${p.seatRule}</p>
      </div>

      <!-- Mobile Tier Switcher (Screen width <= 900px) -->
      <div class="pricing-mobile-switcher-wrap">
        <div class="pricing-mobile-tabs" role="tablist" aria-label="Select pricing tier">
          ${mobileTabs}
        </div>
      </div>

      <div class="plans">${plans}</div>

      <!-- Footnote below cards -->
      <p class="pricing-footnote">${p.footnote ?? '* Compared to ClickUp Business at list price ($19/user/month billed monthly, converted at current rates) for an equivalent team size. Generic tools also require days of setup and third-party add-ons.'}</p>

      <div class="payment glass">
        <p class="payment-note">${p.paymentNote}</p>
      </div>
    </div>
  `;
  return el;
}

export function bindPricingMobile(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.plan-tab-btn');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const planId = tab.dataset.id;
      tabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      document.querySelectorAll<HTMLElement>('.plan').forEach((card) => {
        card.classList.toggle('is-mobile-active', card.dataset.id === planId);
      });
    });
  });
}
