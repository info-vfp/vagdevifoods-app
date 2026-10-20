import React from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../components/Arrow';
import SEO from '../components/SEO';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { NAV_LINKS, WHATSAPP_BULK_QUOTE_LINK } from '../constants';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { useLanguage } from '../context/LanguageContext';

/**
 * Shown for any path the router does not know.
 *
 * Most people who land here followed an old link — the site used hash URLs (/#/products) and
 * once had a /markets page — so the job is to get them moving again, not to apologise. Every
 * page is one tap away, and so is the sales desk.
 */
const NotFoundPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];

  return (
    <div className="bg-brand-cream font-sans">
      <SEO title="Page not found" description="This page does not exist. Find the mill, products, exports and contact details from here." noindex />

      <section className="relative bg-brand-dark text-white overflow-hidden py-16 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_70%_at_80%_15%,rgba(212,175,55,0.18),transparent_62%)]" />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#E8CE74] mb-5">404 — Page not found</div>
          <h1 className="font-display text-[34px] sm:text-6xl leading-[1.05] tracking-tight max-w-3xl mb-6">That page has moved, or never existed.</h1>
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/80 max-w-2xl">
            Everything on the site is still one tap away below — or message the sales desk and we will send you what you were looking for.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.4fr_.6fr] gap-6">
          <nav aria-label={t.explore} className="grid sm:grid-cols-2 gap-px bg-brand-line border border-brand-line">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="bg-white hover:bg-[#FFFDF5] transition-colors duration-300 px-6 sm:px-8 py-6 min-h-[44px] flex items-center justify-between gap-4 font-display text-xl sm:text-2xl text-gray-900"
              >
                {t[link.labelKey]} <Arrow className="text-brand-gold-ink text-lg" />
              </Link>
            ))}
          </nav>
          <a
            href={WHATSAPP_BULK_QUOTE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-whatsapp hover:bg-[#076B34] transition-colors duration-300 text-white p-8 flex flex-col gap-4"
          >
            <WhatsAppIcon className="w-8 h-8" />
            <div className="font-display text-[27px] leading-tight">{t.ctaWhatsapp}</div>
            <div className="text-[13px] font-semibold tracking-wide mt-auto">{t.hours}</div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
