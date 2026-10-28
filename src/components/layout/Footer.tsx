import React from 'react';
import { Mail, Phone, ShieldCheck } from 'lucide-react';
import { UrduDaftar } from '../common/UrduDaftar';
import { PLACEHOLDERS } from '../../config/placeholders';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1020] border-t border-slate-900 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info — ONLY image logo */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Hub دفتر"
                className="h-8 w-auto object-contain"
              />
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
              Solutions & Roles
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#roles" className="hover:text-emerald-400 transition-colors">For Agency Founders</a></li>
              <li><a href="#roles" className="hover:text-emerald-400 transition-colors">For Project Managers</a></li>
              <li><a href="#custom-modules" className="hover:text-emerald-400 transition-colors">Custom Agency Modules</a></li>
              <li><a href="#comparison" className="hover:text-emerald-400 transition-colors">ClickUp Cost Comparison</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Flat Agency Pricing</a></li>
            </ul>
          </div>

          {/* Contact & Support with Turkey Number */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${PLACEHOLDERS.WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {PLACEHOLDERS.WHATSAPP_DISPLAY} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${PLACEHOLDERS.BUSINESS_EMAIL}`} className="hover:text-white transition-colors">
                  {PLACEHOLDERS.BUSINESS_EMAIL}
                </a>
              </li>
              <li className="pt-2 text-slate-500">
                Setup & onboarding support available in English and Urdu.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Hub <UrduDaftar />. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="/privacy.html" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="/terms.html" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="/compare-clickup.html" className="hover:text-slate-400 transition-colors">Compare with ClickUp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
