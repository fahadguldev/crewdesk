# Assumptions & Owner Decisions

## Confirmed Owner Decisions (Applied)

1. **Brand**: Single unified name **Hub دفتر** everywhere. Removed legacy product name suffixes. BiDi wrapped `<bdi>` / `<span class="brand-name" dir="ltr">` so RTL Urdu does not reorder adjacent English text.
2. **Offer & Pricing**:
   - Flat pricing with no promo rates, no complimentary initial trial month, and zero setup charges across all tiers.
   - Removed rate-lock guarantees, promotional popularity badges, and historical 20,000 reference anchor prices.
   - 3 plans:
      - Starter: PKR 12,000 (up to 10 seats) — No setup fee
      - Team Plan: PKR 18,000 (up to 15 seats) — No setup fee
      - Growth: PKR 30,000 (up to 25 seats) — No setup fee
   - All plans include 3 custom modules built for client workflow.
   - 4-Hour Rule: "Small changes up to 4 hours of work are free. Larger work and additional modules are quoted in development hours before work starts." (Applied verbatim in Support, Onboarding, and FAQ).
3. **Support SLA**: Attendance or password vault outages resolved same day; all other customer-reported issues within 2 working days. (Updated in feature strip, support, onboarding, and FAQ).
4. **AI Copilot**: Kept as planned module (in active development). "Join waitlist" button. Cost model: no extra subscription fee; agency connects its own AI API key.
5. **Comparison Table**:
   - Removed legacy enterprise CRM rows.
   - Added verified agency competitors: Productive (productive.io) and Teamwork (teamwork.com).
   - Re-verified ClickUp Unlimited ($7 annual / $10 monthly) and ClickUp Business ($12 annual / $19 monthly).
   - Added "Team of 15" column across all competitors and Hub rows with deterministic conversion math (seats × USD × 280).
   - Softened competitor feature claims with "typically".
6. **Trust & Proof**:
   - Hero and Pricing proof line: "Built by an agency, used daily by our own team."
   - AES-256 encryption terminology used consistently.
   - Added Privacy Policy (`privacy.html`) and Terms of Service (`terms.html`), linked from footer.
   - Contact info confirmed: Email `daftarhub.app@gmail.com`, WhatsApp `+90 548 827 4659`, Domain `daftarhub.app`.
7. **Payment Methods**: Bank Transfer (IBAN), Raast, JazzCash, Easypaisa only. Traditional card processors excluded.

## Needs Owner Confirmation Before Launch

The following technical and business claims could not be verified from repo code alone and should be reviewed by the owner:
1. **Biometric Device Hardware Integration**: Does the attendance module integrate with physical biometric finger/facial punch machines (e.g., ZKTeco / Anviz via local bridge or API), or is check-in currently web 1-click only?
2. **"Immutable" Audit Logs**: The marketing copy mentions audit logs for vault credentials and attendance. Confirm whether logs are cryptographically append-only / write-once (e.g. database trigger / external ledger) or standard database records with restricted update access.
3. **Encryption Key Management**: AES-256 encryption is implemented for vault credentials. Owner should confirm where master keys / customer encryption keys live (e.g. Supabase vault, AWS KMS, environment secret, or customer-held passphrases).
4. **Automated Daily Backups on Every Customer Database**: Confirm the exact automated backup schedule and retention policy across dedicated customer database instances.
5. **Data Export & Deletion Timelines**: Default draft timelines of [30] days for data export and [14] days for data deletion upon customer departure are in `privacy.html` and `terms.html`. Owner should confirm or adjust these timeframes.
