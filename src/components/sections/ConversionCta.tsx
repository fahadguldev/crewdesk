import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, CheckCircle, Sparkles, Shield, Clock, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ShimmerButton } from '../motion/ShimmerButton';

interface ConversionCtaProps {
  initialModules?: string[];
}

export const ConversionCta: React.FC<ConversionCtaProps> = ({ initialModules = [] }) => {
  const [formData, setFormData] = useState({
    agencyName: '',
    contactName: '',
    emailOrPhone: '',
    teamSize: '11-20 seats',
    biggestPain: 'vault-profit'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission and trigger confetti
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore in non-browser env
      }

      // Also generate direct WhatsApp redirection link
      const text = `Hi Hub Daftar Team! I'm ${formData.contactName} from ${formData.agencyName} (${formData.teamSize}). I would like to book our first-week agency walkthrough.`;
      const waUrl = `https://wa.me/923203601576?text=${encodeURIComponent(text)}`;
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1200);
    }, 600);
  };

  const directWhatsAppUrl = `https://wa.me/923203601576?text=${encodeURIComponent(
    'Hi Hub Daftar! I would like to book a 30-min walkthrough for my agency.'
  )}`;

  return (
    <section id="final-cta" className="py-24 bg-slate-900/60 relative border-t border-slate-800/80 overflow-hidden">
      {/* Background radial highlight */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy & Value Points */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                <Sparkles className="h-3.5 w-3.5" />
                <span>First-Week Agency Access</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Ready to run your whole{' '}
                <span className="font-urdu text-emerald-400 font-bold" dir="rtl">دفتر</span>{' '}
                from one calm Hub?
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Book a 30-minute tailored walkthrough. We’ll show you the exact modules configured for your team size, answer security questions, and outline your 7-day deployment roadmap.
              </p>

              {/* Guarantees */}
              <div className="space-y-3 pt-2">
                {[
                  'Zero commitment — 30-min live walkthrough tailored to your agency',
                  'Dedicated database provisioned in Week 1 with AES-256 vault',
                  'White-glove migration assistance for projects and team roster'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Instant WhatsApp Option */}
              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-xs text-slate-400 mb-2">Prefer instant direct messaging?</p>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat directly on WhatsApp (+92 320 3601576)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right Booking Form Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Walkthrough Request Received!</h3>
                    <p className="text-sm text-slate-300 max-w-sm mx-auto">
                      Opening WhatsApp to coordinate your 30-minute walkthrough slot. We look forward to meeting you!
                    </p>
                    <div className="pt-2">
                      <a
                        href={directWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 text-slate-950 px-5 py-2.5 text-xs font-bold"
                      >
                        <span>Open WhatsApp Now</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      Schedule Agency Walkthrough
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Tailored 1-on-1 walkthrough for agency owners and leadership.
                    </p>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Agency Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pixel Studio or Nexus Digital"
                        value={formData.agencyName}
                        onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Fahad or Sarah"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          WhatsApp or Email
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="+92 300 1234567 or email"
                          value={formData.emailOrPhone}
                          onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Agency Team Size
                        </label>
                        <select
                          value={formData.teamSize}
                          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors"
                        >
                          <option value="5-10 seats">5 - 10 seats (Starter)</option>
                          <option value="11-20 seats">11 - 20 seats (Team)</option>
                          <option value="21-50 seats">21 - 50 seats (Growth)</option>
                          <option value="50+ seats">50+ seats (Enterprise)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Primary Focus Area
                        </label>
                        <select
                          value={formData.biggestPain}
                          onChange={(e) => setFormData({ ...formData, biggestPain: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors"
                        >
                          <option value="vault-profit">Client Password Vault & Profit Margins</option>
                          <option value="attendance-time">Attendance & Time Tracking</option>
                          <option value="projects-sprints">Project Milestones & Task Sprints</option>
                          <option value="replace-clickup">Replacing Over-Engineered Tools</option>
                        </select>
                      </div>
                    </div>

                    <ShimmerButton
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 mt-2 text-xs sm:text-sm"
                    >
                      {loading ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Request Walkthrough & Confirm Scope</span>
                        </>
                      )}
                    </ShimmerButton>

                    <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400">
                      <Shield className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Zero spam. Direct founder & lead engineer walkthrough.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
