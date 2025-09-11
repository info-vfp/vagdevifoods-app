import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SHORT_COMPANY_NAME, COMPANY_ADDRESS, COMPANY_CONTACT_EMAIL, COMPANY_CONTACT_PHONE_FORMATTED, FOOTER_LOGO_URL, SOCIAL_LINKS, CONTACT_MAP_PLACEHOLDER_URL } from '../constants';
import type { NavLink as NavLinkType } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-brown-dark text-brand-text-on-dark font-sans">
      <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8"> {/* Increased padding */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-10 md:gap-8"> {/* Adjusted gap */}
          
          {/* Company Info & Logo */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-5">
              <img src={FOOTER_LOGO_URL} alt={`${SHORT_COMPANY_NAME} Logo`} className="h-14 w-auto transition-opacity duration-300 hover:opacity-80" />
            </Link>
            <h3 className="text-lg font-serif font-semibold text-brand-orange mb-1">{SHORT_COMPANY_NAME}</h3>
            <p className="mt-1 text-sm opacity-90 leading-relaxed">{COMPANY_ADDRESS}</p>
            <div className="mt-4 space-y-1">
              <p className="text-sm">
                <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="opacity-90 hover:text-brand-orange hover:opacity-100 transition-colors duration-300 hover:underline">{COMPANY_CONTACT_EMAIL}</a>
              </p>
              <p className="text-sm">
                <a href={`tel:${COMPANY_CONTACT_PHONE_FORMATTED.replace(/\s|-/g, "")}`} className="opacity-90 hover:text-brand-orange hover:opacity-100 transition-colors duration-300 hover:underline">{COMPANY_CONTACT_PHONE_FORMATTED}</a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:pt-1"> {/* Added pt for alignment */}
            <h3 className="text-base font-serif font-semibold tracking-wide text-brand-orange uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2.5"> {/* Increased space */}
              {NAV_LINKS.map((link: NavLinkType) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm opacity-90 hover:text-brand-orange hover:opacity-100 transition-colors duration-300 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Media */}
          {/* <div className="md:col-span-3 md:pt-1">
            <h3 className="text-base font-serif font-semibold tracking-wide text-brand-orange uppercase">Connect With Us</h3>
             <div className="flex space-x-4 mt-4">
                {SOCIAL_LINKS.map(social => (
                    <a key={social.name} href={social.url} title={social.name} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:text-brand-orange transition-all duration-300 transform hover:scale-110">
                        <span className="sr-only">{social.name}</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"> */}
                            {/* Placeholder path */}
                            {/* <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2z"/>
                        </svg>
                    </a>
                ))}
            </div>
            <p className="mt-4 text-xs opacity-70 leading-relaxed">Follow us on social media for the latest updates, news, and insights into our world of quality rice.</p>
          </div> */}
          
          {/* Location Map Area */}
          <div className="md:col-span-3 md:pt-1">
             <h3 className="text-base font-serif font-semibold tracking-wide text-brand-orange uppercase mb-4">Our Location</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.9789240473942!2d79.59740769999999!3d16.876937100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35250429b5232d%3A0x97c88d0bd3e943fd!2sVagdevi%20Food%20Products%20Private%20Limited!5e0!3m2!1sen!2sin!4v1756100292717!5m2!1sen!2sin" width="100%" height="144" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg shadow-md"></iframe>
             <p className="text-xs opacity-70 mt-2">Yadgarpalle, Telangana - The heart of our operations.</p>
          </div>

        </div>
        <div className="mt-16 border-t border-amber-700/50 pt-8"> {/* Increased top margin */}
          <p className="text-xs text-center opacity-70">&copy; {new Date().getFullYear()} {SHORT_COMPANY_NAME}. All rights reserved. Crafted with passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
