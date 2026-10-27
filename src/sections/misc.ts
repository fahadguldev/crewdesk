import { C } from '../content';
import { PLACEHOLDERS, getWhatsAppWalkthroughUrl } from '../config/placeholders';

export function buildSocialProof(): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section social-proof';
  el.id = 'social-proof';

  const sp = C.socialProof ?? {
    eyebrow: "Who's Behind This",
    title: 'Built by an agency, for agencies',
    body: 'We run a software agency. We built Hub دفتر because ClickUp required 14 plugins, Jira felt like enterprise bureaucracy, and client passwords kept living in shared Google Sheets. Today, our whole team runs on it every day — attendance, client vaults, time tracking, and knowing whether a project actually made money before the month closes.',
    founder: {
      name: PLACEHOLDERS.FOUNDER_NAME,
      role: PLACEHOLDERS.FOUNDER_ROLE,
      company: PLACEHOLDERS.BUSINESS_LEGAL_NAME,
      photo: PLACEHOLDERS.FOUNDER_PHOTO,
      quote: "We don't sell software we don't use. If our own team doesn't love a feature, it doesn't make it into Hub دفتر."
    },
    video: {
      src: '/videos/admin_overview.mp4',
      caption: 'Watch a 90-second tour of the modules your team will use every day.'
    },
    testimonials: []
  };

  // Hidden-by-default testimonial component: renders nothing if array is empty
  const testimonials = sp.testimonials ?? [];
  const testimonialsHtml = testimonials.length > 0
    ? `
      <div class="testimonials-grid">
        ${testimonials.map((t) => `
          <div class="testimonial-card glass">
            <p class="t-quote">"${t.quote}"</p>
            <div class="t-author">
              <span class="t-name">${t.name}</span>
              <span class="t-role">${t.role}, ${t.agency}</span>
              <span class="t-verified">✓ Verified Agency</span>
            </div>
          </div>
        `).join('')}
      </div>
    `
    : '';

  el.innerHTML = `
    <div class="container">
      <div class="sp-head">
        <span class="eyebrow">${sp.eyebrow}</span>
        <h2 class="h-sec">${sp.title}</h2>
        <p class="sub-sec">${sp.body}</p>
      </div>

      <div class="sp-grid">
        <!-- Founder Card -->
        <div class="sp-founder-card glass">
          <div class="sp-founder-profile">
            <div class="sp-founder-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="sp-founder-info">
              <h3 class="sp-founder-name">${sp.founder.name}</h3>
              <p class="sp-founder-role">${sp.founder.role} · ${sp.founder.company}</p>
            </div>
          </div>
          <blockquote class="sp-founder-quote">
            "${sp.founder.quote}"
          </blockquote>
        </div>

        <!-- 90-Second Walkthrough Video Block -->
        <div class="sp-video-block glass">
          <div class="sp-video-wrapper">
            <video
              class="sp-video"
              controls
              preload="metadata"
              poster="/images/hero-dashboard.webp"
              playsinline
            >
              <source src="${sp.video.src}" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p class="sp-video-caption">
            <span class="sp-video-icon" aria-hidden="true">▶</span>
            ${sp.video.caption}
          </p>
        </div>
      </div>

      ${testimonialsHtml}
    </div>
  `;
  return el;
}

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
  const waUrl = getWhatsAppWalkthroughUrl();

  const sizeOpts = f.sizeOptions.map((o) => `<option value="${o}">${o}</option>`).join('');
  const painOpts = f.painOptions.map((p) => `<option value="${p.v}">${p.l}</option>`).join('');

  const bookingCard = PLACEHOLDERS.BOOKING_LINK
    ? `
      <div class="final-contact-card glass">
        <div class="fcc-icon" aria-hidden="true">📅</div>
        <h4 class="fcc-title">Pick a Slot</h4>
        <p class="fcc-detail">Cal.com / 30 mins</p>
        <a class="btn btn-outline fcc-btn" href="${PLACEHOLDERS.BOOKING_LINK}" target="_blank" rel="noopener">Book a time</a>
      </div>
    `
    : '';

  el.innerHTML = `
    <div class="container final-inner">
      <div class="final-copy">
        <h2 class="h-sec">${C.finalCta.title}</h2>
        <p class="sub-sec">${C.finalCta.sub}</p>

        <!-- Direct Contact Cards Side-by-Side -->
        <div class="final-contact-cards">
          <div class="final-contact-card glass">
            <div class="fcc-icon" aria-hidden="true">💬</div>
            <h4 class="fcc-title">Message on WhatsApp</h4>
            <p class="fcc-detail">${PLACEHOLDERS.WHATSAPP_DISPLAY}</p>
            <a class="btn btn-primary fcc-btn" href="${waUrl}" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>

          <div class="final-contact-card glass">
            <div class="fcc-icon" aria-hidden="true">✉️</div>
            <h4 class="fcc-title">Email Us</h4>
            <p class="fcc-detail">${PLACEHOLDERS.BUSINESS_EMAIL}</p>
            <a class="btn btn-outline fcc-btn" href="mailto:${PLACEHOLDERS.BUSINESS_EMAIL}">Send an Email</a>
          </div>

          ${bookingCard}
        </div>
      </div>

      <form class="final-form glass" id="demo-form">
        <h3 class="form-title">${f.title}</h3>
        <p class="form-sub">${f.subModal}</p>
        <div class="form-fields-compact">
          <label class="form-field">${f.name}<input name="name" type="text" placeholder="${f.namePh}" required /></label>
          <label class="form-field">${f.agency}<input name="agency" type="text" placeholder="${f.agencyPh}" required /></label>
          <label class="form-field">${f.contact}<input name="contact" type="text" placeholder="${f.contactPh}" required /></label>
          <label class="form-field">${f.size}<select name="size" required><option value="">Select...</option>${sizeOpts}</select></label>
          <label class="form-field form-field-full">${f.pain}<select name="pain" required><option value="">Select your main headache...</option>${painOpts}</select></label>
        </div>
        <div class="form-actions-row">
          <button type="submit" class="btn btn-primary form-submit">${f.submit}</button>
          <a class="btn btn-ghost form-wa" href="${waUrl}" target="_blank" rel="noopener noreferrer">${C.finalCta.whatsapp}</a>
        </div>
        <div class="form-success" hidden>
          <div class="lock-ring" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div>
          <p>Opening WhatsApp... we'll confirm within one business day.</p>
          <div class="form-fallback-actions" style="margin-top: 14px; display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
            <span style="color: var(--text-muted);">If WhatsApp didn't launch automatically:</span>
            <a class="btn btn-ghost form-wa-manual" href="${waUrl}" target="_blank" rel="noopener noreferrer">Open WhatsApp Web / App →</a>
            <a class="form-mail-manual" href="mailto:${PLACEHOLDERS.BUSINESS_EMAIL}" style="color: var(--accent); text-decoration: underline; font-size: 13px;">Or email your booking request directly</a>
          </div>
        </div>
      </form>
    </div>
  `;
  return el;
}

