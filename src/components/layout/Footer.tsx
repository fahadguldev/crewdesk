import React from 'react';
import { Mail, Phone, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Hub دفتر" className="h-7 w-auto" />
              <div className="flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-lg text-white">Hub</span>
                <span className="font-urdu font-bold text-base text-emerald-400" dir="rtl">دفتر</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The complete agency operations platform. One calm OS for attendance, client password vault, time tracking, and real project margins.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>AES-256 Zero-Knowledge Vault</span>
            </div>
          </div>

          {/* Core Modules Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Core Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">Business Analysis & Profit</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">Client Password Vault</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">Attendance & Leave Tracking</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">Category Projects & Sprints</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">Billable Time Tracking</a></li>
            </ul>
          </div>

          {/* Solutions & Roles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Roles & Comparison
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#roles" className="hover:text-emerald-400 transition-colors">For Agency Founders</a></li>
              <li><a href="#roles" className="hover:text-emerald-400 transition-colors">For Project Managers</a></li>
              <li><a href="#roi-calculator" className="hover:text-emerald-400 transition-colors">ClickUp Cost Comparison</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Flat Agency Pricing</a></li>
              <li><a href="https://demo.daftarhub.app/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Live Interactive Demo</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/923203601576" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +92 320 3601576 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="mailto:daftarhub.app@gmail.com" className="hover:text-white transition-colors">
                  daftarhub.app@gmail.com
                </a>
              </li>
              <li className="pt-2 text-slate-500">
                Setup & onboarding support available in English and Urdu.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Hub دفتر (DaftarHub). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="/privacy.html" className="hover:text-slate-400">Privacy Policy</a>
            <a href="/terms.html" className="hover:text-slate-400">Terms of Service</a>
            <a href="/compare-clickup.html" className="hover:text-slate-400">Compare with ClickUp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
