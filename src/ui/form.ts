import { C } from '../content';

// Final CTA form: direct WhatsApp hand-off
export function bindForm(): void {
  const form = document.getElementById('demo-form') as HTMLFormElement | null;
  if (!form) return;
  const wa = form.querySelector<HTMLAnchorElement>('.form-wa');
  const success = form.querySelector<HTMLElement>('.form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? '');

    const msg =
      `Hi ${C.brand.name}! I'd like to book the 30-min walkthrough.\n` +
      `Name: ${get('name')}\nOffice: ${get('agency')}\nTeam size: ${get('size')}\n` +
      `Contact: ${get('contact')}\nBiggest headache: ${get('pain')}`;
    const waNumber = (C.finalCta.form as any).whatsappNumber ?? '923001234567';
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

    if (success) success.hidden = false;
    if (wa) wa.href = url;
    window.open(url, '_blank', 'noopener');
  });
}
