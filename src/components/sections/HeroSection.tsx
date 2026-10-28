import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Lock, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { ShimmerButton } from '../motion/ShimmerButton';
import { TiltCard } from '../motion/TiltCard';
import { Magnetic } from '../motion/Magnetic';
import { UrduDaftar } from '../common/UrduDaftar';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenVideoTour: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenVideoTour }) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'analytics' | 'vault' | 'attendance'>('analytics');

  const previews = {
    analytics: {
      title: 'Net Profit & Agency Margins',
      desc: 'Real profitability per client project, tracked in real-time before month close.',
      image: '/images/business-analyst.png',
      tag: 'FINANCIAL CONTROL'
    },
    vault: {
      title: 'AES-256 Client Password Vault',
      desc: 'Kill shared Google sheets. Audit logs for every password copy & reveal.',
      image: '/images/password-vault.png',
      tag: 'ZERO LEAKS'
    },
    attendance: {
      title: '1-Click Daily Attendance & Time',
      desc: 'Accurate timesheets, leaves, and billable utilization in one click.',
      image: '/images/attendence-management.png',
      tag: 'DAILY OPS'
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#0B1020] overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-teal-500/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-[#11172B]/80 px-4 py-1.5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">
              The Agency Operations Platform
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-300 font-medium">Flat Pricing, No Per-Seat Tax</span>
          </div>
        </motion.div>

        {/* Main Headline with Nastaleeq Urdu دفتر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto space-y-4"
        >
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
            Manage your whole <UrduDaftar className="text-4xl sm:text-6xl lg:text-7xl" /> from one{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              Hub
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300/90 max-w-2xl mx-auto font-normal leading-relaxed pt-2">
            One unified OS for attendance, client password vault, category tasks, and real net profit per project.
            <span className="text-slate-400 block mt-1">Set up in the first week. Built for digital agencies.</span>
          </p>
        </motion.div>

        {/* High Conversion CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 pb-10"
        >
          <ShimmerButton onClick={onOpenBooking} className="w-full sm:w-auto text-base px-8 py-4">
            <span>Book Free 30-Min Walkthrough</span>
            <ArrowRight className="h-4 w-4" />
          </ShimmerButton>

          <Magnetic strength={0.2}>
            <button
              onClick={onOpenVideoTour}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-slate-700 bg-[#11172B]/80 hover:bg-[#16203c] text-slate-200 px-6 py-4 text-sm font-semibold backdrop-blur-md transition-all hover:border-slate-600 cursor-pointer"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Play className="h-3 w-3 fill-current ml-0.5" />
              </div>
              <span>Watch 90-Sec Video Tour</span>
            </button>
          </Magnetic>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-16"
        >
          {[
            { icon: Users, label: 'Built & used daily by our own agency' },
            { icon: Lock, label: 'AES-256 encrypted password vault' },
            { icon: Database, label: 'Dedicated database per customer' },
            { icon: CheckCircle2, label: 'Flat monthly cost, 0 per-seat penalty' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 rounded-xl border border-slate-800/80 bg-[#11172B]/60 p-3 text-left backdrop-blur-sm"
            >
              <item.icon className="h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-xs text-slate-300 font-medium leading-tight">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Interactive Hero Product Showcase Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Showcase Tabs */}
          <div className="flex justify-center gap-2 mb-4">
            {(['analytics', 'vault', 'attendance'] as const).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActivePreviewTab(tabKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePreviewTab === tabKey
                    ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-[#11172B] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {previews[tabKey].tag}
              </button>
            ))}
          </div>

          <TiltCard maxTilt={5} className="rounded-3xl border border-slate-800 bg-[#11172B]/90 shadow-2xl shadow-emerald-950/40 p-2 sm:p-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900">
              {/* Window Chrome */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0B1020]/90">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-400 ml-2 font-mono">
                    https://demo.daftarhub.app/{activePreviewTab}
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Agency Environment
                </span>
              </div>

              {/* Preview Image with dynamic switch */}
              <div className="relative aspect-[16/9] w-full bg-[#0B1020] overflow-hidden">
                <img
                  src={previews[activePreviewTab].image}
                  alt={previews[activePreviewTab].title}
                  className="w-full h-full object-cover object-top transition-all duration-500 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/90 via-transparent to-transparent flex items-end p-6">
                  <div className="bg-[#0B1020]/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl max-w-md">
                    <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                      {previews[activePreviewTab].tag}
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {previews[activePreviewTab].title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      {previews[activePreviewTab].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};
