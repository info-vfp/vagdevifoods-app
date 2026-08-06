import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NAV_LINKS, SHORT_COMPANY_NAME, NAV_LOGO_URL, WHATSAPP_BULK_QUOTE_LINK } from '../constants';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import WhatsAppIcon from './WhatsAppIcon';
import type { NavLink as NavLinkType } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-[80] bg-brand-cream/90 backdrop-blur-md border-b border-brand-line">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 h-[74px]">
        <Link to="/" aria-label={`${SHORT_COMPANY_NAME} — home`} className="flex items-center min-h-[44px] flex-shrink-0">
          <img src={NAV_LOGO_URL} alt={`${SHORT_COMPANY_NAME} Logo`} className="h-9 md:h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 ml-auto">
          {NAV_LINKS.map((link: NavLinkType) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`px-3 py-2 text-[11.5px] font-bold uppercase tracking-wider border-b-2 transition-colors duration-300 whitespace-nowrap ${active
                  ? 'text-[#A8842A] border-brand-secondary'
                  : 'text-brand-primary border-transparent hover:text-[#A8842A]'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/surya"
            className="px-3 py-2 text-[11.5px] font-bold uppercase tracking-wider border-b-2 border-transparent whitespace-nowrap text-[#C4136F] hover:text-[#8E0B4E] hover:border-[#C4136F] transition-colors duration-300"
          >
            Surya ✦
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
          <LanguageSwitcher />
          <a
            href={WHATSAPP_BULK_QUOTE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-dark text-white px-4 py-3 rounded-full text-[11.5px] font-bold uppercase tracking-wider transition-colors duration-300 hover:bg-[#1D9E5A]"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            {t.wa}
          </a>
        </div>

        <div className="lg:hidden flex items-center ml-auto gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-md text-brand-primary hover:text-[#A8842A] focus:outline-none focus:ring-2 focus:ring-brand-secondary/40"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? <Bars3Icon className="block h-7 w-7" aria-hidden="true" /> : <XMarkIcon className="block h-7 w-7" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-cream/95 backdrop-blur-xl border-t border-brand-line overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-1">
              {NAV_LINKS.map((link: NavLinkType) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wider transition-all duration-300
                    ${location.pathname === link.path
                      ? 'bg-brand-secondary/10 text-[#A8842A] pl-6'
                      : 'text-brand-primary hover:bg-brand-primary/5 hover:pl-6'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/surya"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wider text-[#C4136F] hover:bg-[#C4136F]/5 hover:pl-6 transition-all duration-300"
              >
                Surya ✦
              </Link>
              <a
                href={WHATSAPP_BULK_QUOTE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {t.wa}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
