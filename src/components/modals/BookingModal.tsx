import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageSquare, Clock, ShieldCheck, Check } from 'lucide-react';
import { UrduDaftar } from '../common/UrduDaftar';
import { PLACEHOLDERS } from '../../config/placeholders';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const whatsappUrl = `https://wa.me/${PLACEHOLDERS.WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi Hub Daftar! I would like to book a 30-min walkthrough for my agency.'
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1020]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-[#0B1020] p-6 sm:p-8 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#11172B] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Live 1-on-1 Session
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white mt-2">
                  Book Your 30-Minute Agency Walkthrough
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  See Hub <UrduDaftar /> customized to your agency's exact team size, project categories, and security needs.
                </p>
              </div>

              {/* What happens on the call */}
              <div className="rounded-xl border border-slate-800/80 bg-[#11172B] p-4 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 font-bold text-slate-200">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>In 30 minutes, we will cover:</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>How to lock down all client credentials in the AES-256 vault</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Real project profitability and net margin tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Selecting your 3 custom modules for Week 1 onboarding</span>
                </div>
              </div>

              {/* Direct Booking Options */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-slate-950 font-bold">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-emerald-300">
                        WhatsApp Coordination
                      </div>
                      <div className="text-xs text-slate-400">
                        Chat directly on {PLACEHOLDERS.WHATSAPP_DISPLAY}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">Fastest →</span>
                </a>

                <a
                  href="#final-cta"
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-800 bg-[#11172B]/80 hover:bg-[#11172B] text-white transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Fill Request Form</div>
                      <div className="text-xs text-slate-400">Provide team details and get a tailored invite</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">Form →</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Zero sales pressure. 100% focused on agency workflow fit.</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
