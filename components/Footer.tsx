import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SHORT_COMPANY_NAME, COMPANY_ADDRESS, COMPANY_CONTACT_EMAIL, COMPANY_CONTACT_PHONE_FORMATTED, FOOTER_LOGO_URL } from '../constants';
import type { NavLink as NavLinkType } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white/80 font-sans border-t border-brand-primary/30">
      <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-10 md:gap-8">

          {/* Company Info & Logo */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <img src={FOOTER_LOGO_URL} alt={`${SHORT_COMPANY_NAME} Logo`} className="h-16 w-auto brightness-0 invert opacity-90 transition-opacity duration-300 hover:opacity-100" />
            </Link>
            <h3 className="text-xl font-display font-bold text-brand-secondary mb-2">{SHORT_COMPANY_NAME}</h3>
            <p className="mt-2 text-sm leading-relaxed font-light text-white/70 max-w-xs">{COMPANY_ADDRESS}</p>
            <div className="mt-6 space-y-2">
              <p className="text-sm">
                <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="flex items-center hover:text-brand-secondary transition-colors duration-300 group">
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-brand-secondary group-hover:text-brand-dark transition-all">@</span>
                  {COMPANY_CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-sm">
                <a href={`tel:${COMPANY_CONTACT_PHONE_FORMATTED.replace(/\s|-/g, "")}`} className="flex items-center hover:text-brand-secondary transition-colors duration-300 group">
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-brand-secondary group-hover:text-brand-dark transition-all">#</span>
                  {COMPANY_CONTACT_PHONE_FORMATTED}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:pl-8">
            <h3 className="text-sm font-bold tracking-[0.2em] text-brand-secondary uppercase mb-6">Explore</h3>
            <ul className="space-y-4">
              {NAV_LINKS.map((link: NavLinkType) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm font-medium hover:text-brand-secondary hover:underline underline-offset-4 decoration-brand-secondary/50 transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location Map Area */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold tracking-[0.2em] text-brand-secondary uppercase mb-6">Visit Us</h3>
            <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 opacity-80 hover:opacity-100 transition-opacity duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.9789240473942!2d79.59740769999999!3d16.876937100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35250429b5232d%3A0x97c88d0bd3e943fd!2sVagdevi%20Food%20Products%20Private%20Limited!5e0!3m2!1sen!2sin!4v1756100292717!5m2!1sen!2sin"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-xs text-brand-secondary/70 mt-3 font-light">Yadgarpalle, Telangana</p>
          </div>

        </div>
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-light">
          <p>&copy; {new Date().getFullYear()} {SHORT_COMPANY_NAME}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-brand-secondary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-brand-secondary cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
