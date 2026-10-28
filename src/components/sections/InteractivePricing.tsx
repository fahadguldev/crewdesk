import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { AnimatedNumber } from '../motion/AnimatedNumber';
import { BorderBeam } from '../motion/BorderBeam';
import { UrduDaftar } from '../common/UrduDaftar';

interface InteractivePricingProps {
  onOpenBooking: () => void;
}

interface BenchmarkRow {
  id: string;
  name: string;
  sub: string;
  pkr: string;
  usd: string;
  widthPct: number;
  isHub?: boolean;
}

interface BenchmarkTierData {
  seats: number;
  headlinePKR: string;
  headlineUSD: string;
  ticksPKR: string[];
  ticksUSD: string[];
  rows: BenchmarkRow[];
}

const BENCHMARK_DATA: Record<number, BenchmarkTierData> = {
  10: {
    seats: 10,
    headlinePKR: 'PKR 12,000 per month',
    headlineUSD: '$43 per month',
    ticksPKR: ['PKR 0', 'PKR 20k', 'PKR 40k', 'PKR 60k', 'PKR 80k'],
    ticksUSD: ['$0', '$70', '$140', '$210', '$280'],
    rows: [
      { id: 'productive', name: 'Productive Professional', sub: 'Billed annually ($24/seat/mo)', pkr: 'PKR 67,200 /mo', usd: '$240 /mo', widthPct: 76 },
      { id: 'teamwork', name: 'Teamwork Grow', sub: 'Billed annually ($20/seat/mo)', pkr: 'PKR 56,000 /mo', usd: '$200 /mo', widthPct: 64 },
      { id: 'clickup-monthly', name: 'ClickUp Business (Monthly)', sub: 'Billed monthly ($19/seat/mo)', pkr: 'PKR 53,200 /mo', usd: '$190 /mo', widthPct: 60 },
      { id: 'clickup-annual', name: 'ClickUp Business (Annual)', sub: 'Billed annually ($12/seat/mo)', pkr: 'PKR 33,600 /mo', usd: '$120 /mo', widthPct: 38 },
      { id: 'hub-daftar', name: 'Hub دفتر (Flat)', sub: 'All 8 modules included · Dedicated DB', pkr: 'PKR 12,000 /mo', usd: '$43 /mo', widthPct: 22, isHub: true }
    ]
  },
  15: {
    seats: 15,
    headlinePKR: 'PKR 18,000 per month',
    headlineUSD: '$64 per month',
    ticksPKR: ['PKR 0', 'PKR 30k', 'PKR 60k', 'PKR 90k', 'PKR 120k'],
    ticksUSD: ['$0', '$105', '$210', '$315', '$420'],
    rows: [
      { id: 'productive', name: 'Productive Professional', sub: 'Billed annually ($24/seat/mo)', pkr: 'PKR 100,800 /mo', usd: '$360 /mo', widthPct: 86 },
      { id: 'teamwork', name: 'Teamwork Grow', sub: 'Billed annually ($20/seat/mo)', pkr: 'PKR 84,000 /mo', usd: '$300 /mo', widthPct: 72 },
      { id: 'clickup-monthly', name: 'ClickUp Business (Monthly)', sub: 'Billed monthly ($19/seat/mo)', pkr: 'PKR 79,800 /mo', usd: '$285 /mo', widthPct: 68 },
      { id: 'clickup-annual', name: 'ClickUp Business (Annual)', sub: 'Billed annually ($12/seat/mo)', pkr: 'PKR 50,400 /mo', usd: '$180 /mo', widthPct: 43 },
      { id: 'hub-daftar', name: 'Hub دفتر (Flat)', sub: 'All 8 modules included · Dedicated DB', pkr: 'PKR 18,000 /mo', usd: '$64 /mo', widthPct: 25, isHub: true }
    ]
  },
  25: {
    seats: 25,
    headlinePKR: 'PKR 30,000 per month',
    headlineUSD: '$107 per month',
    ticksPKR: ['PKR 0', 'PKR 50k', 'PKR 100k', 'PKR 150k', 'PKR 200k'],
    ticksUSD: ['$0', '$175', '$350', '$525', '$700'],
    rows: [
      { id: 'productive', name: 'Productive Professional', sub: 'Billed annually ($24/seat/mo)', pkr: 'PKR 168,000 /mo', usd: '$600 /mo', widthPct: 96 },
      { id: 'teamwork', name: 'Teamwork Grow', sub: 'Billed annually ($20/seat/mo)', pkr: 'PKR 140,000 /mo', usd: '$500 /mo', widthPct: 80 },
      { id: 'clickup-monthly', name: 'ClickUp Business (Monthly)', sub: 'Billed monthly ($19/seat/mo)', pkr: 'PKR 133,000 /mo', usd: '$475 /mo', widthPct: 76 },
      { id: 'clickup-annual', name: 'ClickUp Business (Annual)', sub: 'Billed annually ($12/seat/mo)', pkr: 'PKR 84,000 /mo', usd: '$300 /mo', widthPct: 48 },
      { id: 'hub-daftar', name: 'Hub دفتر (Flat)', sub: 'All 8 modules included · Dedicated DB', pkr: 'PKR 30,000 /mo', usd: '$107 /mo', widthPct: 28, isHub: true }
    ]
  }
};

