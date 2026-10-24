# Hub دفتر — Agency Operations Platform

> Run your whole agency from one connected system, not five disconnected tools and a spreadsheet.

Hub دفتر is a scroll-driven landing site for a modern agency operations platform, built for digital agencies, software development agencies, web and mobile teams, and other digital service providers.

## Stack

- **Vite + TypeScript** (vanilla, no heavy framework overhead)
- Hero loading story: eight capability cards roam, gather into Hub دفتر, and finish before the page appears
- Hero: centered product message with no persistent animation; the gather animation appears only in the initial loader
- **GSAP + ScrollTrigger** — pinned scroll choreography (`scrub: 1`)
- **Lenis** — smooth scrolling, synced to ScrollTrigger
- All copy/claims live in [`src/content.json`](src/content.json); pricing tables are computed from `seats × USD × 280` in [`src/content.ts`](src/content.ts) — never hard-coded
- Scroll choreography: [`SCROLL_MAP.md`](SCROLL_MAP.md)
- Open assumptions & owner confirmations: [`ASSUMPTIONS.md`](ASSUMPTIONS.md)

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173/
```

## Build & preview

```bash
pnpm build      # typecheck + production build -> dist/
pnpm preview    # serves dist/ at /
pnpm typecheck  # tsc --noEmit only
```

## Deploy (GitHub Pages)

`.github/workflows/static.yml` builds with Vite and deploys `dist/` to Pages on push to `main`.
`vite.config.ts` sets `base: '/'` for custom domain `https://daftarhub.app/`.

## Performance & accessibility

- Initial JS ≈ **71KB gz** (app 25KB + GSAP 45KB); CSS ≈ 11KB gz; QA autotest chunk loads only with `?autotest=1`
- Quality tiers (high/medium/low) chosen from cores/memory; low quality reduces scroll effects
- `prefers-reduced-motion` → static page, no smooth scroll, no pins, and an immediate loader finish
- All copy is real DOM text (SEO/a11y); canvas is `aria-hidden="true"`
- FAQ uses `aria-expanded` + labelled regions; cube is keyboard-operable (←/→)
- Pricing uses a highlighted Hub دفتر row, currency-aware values, and restrained pointer tilt on plan cards
- Urdu دفتر set in Noto Nastaliq with `<bdi>` / `unicode-bidi: isolate` so RTL never scrambles LTR lines
- Light/dark themes: system preference, manual toggle (persisted), `?theme=` override for QA

## What Every Paying Customer Gets

- **8 Core Operational Modules — working today**:
  1. **Business Analysis Module**: Real project profit margins, billed revenue vs true developer costs.
  2. **Hub دفتر Overview Module**: Birds-eye view of agency progress, milestones, and employee momentum.
  3. **Attendance & Leave Module**: Daily 1-click punch in/out, late arrival flags, leaves, WFH requests, and audit history.
  4. **Projects Module**: Category-wise client project organization and sprint deadlines.
  5. **Password Manager Module**: AES-256 encrypted client credentials vault with reveal audit logs.
  6. **Time Tracking Module**: Task-based timers and manual logging without timesheet fatigue.
  7. **Workload & Capacity Module**: Real-time developer capacity planning before allocating tasks.
  8. **Employee Management Module**: Unified team directory, departments, rosters, and role access permissions.

- **3 Custom Modules — built for your workflow**: agreed after a discovery meeting, delivered during your first month, included for every paying customer.

- **AI Copilot — planned module**: in active development; when released, included in your plan with no extra subscription fee (agency connects its own AI API key).

## Onboarding & Support

- **First week**: Onboarding, migration, integrations, and guided setup.
- **First month**: Three custom modules agreed with you and delivered.
- **Support SLA**: Attendance or password vault outages resolved the same day; all other customer-reported issues within 2 working days.
- **4-Hour Rule**: Small changes up to 4 hours of work are free. Larger work and additional modules are quoted in development hours before work starts.
- **Handbooks**: Role-specific handbooks for Admin, HR, Employee, Project Manager, and Team Lead.

## Data Commitment

- Stored in a dedicated database per customer.
- If you leave, we export your agency's data upon request within [30] days.
- Complete data deletion completed within [14] days of departure.

## Pricing Plans

Flat monthly pricing with no per-seat penalty fees within each plan limit:
- **Starter Plan**: PKR 12,000/mo (up to 10 seats) — No setup fee
- **Team Plan**: PKR 18,000/mo (up to 15 seats) — No setup fee
- **Growth Plan**: PKR 30,000/mo (up to 25 seats) — No setup fee
- **Scale Plan**: PKR 50,000/mo (up to 50 seats) — No setup fee

Payment methods: Bank Transfer (IBAN), Raast, JazzCash, Easypaisa.

## License

MIT License. © 2026 Hub دفتر.
