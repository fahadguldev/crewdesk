import './styles/base.css';
import './styles/sections.css';

import { detectEnv, type Env } from './scene/quality';
import { initScroll, getLenis, ScrollTrigger } from './scroll';

import { buildBanner, buildNav, buildHero, buildPain } from './sections/hero';
import { buildModules } from './sections/modules';
import { buildRoles } from './sections/roles';
import { buildPricingTable, buildComparison, buildPricing } from './sections/pricing';
import {
  buildCustomModules,
  buildOnboarding,
  buildFaq,
  bindFaq,
  buildFinalCta,
  buildFooter
} from './sections/misc';
import { initChoreography } from './sections/choreography';

import { bindPicker, bindModuleRing } from './ui/picker';
import { bindCube } from './ui/cube';
import { bindForm } from './ui/form';
import { bindCurrency, bindPricingTilt, bindTheme, bindAnchors, bindNav, bindEntrances } from './ui/toggles';
import { initHubAnimation } from './ui/hub-animation';
import { initCursorDots } from './ui/cursor-dots';
import { initTypewriter } from './ui/typewriter';
import { C } from './content';

function mount(app: HTMLElement): void {
  const sticky = document.createElement('div');
  sticky.className = 'sticky-top';
  sticky.appendChild(buildBanner());
  sticky.appendChild(buildNav());
  app.appendChild(sticky);

  app.appendChild(buildHero());
  app.appendChild(buildPain());
  app.appendChild(buildModules());
  app.appendChild(buildPricingTable());
  app.appendChild(buildComparison());
  app.appendChild(buildRoles());
  app.appendChild(buildPricing());
  app.appendChild(buildCustomModules());
  app.appendChild(buildOnboarding());
  app.appendChild(buildFaq());
  app.appendChild(buildFinalCta());
  app.appendChild(buildFooter());
}

function boot(): void {
  window.addEventListener('error', (e) =>
    console.error('[boot error]', e.message, e.filename, e.lineno)
  );
  window.addEventListener('unhandledrejection', (e) =>
    console.error('[boot rejection]', (e as PromiseRejectionEvent).reason)
  );

  const env: Env = detectEnv();
  document.documentElement.dataset.quality = env.quality;
  if (env.reducedMotion) document.documentElement.dataset.reduced = 'true';

  mount(document.getElementById('app')!);
  const loaderStage = document.getElementById('loader-stage') as HTMLCanvasElement | null;
  if (loaderStage && !env.reducedMotion) initHubAnimation(loaderStage, 'loader');

  // Scroll engine first so layout is measured, then content behaviour, then choreography
  initScroll(env);
  bindTheme();
  bindAnchors();
  bindNav();
  bindCurrency();
  bindEntrances();
  bindPricingTilt();
  bindModuleRing();
  bindPicker();
  bindCube();
  bindFaq();
  bindForm();
  initChoreography(env);
  initCursorDots();

  // Let the brand gather animation complete before revealing the page.
  const pre = document.getElementById('preloader');
  const hide = () => {
    if (!pre?.classList.contains('hide')) {
      pre?.classList.add('hide');
      initTypewriter({
        lines: (C.hero as any).typewriterLines,
        totalDurationMs: 2300
      });
    }
  };
  pre?.addEventListener('click', hide, { once: true });
  const isQa = new URLSearchParams(window.location.search).has('scroll');
  if (isQa) hide();
  if (env.reducedMotion || env.quality === 'low') setTimeout(hide, 700);
  else if (document.readyState === 'complete') setTimeout(hide, 7100);
  else window.addEventListener('load', () => setTimeout(hide, 7100));
  setTimeout(hide, 7800);

  (window as any).__env = env;

  // QA: ?autotest=1 runs interaction + layout checks (read via --dump-dom data-test)
  if (new URLSearchParams(window.location.search).has('autotest')) {
    import('./ui/autotest').then((m) => setTimeout(() => m.runAutoTest(), 900));
  }

  // QA: ?scroll=NNN jumps to an offset after boot (used for headless section captures)
  const qaScroll = new URLSearchParams(window.location.search).get('scroll');
  if (qaScroll) {
    setTimeout(() => {
      const y = Number(qaScroll) || 0;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo(0, y);
      window.dispatchEvent(new Event('scroll'));
      ScrollTrigger.update();
      if (lenis) lenis.scrollTo(y, { immediate: true });
      // Report actual scroll + what sits mid-viewport
      setTimeout(() => {
        const mid = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        const path = mid ? `${mid.tagName}.${(mid as HTMLElement).className || ''}` : 'none';
        document.documentElement.dataset.qa = `${Math.round(window.scrollY)}|${path}`;
      }, 500);
    }, 400);
  }

  // QA: report overflow + document height (always), scan culprits on overflow only
  window.addEventListener('load', () => {
    setTimeout(() => {
      const sw = document.documentElement.scrollWidth;
      const vw = window.innerWidth;
      document.documentElement.dataset.doc = String(document.documentElement.scrollHeight);
      document.documentElement.dataset.overflow = `${sw > vw ? 'YES' : 'no'}:${sw}/${vw}`;
      if (sw > vw) {
        const wide: string[] = [];
        document.querySelectorAll<HTMLElement>('*').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > vw + 1 && r.width > 40) {
            wide.push(`${el.tagName}.${(el.className || '').toString().slice(0, 40)}@${Math.round(r.right)}`);
          }
        });
        document.documentElement.dataset.widest = wide.slice(0, 8).join(' | ');
      }
    }, 300);
  });
}

boot();
