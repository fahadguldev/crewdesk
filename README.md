# Hub دفتر (DaftarHub) — Agency Operations Platform

> Run your whole agency from one connected system, not five tools and a spreadsheet.

Hub دفتر is a scroll-driven landing site for a modern agency operations platform, built for digital agencies, software development agencies, web and mobile teams, and other service providers.

## Stack

- **Vite + TypeScript** (vanilla, no framework)
- Hero loading story: seven capability cards roam, gather into Hub دفتر, and finish before the page appears
- Hero: centered product message with no persistent animation; the gather animation appears only in the initial loader
- **GSAP + ScrollTrigger** — pinned scroll choreography (`scrub: 1`)
- **Lenis** — smooth scrolling, synced to ScrollTrigger
- All copy/claims live in [`src/content.json`](src/content.json); pricing tables are computed from `seats × USD × 280` in [`src/content.ts`](src/content.ts) — never hard-coded
- Scroll choreography: [`SCROLL_MAP.md`](SCROLL_MAP.md)
- Open assumptions & owner TODOs: [`ASSUMPTIONS.md`](ASSUMPTIONS.md)

## Develop

```bash
npm install
npm run dev        # http://localhost:5173/crewdesk/
```

## Build & preview

```bash
npm run build      # typecheck + production build -> dist/
npm run preview    # serves dist/ at /crewdesk/
npm run typecheck  # tsc --noEmit only
```

## Deploy (GitHub Pages)

`.github/workflows/static.yml` builds with Vite and deploys `dist/` to Pages on push to `main`.
`vite.config.ts` sets `base: '/crewdesk/'` to match the project path — update it if the repo is renamed.

## Performance & accessibility

- Initial JS ≈ **71KB gz** (app 25KB + GSAP 45KB); CSS ≈ 7KB gz; QA autotest chunk loads only with `?autotest=1`
- Quality tiers (high/medium/low) chosen from cores/memory; low quality reduces scroll effects
- `prefers-reduced-motion` → static page, no smooth scroll, no pins, and an immediate loader finish
- All copy is real DOM text (SEO/a11y); canvas is `aria-hidden="true"`
- FAQ uses `aria-expanded` + labelled regions; cube is keyboard-operable (←/→)
- Pricing uses a highlighted Hub دفتر row, currency-aware values, and restrained pointer tilt on plan cards
- The module picker sends selected module IDs into the WhatsApp walkthrough message and scrolls to the form
- The role cube supports touch swipe on mobile
- Urdu دفتر set in Noto Nastaliq with `<bdi>` / `unicode-bidi: isolate` so RTL never scrambles LTR lines
- Light/dark themes: system preference, manual toggle (persisted), `?theme=` override for QA

## QA hooks

| URL param | Effect |
|-----------|--------|
| `?theme=light\|dark` | force theme |
| `?q=low\|medium\|high` | force the existing motion quality tier |
| `?scroll=NNN` | jump to an offset after boot (headless captures) |
| `?autotest=1` | run 16 interaction/layout checks; results in `<html data-test>` (read via `--dump-dom`) |

## What Every Paying Customer Gets

- **7 Core Modules — working today**:
  1. **Business Analysis Module**: Real project profit margins, billed revenue vs true developer costs.
  2. **Daftar Overview Module**: Birds-eye view of agency progress, milestones, and employee momentum.
  3. **Attendance & Leave Module**: Daily 1-click punch in/out, late arrival flags, leaves, WFH requests, and audit history.
  4. **Projects Module**: Category-wise client project organization and sprint deadlines.
  5. **Password Manager Module**: AES-256 encrypted client credentials vault with reveal audit logs.
  6. **Time Tracking Module**: Task-based timers and manual logging without timesheet fatigue.
  7. **Workload & Capacity Module**: Real-time developer capacity planning before allocating tasks.

- **3 Custom Modules — built for your agency**: agreed after a discovery meeting, delivered during the first month, included for every paying customer.

- **AI Copilot — planned 8th core module (coming soon)**: included in your existing plan when released; AI API usage costs are paid by the agency.

## Onboarding & Support

- **First week**: Onboarding, migration, integrations, and guided setup.
- **First month**: Three custom modules agreed with you and delivered.
- **After onboarding**: Ongoing support, free small changes and maintenance, and customer-reported issues resolved within two days. Role-specific handbooks for Admin, HR, Employee, PM, and Team Lead.

## Data Commitment

If you leave, we export your agency's data so you keep access to it, then delete everything associated with your agency from our systems.

## Pricing

Flat monthly pricing by team size (Starter / Growth / Scale). Every employee you onboard counts as one user — plans differ by seat limit, not features.

## License

MIT License. © 2026 DaftarHub.
