import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SHORT_COMPANY_NAME, NAV_LOGO_URL, SOCIAL_LINKS } from '../constants';
import type { NavLink as NavLinkType } from '../types';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-300 ${scrolled ? 'bg-brand-bg/90 backdrop-blur-md shadow-glass py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-10 md:h-12' : 'h-12 md:h-[60px]'}`}
                src={NAV_LOGO_URL}
                alt={`${SHORT_COMPANY_NAME} Logo`}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-baseline space-x-6">
              {NAV_LINKS.map((link: NavLinkType) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="relative group"
                >
                  <span className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${location.pathname === link.path ? 'text-brand-secondary' : 'text-brand-primary hover:text-brand-secondary'
                    }`}>
                    {link.label}
                  </span>
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-secondary transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4 border-l border-brand-primary/20 pl-6">
              {SOCIAL_LINKS.slice(0, 2).map(social => (
                <a key={social.name} href={social.url} title={social.name} target="_blank" rel="noopener noreferrer" className="text-brand-primary/70 hover:text-brand-secondary transition-colors duration-300 transform hover:scale-110">
                  <span className="sr-only">{social.name}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-md text-brand-primary hover:text-brand-secondary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-bg/95 backdrop-blur-xl border-t border-brand-primary/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {NAV_LINKS.map((link: NavLinkType) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wider transition-all duration-300
                    ${location.pathname === link.path
                      ? 'bg-brand-secondary/10 text-brand-secondary pl-6'
                      : 'text-brand-primary hover:bg-brand-primary/5 hover:pl-6'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;