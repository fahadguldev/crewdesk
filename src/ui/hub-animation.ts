// Canvas animation for the initial Hub دفتر loader.
import { C } from '../content';

type Mode = 'loader';
type Point = { x: number; y: number };

const labels = C.hero.systemCards.slice(0, 7).map((card) => card.label);
const hues = ['#2dd4bf', '#818cf8', '#f5b544', '#60a5fa', '#34d399', '#c084fc', '#f87171'];

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function easeOut(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

function cardDimensions(width: number, height: number, scale: number): { width: number; height: number } {
  const base = Math.min(width, height);
  const cardWidth = clamp(Math.max(120, base * 0.3) * scale, 112, 270);
  return { width: cardWidth, height: Math.max(66, cardWidth * 0.42) };
}

function drawCardIcon(ctx: CanvasRenderingContext2D, label: string, x: number, y: number, size: number, hue: string): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = hue;
  ctx.lineWidth = Math.max(1.2, size * .11);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  if (label.includes('Attendance')) {
    ctx.arc(0, 0, size * .42, 0, Math.PI * 2);
    ctx.moveTo(0, 0); ctx.lineTo(0, -size * .22);
    ctx.moveTo(0, 0); ctx.lineTo(size * .2, size * .12);
  } else if (label.includes('Leave')) {
    ctx.roundRect(-size * .4, -size * .34, size * .8, size * .68, size * .1);
    ctx.moveTo(-size * .4, -size * .08); ctx.lineTo(size * .4, -size * .08);
    ctx.moveTo(-size * .2, -size * .5); ctx.lineTo(-size * .2, -size * .2);
    ctx.moveTo(size * .2, -size * .5); ctx.lineTo(size * .2, -size * .2);
  } else if (label.includes('Analysis')) {
    ctx.moveTo(-size * .38, size * .36); ctx.lineTo(-size * .38, -size * .05);
    ctx.moveTo(0, size * .36); ctx.lineTo(0, -size * .32);
    ctx.moveTo(size * .38, size * .36); ctx.lineTo(size * .38, size * .12);
  } else if (label.includes('Project')) {
    ctx.roundRect(-size * .4, -size * .4, size * .8, size * .8, size * .1);
    ctx.moveTo(-size * .2, 0); ctx.lineTo(-size * .02, size * .18); ctx.lineTo(size * .3, -size * .2);
  } else if (label.includes('Password')) {
    ctx.roundRect(-size * .38, -size * .05, size * .76, size * .48, size * .08);
    ctx.arc(0, -size * .08, size * .25, Math.PI, 0);
  } else if (label.includes('Workload')) {
    ctx.arc(-size * .18, -size * .18, size * .18, 0, Math.PI * 2);
    ctx.arc(size * .22, -size * .08, size * .15, 0, Math.PI * 2);
    ctx.moveTo(-size * .48, size * .38); ctx.quadraticCurveTo(-size * .18, size * .05, size * .12, size * .38);
    ctx.moveTo(size * .02, size * .34); ctx.quadraticCurveTo(size * .24, size * .12, size * .45, size * .34);
  } else {
    ctx.moveTo(-size * .42, size * .3); ctx.lineTo(-size * .12, size * .02); ctx.lineTo(size * .08, size * .16); ctx.lineTo(size * .45, -size * .3);
  }
  ctx.stroke();
  ctx.restore();
}

