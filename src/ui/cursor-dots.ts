/**
 * Cursor Following Dots
 * Creates a smooth, physics-based trailing ribbon of glowing dots that
 * follow the user's cursor across the entire website.
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
  document.body.appendChild(container);

  const dotsCount = DOT_COLORS.length;
  const dots: DotState[] = [];

  let mouseX = -100;
  let mouseY = -100;
  let hasMoved = false;
  let isVisible = false;

  for (let i = 0; i < dotsCount; i++) {
    const dotEl = document.createElement('div');
    dotEl.className = 'cursor-dot';
    const ratio = (dotsCount - i) / dotsCount;
    const size = Math.max(3, Math.round(11 * ratio));
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

    if (!hasMoved) {
      hasMoved = true;
      isVisible = true;
      // Initialize dot positions on first move
      dots.forEach((d) => {
        d.x = mouseX;
        d.y = mouseY;
        d.element.style.opacity = '1';
      });
    } else if (!isVisible) {
      isVisible = true;
      dots.forEach((d) => (d.element.style.opacity = '1'));
    }
  };

  const onMouseLeave = () => {
    isVisible = false;
    dots.forEach((d) => (d.element.style.opacity = '0'));
  };

  const onMouseEnter = () => {
    if (hasMoved) {
      isVisible = true;
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

    // Head dot follows mouse with snappy spring
    dots[0].x += (mouseX - dots[0].x) * 0.45;
    dots[0].y += (mouseY - dots[0].y) * 0.45;

    // Subsequent dots follow the dot ahead of them
    for (let i = 1; i < dotsCount; i++) {
      const prev = dots[i - 1];
      const curr = dots[i];
      curr.x += (prev.x - curr.x) * 0.38;
      curr.y += (prev.y - curr.y) * 0.38;
    }

    // Render positions via hardware-accelerated translate3d
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
