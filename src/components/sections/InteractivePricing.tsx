import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, X, DollarSign, Layers } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { AnimatedNumber } from '../motion/AnimatedNumber';
import { BorderBeam } from '../motion/BorderBeam';
import { ShimmerButton } from '../motion/ShimmerButton';
import { UrduDaftar } from '../common/UrduDaftar';

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

  // Competitor stack calculations
  const calculateEconomics = (seats: number) => {
    // Competitor stack: ClickUp ($19/user) + Harvest ($12/user) + 1Password ($8/user) = ~$39/seat/mo
    // Even at conservative $24/seat:
    const marketPerSeatUSD = 24;
    const marketTotalUSD = seats * marketPerSeatUSD;
    const marketTotalPKR = marketTotalUSD * 280;

    let hubDaftarPKR = 12000;
    if (seats > 15) hubDaftarPKR = 30000;
    else if (seats > 10) hubDaftarPKR = 18000;

    const hubDaftarUSD = Math.round(hubDaftarPKR / 280);

    const isUSD = currency === 'usd';

    const costMarket = isUSD ? marketTotalUSD : marketTotalPKR;
    const costHub = isUSD ? hubDaftarUSD : hubDaftarPKR;
    const monthlySavings = costMarket - costHub;
    const annualSavings = monthlySavings * 12;

    return {
      costMarket,
      costHub,
      monthlySavings,
      annualSavings
    };
  };

  const econ = calculateEconomics(selectedSeats);
  const isUSD = currency === 'usd';

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
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

        {/* Brand New Modern Comparison Section (Replacing the old horizontal bar chart) */}
        <div id="comparison" className="rounded-3xl border border-slate-800 bg-[#11172B]/90 p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Side-by-Side Comparison</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Hub <UrduDaftar /> vs. The Fragmented Tool Stack
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl">
                Compare what you get with a specialized agency operating system versus piecing together ClickUp, Harvest, and shared Google Sheets.
              </p>
            </div>

            {/* Seat Selector Filter */}
            <div className="shrink-0 flex items-center gap-2 bg-[#0B1020] border border-slate-800 p-1.5 rounded-2xl">
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

          {/* Side by Side Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* The Fragmented Tool Stack */}
            <div className="rounded-2xl border border-rose-500/20 bg-[#0B1020]/90 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                    FRAGILE WORKFLOW
                  </span>
                  <h4 className="text-xl font-bold text-white mt-2">
                    ClickUp + Harvest + Sheets
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Monthly Market Cost</div>
                  <div className="text-xl font-extrabold text-rose-400 font-mono">
                    <AnimatedNumber value={econ.costMarket} prefix={isUSD ? '$' : 'PKR '} suffix="/mo" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { title: 'Ballooning Seat Penalties', desc: 'Pay another $19 - $24 every single time you hire an intern or designer.' },
                  { title: 'Exposed Passwords & Keys', desc: 'Client credentials stored in WhatsApp and Google Sheets without reveal logs.' },
                  { title: 'Blind to Real Project Margins', desc: 'Zero real-time connection between daily hours and client retainer profit.' },
                  { title: 'Complex Enterprise Overhead', desc: '30+ custom fields your team resists updating every afternoon.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 mt-0.5">
                      <X className="h-3 w-3 stroke-[3]" />
                    </div>
                    <div>
                      <strong className="text-slate-200 block">{item.title}</strong>
                      <span className="text-slate-400 text-xs">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hub Daftar (Winner) */}
            <div className="relative rounded-2xl border-2 border-emerald-500/80 bg-[#0B1020] p-6 sm:p-8 space-y-6 shadow-2xl shadow-emerald-500/10">
              <BorderBeam size={200} duration={10} colorFrom="#10b981" colorTo="#047857" />

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    ALL-IN-ONE AGENCY OS
                  </span>
                  <h4 className="text-xl font-bold text-white mt-2">
                    Hub <UrduDaftar /> (Flat Plan)
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Flat Monthly Cost</div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                    <AnimatedNumber value={econ.costHub} prefix={isUSD ? '$' : 'PKR '} suffix="/mo" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { title: 'Zero Seat Taxes', desc: 'Predictable flat tier. Add full-time staff, interns, and PMs without extra fees.' },
                  { title: 'AES-256 Client Password Vault', desc: 'Client-side encrypted vault with permanent copy & reveal audit logs.' },
                  { title: 'Real-Time Project Profit & Net Margins', desc: 'Instant margin tracking per project before closing out monthly invoices.' },
                  { title: 'Set Up In First Week', desc: 'White-glove migration and 3 custom workflows tailored for your agency.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-slate-950 mt-0.5">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <div>
                      <strong className="text-white block">{item.title}</strong>
                      <span className="text-slate-300 text-xs">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Financial Advantage Bar */}
          <div className="bg-[#0B1020] border border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                Calculated Annual Margin Retained
              </span>
              <div className="text-xl sm:text-3xl font-extrabold text-white mt-1">
                Your agency keeps{' '}
                <span className="text-emerald-400">
                  <AnimatedNumber value={econ.annualSavings} prefix={isUSD ? '$' : 'PKR '} suffix=" / year" />
                </span>{' '}
                in profit.
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Based on a {selectedSeats}-seat agency replacing per-seat software and custom spreadsheet chaos.
              </p>
            </div>

            <ShimmerButton onClick={onOpenBooking} className="shrink-0 text-xs sm:text-sm px-7 py-3.5">
              <span>Book Walkthrough at Flat Rate</span>
              <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
          </div>
        </div>
      </div>
    </section>
  );
};
