/**
 * Hub دفتر Centralized Configuration & Placeholders
 * All user-customizable values and placeholders live here, not scattered in markup.
 */

export const PLACEHOLDERS: {
  WHATSAPP_NUMBER: string;
  WHATSAPP_DISPLAY: string;
  BUSINESS_EMAIL: string;
  BOOKING_LINK: string;
  APP_LOGIN_URL: string;
  CANONICAL_HOST: string;
  DEMO_URL: string;
  FOUNDER_NAME: string;
  FOUNDER_ROLE: string;
  FOUNDER_PHOTO: string;
  BUSINESS_LEGAL_NAME: string;
  CITY_COUNTRY: string;
} = {
  // Contact & Communication
  WHATSAPP_NUMBER: '905488274659', // Turkey country code digits only
  WHATSAPP_DISPLAY: '+90 548 827 4659',
  BUSINESS_EMAIL: 'daftarhub.app@gmail.com',
  BOOKING_LINK: '', // optional Calendly/Cal.com link; if set, used for primary CTA

  // Application & Demo URLs
  APP_LOGIN_URL: 'https://app.daftarhub.app',
  CANONICAL_HOST: 'https://www.daftarhub.app',
  DEMO_URL: 'https://demo.daftarhub.app/',

  // Founder & Legal Placeholders
  FOUNDER_NAME: 'Founder',
  FOUNDER_ROLE: 'Hub دفتر',
  FOUNDER_PHOTO: '/images/founder.jpg',
  BUSINESS_LEGAL_NAME: '{{BUSINESS_LEGAL_NAME}}',
  CITY_COUNTRY: '{{CITY_COUNTRY}}',
};

export function getWhatsAppWalkthroughUrl(customText?: string): string {
  const message = customText ?? 'Hi Hub Daftar, I would like to book a walkthrough';
  return `https://wa.me/${PLACEHOLDERS.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getPrimaryCtaUrl(): string {
  if (PLACEHOLDERS.BOOKING_LINK && PLACEHOLDERS.BOOKING_LINK.trim().length > 0) {
    return PLACEHOLDERS.BOOKING_LINK;
  }
  return getWhatsAppWalkthroughUrl();
}