function drawCard(ctx: CanvasRenderingContext2D, point: Point, label: string, hue: string, scale: number, rotation: number, alpha: number): void {
  const dimensions = cardDimensions(ctx.canvas.clientWidth, ctx.canvas.clientHeight, scale);
  const width = dimensions.width;
  const height = dimensions.height;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(point.x, point.y);
  ctx.rotate(rotation);
  ctx.fillStyle = 'rgba(19, 26, 46, .96)';
  ctx.strokeStyle = hue;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(-width / 2, -height / 2, width, height, 14);
  ctx.fill();
  ctx.stroke();
  drawCardIcon(ctx, label, -width * .34, 0, height * .45, hue);
  ctx.fillStyle = '#e6eaf2';
  const fontSize = clamp(width * 0.095, 9, 16);
  ctx.font = `600 ${fontSize}px Inter, sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const labelWidth = width * 0.68;
  if (ctx.measureText(label).width <= labelWidth) {
    ctx.fillText(label, -width * 0.22, 0);
  } else {
    const words = label.split(' ');
    const midpoint = Math.ceil(words.length / 2);
    ctx.fillText(words.slice(0, midpoint).join(' '), -width * 0.22, -height * 0.14);
    ctx.fillText(words.slice(midpoint).join(' '), -width * 0.22, height * 0.16);
  }
  ctx.restore();
}

function drawLogo(ctx: CanvasRenderingContext2D, image: HTMLImageElement, point: Point, scale: number, alpha: number): void {
  const size = Math.min(ctx.canvas.clientWidth, ctx.canvas.clientHeight) * 0.18 * scale;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(11, 29, 39, .96)';
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(45, 212, 191, .45)';
  ctx.shadowBlur = 28;
  ctx.beginPath();
  ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  if (image.complete && image.naturalWidth > 0) {
    try {
      ctx.drawImage(image, point.x - size * .68, point.y - size * .4, size * 1.36, size * .8);
    } catch {
      // Safe fallback
    }
  }
  ctx.restore();
}

function resize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
  const box = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.round(box.width * ratio));
  canvas.height = Math.max(1, Math.round(box.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

/** Starts the orbit, merge, reveal, and connected-dot animation. */
export function initHubAnimation(canvas: HTMLCanvasElement, mode: Mode): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const logo = new Image();
  logo.src = '/logo.png';
  const started = performance.now();
  const cards = labels.map((label, index) => ({
    label,
    hue: hues[index],
    angle: index * Math.PI * 2 / labels.length,
    speed: .3 + index * .07,
    radius: .65 + (index % 3) * .16,
    phase: index * .8
  }));
  const render = (now: number) => {
    const box = canvas.getBoundingClientRect();
    const elapsed = (now - started) / 1000;
    if (mode === 'loader' && elapsed > 7.2) return;
    const seconds = mode === 'loader' ? elapsed : now / 1000;
    const width = box.width;
    const height = box.height;
    const size = Math.min(width, height);
    const center = { x: width / 2, y: height / 2 };
    const fullCard = cardDimensions(width, height, 1);
    const xLimit = Math.max(18, width / 2 - fullCard.width / 2 - 12);
    const yLimit = Math.max(18, height / 2 - fullCard.height / 2 - 12);
    ctx.clearRect(0, 0, width, height);
    if (mode === 'loader') {
      const merge = easeOut(clamp((seconds - 2) / 1, 0, 1));
      const reveal = easeOut(clamp((seconds - 3) / 1, 0, 1));
      const spread = easeOut(clamp((seconds - 4) / 2.6, 0, 1));
      cards.forEach((card) => {
        const angle = card.angle + seconds * card.speed + Math.sin(seconds * 1.3 + card.phase) * .12;
        const orbitX = Math.min(xLimit * .92, size * .44 * card.radius);
        const orbitY = Math.min(yLimit * .92, size * .36 * card.radius);
        const orbit = { x: center.x + Math.cos(angle) * orbitX, y: center.y + Math.sin(angle) * orbitY };
        const targetAngle = card.angle - Math.PI / 2;
        const target = { x: center.x + Math.cos(targetAngle) * xLimit * .92, y: center.y + Math.sin(targetAngle) * yLimit * .92 };
        const merged = { x: orbit.x + (center.x - orbit.x) * merge, y: orbit.y + (center.y - orbit.y) * merge };
        const point = { x: merged.x + (target.x - merged.x) * spread, y: merged.y + (target.y - merged.y) * spread };
        const alpha = seconds < 3 ? 1 : Math.max(.25, reveal);
        drawCard(ctx, point, card.label, card.hue, seconds < 4 ? 1 - merge * .28 : spread, Math.sin(seconds + card.phase) * .16 * (1 - merge), alpha);
      });
      drawLogo(ctx, logo, center, reveal, reveal);
      if (spread > 0.7) {
        cards.forEach((card, index) => {
          const angle = card.angle - Math.PI / 2;
          const target = { x: center.x + Math.cos(angle) * xLimit * .92, y: center.y + Math.sin(angle) * yLimit * .92 };
          const progress = (seconds * .25 + index / cards.length) % 1;
          ctx.fillStyle = card.hue;
          ctx.shadowColor = card.hue;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(center.x + (target.x - center.x) * progress, center.y + (target.y - center.y) * progress, Math.max(3, size * .006), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }
    }
    requestAnimationFrame(render);
  };
  resize(canvas, ctx);
  window.addEventListener('resize', () => resize(canvas, ctx), { passive: true });
  requestAnimationFrame(render);
}
