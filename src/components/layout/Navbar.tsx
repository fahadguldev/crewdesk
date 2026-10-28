import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AnimatedTabs, type TabOption } from '../motion/AnimatedTabs';
import { Magnetic } from '../motion/Magnetic';
import { useCurrency, type Currency } from '../../context/CurrencyContext';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencyTabs: TabOption<Currency>[] = [
    { id: 'pkr', label: 'PKR' },
    { id: 'usd', label: 'USD' }
  ];

  const navLinks = [
    { label: 'Modules', href: '#modules' },
    { label: 'Roles', href: '#roles' },
    { label: 'Custom Scope', href: '#custom-modules' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Security', href: '#security' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1020]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Only the image logo — no extra text, no v2.0 badge */}
        <a href="#hero" className="flex items-center group cursor-pointer" aria-label="Hub دفتر Home">
          <img
            src="/logo.png"
            alt="Hub دفتر"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-slate-800/80 bg-[#11172B]/70 px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-800/50 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Currency Toggle, Login, CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <AnimatedTabs
            tabs={currencyTabs}
            activeId={currency}
            onChange={(val) => setCurrency(val as Currency)}
            layoutId="nav-currency-pill"
            className="scale-90 bg-[#11172B]/80"
          />

          <a
            href="https://app.daftarhub.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
          >
            Log in
          </a>

          <Magnetic strength={0.25}>
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-4 py-2 text-xs font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all cursor-pointer"
            >
              <span>Book Walkthrough</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Magnetic>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <AnimatedTabs
            tabs={currencyTabs}
            activeId={currency}
            onChange={(val) => setCurrency(val as Currency)}
            layoutId="mobile-currency-pill"
            className="scale-75 origin-right bg-[#11172B]"
          />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-800 bg-[#11172B] text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-b border-slate-800 bg-[#0B1020]/98 backdrop-blur-2xl px-5 pt-4 pb-6 space-y-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-300 hover:text-emerald-400 py-2 border-b border-slate-900"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://app.daftarhub.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-400 hover:text-white py-2"
              >
                Log in to App
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-slate-950 py-3 text-sm font-bold shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              <span>Book Walkthrough</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
