import React, { useState } from 'react';
import { Plus, Check, ArrowRight, Sliders, Award, FileSpreadsheet, Users, Bell, Star, Layout } from 'lucide-react';
import { AnimatedNumber } from '../motion/AnimatedNumber';
import { UrduDaftar } from '../common/UrduDaftar';

interface CustomOption {
  id: string;
  name: string;
  tagline: string;
  category: string;
  icon: React.ElementType;
}

const CUSTOM_OPTIONS: CustomOption[] = [
  {
    id: 'payrolls',
    name: 'Payrolls & Salary Slips',
    tagline: 'Attendance-backed monthly salary sheets, advance deductions & bank exports',
    category: 'Finance',
    icon: FileSpreadsheet
  },
  {
    id: 'hiring-ats',
    name: 'Application Tracking & Hiring',
    tagline: 'Manage candidate pipelines, CV screening, test tasks & interview rounds',
    category: 'HR & Talent',
    icon: Users
  },
  {
    id: 'client-followups',
    name: 'Client Followup & Milestone Reminders',
    tagline: 'Automated reminders for pending client deliverables, invoices & retainer renewals',
    category: 'Client Ops',
    icon: Bell
  },
  {
    id: 'employee-of-month',
    name: 'Employee of the Month Calculator',
    tagline: 'Automated scoring algorithm based on punctuality, task velocity & peer feedback',
    category: 'Culture & HR',
    icon: Award
  },
  {
    id: 'performance-appraisal',
    name: 'Employee Performance & 360 Reviews',
    tagline: 'Quarterly performance appraisals, KPI scorecards, salary reviews & feedback logs',
    category: 'Management',
    icon: Star
  },
  {
    id: 'client-portal',
    name: 'White-Label Client Portal',
    tagline: 'Clients see deliverables and approve milestones without Slack or email noise',
    category: 'Client Experience',
    icon: Layout
  }
];

interface CustomModuleBuilderProps {
  onSelectModulesForWalkthrough?: (selected: string[]) => void;
}

export const CustomModuleBuilder: React.FC<CustomModuleBuilderProps> = ({
  onSelectModulesForWalkthrough
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['payrolls', 'client-followups']);
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
    <section id="custom-modules" className="py-20 bg-[#0B1020] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#11172B] via-[#0B1020] to-[#0B1020] p-6 sm:p-12 shadow-2xl relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-3">
                <Sliders className="h-3.5 w-3.5" />
                <span>Tailored for Your Agency</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                3 Custom Modules Configured Free in Week 1
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                Every agency operates differently. Beyond the 8 core modules of Hub <UrduDaftar />, we customize up to 3 custom modules directly from our tested agency roster during onboarding.
              </p>
            </div>

            {/* Selection Counter Pill */}
            <div className="shrink-0 flex items-center gap-3 bg-[#11172B] border border-slate-800 rounded-2xl px-5 py-3">
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
              const Icon = opt.icon;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleModule(opt.id)}
                  disabled={isDisabled}
                  className={`relative p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/30 shadow-lg shadow-emerald-500/10'
                      : isDisabled
                      ? 'border-slate-800/40 bg-[#11172B]/30 opacity-50 cursor-not-allowed'
                      : 'border-slate-800 bg-[#11172B]/70 hover:border-slate-700 hover:bg-[#11172B]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                        {opt.category}
                      </span>
                    </div>

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
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
            <p className="text-xs text-slate-400 text-center sm:text-left">
              Need custom integrations or bespoke pipelines? We tailor agency extensions during your onboarding week.
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
