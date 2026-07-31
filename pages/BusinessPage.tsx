import React, { useState } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { EXPORT_PROPS, EXPORT_SPECS, buildWhatsAppLink } from '../constants';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { useLanguage } from '../context/LanguageContext';

const SPEC_TABS: { key: 'sona' | 'steam'; label: string }[] = [
  { key: 'sona', label: 'Sona Masoori · premium' },
  { key: 'steam', label: 'Steam rice · classic' },
];

const LAB_REPORT_LINK = buildWhatsAppLink('Please send the Vagdevi Foods export specification sheet and a recent lab report.');

const BusinessPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];
  const [spec, setSpec] = useState<'sona' | 'steam'>('sona');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Exports - Vagdevi Food Products",
    "description": "Registered Manufacturer Exporter of rice under APEDA RCMC 221976. Container loading at the mill, documentation from Hyderabad, and a lab report with every lot.",
  };

  return (
    <div className="bg-brand-cream font-sans">
      <SEO
        title="Exports - Vagdevi Food Products"
        description="A supply partner for importers, wholesalers and private-label brands. Registered as a Manufacturer Exporter of rice, APEDA RCMC 221976."
        keywords="rice exporters india, bulk rice suppliers, private label rice, export specifications rice"
        structuredData={structuredData}
      />

      <section className="relative text-white overflow-hidden min-h-[62vh] flex items-end">
        <img src="images/mill/warehouse_yard.png" alt="Warehouse and loading yard at Yadgarpally" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/[.94] to-brand-dark/50" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
          <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#E8CE74] mb-5">{t.navExports} · APEDA RCMC 221976</div>
          <h1 className="font-display text-[34px] sm:text-6xl leading-[1.05] tracking-tight max-w-3xl mb-6">{t.exportsTitle}</h1>
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/80 max-w-xl">
            Registered as a Manufacturer Exporter of rice. Container loading at the mill, documentation from Hyderabad, and a lab report with every lot.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">

          <div className="grid sm:grid-cols-3 gap-px bg-brand-line border border-brand-line mb-20">
            {EXPORT_PROPS.map((e) => (
              <ScrollReveal key={e.t} width="100%">
                <div className="bg-white hover:bg-[#FFFDF5] transition-colors duration-300 px-8 py-10 h-full">
                  <div className="font-display text-sm font-bold text-brand-secondary tracking-[0.2em] mb-5">{e.i}</div>
                  <h3 className="font-display text-2xl leading-tight text-gray-900 mb-3">{e.t}</h3>
                  <p className="text-sm leading-relaxed text-gray-500 font-light">{e.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal width="100%">
            <div className="flex flex-wrap gap-5 items-end justify-between mb-6">
              <h2 className="font-display text-2xl sm:text-4xl leading-tight text-gray-900">{t.specsTitle}</h2>
              <div className="flex gap-2">
                {SPEC_TABS.map((tab) => {
                  const active = spec === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setSpec(tab.key)}
                      className={`cursor-pointer px-5 py-3 rounded-full text-[10.5px] font-extrabold tracking-[0.14em] uppercase border transition-all duration-300 ${active
                        ? 'bg-brand-dark text-white border-brand-dark'
                        : 'bg-white text-gray-800 border-brand-line'
                        }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal width="100%">
            <div className="bg-white border border-brand-line overflow-hidden mb-3.5">
              {EXPORT_SPECS[spec].map((row) => (
                <div key={row.p} className="grid grid-cols-2 gap-5 px-6 sm:px-8 py-5 border-b border-[#F0EBDD] last:border-0 hover:bg-brand-cream transition-colors duration-300">
                  <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-gray-400 self-center">{row.p}</div>
                  <div className="font-display text-xl sm:text-2xl text-gray-900 text-right">{row.v}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <p className="text-xs text-gray-400 italic mb-20">Indicative parameters. A signed lab report accompanies every shipment; custom specifications are quoted on request.</p>

          <ScrollReveal width="100%">
            <div className="grid lg:grid-cols-2 border border-brand-line bg-white">
              <div className="min-h-[300px] lg:min-h-[400px] overflow-hidden">
                <img src="images/mill/quality_lab.png" alt="Moisture and grain testing in the mill lab" className="w-full h-full object-cover" />
              </div>
              <div className="p-8 sm:p-11 flex flex-col justify-center gap-5">
                <div className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#A8842A]">Quality control</div>
                <h2 className="font-display text-2xl sm:text-3xl leading-tight text-gray-900">Every truck is sampled before it is unloaded</h2>
                <p className="text-[15px] leading-relaxed text-gray-600 font-light">
                  A probe sample is drawn from the load at the gate and read for moisture, immature grain and foreign matter. Loads outside our band are turned back. Milled lots are checked again for whiteness, broken ratio and average length before they are stitched and stacked.
                </p>
                <a
                  href={LAB_REPORT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-brand-dark border-b-2 border-brand-secondary pb-1 self-start hover:text-[#A8842A]"
                >
                  Request a lab report →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;
