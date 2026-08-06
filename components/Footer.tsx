import React from 'react';
import { Link } from 'react-router-dom';
import {
  NAV_LINKS, SHORT_COMPANY_NAME, COMPANY_NAME, FOOTER_LOGO_URL, COMPANY_CONTACT_EMAIL,
  COMPANY_CONTACT_PHONE, COMPANY_WHATSAPP_NUMBER, MILL_ADDRESS_LINES,
} from '../constants';
import type { NavLink as NavLinkType } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white/70 font-sans">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-10 lg:gap-11 mb-12">

          <div>
            <img loading="lazy" decoding="async" src={FOOTER_LOGO_URL} alt={`${SHORT_COMPANY_NAME} Logo`} className="h-12 w-auto brightness-0 invert opacity-90 mb-5" />
            <p className="font-serif text-lg leading-relaxed text-white/60 max-w-xs">
              Rice millers and exporters at Yadgarpally, Miryalaguda — in the rice bowl of Telangana since 2017.
            </p>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-brand-secondary mb-5">Explore</div>
            <div className="flex flex-col gap-0 sm:gap-3">
              {NAV_LINKS.map((link: NavLinkType) => (
                <Link key={link.label} to={link.path} className="inline-flex items-center min-h-[40px] sm:min-h-0 text-sm text-white/70 font-medium hover:text-brand-secondary transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
              <Link to="/surya" className="inline-flex items-center min-h-[40px] sm:min-h-0 text-sm text-[#F072AE] font-semibold hover:text-white transition-colors duration-300">
                Surya Rice ✦
              </Link>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-brand-secondary mb-5">Compliance</div>
            <div className="flex flex-col gap-3 text-[12.5px] leading-relaxed text-white/60">
              <span>FSSAI 13618008000475</span>
              <span>ISO 22000:2018</span>
              <span>APEDA RCMC 221976</span>
              <span>IEC AAGCV1018C</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-brand-secondary mb-5">Get in touch</div>
            <div className="flex flex-col gap-0 sm:gap-3">
              <a
                href={`https://wa.me/${COMPANY_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[40px] sm:min-h-0 text-sm text-white font-semibold hover:text-brand-secondary transition-colors duration-300"
              >
                WhatsApp · {COMPANY_CONTACT_PHONE}
              </a>
              <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="inline-flex items-center min-h-[40px] sm:min-h-0 text-[13.5px] text-white/70 hover:text-brand-secondary transition-colors duration-300">
                {COMPANY_CONTACT_EMAIL}
              </a>
              <p className="text-[12.5px] leading-relaxed text-white/50 mt-1.5">
                {MILL_ADDRESS_LINES.join(' ')}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-4 justify-between text-[11.5px] text-white/40">
          <span>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</span>
          <span>Miryalaguda · Nalgonda · Telangana · India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