export function buildFooter(): HTMLElement {
  const el = document.createElement('footer');
  el.className = 'footer';

  const waUrl = getWhatsAppWalkthroughUrl();

  el.innerHTML = `
    <div class="container footer-inner">
      <div class="footer-grid">
        <div class="footer-col-brand">
          <div class="footer-brand-title">
            <span class="brand-name" dir="ltr">Hub <span class="urdu" dir="rtl" lang="ur"><bdi>دفتر</bdi></span></span>
          </div>
          <p class="footer-tagline">${C.footer.description ?? 'Hub دفتر — The agency operations platform. Built for digital agencies.'}</p>
          <p class="footer-legal-entity"><strong>Entity:</strong> ${PLACEHOLDERS.BUSINESS_LEGAL_NAME} · ${PLACEHOLDERS.CITY_COUNTRY}</p>
          <p class="footer-trust"><strong>${C.footer.trust.title}:</strong> ${C.footer.trust.note}</p>
        </div>
        <div class="footer-col-contact">
          <h4 class="footer-heading">Direct Contact</h4>
          <p class="footer-contact-line"><strong>Email:</strong> <a href="mailto:${PLACEHOLDERS.BUSINESS_EMAIL}">${PLACEHOLDERS.BUSINESS_EMAIL}</a></p>
          <p class="footer-contact-line"><strong>WhatsApp:</strong> <a href="${waUrl}" target="_blank" rel="noopener noreferrer">${PLACEHOLDERS.WHATSAPP_DISPLAY}</a></p>
        </div>
        <div class="footer-col-links">
          <h4 class="footer-heading">Platform & Legal</h4>
          <ul class="footer-links-list">
            <li><a href="#modules">Modules</a></li>
            <li><a href="#roles">Roles</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="/compare/clickup-alternative">Compare</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom-row">
        <p class="footer-copy">${C.footer.copy}</p>
      </div>
    </div>
  `;
  return el;
}
