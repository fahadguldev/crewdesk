/**
 * Cursor Following Dots & Luminous Inertial Bubble
 * Creates a smooth, physics-based trailing ribbon of glowing dots that
 * follow the user's cursor with luxury inertia, and blooms into a larger
 * glowing glass bubble whenever cursor movement stops.
 */

interface DotState {
  x: number;
  y: number;
  element: HTMLDivElement;
  size: number;
}

const DOT_COLORS = [
  '#2dd4bf', // teal
  '#2dd4bf',
  '#34d399', // emerald
  '#34d399',
  '#60a5fa', // blue
  '#60a5fa',
  '#818cf8', // indigo
  '#818cf8',
  '#c084fc', // purple
  '#f5b544', // amber
  '#f5b544',
  '#f87171'  // coral
];

export function initCursorDots(): () => void {
  // Only enable on desktop pointer devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    return () => {};
  }

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const container = document.createElement('div');
  container.className = 'cursor-dots-layer';
  container.setAttribute('aria-hidden', 'true');

  // Luminous inertia bubble that blooms on idle
  const bubbleEl = document.createElement('div');
  bubbleEl.className = 'cursor-bubble';
  container.appendChild(bubbleEl);

  document.body.appendChild(container);

  const dotsCount = DOT_COLORS.length;
  const dots: DotState[] = [];

  let mouseX = -100;
  let mouseY = -100;
  let bubbleX = -100;
  let bubbleY = -100;
  let hasMoved = false;
  let isVisible = false;
  let isIdle = false;
  let lastMoveTime = 0;

  for (let i = 0; i < dotsCount; i++) {
    const dotEl = document.createElement('div');
    dotEl.className = 'cursor-dot';
    const ratio = (dotsCount - i) / dotsCount;
    const size = Math.max(3, Math.round(10 * ratio));
    const color = DOT_COLORS[i];

    dotEl.style.width = `${size}px`;
    dotEl.style.height = `${size}px`;
    dotEl.style.backgroundColor = color;
    dotEl.style.boxShadow = `0 0 ${Math.max(4, size * 1.5)}px ${color}, 0 0 ${Math.max(8, size * 2.5)}px ${color}`;
    dotEl.style.opacity = '0';

    container.appendChild(dotEl);
    dots.push({ x: -100, y: -100, element: dotEl, size });
  }

  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastMoveTime = performance.now();

    if (!hasMoved) {
      hasMoved = true;
      isVisible = true;
      bubbleX = mouseX;
      bubbleY = mouseY;
      bubbleEl.style.opacity = '1';
      dots.forEach((d) => {
        d.x = mouseX;
        d.y = mouseY;
        d.element.style.opacity = '1';
      });
    } else if (!isVisible) {
      isVisible = true;
      bubbleEl.style.opacity = '1';
      dots.forEach((d) => (d.element.style.opacity = '1'));
    }
  };

  const onMouseLeave = () => {
    isVisible = false;
    bubbleEl.style.opacity = '0';
    dots.forEach((d) => (d.element.style.opacity = '0'));
  };

  const onMouseEnter = () => {
    if (hasMoved) {
      isVisible = true;
      bubbleEl.style.opacity = '1';
      dots.forEach((d) => (d.element.style.opacity = '1'));
    }
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('mouseenter', onMouseEnter);

  let animId = 0;

  const update = () => {
    animId = requestAnimationFrame(update);

    if (!hasMoved) return;

    const now = performance.now();
    const idleNow = now - lastMoveTime > 130;

    if (idleNow !== isIdle) {
      isIdle = idleNow;
      bubbleEl.classList.toggle('is-idle', isIdle);
      container.classList.toggle('is-idle', isIdle);
    }

    // Luminous bubble tracks mouse with silky lag (slower than raw cursor)
    const bubbleSpeed = isIdle ? 0.08 : 0.12;
    bubbleX += (mouseX - bubbleX) * bubbleSpeed;
    bubbleY += (mouseY - bubbleY) * bubbleSpeed;
    bubbleEl.style.transform = `translate3d(${bubbleX}px, ${bubbleY}px, 0) translate(-50%, -50%)`;

    // Head dot follows with gentle inertia
    const headSpeed = 0.15;
    dots[0].x += (mouseX - dots[0].x) * headSpeed;
    dots[0].y += (mouseY - dots[0].y) * headSpeed;

    // Subsequent dots trail smoothly behind the dot ahead of them
    const trailSpeed = 0.24;
    for (let i = 1; i < dotsCount; i++) {
      const prev = dots[i - 1];
      const curr = dots[i];
      curr.x += (prev.x - curr.x) * trailSpeed;
      curr.y += (prev.y - curr.y) * trailSpeed;
    }

    // Hardware accelerated positioning
    for (let i = 0; i < dotsCount; i++) {
      const d = dots[i];
      const offsetX = d.x - d.size / 2;
      const offsetY = d.y - d.size / 2;
      d.element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    }
  };

  animId = requestAnimationFrame(update);

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
    document.removeEventListener('mouseenter', onMouseEnter);
    container.remove();
  };
}
