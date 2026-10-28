import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { AnimatedNumber } from '../motion/AnimatedNumber';
import { BorderBeam } from '../motion/BorderBeam';
import { ShimmerButton } from '../motion/ShimmerButton';

interface InteractivePricingProps {
  onOpenBooking: () => void;
}

export const InteractivePricing: React.FC<InteractivePricingProps> = ({ onOpenBooking }) => {
  const { currency, formatPrice } = useCurrency();
  const [selectedSeats, setSelectedSeats] = useState<number>(15);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      seats: 10,
      pkrPrice: 12000,
      desc: 'Perfect for boutique agencies getting their operational foundations right.',
      features: [
        'Up to 10 team seats',
        'All 8 core agency modules',
        '3 custom modules configured free',
        'AES-256 client password vault',
        'Dedicated database isolation',
        'First-week guided onboarding'
      ],
      popular: false
    },
    {
      id: 'team',
      name: 'Team Plan',
      seats: 15,
      pkrPrice: 18000,
      desc: 'Our most popular plan for established teams scaling client retainers.',
      features: [
        'Up to 15 team seats',
        'All 8 core agency modules',
        '3 custom modules configured free',
        'AES-256 client password vault',
        'Dedicated database isolation',
        'First-week guided onboarding',
        'Priority Slack/WhatsApp support'
      ],
      popular: true
    },
    {
      id: 'growth',
      name: 'Growth Plan',
      seats: 25,
      pkrPrice: 30000,
      desc: 'For fast-growing agencies needing deep visibility across multiple pods.',
      features: [
        'Up to 25 team seats',
        'All 8 core agency modules',
        '3 custom modules configured free',
        'AES-256 client password vault',
        'Dedicated database isolation',
        'First-week guided onboarding',
        'Hyper-care support & custom reports'
      ],
      popular: false
    }
  ];

  // Competitor calculations based on seat count
  const calculateCompetitorCost = (seats: number) => {
    // Typical monthly pricing per user:
    // Productive: ~$24/user/mo
    // Teamwork: ~$20/user/mo
    // ClickUp: ~$19/user/mo
    // Hub دفتر: flat tier
    const productiveUSD = seats * 24;
    const teamworkUSD = seats * 20;
    const clickupUSD = seats * 19;

    let hubDaftarPKR = 12000;
    if (seats > 15) hubDaftarPKR = 30000;
    else if (seats > 10) hubDaftarPKR = 18000;

    const hubDaftarUSD = Math.round(hubDaftarPKR / 280);

    const isUSD = currency === 'usd';

    return {
      productive: isUSD ? productiveUSD : productiveUSD * 280,
      teamwork: isUSD ? teamworkUSD : teamworkUSD * 280,
      clickup: isUSD ? clickupUSD : clickupUSD * 280,
      hubDaftar: isUSD ? hubDaftarUSD : hubDaftarPKR,
      savings: isUSD
        ? clickupUSD - hubDaftarUSD
        : clickupUSD * 280 - hubDaftarPKR
    };
  };

  const compData = calculateCompetitorCost(selectedSeats);
  const maxBarVal = Math.max(compData.productive, compData.teamwork, compData.clickup) * 1.05;

  return (
    <section id="pricing" className="py-24 bg-slate-900/40 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Fair Flat Pricing
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            No per-seat penalties as your agency grows
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Never hesitate to hire an intern, developer, or PM because of software seat fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => {
            const priceObj = formatPrice(plan.pkrPrice);
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-emerald-500 bg-slate-950 shadow-2xl shadow-emerald-500/15 lg:-translate-y-3'
                    : 'border border-slate-800 bg-slate-950/70 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <>
                    <BorderBeam size={220} duration={8} colorFrom="#10b981" colorTo="#059669" />
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-3.5 py-0.5 text-xs font-extrabold text-slate-950 tracking-wide uppercase shadow-md shadow-emerald-500/30">
                      Most Popular for Agencies
                    </div>
                  </>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mb-6 min-h-[36px]">{plan.desc}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-800/80">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      <AnimatedNumber value={priceObj.amount} prefix={priceObj.symbol === '$' ? '$' : 'PKR '} />
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenBooking}
                  className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-500/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>Book Free Walkthrough</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive ROI Competitor Comparison Calculator */}
        <div id="roi-calculator" className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-2">
                <Zap className="h-3.5 w-3.5" />
                <span>Interactive Cost Comparison</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                See what your agency saves vs ClickUp & Productive
              </h3>
            </div>

            {/* Seat Selector Buttons */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
              {[10, 15, 25].map((seats) => (
                <button
                  key={seats}
                  type="button"
                  onClick={() => setSelectedSeats(seats)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSeats === seats
                      ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {seats} Seats
                </button>
              ))}
            </div>
          </div>

          {/* Animated Bar Chart */}
          <div className="space-y-5">
            {[
              { name: 'Productive (Per Seat)', cost: compData.productive, color: 'bg-rose-500/80' },
              { name: 'Teamwork (Per Seat)', cost: compData.teamwork, color: 'bg-amber-500/80' },
              { name: 'ClickUp Business (Per Seat)', cost: compData.clickup, color: 'bg-indigo-500/80' },
              { name: 'Hub دفتر (Flat Agency Plan)', cost: compData.hubDaftar, color: 'bg-emerald-400', isWinner: true }
            ].map((tool, idx) => {
              const widthPct = Math.max(12, Math.min(100, (tool.cost / maxBarVal) * 100));
              const isUSD = currency === 'usd';

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className={tool.isWinner ? 'text-emerald-400 font-extrabold flex items-center gap-1.5' : 'text-slate-300'}>
                      {tool.isWinner && <Sparkles className="h-4 w-4" />}
                      {tool.name}
                    </span>
                    <span className={tool.isWinner ? 'text-emerald-400 font-extrabold' : 'text-slate-400 font-mono'}>
                      <AnimatedNumber value={tool.cost} prefix={isUSD ? '$' : 'PKR '} suffix="/mo" />
                    </span>
                  </div>

                  <div className="h-6 w-full rounded-full bg-slate-900/80 p-0.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPct}%` }}
                      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                      className={`h-full rounded-full ${tool.color} ${tool.isWinner ? 'shadow-lg shadow-emerald-500/30' : ''}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monthly Savings Banner */}
          <div className="mt-8 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                Direct Agency Savings
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                Save approximately{' '}
                <span className="text-emerald-400 underline decoration-emerald-500/50">
                  <AnimatedNumber value={compData.savings} prefix={currency === 'usd' ? '$' : 'PKR '} suffix="/mo" />
                </span>{' '}
                while getting tailored agency workflows.
              </div>
            </div>

            <ShimmerButton onClick={onOpenBooking} className="shrink-0 text-xs px-6 py-3">
              <span>Claim Agency Pricing</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </ShimmerButton>
          </div>
        </div>
      </div>
    </section>
  );
};
