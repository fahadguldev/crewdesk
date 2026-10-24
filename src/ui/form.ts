import { C } from '../content';

// Final CTA form: direct WhatsApp hand-off with resilient fallback
export function bindForm(): void {
  const form = document.getElementById('demo-form') as HTMLFormElement | null;
  if (!form) return;
  const wa = form.querySelector<HTMLAnchorElement>('.form-wa');
  const waManual = form.querySelector<HTMLAnchorElement>('.form-wa-manual');
  const mailManual = form.querySelector<HTMLAnchorElement>('.form-mail-manual');
  const success = form.querySelector<HTMLElement>('.form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? '');

    const leadInfo = {
      name: get('name'),
      agency: get('agency'),
      size: get('size'),
      contact: get('contact'),
      pain: get('pain'),
      timestamp: new Date().toISOString()
    };

    // Save lead backup locally so no inquiry is lost
    try {
      const existing = JSON.parse(localStorage.getItem('daftarhub_leads') || '[]');
      existing.push(leadInfo);
      localStorage.setItem('daftarhub_leads', JSON.stringify(existing));
    } catch {
      // LocalStorage errors ignored in restricted modes
    }

    const msg =
      `Hi ${C.brand.name}! I'd like to book the 30-min walkthrough.\n` +
      `Name: ${leadInfo.name}\nOffice: ${leadInfo.agency}\nTeam size: ${leadInfo.size}\n` +
      `Contact: ${leadInfo.contact}\nBiggest headache: ${leadInfo.pain}`;
    const waNumber = (C.finalCta.form as any).whatsappNumber ?? '905488274659';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    const mailSubject = encodeURIComponent(`Walkthrough Request from ${leadInfo.name} (${leadInfo.agency})`);
    const mailBody = encodeURIComponent(msg);
    const mailUrl = `mailto:daftarhub.app@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    if (success) success.hidden = false;
    if (wa) wa.href = waUrl;
    if (waManual) waManual.href = waUrl;
    if (mailManual) mailManual.href = mailUrl;

    try {
      window.open(waUrl, '_blank', 'noopener');
    } catch {
      // Handled gracefully by fallback buttons visible in success container
    }
  });
}
