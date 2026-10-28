import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
  isSecurity?: boolean;
}

interface SpringAccordionProps {
  items: AccordionItemData[];
  className?: string;
}

export const SpringAccordion: React.FC<SpringAccordionProps> = ({ items, className = '' }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'border-emerald-500/40 bg-slate-900/90 shadow-lg shadow-emerald-500/5'
                : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700/80'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between p-5 text-left text-sm md:text-base font-semibold text-slate-100 transition-colors"
            >
              <span className="flex items-center gap-3">
                {item.isSecurity && (
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                )}
                <span>{item.question}</span>
              </span>

              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800/60 text-slate-400"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.25 }
                    }
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25, ease: 'easeInOut' },
                      opacity: { duration: 0.15 }
                    }
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-300/90 leading-relaxed border-t border-slate-800/50">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
