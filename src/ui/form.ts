import { C } from '../content';

// Final CTA form: same no-backend WhatsApp hand-off as the previous site
export function bindForm(): void {
  const form = document.getElementById('demo-form') as HTMLFormElement | null;
  if (!form) return;
  const wa = form.querySelector<HTMLAnchorElement>('.form-wa');
  const success = form.querySelector<HTMLElement>('.form-success');
  const modules = form.elements.namedItem('modules') as HTMLInputElement | null;

  window.addEventListener('modules:selected', (event) => {
    const ids = (event as CustomEvent<string[]>).detail;
    if (!modules || !Array.isArray(ids)) return;
    modules.value = ids.join(', ');
    form.classList.add('has-module-selection');

    const smContainer = form.querySelector<HTMLElement>('#form-selected-modules');
    const smChips = form.querySelector<HTMLElement>('#sm-chips');
    if (smContainer && smChips && ids.length > 0) {
      smContainer.hidden = false;
      smChips.innerHTML = ids
        .map((id) => {
          const mod = C.modules.items.find((m) => m.id === id);
          const name = mod ? mod.title.replace(' Module', '') : id;
          return `<span class="sm-chip">${name}</span>`;
        })
        .join('');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? '');

    const msg =
      `Hi ${C.brand.name}! I'd like to book the 30-min walkthrough.\n` +
      `Name: ${get('name')}\nDaftar: ${get('agency')}\nTeam size: ${get('size')}\n` +
      `Contact: ${get('contact')}\nBiggest headache: ${get('pain')}`;
    const selectedModules = get('modules');
    const fullMessage = selectedModules ? `${msg}\nModules to discuss: ${selectedModules}` : msg;
    const waNumber = (C.finalCta.form as any).whatsappNumber ?? '923001234567';
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(fullMessage)}`;

    if (success) success.hidden = false;
    if (wa) wa.href = url;
    window.open(url, '_blank', 'noopener');
  });
}
