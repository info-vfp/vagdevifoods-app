import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SHORT_COMPANY_NAME, NAV_LOGO_URL, SOCIAL_LINKS } from '../constants';
import type { NavLink as NavLinkType } from '../types';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-brand-bg shadow-nav sticky top-0 z-50 font-sans">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-[90px]"> {/* Increased height */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group"> {/* Increased space */}
              <img className="h-11 md:h-14 w-auto transition-transform duration-300 group-hover:opacity-80" src={NAV_LOGO_URL} alt={`${SHORT_COMPANY_NAME} Logo`} />
              {/* <div>
                <span className="font-serif font-bold text-xl md:text-2xl text-text-heading group-hover:text-brand-orange transition-colors duration-300">
                  {SHORT_COMPANY_NAME}
                </span>
                <p className="text-xs text-text-muted font-sans hidden sm:block group-hover:text-brand-orange transition-colors duration-300 tracking-wide">
                  A Legacy of Trust
                </p>
              </div> */}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <nav className="flex items-baseline space-x-1 lg:space-x-2">
              {NAV_LINKS.map((link: NavLinkType) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out relative group
                    ${location.pathname === link.path 
                      ? 'text-brand-orange' 
                      : 'text-text-body hover:text-brand-orange'
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out
                                   ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0'}`}></span>
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
                {SOCIAL_LINKS.slice(0,2).map(social => ( 
                    <a key={social.name} href={social.url} title={social.name} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand-orange transition-colors duration-300">
                        <span className="sr-only">{social.name}</span>
                        {/* Using a generic icon structure, actual SVGs would be better */}
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                           {/* Placeholder path, replace with actual social icon paths */}
                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2z"/>
                        </svg>
                    </a>
                ))}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-md text-text-muted hover:text-brand-orange hover:bg-brand-orange/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-orange transition-colors duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}`} 
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map((link: NavLinkType) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 rounded-md text-base font-medium
                ${location.pathname === link.path 
                  ? 'bg-brand-orange/10 text-brand-orange' 
                  : 'text-text-body hover:bg-brand-orange/5 hover:text-brand-orange'
                }`}
              aria-current={location.pathname === link.path ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-5 px-5">
                 {SOCIAL_LINKS.map(social => (
                    <a key={social.name} href={social.url} title={social.name} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand-orange transition-colors duration-300">
                        <span className="sr-only">{social.name}</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2z"/>
                        </svg>
                    </a>
                ))}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;