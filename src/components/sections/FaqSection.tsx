import React from 'react';
import { SpringAccordion, type AccordionItemData } from '../motion/SpringAccordion';
import { HelpCircle } from 'lucide-react';
import { UrduDaftar } from '../common/UrduDaftar';

export const FaqSection: React.FC = () => {
  const faqData: AccordionItemData[] = [
    {
      id: 'what-is-hub-daftar',
      question: 'What is Hub دفتر and who is it built for?',
      answer: 'Hub دفتر is an all-in-one agency operations and management platform designed specifically for digital agencies, software houses, dev boutiques, and creative studios with 5 to 50+ team members. It unifies attendance, project sprints, client password vault, billable time tracking, and real-time project profitability into one calm platform.'
    },
    {
      id: 'how-different-from-clickup',
      question: 'How is Hub دفتر different from ClickUp, Asana, or Monday.com?',
      answer: 'General project management tools like ClickUp and Monday are designed for any generic enterprise, resulting in cluttered interfaces with 30+ custom fields and expensive per-seat pricing. Hub دفتر is built ground-up for agency workflows: it integrates client password security (AES-256), employee daily attendance, category client projects, and real net profit margins out-of-the-box, without requiring 15 third-party plugins.'
    },
    {
      id: 'security-vault',
      question: 'How secure is the Client Password Vault?',
      answer: 'The client password vault uses zero-knowledge AES-256 client-side encryption. Passwords and API keys are encrypted before they ever leave your browser. Every single credential view or copy action is recorded in an immutable audit log, and access is role-scoped so developers only see credentials for their active assigned deliverables.',
      isSecurity: true
    },
    {
      id: 'flat-pricing',
      question: 'How does flat pricing work? Are there really no per-seat penalty fees?',
      answer: 'Yes! Unlike ClickUp or Harvest that tax you $15-$25 for every new team member, Hub دفتر offers predictable flat monthly tiers (e.g. up to 10 seats, up to 15 seats, up to 25 seats). You can freely onboard interns, subcontractors, designers, and project managers without worrying about surprise balloon invoices at month-end.'
    },
    {
      id: 'custom-modules',
      question: 'What custom modules can be configured during onboarding?',
      answer: 'Every agency has unique rituals. During your first week of onboarding, we configure up to 3 custom modules tailored to your operations—such as automated payroll & salary slips, candidate hiring & ATS pipelines, client milestone reminders, or employee of the month calculators.'
    },
    {
      id: 'migration',
      question: 'Can you help us migrate our existing data from ClickUp, Asana, or Google Sheets?',
      answer: 'Absolutely. Every plan includes white-glove first-week onboarding. Our team assists you in formatting and importing your employee roster, ongoing client projects, and active credentials so you can go live seamlessly without missing client deliverables.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#0B1020] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Everything you need to know about Hub <UrduDaftar />, data security, and getting started.
          </p>
        </div>

        <SpringAccordion items={faqData} />
      </div>
    </section>
  );
};