export const InteractivePricing: React.FC<InteractivePricingProps> = ({ onOpenBooking }) => {
  const { currency, formatPrice } = useCurrency();
  const [selectedSeats, setSelectedSeats] = useState<10 | 15 | 25>(10);

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
        'Priority WhatsApp support channel'
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

  const currentBenchmark = BENCHMARK_DATA[selectedSeats];
  const isUSD = currency === 'usd';
  const headlinePrice = isUSD ? currentBenchmark.headlineUSD : currentBenchmark.headlinePKR;
  const ticks = isUSD ? currentBenchmark.ticksUSD : currentBenchmark.ticksPKR;

  return (
    <section id="pricing" className="py-24 bg-[#0B1020] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Fair Flat Pricing
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Predictable agency tiers with zero seat penalties
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Never hesitate to hire an intern, developer, or PM because of software seat fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {plans.map((plan) => {
            const priceObj = formatPrice(plan.pkrPrice);
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-emerald-500 bg-[#11172B] shadow-2xl shadow-emerald-500/15 lg:-translate-y-3'
                    : 'border border-slate-800 bg-[#11172B]/70 hover:border-slate-700'
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

        {/* ============================================================== */}
        {/* Exact Benchmark Comparison Card as requested by User's Image */}
        {/* ============================================================== */}
        <div id="comparison" className="max-w-5xl mx-auto">
          {/* Header text directly preceding the card */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              PRICING, BENCHMARKED AGAINST THE FIELD
            </span>
            <h3 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              All 8 agency modules, now <span className="text-emerald-400">{headlinePrice}</span>.
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
              Dedicated database, attendance, client password vault, time tracking, real project profit and over 75% lower cost than ClickUp, Productive, and Teamwork — with zero seat penalties.
            </p>
          </div>

          {/* Benchmark Card Container (Exact replication of user's image) */}
          <div className="rounded-[28px] border border-slate-800/80 bg-[#10162A]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Card Header: Title, Legend, and Team Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Agency software cost vs the market
                </h4>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-500" />
                    <span>Other providers</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span>Hub <UrduDaftar /></span>
                  </span>
                </div>
              </div>

              {/* Right Controls: Unit Label and Team Capsule Switcher */}
              <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  MONTHLY COST ({isUSD ? 'USD' : 'PKR'})
                </span>

                <div className="inline-flex items-center bg-slate-900/90 border border-slate-700/60 rounded-full p-1 gap-1">
                  {([10, 15, 25] as const).map((seatCount) => (
                    <button
                      key={seatCount}
                      type="button"
                      onClick={() => setSelectedSeats(seatCount)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedSeats === seatCount
                          ? 'bg-slate-800 text-white font-bold shadow-md'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Team of {seatCount}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart Area with Grid Lines */}
            <div className="relative pt-8 pb-4">
              {/* Vertical Dashed Grid Lines (aligned with right bar track) */}
              <div className="hidden sm:block absolute top-6 bottom-10 left-[260px] right-0 pointer-events-none z-0">
                {[0, 25, 50, 75, 100].map((pct) => (
                  <span
                    key={pct}
                    style={{ left: `${pct}%` }}
                    className="absolute top-0 bottom-0 border-l border-dashed border-slate-800/60"
                  />
                ))}
              </div>

              {/* Rows */}
              <div className="relative z-10 space-y-4">
                {currentBenchmark.rows.map((row) => {
                  const valText = isUSD ? row.usd : row.pkr;

                  return (
                    <div
                      key={row.id}
                      className="grid grid-cols-1 sm:grid-cols-[240px_1fr] items-center gap-2 sm:gap-5"
                    >
                      {/* Left: Row Name & Subtitle */}
                      <div>
                        {row.isHub ? (
                          <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                            <span>Hub</span>
                            <UrduDaftar />
                            <span>(Flat)</span>
                          </div>
                        ) : (
                          <div className="text-sm font-semibold text-slate-200">
                            {row.name}
                          </div>
                        )}
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {row.sub}
                        </div>
                      </div>

                      {/* Right: Bar Track */}
                      <div className="relative w-full h-11 flex items-center">
                        <motion.div
                          initial={false}
                          animate={{ width: `${row.widthPct}%` }}
                          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                          className={`h-[38px] rounded-full flex items-center transition-all ${
                            row.isHub
                              ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 text-slate-950 font-extrabold justify-between px-4 sm:px-5 shadow-[0_4px_24px_rgba(16,185,129,0.45)] min-w-[210px]'
                              : 'bg-white/[0.06] border border-white/[0.08] justify-end px-4 text-slate-200 font-semibold min-w-[130px]'
                          }`}
                        >
                          {row.isHub ? (
                            <>
                              <span className="text-xs sm:text-sm font-extrabold text-white drop-shadow-sm whitespace-nowrap">
                                {valText}
                              </span>
                              <span className="bg-black/30 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wider whitespace-nowrap uppercase">
                                NOW
                              </span>
                            </>
                          ) : (
                            <span className="text-xs sm:text-sm whitespace-nowrap font-medium text-slate-200">
                              {valText}
                            </span>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom X-Axis Ticks */}
              <div className="hidden sm:block relative h-6 mt-5 ml-[260px] text-slate-500 text-[11px] font-medium">
                {ticks.map((tick, i) => {
                  const pct = i * 25;
                  return (
                    <span
                      key={i}
                      style={{ left: `${pct}%` }}
                      className={`absolute top-1 transform ${
                        i === 0 ? 'translate-x-0' : i === 4 ? '-translate-x-full' : '-translate-x-1/2'
                      }`}
                    >
                      {tick}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footnotes directly matching the image */}
          <div className="mt-6 text-[11px] text-slate-500 space-y-2 leading-relaxed">
            <p>
              *List prices verified October 2026 from official competitor pricing pages (ClickUp Business @ $12/user/mo annual, $19/user/mo monthly; Productive Professional @ $24/user/mo; Teamwork Grow @ $20/user/mo), converted at PKR 280/USD. In competitors, password vault tools and attendance typically require separate paid apps or add-ons.
            </p>
            <p>
              *Hub <UrduDaftar /> includes attendance, client password vault, time tracking, project profit, and dedicated database per agency with zero seat-count penalties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
