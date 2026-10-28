import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { SpotlightCard } from '../motion/SpotlightCard';
import { UrduDaftar } from '../common/UrduDaftar';

export const PainVsGainSection: React.FC = () => {
  const [view, setView] = useState<'pain' | 'gain'>('gain');

  const painPoints = [
    {
      title: 'Passwords in Google Sheets & WhatsApp',
      desc: 'Client WordPress logins, API keys, and server access floating in WhatsApp chats. Ex-employees still have access 6 months later.',
      stat: '73% of agency credential leaks come from shared spreadsheets.'
    },
    {
      title: 'Blind to Project Profitability',
      desc: 'You billed PKR 450,000 for a retainer, but spent 220 senior hours across 4 designers. At month-end, you have no clue if you profited or bled cash.',
      stat: 'Agencies lose an average of 18% margin to unbilled scope-creep.'
    },
    {
      title: 'ClickUp / Jira Overhead & Friction',
      desc: 'Over-engineered enterprise tools with 25 custom fields. Your team spends more time updating tickets than delivering client work.',
      stat: 'Teams abandon complex PM setups within 90 days.'
    },
    {
      title: 'Per-Seat Penalty Taxes',
      desc: 'Hiring 5 interns or freelancers means paying another $15/seat on 4 different SaaS platforms ($300/mo extra just in seat fees).',
      stat: 'SaaS seat sprawl costs agencies over PKR 80,000/mo.'
    }
  ];

  const gainPoints = [
    {
      title: 'AES-256 Encrypted Client Vault',
      desc: 'Every client credential lives in an encrypted vault. Role-scoped access with immutable copy and reveal audit logs.',
      badge: 'Zero Leaks'
    },
    {
      title: 'Live Net Profit & Real Margin Tracker',
      desc: 'Live calculation of billable hours against project retainers. Know your exact project margin before closing out the invoice.',
      badge: 'Real Margin'
    },
    {
      title: 'Zero-Friction 1-Click Operations',
      desc: '1-click attendance, category sprints, clear client milestones, and a clean interface your team actually enjoys opening every morning.',
      badge: '100% Adoption'
    },
    {
      title: 'Flat Agency Pricing with Zero Penalties',
      desc: 'Predictable flat pricing. Add project managers, designers, interns, and developers without fearing a surprise balloon invoice.',
      badge: 'Flat Pricing'
    }
  ];

  return (
    <section className="py-24 bg-[#0B1020] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            The Agency Reality
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Stop losing margin to disconnected software
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Digital agencies don't need 14 separate tools. You need one calm command center built for service businesses.
          </p>

          {/* Interactive Toggle */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex rounded-full border border-slate-800 bg-[#11172B] p-1.5 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setView('gain')}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  view === 'gain'
                    ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span>The Hub <UrduDaftar className={view === 'gain' ? 'text-slate-950 font-extrabold' : 'text-emerald-400'} /> Way</span>
              </button>
              <button
                type="button"
                onClick={() => setView('pain')}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  view === 'pain'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                <span>The Fragmented Chaos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          {view === 'gain' ? (
            <motion.div
              key="gain-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {gainPoints.map((item, i) => (
                <SpotlightCard
                  key={i}
                  spotlightColor="rgba(52, 211, 153, 0.15)"
                  className="border-emerald-500/20 bg-[#11172B]/80"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </SpotlightCard>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="pain-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {painPoints.map((item, i) => (
                <SpotlightCard
                  key={i}
                  spotlightColor="rgba(244, 63, 94, 0.15)"
                  className="border-rose-500/20 bg-[#11172B]/80"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400">
                      <XCircle className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-semibold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                      RISK
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">{item.desc}</p>
                  <div className="text-xs font-semibold text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/50">
                    ⚠️ {item.stat}
                  </div>
                </SpotlightCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
