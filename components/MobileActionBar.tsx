import React from 'react';
import { PhoneIcon } from '@heroicons/react/24/solid';
import WhatsAppIcon from './WhatsAppIcon';
import { COMPANY_CONTACT_PHONE, COMPANY_TEL_HREF } from '../constants';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { useLanguage } from '../context/LanguageContext';

interface MobileActionBarProps {
  /** WhatsApp deep link, pre-filled with a message appropriate to the page. */
  whatsappLink: string;
  /** Label for the WhatsApp button — translated by the caller. Defaults to "WhatsApp". */
  whatsappLabel?: string;
}

/**
 * Bottom-pinned contact bar shown only on phones.
 *
 * WhatsApp and phone are how this business actually takes orders, so on mobile they get
 * permanent, thumb-reachable placement rather than a single small floating bubble.
 * Hidden from large screens, where the header CTA and the floating button already cover it.
 */
const MobileActionBar: React.FC<MobileActionBarProps> = ({ whatsappLink, whatsappLabel }) => {
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[95] flex items-stretch gap-2 px-3 py-2.5
                 bg-brand-cream/95 backdrop-blur-md border-t border-brand-line
                 pb-[calc(0.625rem+env(safe-area-inset-bottom))]"
    >
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full
                   bg-brand-whatsapp text-white text-[13px] font-extrabold tracking-[0.1em] uppercase
                   active:brightness-90 transition"
      >
        <WhatsAppIcon className="w-[18px] h-[18px]" />
        {whatsappLabel ?? t.wa}
      </a>
      <a
        href={COMPANY_TEL_HREF}
        aria-label={`${t.call} ${COMPANY_CONTACT_PHONE}`}
        className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full
                   bg-brand-dark text-white text-[13px] font-extrabold tracking-[0.1em] uppercase
                   active:brightness-125 transition"
      >
        <PhoneIcon className="w-[18px] h-[18px]" />
        {t.call}
      </a>
    </div>
  );
};

export default MobileActionBar;
