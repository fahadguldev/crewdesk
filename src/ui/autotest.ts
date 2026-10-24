// QA harness (?autotest=1): exercises interactions and layout without relying on
// headless paint (scroll-position screenshots are unreliable in this environment).
// Results land in <html data-test="..."> and are read back via --dump-dom.
import { C, competitorMonthlyPKR, savingsMonthly, savingsPercent, usdFromPKR } from '../content';

interface Check {
  name: string;
  pass: boolean;
  info?: string;
}

export function runAutoTest(): void {
  const results: Check[] = [];
  const ok = (name: string, pass: boolean, info?: string) => results.push({ name, pass, info });

  // 1. FAQ accordion
  const faqBtn = document.querySelector<HTMLButtonElement>('.faq-q');
  const faqPanel = document.querySelector<HTMLElement>('.faq-a');
  if (faqBtn && faqPanel) {
    faqBtn.click();
    ok(
      'faq-toggle',
      faqBtn.getAttribute('aria-expanded') === 'true' && !faqPanel.hidden,
      `items=${document.querySelectorAll('.faq-item').length}`
    );
    faqBtn.click();
    ok('faq-close', faqBtn.getAttribute('aria-expanded') === 'false' && faqPanel.hidden);
  }

  // 2. Currency toggle PKR -> USD (Starter 12,000 / 280 = 43)
  const usdBtn = document.querySelector<HTMLButtonElement>('.cur-btn[data-cur="usd"]');
  const starterAmount = document.querySelector('.plan[data-id="starter"] .plan-amount');
  if (usdBtn && starterAmount) {
    usdBtn.click();
    const shown = starterAmount.textContent?.replace(/[^0-9]/g, '') ?? '';
    ok('currency-usd', shown === '43', `starter shown=${shown} expected 43`);
    document.querySelector<HTMLButtonElement>('.cur-btn[data-cur="pkr"]')?.click();
    const back = starterAmount.textContent?.replace(/[^0-9]/g, '') ?? '';
    ok('currency-back', back === '12000', `starter shown=${back}`);
  }

  // 3. Module picker: pick 2, check counter + dependency note
  const opts = Array.from(document.querySelectorAll<HTMLButtonElement>('.pick-opt'));
  if (opts.length) {
    opts[0].click();
    opts[1].click();
    const count = document.querySelector('.pick-count')?.textContent ?? '';
    ok('picker-count', count.startsWith('2 / 3'), `count=${count}`);
    // dependency hint appears on unselected dependent module
    const hasDep = !!document.querySelector('.dep-note');
    ok('picker-dependency-hint', hasDep, hasDep ? 'dep note shown' : 'no dep note');
    opts[0].click();
    opts[1].click();
  }

  // 4. Roles: tab switching + admin money redaction toggle
  const roleTabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.role-tab'));
  const roleCards = Array.from(document.querySelectorAll<HTMLElement>('.role-card'));
  if (roleTabs.length >= 2 && roleCards.length >= 2) {
    roleTabs[1].click();
    ok('roles-tab-switch', roleTabs[1].classList.contains('is-active') && !roleCards[1].hidden, 'tab 1 activated');
    roleTabs[0].click();
    const moneyToggle = document.querySelector<HTMLButtonElement>('.money-toggle');
    const moneyVal = document.querySelector<HTMLElement>('.money-value');
    if (moneyToggle && moneyVal) {
      const original = moneyVal.textContent;
      moneyToggle.click();
      const toggled = moneyVal.textContent;
      ok('money-toggle-redact', original !== toggled && toggled === C.roles.redaction.hidden, `redacted=${toggled}`);
      moneyToggle.click();
      ok('money-toggle-reveal', moneyVal.textContent === C.roles.redaction.value, `revealed=${moneyVal.textContent}`);
    }
  }

  // 5. Theme toggle
  const themeBefore = document.documentElement.dataset.theme;
  document.querySelector<HTMLButtonElement>('.theme-toggle')?.click();
  const themeAfter = document.documentElement.dataset.theme;
  ok('theme-toggle', themeBefore !== themeAfter, `${themeBefore} -> ${themeAfter}`);
  document.querySelector<HTMLButtonElement>('.theme-toggle')?.click();

  // 6. Pricing math (single source of truth)
  const cu10 = competitorMonthlyPKR(10, 10); // 10 seats x $10 x 280
  ok('math-cu10', cu10 === 28000, `got ${cu10}`);
  ok('math-save', savingsMonthly(cu10, 12000) === 16000 && savingsPercent(cu10, 12000) === 57, '28k->12k = 16k/57%');
  ok('math-usd', usdFromPKR(12000) === 43, `usd=${usdFromPKR(12000)}`);

  // 7. Form: submit opens WhatsApp (stub window.open)
  const form = document.getElementById('demo-form') as HTMLFormElement | null;
  if (form) {
    const opened: string[] = [];
    const realOpen = window.open;
    (window as any).open = (url: string) => {
      opened.push(url);
      return null;
    };
    (form.elements.namedItem('name') as HTMLInputElement).value = 'QA';
    (form.elements.namedItem('agency') as HTMLInputElement).value = 'Test Daftar';
    (form.elements.namedItem('size') as HTMLSelectElement).value = C.finalCta.form.sizeOptions[0];
    (form.elements.namedItem('contact') as HTMLInputElement).value = '+92 320 3601576';
    (form.elements.namedItem('pain') as HTMLSelectElement).value = C.finalCta.form.painOptions[0].v;
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    (window as any).open = realOpen;
    const url = opened[0] ?? '';
    ok('form-whatsapp', url.includes('wa.me') && url.includes('QA') && url.includes('Test%20Daftar'), url.slice(0, 90));
    ok('form-success-shown', !(form.querySelector('.form-success') as HTMLElement | null)?.hidden, '');
  }

  // 8. Layout at scroll offsets (elementFromPoint is paint-independent)
  const offsets = [0, 1200, 3000, 6000, 9000, 12000, 15000, 18000, 21000, 23500];
  const hits: string[] = [];
  const docH = document.documentElement.scrollHeight;
  for (const y of offsets) {
    window.scrollTo(0, y);
    window.dispatchEvent(new Event('scroll'));
    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    let id = '';
    let node: Element | null = el;
    while (node && !id) {
      id = (node as HTMLElement).id || '';
      node = node.parentElement;
    }
    hits.push(`${y}:${id || el?.tagName || 'none'}`);
  }
  window.scrollTo(0, 0);
  const empty = hits.filter((h) => h.endsWith(':none') || h.endsWith(':BODY')).length;
  ok('viewport-hits', empty <= 2 && docH > 10000, `doc=${docH} | ${hits.join(' ')}`);

  const failed = results.filter((r) => !r.pass);
  document.documentElement.dataset.test = JSON.stringify({
    total: results.length,
    failed: failed.length,
    names: failed.map((f) => `${f.name}(${f.info ?? ''})`),
    all: results.map((r) => `${r.pass ? 'PASS' : 'FAIL'}:${r.name}${r.info ? ':' + r.info : ''}`)
  });
}
