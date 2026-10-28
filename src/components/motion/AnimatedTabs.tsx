import React from 'react';
import { motion } from 'framer-motion';

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface AnimatedTabsProps<T extends string = string> {
  tabs: TabOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
  layoutId?: string;
  className?: string;
  tabClassName?: string;
}

export function AnimatedTabs<T extends string = string>({
  tabs,
  activeId,
  onChange,
  layoutId = 'active-tab-indicator',
  className = '',
  tabClassName = ''
}: AnimatedTabsProps<T>) {
  return (
    <div
      className={`relative inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/80 p-1.5 backdrop-blur-md ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              isActive ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            } ${tabClassName}`}
          >
            {tab.icon && <span className="text-base">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                  isActive
                    ? 'bg-slate-950/20 text-slate-950'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                {tab.badge}
              </span>
            )}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                className="absolute inset-0 -z-10 rounded-full bg-emerald-400 shadow-md shadow-emerald-500/25"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
