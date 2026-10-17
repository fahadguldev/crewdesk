# Assumptions & Owner Confirmations

Items marked **TODO-OWNER** or **TODO-CONFIRM with owner** in code/copy need a real-world answer before launch.
Everything else below is an implementation assumption made to complete the 3D rebuild — verify if any is wrong.

## Content already migrated as-is (from the audited live page)

- Offer wording: 7 core modules + 3 custom modules built for every paying customer, delivered in month 1, first week reserved for onboarding.
- Founding offer: "First 3 Founding Daftars get 50% off (PKR 6,000/mo) for the same full package."
- Zero setup fee (normally PKR 20,000), 5GB storage, 2-day issue resolution (verbatim — do not weaken).
- 18 FAQ answers, comparison table rows, seat rule, data export-then-delete on departure.
- Savings figures are labelled estimates (conversion PKR 280/USD, October 2026 list prices).

## TODO-OWNER (blocks launch)

1. **Trust/footer block** — hosting, encryption, backups, terms and privacy links: placeholder text in `C.footer.trust` (`src/content.json`).
2. **Proof line** — "Used daily by our active daftar team" was removed; no customer logos/quotes exist yet. `C.brand.proofSlot` holds the slot.
3. **WhatsApp number** — demo form posts to `wa.me/923001234567` (placeholder from the previous site). Replace with the real number in `src/ui/form.ts`.
4. **"Immutable audit log" claim** (Attendance module) — confirm the product really provides immutability before it ships in marketing copy.
5. **Complete deletion claim** — confirm deletion covers backups/logs, not just primary records (FAQ-18 wording).
6. **PKR 20,000 "normally" setup-fee reference price** — confirm it is real before displaying.
7. **Savings table conversion rate** — confirm PKR 280/USD and the chosen competitor list prices (ClickUp 7/10/12/19, HubSpot 20, Salesforce 25).

## TODO-CONFIRM with owner (module picker dependency hints)

The picker in the Modules section shows dependency hints built from these assumptions:

| Custom module | Assumed dependency |
|---------------|--------------------|
| Business Analysis | Projects + Time Tracking (profit = hours × cost) |
| Workload & Capacity | Projects |
| Time Tracking | Projects |

If the real dependencies differ, update `C.modules.picker.dependencies` in `src/content.json`.
The picker copy is explicitly a **preview** — final scope is agreed on the discovery call.

## Implementation assumptions

1. **Repo rename**: site deploys under `/crewdesk/` (`vite.config.ts` base + Pages workflow). Renaming the repo requires updating both.
2. **Competitor math**: monthly = `seats × USD-per-seat × 280`; annual = monthly × 12 (displayed as context, savings computed monthly).
3. **Hub tier per seat column**: 10-seat column uses Starter (12,000), 25 → Growth (30,000), 50 → Scale (50,000).
4. **Hours-saved column** (18/30/50 h for 10/25/50 seats): carried from the previous page's claims; treated as estimate copy with the table footnote.
5. **Mobile pin budget**: pain/modules/roles/final-CTA unpinned below 768px, hero shortened to 60vh (spec's ~60% reduction).
6. **Urdu font**: Noto Nastaliq Urdu (per rebuild spec — not the old Jameel Noori Nastaleeq), line-height guarded so RTL never breaks LTR neighbours.
7. **No third-party brand logos** rendered in the loader visuals (legal safety) — competitor names appear as text only.
8. **Scroll-snap, sound and bounce easings**: intentionally absent (spec).
9. **Headless QA limits**: this environment's headless Edge clamps window width to ~492 CSS px (true 360px capture impossible) and fails to paint after JS-initiated scroll (scrolled screenshots show only body background). Verification therefore uses: full-DOM dumps, `?autotest=1` (16/16 passing), overflow measurements at 492/768/1440, and scroll-0 screenshots in both themes. A real 360px device/browser check is still recommended.
