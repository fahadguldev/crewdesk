import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Briefcase, UserCheck, Shield, Check, Eye } from 'lucide-react';
import { TiltCard } from '../motion/TiltCard';

interface RoleData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  keyMetrics: { label: string; value: string }[];
  bulletPoints: string[];
  screenshot: string;
}

const ROLES: RoleData[] = [
  {
    id: 'founder',
    name: 'Agency Founder & CEO',
    tagline: 'High-level financial health & true net margin',
    description: 'No more waiting for month-end reconciliation to discover a client project burned all your profit. Monitor firm-wide margins, revenue retainers, and employee utilization in real time.',
    icon: Crown,
    keyMetrics: [
      { label: 'Firm Margin', value: '38.4%' },
      { label: 'Active Retainers', value: '14 Accounts' },
      { label: 'Unbilled Leakage', value: '0.0%' }
    ],
    bulletPoints: [
      'Mask sensitive company numbers with 1-click Privacy Shield',
      'Instant visibility into most and least profitable clients',
      'Audit log tracking access to financial figures'
    ],
    screenshot: '/images/admin.png'
  },
  {
    id: 'pm',
    name: 'Project Manager',
    tagline: 'Deliverables, sprint velocity & scope creep guard',
    description: 'Ensure client deadlines are met without endless Slack pinging. Category-based milestones keep designers, copywriters, and developers aligned on exact deliverables.',
    icon: Briefcase,
    keyMetrics: [
      { label: 'Sprint Health', value: '94% On Time' },
      { label: 'Deliverables', value: '18 Due This Week' },
      { label: 'Blocked Tasks', value: '1 Actionable' }
    ],
    bulletPoints: [
      'Visual timeline of all active category projects',
      'Quick reassignment when a team member takes sudden leave',
      'Automated milestone status notifications'
    ],
    screenshot: '/images/project-management.png'
  },
  {
    id: 'developer',
    name: 'Designers & Engineers',
    tagline: 'Zero distraction, simple time logging & leave checks',
    description: 'Your team wants to design and code, not fill out endless Jira bureaucracy. 1-click daily attendance, task timers, and leave requests handled without HR friction.',
    icon: UserCheck,
    keyMetrics: [
      { label: 'Today Logged', value: '6h 45m Focus' },
      { label: 'Leave Balance', value: '12 Days Paid' },
      { label: 'Active Sprint', value: 'Phase 2 UI' }
    ],
    bulletPoints: [
      '1-click check-in and automated lunch/break tracker',
      'Direct access to task-scoped client credentials in vault',
      'Clear list of priority deliverables for today'
    ],
    screenshot: '/images/attendence-management.png'
  },
  {
    id: 'client',
    name: 'Client Stakeholder',
    tagline: 'White-labeled visibility without PM overhead',
    description: 'Give clients a transparent view of work in progress without giving away your internal team discussions or profit margins. Drastically reduces "what is the update?" emails.',
    icon: Shield,
    keyMetrics: [
      { label: 'Milestone Progress', value: 'Phase 3 of 4' },
      { label: 'Pending Approvals', value: '2 Creatives' },
      { label: 'Next Deliverable', value: 'Thursday 5 PM' }
    ],
    bulletPoints: [
      'White-labeled portal with your agency branding',
      'Approval workflows for designs and staging links',
      'Zero internal team chatter visible to client'
    ],
    screenshot: '/images/business-analyst.png'
  }
];

export const RoleDashboards: React.FC = () => {
  const [activeRole, setActiveRole] = useState<RoleData>(ROLES[0]);

  return (
    <section id="roles" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Tailored Experiences
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Built for everyone in your agency
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Granular role-based views ensure founders see the financials, PMs see the sprints, and staff focus on delivery.
          </p>
        </div>

        {/* Roles Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = role.id === activeRole.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setActiveRole(role)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/30 shadow-lg shadow-emerald-500/15'
                    : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      isSelected ? 'bg-emerald-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{role.name}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{role.tagline}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Role Card View */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                    Role View
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    {activeRole.name}
                  </h3>
                  <p className="text-sm text-emerald-400 font-medium mt-1">
                    {activeRole.tagline}
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeRole.description}
                </p>

                {/* Key Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  {activeRole.keyMetrics.map((met, i) => (
                    <div key={i} className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">{met.label}</div>
                      <div className="text-sm font-extrabold text-white mt-0.5">{met.value}</div>
                    </div>
                  ))}
                </div>

                {/* Bullets */}
                <div className="space-y-2 pt-2">
                  {activeRole.bulletPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Screenshot Tilt Showcase */}
              <div className="lg:col-span-7">
                <TiltCard maxTilt={5} className="rounded-2xl border border-slate-800 bg-slate-950 p-2 shadow-2xl">
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-900">
                    <img
                      src={activeRole.screenshot}
                      alt={activeRole.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <Eye className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{activeRole.name} Screen</span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
