export type Quality = 'high' | 'medium' | 'low';

export interface Env {
  quality: Quality;
  reducedMotion: boolean;
  isMobile: boolean;
  hasWebGL: boolean;
}

function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export function detectEnv(): Env {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches || window.innerWidth < 768;
  const hasWebGL = detectWebGL();

  // QA override: ?q=high|medium|low forces a tier
  const forcedQ = new URLSearchParams(window.location.search).get('q');

  let quality: Quality = 'medium';
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as any).deviceMemory ?? 4;

  if (cores >= 8 && memory >= 8) quality = 'high';
  else if (cores >= 4) quality = 'medium';
  else quality = 'low';

  if (!hasWebGL || reducedMotion || quality === 'low') quality = 'low';
  if (forcedQ === 'high' || forcedQ === 'medium' || forcedQ === 'low') quality = forcedQ;

  return { quality, reducedMotion, isMobile, hasWebGL };
}
