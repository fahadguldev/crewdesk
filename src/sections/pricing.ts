import {
  C,
  competitorMonthlyPKR,
  competitorAnnualPKR,
  savingsMonthly,
  savingsPercent,
  usdFromPKR
} from '../content';

let currency: 'pkr' | 'usd' = 'pkr';

export function buildPricingTable(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section pricing-table';
  el.id = 'pricing-table';

  const t = C.pricingTable;
  const tiers = t.tiers;
  const hubByTier = new Map<number, number>();
  // Map each tier to the plan covering that seat count
  C.pricing.plans.forEach((p) => hubByTier.set(p.seats, p.pricePKR));

  const competitorRows = t.competitors
    .map((comp) => {
      const cells = tiers
        .map((seats) => {
          const monthly = competitorMonthlyPKR(comp.usd, seats);
          const annual = competitorAnnualPKR(comp.usd, seats);
          const hub = hubByTier.get(seats)!;
          const save = savingsMonthly(monthly, hub);
          const pct = savingsPercent(monthly, hub);
          return `<td class="pt-cell">
            <div class="pt-price"><span data-pkr="${monthly}" data-usd="${usdFromPKR(monthly)}">PKR ${monthly.toLocaleString()}</span></div>
            <div class="pt-annual">PKR ${annual.toLocaleString()}/yr</div>
            <div class="pt-save">save PKR ${save.toLocaleString()} (${pct}%)</div>
          </td>`;
        })
        .join('');
      return `<tr>
        <th scope="row" class="pt-comp"><span class="pt-name">${comp.name}</span><span class="pt-note">${comp.note}</span></th>
        ${cells}
      </tr>`;
    })
    .join('');

  // Keep Hub دفتر first so the owned price is the first comparison users see.
  const hubCells = tiers
    .map((seats) => {
      const hub = hubByTier.get(seats)!;
      const plan = C.pricing.plans.find((p) => p.seats === seats)!;
      return `<td class="pt-cell pt-hub">
        <div class="pt-price"><span data-pkr="${hub}" data-usd="${usdFromPKR(hub)}">PKR ${hub.toLocaleString()}</span></div>
        <div class="pt-plan">${plan.name}</div>
        <div class="pt-seats">${plan.seatLabel}</div>
      </td>`;
    })
    .join('');

  const tierHead = tiers
    .map((s) => `<th scope="col" class="pt-tier">${t.tierLabels[String(s)]}</th>`)
    .join('');

  el.innerHTML = `
    <div class="container">
      <div class="pt-head">
        <span class="eyebrow">${t.eyebrow}</span>
        <h2 class="h-sec">${t.title}</h2>
        <p class="sub-sec">${t.sub}</p>
      </div>
      <div class="pt-wrap glass">
        <table class="pt-table">
          <thead>
            <tr><th scope="col" class="pt-corner">${t.cols[0]}</th>${tierHead}</tr>
          </thead>
          <tbody>
            <tr class="pt-hub-row">
              <th scope="row" class="pt-comp pt-hub-label"><span class="pt-name">${C.brand.name}</span><span class="pt-note">Flat plan price, no seat penalties</span></th>
              ${hubCells}
            </tr>
            ${competitorRows}
          </tbody>
        </table>
      </div>
      <p class="pt-foot">${t.footnote}</p>
      <p class="pt-foot pt-foot-star">${t.footnoteAsterisk}</p>
      <p class="pt-foot">Estimated founder hours saved per month: ${tiers.map((seats) => `${seats} seats ${t.hoursSaved[String(seats)]}h`).join(' · ')}. These are estimates, not measured customer results.</p>
      <div class="pt-cta"><a class="btn btn-primary" href="#final-cta">${t.cta}</a></div>
    </div>
  `;
  return el;
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
              <div class="cmp-card-col-head"><span class="cmp-col-tag">Hub <span class="urdu">دفتر</span></span></div>
              <div class="cmp-card-col-body">${r.hub}</div>
            </div>
            <div class="cmp-card-col is-comp ${r.cuState}" data-cu-state="${r.cuState}" data-other-state="${r.otherState}">
              <div class="cmp-card-col-head"><span class="cmp-col-tag cmp-active-comp-label">ClickUp Pro</span></div>
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
              ClickUp Pro
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

      const compName = targetComp === 'cu' ? 'ClickUp Pro' : 'Other PM Tools';

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

export function buildPricing(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section pricing';
  el.id = 'pricing';
  const p = C.pricing;

  const plans = p.plans
    .map(
      (pl) => `<article class="plan glass${pl.popular ? ' plan-popular is-mobile-active' : ''}" data-id="${pl.id}">
        ${pl.popular ? '<span class="plan-ribbon">Most Popular</span>' : ''}
        <h3 class="plan-name">${pl.name}</h3>
        <p class="plan-tag">${pl.tagline}</p>
        <div class="plan-price">
          <span class="plan-cur" data-pkr="PKR" data-usd="$">${C.currency.pkr}</span>
          <span class="plan-amount" data-pkr="${pl.pricePKR}" data-usd="${usdFromPKR(pl.pricePKR)}">${pl.pricePKR.toLocaleString()}</span>
          <span class="plan-per">/mo</span>
        </div>
        <p class="plan-seats">${pl.seatLabel}</p>
        ${pl.usdNote ? `<p class="plan-note">${pl.usdNote}</p>` : ''}
        ${pl.saveNote ? `<p class="plan-note plan-save">${pl.saveNote}</p>` : ''}
        <ul class="plan-bullets">${pl.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
        <a class="btn ${pl.popular ? 'btn-primary' : 'btn-ghost'} plan-cta" href="#final-cta">${pl.cta}</a>
      </article>`
    )
    .join('');

  const mobileTabs = p.plans
    .map(
      (pl) => `
        <button type="button" class="plan-tab-btn${pl.popular ? ' is-active' : ''}" data-id="${pl.id}" role="tab" aria-selected="${pl.popular}">
          <span>${pl.name.replace(' Plan', '')}</span>
          ${pl.popular ? '<span class="tab-star">★</span>' : ''}
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
        <p class="seat-rule">${p.seatRule}</p>
      </div>

      <!-- Mobile Tier Switcher (Screen width <= 900px) -->
      <div class="pricing-mobile-switcher-wrap">
        <div class="pricing-mobile-tabs" role="tablist" aria-label="Select pricing tier">
          ${mobileTabs}
        </div>
      </div>

      <div class="plans">${plans}</div>
      <div class="payment glass">
        <h3>${p.paymentTitle}</h3>
        <p>${p.paymentNote}</p>
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
