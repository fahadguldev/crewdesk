# Scroll Map — Hub دفتر scroll-driven site

Engine: Lenis (smooth scroll) + GSAP ScrollTrigger (`scrub: 1`), wired in `src/scroll.ts`.
Canvas: `#loader-stage` runs the initial card-gather animation (`src/ui/hub-animation.ts`), `aria-hidden` and decorative; it stops after ~7.2s, hides with the preloader (700ms on low/reduced, hard cap 7.8s), and is skipped under reduced motion. All copy lives in the DOM.

## Desktop pin budget (default)

| # | Section | Trigger | Pin | Scrub | Motion |
|---|---------|---------|-----|-------|--------|
| 0 | Banner + nav | — | `position: sticky` top 0 | — | Glass blur after 40px, banner collapses, nav hides on scroll-down, active link highlight, `lenis.scrollTo` anchors with −70px offset |
| 1 | Hero `#hero` | normal flow | 0 | 0 | Static centered hero copy; the gather animation belongs only to the initial loader |
| 2 | Pain `#pain` | `.pain` top→top | **250vh** | 1 | 6 cards fly in from alternating sides (±220px, ±6°), then collapse (scale 0.94, opacity 0.3) into hub |
| 3 | Modules `#modules` | `.modules-stage` top→top | **~640vh** (8 slabs × 80vh) | 1 | Horizontal slab track translates `x: 0 → −(trackWidth − viewport)`; 7 glass slabs + ghosted AI Copilot slab; CanvasTexture-style mock UI art per slab; picker lives *after* the pinned stage |
| 4 | Pricing table `#pricing-table` | none (no pin) | — | — | Hub bar rises once at 60% visible (`.risen`), values render from math helpers, count-up budget reserved |
| 5 | Comparison `#comparison` | none | — | — | Static table, horizontal scroll wrapper on small screens |
| 6 | Roles `#roles` | `.roles` top→top | **400vh** (100vh/role) | 1 | CSS-3D cube steps `rotateY` −90° per role via `roles:set` event; Admin face reveals salary/margin, Employee faces show REDACTED |
| 7 | Plans `#pricing` | none | — | — | Stagger rise once at 30% visible (80ms steps), ≤8° tilt is desktop-hover only |
| 8 | Custom modules / Onboarding / FAQ | none | — | — | Entrance fades; FAQ accordion `aria-expanded`; security FAQ gets vault-door flourish |
| 9 | Final CTA `#final-cta` | `.final-cta` top→top | **100vh** | 1 | Form card settles from y60/opacity0 past 90% scroll |

Desktop total pinned ≈ **1540vh** (spec target ~1600vh).

## Mobile (<768px)

- Hero pin shortened to **60vh**; pain/modules/roles/final-CTA **not pinned** (vertical stacks, swipeable cube via dots/arrows).
- Nav links hidden ≤960px; compact nav row ≤600px.
- Saves roughly **60%** of pinned distance vs desktop.

## Reduced motion / low quality

`prefers-reduced-motion: reduce` **or** quality tier `low` (also forced via `?q=low`):

- No Lenis, no pins, no scrub — `initChoreography` returns early and forces all `.in` entrance states.
- The loader canvas animation is skipped (preloader hides after 700ms). The hero stays static after reveal.
- Content remains fully readable in normal flow (graceful fallback path).

## Quality tiers (`src/scene/quality.ts`)

| Tier | Detection | Behaviour |
|------|-----------|-----------|
| high | ≥8 cores, ≥8GB | Full card motion |
| medium | ≥4 cores | Reduced motion workload |
| low | <4 cores / no WebGL / reduced motion / `?q=low` | no loader canvas animation, minimal motion, no pins |

`?q=high|medium|low` forces a tier for QA.

## Scene ↔ DOM events

| Event | Direction | Payload |
|-------|-----------|---------|
| `roles:set` | choreography → cube | role index 0–3 |

## QA hooks (URL params)

| Param | Effect |
|-------|--------|
| `?theme=light\|dark` | forces theme (also persisted manually via toggle) |
| `?q=low\|medium\|high` | forces quality tier |
| `?scroll=NNN` | jumps to offset after boot; hides preloader immediately |
| `?autotest=1` | runs 16 interaction/layout checks → `<html data-test="...">` (read with `--dump-dom`) |
