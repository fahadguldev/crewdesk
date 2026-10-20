import { C } from '../content';

export function buildCustomModules(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section custom-modules';
  el.id = 'custom-modules';
  const c = C.customModules;

  const steps = c.steps
    .map(
      (s) => `<article class="cm-step glass">
        <span class="cm-num">${s.n}</span>
        <h3>${s.title}</h3>
        <p>${s.body}</p>
      </article>`
    )
    .join('');

  el.innerHTML = `
    <div class="container">
      <div class="cm-head">
        <span class="eyebrow">${c.eyebrow}</span>
        <h2 class="h-sec">${c.title}<br /><span class="accent">${c.titleAccent}</span></h2>
        <p class="sub-sec">${c.desc}</p>
      </div>
      <div class="cm-steps">${steps}</div>
      <ul class="cm-points">${c.points.map((p) => `<li>${p}</li>`).join('')}</ul>
      <div class="cm-foot">
        <a class="btn btn-primary" href="#final-cta">${c.cta}</a>
        <span class="cm-note">${c.note}</span>
      </div>
    </div>
  `;
  return el;
}

export function buildOnboarding(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section onboarding';
  el.id = 'onboarding';
  const o = C.onboarding;

  const cards = o.cards
    .map((card) => {
      const list = card.bullets
        ? `<ul>${card.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`
        : '';
      const note = card.note ? `<p class="ob-note">${card.note}</p>` : '';
      return `<article class="ob-card glass" style="--c:var(--${card.color})">
        <span class="ob-tag">${card.tag}</span>
        <h3>${card.title}</h3>
        ${card.body ? `<p>${card.body}</p>` : ''}
        ${list}
        ${note}
      </article>`;
    })
    .join('');

  el.innerHTML = `
    <div class="container">
      <div class="ob-head">
        <span class="eyebrow">${o.eyebrow}</span>
        <h2 class="h-sec">${o.title}</h2>
        <p class="sub-sec">${o.sub}</p>
      </div>
      <div class="ob-grid">${cards}</div>
    </div>
  `;
  return el;
}

export function buildFaq(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section faq';
  el.id = 'faq';
  const f = C.faq;

  const items = f.items
    .map(
      (it) => `<div class="faq-item glass${it.isSecurity ? ' faq-security' : ''}" data-id="${it.id}">
        <button type="button" class="faq-q" aria-expanded="false" aria-controls="${it.id}-a">
          <span class="faq-icon" aria-hidden="true">${it.isSecurity ? '<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>' : '+'}</span>
          <span class="faq-text">${it.q}</span>
        </button>
        <div class="faq-a" id="${it.id}-a" role="region" hidden>
          <p>${it.a}</p>
        </div>
      </div>`
    )
    .join('');

  el.innerHTML = `
    <div class="container">
      <div class="faq-head">
        <span class="eyebrow">${f.eyebrow}</span>
        <h2 class="h-sec">${f.title}</h2>
        <p class="sub-sec">${f.sub}</p>
      </div>
      <div class="faq-list">${items}</div>
    </div>
  `;
  return el;
}

export function bindFaq(): void {
  document.querySelectorAll<HTMLElement>('.faq-item').forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>('.faq-q');
    const panel = item.querySelector<HTMLElement>('.faq-a');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (open) {
        panel.hidden = true;
        item.classList.remove('is-open');
      } else {
        panel.hidden = false;
        item.classList.add('is-open');
        if (item.classList.contains('faq-security')) {
          item.classList.add('vault-open');
        }
      }
    });
  });
}

export function buildFinalCta(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section final-cta';
  el.id = 'final-cta';
  const f = C.finalCta.form;

  const sizeOpts = f.sizeOptions.map((o) => `<option value="${o}">${o}</option>`).join('');
  const painOpts = f.painOptions.map((o) => `<option value="${o.v}">${o.l}</option>`).join('');

  el.innerHTML = `
    <div class="container final-inner">
      <div class="final-copy">
        <h2 class="h-sec">${f.title}</h2>
        <p class="sub-sec">${C.finalCta.sub}</p>
      </div>
      <form class="final-form glass" id="demo-form">
        <h3 class="form-title">${f.title}</h3>
        <p class="form-sub">${f.subModal}</p>
        <div class="form-fields-compact">
          <label class="form-field">${f.name}<input name="name" type="text" placeholder="${f.namePh}" required /></label>
          <label class="form-field">${f.agency}<input name="agency" type="text" placeholder="${f.agencyPh}" required /></label>
          <label class="form-field">${f.contact}<input name="contact" type="text" placeholder="${f.contactPh}" required /></label>
          <label class="form-field">${f.size}<select name="size" required><option value="">Select...</option>${sizeOpts}</select></label>
        </div>
        <input type="hidden" name="pain" value="attendance" />
        <div class="form-actions-row">
          <button type="submit" class="btn btn-primary form-submit">${f.submit}</button>
          <a class="btn btn-ghost form-wa" href="#" target="_blank" rel="noopener">${C.finalCta.whatsapp}</a>
        </div>
        <div class="form-success" hidden>
          <div class="lock-ring" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div>
          <p>Opening WhatsApp... we'll confirm within one business day.</p>
        </div>
      </form>
    </div>
  `;
  return el;
}

export function buildFooter(): HTMLElement {
  const el = document.createElement('footer');
  el.className = 'footer';
  el.innerHTML = `
    <div class="container footer-inner">
      <p class="footer-copy">${C.footer.copy}</p>
      <p class="footer-trust"><strong>${C.footer.trust.title}:</strong> ${C.footer.trust.note}</p>
    </div>
  `;
  return el;
}
