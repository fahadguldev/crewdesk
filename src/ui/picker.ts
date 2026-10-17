import { C } from '../content';

// Module picker: choose up to 3 custom modules, dependency hints flagged for owner confirmation
export function bindPicker(): void {
  if (!C.modules.picker.enabled) return;
  const max = C.modules.picker.max;
  const deps = C.modules.picker.dependencies;
  const selected = new Set<string>();
  const countEl = document.querySelector('.pick-count');
  const cta = document.querySelector<HTMLButtonElement>('.pick-cta');
  const opts = Array.from(document.querySelectorAll<HTMLButtonElement>('.pick-opt'));

  const refresh = () => {
    opts.forEach((b) => {
      const id = b.dataset.id!;
      b.classList.toggle('is-on', selected.has(id));
      b.querySelector('.dep-note')?.remove();
      const needs = deps[id] ?? [];
      if (needs.length > 0 && !selected.has(id)) {
        const note = document.createElement('span');
        note.className = 'dep-note';
        note.textContent = `TODO-CONFIRM with owner: needs ${needs.join(' + ')}`;
        b.appendChild(note);
      }
    });
    if (countEl) countEl.textContent = `${selected.size} / ${max} selected`;
    if (cta) {
      cta.disabled = selected.size === 0;
      cta.textContent = selected.size ? `Discuss ${selected.size} selected` : C.modules.picker.cta;
    }
  };

  opts.forEach((b) =>
    b.addEventListener('click', () => {
      const id = b.dataset.id!;
      if (selected.has(id)) selected.delete(id);
      else if (selected.size < max) selected.add(id);
      refresh();
    })
  );
  cta?.addEventListener('click', () => {
    if (!selected.size) return;
    window.dispatchEvent(new CustomEvent('modules:selected', { detail: Array.from(selected) }));
    document.querySelector('#final-cta')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  refresh();
}

// Ring entrance: slabs rise in when the section first enters the viewport
export function bindModuleRing(): void {
  const ring = document.querySelector('.module-ring');
  if (!ring) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        ring.querySelectorAll('.module-slab').forEach((s, i) => {
          (s as HTMLElement).style.transitionDelay = `${i * 40}ms`;
          s.classList.add('in');
        });
      }),
    { threshold: 0.15 }
  );
  io.observe(ring);
}
