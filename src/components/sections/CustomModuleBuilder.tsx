import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, AlertCircle, ArrowRight, Sparkles, Sliders } from 'lucide-react';
import { AnimatedNumber } from '../motion/AnimatedNumber';

interface CustomOption {
  id: string;
  name: string;
  tagline: string;
  category: string;
  requires?: string[];
}

const CUSTOM_OPTIONS: CustomOption[] = [
  { id: 'invoicing', name: 'Automated Client Invoicing', tagline: 'One-click PDF invoices from billable hours', category: 'Finance' },
  { id: 'client-portal', name: 'White-Label Client Portal', tagline: 'Clients see deliverables without messaging PMs', category: 'Client Experience' },
  { id: 'proposals', name: 'Proposal & Scope Builder', tagline: 'Turn closed deals into projects automatically', category: 'Sales' },
  { id: 'payroll', name: 'Payroll & Bonus Calculator', tagline: 'Attendance-backed monthly salary sheets', category: 'Finance', requires: ['invoicing'] },
  { id: 'recruiting', name: 'Applicant Tracking & Hiring', tagline: 'Manage resumes, test tasks & candidate stages', category: 'HR' },
  { id: 'reviews', name: 'Performance & 360 Reviews', tagline: 'Quarterly peer feedback & salary review logs', category: 'HR' }
];

interface CustomModuleBuilderProps {
  onSelectModulesForWalkthrough?: (selected: string[]) => void;
}

export const CustomModuleBuilder: React.FC<CustomModuleBuilderProps> = ({
  onSelectModulesForWalkthrough
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['client-portal', 'invoicing']);
  const maxAllowed = 3;

  const toggleModule = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= maxAllowed) {
        return prev;
      }
      return [...prev, id];
    });
  };

  return (
    <section className="py-20 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-950 to-slate-950 p-6 sm:p-12 shadow-2xl relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-3">
                <Sliders className="h-3.5 w-3.5" />
                <span>Tailored for Your Agency</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Choose 3 Custom Modules Included Free
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                Every agency has unique operational quirks. Beyond the 8 core modules, we configure and customize up to 3 custom modules in your dedicated environment during Week 1 onboarding.
              </p>
            </div>

            {/* Selection Counter Pill */}
            <div className="shrink-0 flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium">Selected Scope</span>
                <span className="text-lg font-extrabold text-white">
                  <AnimatedNumber value={selectedIds.length} /> / {maxAllowed} Custom Modules
                </span>
              </div>
              <div className="h-8 w-[1px] bg-slate-800" />
              <div className="flex gap-1">
                {[1, 2, 3].map((slot) => (
                  <div
                    key={slot}
                    className={`h-3 w-3 rounded-full transition-all ${
                      slot <= selectedIds.length ? 'bg-emerald-400 shadow-sm shadow-emerald-500/50' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Module Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CUSTOM_OPTIONS.map((opt) => {
              const isSelected = selectedIds.includes(opt.id);
              const isDisabled = !isSelected && selectedIds.length >= maxAllowed;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleModule(opt.id)}
                  disabled={isDisabled}
                  className={`relative p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/10'
                      : isDisabled
                      ? 'border-slate-800/40 bg-slate-900/20 opacity-50 cursor-not-allowed'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                      {opt.category}
                    </span>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                        isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isSelected ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : <Plus className="h-3.5 w-3.5" />}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{opt.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{opt.tagline}</p>

                  {opt.requires && !selectedIds.includes(opt.requires[0]) && (
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-900/50">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      <span>Best paired with {opt.requires.join(', ')}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
            <p className="text-xs text-slate-400 text-center sm:text-left">
              Need a 4th custom module or proprietary API integration? We build custom extensions for agency enterprise plans.
            </p>
            <a
              href="#final-cta"
              onClick={() => onSelectModulesForWalkthrough?.(selectedIds)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-6 py-3 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <span>Lock in Selected Scope & Book Walkthrough</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
