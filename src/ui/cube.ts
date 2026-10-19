import { C } from '../content';

// Role cube & dashboards controller
// Supports tab switching, keyboard, swipe, next/prev, and scroll-driven steps.
let idx = 0;
let render: () => void;

export function bindCube(): void {
  const cube = document.getElementById('role-cube');
  if (!cube) return;
  const faces = C.roles.items.length;
  idx = 0;

  render = () => {
    cube.style.transform = `rotateX(-6deg) rotateY(${-idx * 90}deg)`;

    // Toggle faces and dots
    document.querySelectorAll('.cube-face').forEach((f, i) => f.classList.toggle('is-on', i === idx));
    document.querySelectorAll('.cube-dot').forEach((d, i) => d.classList.toggle('is-on', i === idx));

    // Toggle role tab buttons
    document.querySelectorAll<HTMLButtonElement>('.role-tab-btn').forEach((btn, i) => {
      const active = i === idx;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // Update autotest money value
    const adminFace = document.querySelector('.cube-face[data-id="admin"] .money-value');
    if (adminFace) {
      adminFace.textContent =
        idx === 0 ? adminFace.getAttribute('data-real')! : adminFace.getAttribute('data-mask')!;
    }
  };

  const go = (dir: number) => {
    idx = (idx + dir + faces) % faces;
    render();
  };

  document.querySelector('.cube-next')?.addEventListener('click', () => go(1));
  document.querySelector('.cube-prev')?.addEventListener('click', () => go(-1));

  // Role Tab buttons
  document.querySelectorAll<HTMLButtonElement>('.role-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      idx = Number(btn.dataset.i);
      render();
    });
  });

  // Cube Dots
  document.querySelectorAll<HTMLButtonElement>('.cube-dot').forEach((d) =>
    d.addEventListener('click', () => {
      idx = Number(d.dataset.i);
      render();
    })
  );

  cube.setAttribute('tabindex', '0');
  cube.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });

  let touchStart = 0;
  cube.addEventListener(
    'touchstart',
    (e) => {
      touchStart = e.changedTouches[0]?.clientX ?? 0;
    },
    { passive: true }
  );
  cube.addEventListener(
    'touchend',
    (e) => {
      const end = e.changedTouches[0]?.clientX ?? touchStart;
      if (Math.abs(end - touchStart) > 40) go(end < touchStart ? 1 : -1);
    },
    { passive: true }
  );

  // Scroll choreography drives the same state on desktop pins
  window.addEventListener('roles:set', (e) => {
    const next = (e as CustomEvent<number>).detail;
    if (Number.isInteger(next) && next !== idx) {
      idx = next;
      render();
    }
  });

  render();
}
