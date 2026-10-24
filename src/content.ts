import content from './content.json';

// Typed view over the migrated content so section builders can rely on shapes.
export const C = content as unknown as {
  brand: {
    name: string; latin: string; urdu: string; tagline: string;
    title: string; description: string; offerCopy: string; proofSlot: string;
    domain?: string; url?: string;
  };
  nav: {
    links: { label: string; href: string }[];
    cta: string; mobileCta: string;
  };
  banner: { badge: string; text: string; sub: string; link: string };
  hero: {
    pill1: string; pill2: string; h1a: string; h1b: string; h1c: string; sub: string;
    proof?: string;
    ctaPrimary: string; ctaSecondary: string;
    systemCards: { label: string; detail: string; tone: string }[];
    trustChips: { title: string; body: string }[];
  };
  chaosTiles: { label: string; icon: string }[];
  pain: { title: string; sub: string; items: { quote: string; note: string; icon: string }[] };
  modules: {
    eyebrow: string; title: string; sub: string; availableLabel: string;
    items: { n: number; id: string; title: string; role: string; color: string; art: string; desc: string }[];
    ai: { n: number; id: string; title: string; role: string; badge: string; status: string; desc: string; bullets: string[] };
    picker: {
      enabled: boolean; title: string; sub: string; max: number; cta: string; hint: string;
      dependencies: Record<string, string[]>;
    };
  };
  customModules: {
    eyebrow: string; title: string; titleAccent: string; desc: string;
    steps: { n: string; title: string; body: string }[];
    points: string[]; cta: string; note: string;
  };
  roles: {
    eyebrow: string; title: string; sub: string;
    items: { n: number; id: string; title: string; badge: string; color: string; desc: string; chips: string[]; seesMoney: boolean }[];
    redaction: { label: string; value: string; hidden: string; captionAdmin: string; captionEmployee: string };
  };
  pricingTable: {
    eyebrow: string; title: string; sub: string;
    tiers: number[];
    tierLabels: Record<string, string>;
    hoursSaved: Record<string, number>;
    competitors: { id: string; name: string; note: string; usd: number }[];
    footnote: string; footnoteAsterisk: string; cta: string; cols: string[];
  };
  comparison: {
    eyebrow: string; title: string; sub: string; cols: string[];
    rows: { f: string; hub: string; cu: string; other: string; hubState: string; cuState: string; otherState: string }[];
  };
  pricing: {
    eyebrow: string; title: string; sub: string; seatRule: string; founderLabel?: string; proof?: string;
    plans: {
      id: string; name: string; tagline: string; seats: number; seatLabel: string;
      pricePKR: number; usdNote?: string; saveNote?: string; popular: boolean;
      bullets: string[]; cta: string;
    }[];
    paymentTitle: string; paymentNote: string;
  };
  onboarding: {
    eyebrow: string; title: string; sub: string;
    cards: { tag: string; title: string; body?: string; note?: string; bullets?: string[]; color: string }[];
  };
  faq: { eyebrow: string; title: string; sub: string; items: { id: string; q: string; a: string; isSecurity?: boolean }[] };
  finalCta: {
    title: string; sub: string; cta: string; whatsapp: string;
    form: {
      name: string; namePh: string; agency: string; agencyPh: string;
      size: string; sizeOptions: string[]; contact: string; contactPh: string;
      pain: string; painOptions: { v: string; l: string }[]; submit: string; title: string; subModal: string;
      whatsappNumber?: string;
    };
    contact?: { founder?: string; email: string; whatsapp: string };
  };
  footer: {
    copy: string;
    trust: { title: string; note: string };
    contact?: { founder?: string; email: string; whatsapp: string };
  };
  currency: { rate: number; pkr: string; usd: string };
};

// ---- Pricing math (single source of truth, per spec) ----
// Competitor monthly PKR = seats × USD-per-seat × 280
export function competitorMonthlyPKR(usd: number, seats: number): number {
  return Math.round(seats * usd * C.currency.rate);
}
export function competitorAnnualPKR(usd: number, seats: number): number {
  return competitorMonthlyPKR(usd, seats) * 12;
}
export function savingsMonthly(compPKR: number, hubPrice: number): number {
  return Math.max(0, compPKR - hubPrice);
}
export function savingsPercent(compPKR: number, hubPrice: number): number {
  if (compPKR <= 0) return 0;
  return Math.round((savingsMonthly(compPKR, hubPrice) / compPKR) * 100);
}
export function usdFromPKR(pkr: number): number {
  return Math.round(pkr / C.currency.rate);
}
