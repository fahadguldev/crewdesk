import React from 'react';
import { Calendar, CheckCircle2, Sparkles, Clock, Rocket } from 'lucide-react';

export const OnboardingRoadmap: React.FC = () => {
  const steps = [
    {
      step: 'Day 1',
      title: 'Dedicated Environment Provisioned',
      desc: 'Your private database instance is spun up, SSL certificates verified, and custom agency domain configured.',
      badge: 'SETUP'
    },
    {
      step: 'Day 2–3',
      title: 'White-Glove Data Migration',
      desc: 'We assist in importing your team roster, active client retainers, ongoing deliverables, and passwords from spreadsheets.',
      badge: 'MIGRATION'
    },
    {
      step: 'Day 4–5',
      title: 'Custom Workflow Configuration',
      desc: 'Your 3 custom modules (e.g. invoicing formats, white-label client portal, or custom pipelines) are tailored to your exact team rituals.',
      badge: 'TAILORING'
    },
    {
      step: 'Day 7',
      title: '30-Min Team Training & Go-Live',
      desc: 'A live interactive walkthrough for your PMs and staff, recorded and saved directly in your Hub directory for future hires.',
      badge: 'GO LIVE'
    }
  ];

  return (
    <section className="py-20 bg-slate-900/30 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            White-Glove Deployment
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Live and operating in your first week
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            No 6-month enterprise onboarding. We migrate your data and train your team so you never miss a client beat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Included in every plan</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
