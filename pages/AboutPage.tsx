import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { STRENGTHS_DATA, DIRECTORS, INCORPORATION_DATE, FARMER_PAYMENTS_PHONE_FORMATTED } from '../constants';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { useLanguage } from '../context/LanguageContext';

const AboutPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Vagdevi Food Products",
    "description": "Incorporated on 15 September 2017, Vagdevi Food Products mills, packs and exports rice from a single site in Nalgonda district, Telangana.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Vagdevi Food Products",
      "foundingDate": "2017-09-15",
    }
  };

  return (
    <div className="bg-brand-cream font-sans">
      <SEO
        title="About Us - Vagdevi Food Products"
        description="Incorporated on 15 September 2017 and run by promoters with more than thirty years in the paddy trade, Vagdevi Food Products mills, packs and exports rice from a single site in Nalgonda district."
        keywords="about vagdevi foods, rice mill telangana, board of directors, rice mill history"
        structuredData={structuredData}
      />

      <section className="relative bg-brand-dark text-white overflow-hidden py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_70%_at_80%_15%,rgba(212,175,55,0.18),transparent_62%)]" />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#E8CE74] mb-5">{t.navAbout}</div>
          <h1 className="font-display text-[34px] sm:text-6xl leading-[1.05] tracking-tight max-w-3xl mb-6">{t.aboutTitle}</h1>
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/76 max-w-2xl">
            Incorporated on {INCORPORATION_DATE} and run by promoters with more than thirty years in the paddy trade, Vagdevi Food Products mills, packs and exports rice from a single site in Nalgonda district.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="grid lg:grid-cols-2 border border-brand-line bg-white mb-16">
              <div className="min-h-[320px] lg:min-h-[420px] overflow-hidden">
                <img src="images/mill/procurement_hall.png" alt="Farmers at the paddy procurement counter" className="w-full h-full object-cover" />
              </div>
              <div className="p-8 sm:p-11 flex flex-col justify-center gap-5">
                <h2 className="font-display text-2xl sm:text-3xl leading-tight text-gray-900">It starts at a counter, not a boardroom</h2>
                <p className="text-[15px] leading-relaxed text-gray-600 font-light">
                  Farmers from the surrounding mandals bring paddy directly to our procurement hall. Weight, moisture and payment are settled on the same visit — pattadar passbook, bank passbook and Aadhaar in hand — and money goes straight into the farmer's account.
                </p>
                <p className="text-[15px] leading-relaxed text-gray-600 font-light">
                  That relationship is the whole supply chain. It is why we can tell a buyer which mandal a consignment came from, and why the grain in a 30 kg bag in Nashik behaves like the one before it.
                </p>
                <div className="flex flex-wrap gap-2.5 mt-1.5">
                  <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#A8842A] border border-brand-line px-4 py-2.5 rounded-full">Farmer payments · {FARMER_PAYMENTS_PHONE_FORMATTED}</span>
                  <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#A8842A] border border-brand-line px-4 py-2.5 rounded-full">Direct bank transfer</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal width="100%">
            <h2 className="font-display text-2xl sm:text-4xl leading-tight text-gray-900 mb-8">{t.strengths}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-line border border-brand-line mb-16">
            {STRENGTHS_DATA.map((s) => (
              <ScrollReveal key={s.t} width="100%">
                <div className="bg-white hover:bg-[#FFFDF5] transition-colors duration-300 px-7 py-8 h-full">
                  <div className="font-display text-3xl text-brand-secondary leading-none mb-4">{s.n}</div>
                  <h3 className="font-display text-lg leading-tight text-gray-900 mb-2.5">{s.t}</h3>
                  <p className="text-[13.5px] leading-relaxed text-gray-500 font-light">{s.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal width="100%">
              <div className="bg-brand-dark text-white p-9 sm:p-11 h-full">
                <div className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#E8CE74] mb-[18px]">Mission</div>
                <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/85">
                  To supply rice of a consistent, verifiable standard — every bag, every consignment — and to pay the farmers who grow it fairly and on time.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal width="100%">
              <div className="bg-white border border-brand-line p-9 sm:p-11 h-full">
                <div className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#A8842A] mb-[18px]">Board of directors</div>
                <div className="flex flex-col gap-3">
                  {DIRECTORS.map((d) => (
                    <div key={d} className="font-display text-xl text-gray-900 pb-3 border-b border-[#F0EBDD]">{d}</div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-4 tracking-wide">As recorded on APEDA RCMC 221976 · IEC AAGCV1018C</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
