import React from 'react';
import { Lock, Database, ShieldCheck, FileKey, EyeOff } from 'lucide-react';
import { SpotlightCard } from '../motion/SpotlightCard';
import { UrduDaftar } from '../common/UrduDaftar';

export const SecurityGuarantee: React.FC = () => {
  const securityPillars = [
    {
      icon: Lock,
      title: 'Zero-Knowledge AES-256 Vault',
      desc: 'Client credentials and production keys are encrypted client-side with AES-256 before hitting the server. Even our database administrators cannot see plain passwords.'
    },
    {
      icon: Database,
      title: 'Dedicated Isolated Database',
      desc: 'Your agency does not share a multi-tenant database pool with competitors. Your projects, finances, client names, and timesheets live in a dedicated isolated schema.'
    },
    {
      icon: FileKey,
      title: 'Immutable Access & Reveal Logs',
      desc: 'Every single credential view, copy to clipboard, or modification triggers a permanent audit timestamp. If a leak happens anywhere, you know the exact source instantly.'
    },
    {
      icon: EyeOff,
      title: 'Granular Role Scoping',
      desc: 'Developers only see passwords for the exact project they are assigned to. When a contractor finishes their milestone, access is revoked automatically.'
    }
  ];

  return (
    <section id="security" className="py-20 bg-[#0B1020] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-3">
            <ShieldCheck className="h-4 w-4" />
            <span>Enterprise Security Standard</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Security that protects your client relationships
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            One leaked client password or compromised server credential can destroy an agency's reputation overnight. Hub <UrduDaftar /> makes leaks mathematically impossible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(52, 211, 153, 0.12)"
                className="border-slate-800 bg-[#11172B]/70"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
