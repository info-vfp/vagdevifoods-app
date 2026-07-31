import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { RICE_VARIETIES_DATA, PACK_SIZES, SURYA_SWATCHES, BYPRODUCTS_DATA, buildVarietyQuoteLink } from '../constants';
import type { RiceVarietyInfo } from '../types';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { useLanguage } from '../context/LanguageContext';

const ProductsPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Products - Vagdevi Food Products",
    "description": "JSR, HMT and RNR rice varieties, plus rice bran, broken rice and husk by-products, milled at Yadgarpally, Miryalaguda.",
  };

  return (
    <div className="bg-brand-cream font-sans">
      <SEO
        title="Products - Vagdevi Food Products"
        description="Rice, by-products and the packs they ship in. Three varieties, each available as steam or double boiled, in 10, 26 and 30 kg packs."
        keywords="JSR rice, HMT rice, RNR rice, Sona Masoori, rice bran, broken rice, husk"
        structuredData={structuredData}
      />

      <section className="relative bg-brand-dark text-white overflow-hidden py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_70%_at_82%_15%,rgba(212,175,55,0.18),transparent_62%)]" />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#E8CE74] mb-5">{t.navProducts}</div>
          <h1 className="font-display text-[34px] sm:text-6xl leading-[1.05] tracking-tight max-w-3xl mb-6">{t.productsTitle}</h1>
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/76 max-w-2xl">
            Three varieties, each available as steam or double boiled, in 10, 26 and 30 kg packs — plus the by-products the mill produces along the way.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {RICE_VARIETIES_DATA.map((v: RiceVarietyInfo) => (
              <ScrollReveal key={v.name} width="100%">
                <div className="bg-white border border-brand-line flex flex-col h-full hover:shadow-[0_26px_50px_-26px_rgba(10,18,48,0.3)] transition-shadow duration-300">
                  <div className="h-[230px] overflow-hidden border-b border-brand-line group">
                    <img src={v.imageUrl} alt={v.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7 sm:p-8 flex flex-col gap-4 flex-1">
                    <div>
                      <h3 className="font-display text-[28px] leading-tight text-gray-900">{v.name}</h3>
                      <div className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#A8842A] mt-2">{v.altName}</div>
                    </div>
                    <p className="text-[14.5px] leading-relaxed text-gray-500 font-light">{v.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {v.types.map((type) => (
                        <span key={type} className="text-[10.5px] font-bold tracking-wider uppercase bg-brand-cream border border-brand-line text-gray-800 px-3.5 py-2">{type}</span>
                      ))}
                    </div>
                    <a
                      href={buildVarietyQuoteLink(`${v.name} / ${v.altName} rice`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-brand-dark border-b-2 border-brand-secondary pb-1 self-start hover:text-[#A8842A]"
                    >
                      {t.enquire} →
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal width="100%">
            <h2 className="font-display text-2xl sm:text-4xl leading-tight text-gray-900 mb-7">Pack sizes &amp; brands</h2>
          </ScrollReveal>
          <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-6 mb-20">
            <ScrollReveal width="100%">
              <div className="bg-white border border-brand-line p-8 sm:p-9 h-full">
                <div className="flex flex-wrap gap-3.5 mb-7">
                  {PACK_SIZES.map((pk) => (
                    <div key={pk.kg} className="border border-brand-line bg-brand-cream px-6 py-5 flex-1 min-w-[120px]">
                      <div className="font-display text-3xl text-gray-900 leading-none">{pk.kg}</div>
                      <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#A8842A] mt-2">{pk.use}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[14.5px] leading-relaxed text-gray-500 font-light">
                  Woven PP and jute, printed to your artwork for private label, or in our own Surya and Dwaraka packs. Bulk consignments ship in 50 kg bags on request. Every pack carries a lot number that ties it back to a milling date and a lab report.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal width="100%">
              <Link
                to="/surya"
                className="flex flex-col justify-between gap-5 bg-gradient-to-br from-[#E4187C] to-[#96094D] text-white p-8 sm:p-9 relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/[.14] blur-[40px]" />
                <div className="relative">
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/78 mb-4">Eight pack colours</div>
                  <img src="images/logos/surya_brand_logo.webp" alt="Surya" className="h-[62px] w-auto drop-shadow-[0_8px_18px_rgba(0,0,0,0.3)]" />
                </div>
                <div className="relative flex gap-2 flex-wrap">
                  {SURYA_SWATCHES.map((sw) => (
                    <span key={sw.n} title={sw.n} className="w-[26px] h-[26px] rounded-full border-[1.5px] border-white/60" style={{ backgroundColor: sw.c }} />
                  ))}
                </div>
                <span className="relative inline-flex items-center gap-2 bg-white text-[#96094D] px-5 py-3.5 rounded-full text-[11px] font-extrabold tracking-[0.13em] uppercase self-start">{t.suryaCta} →</span>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal width="100%">
            <h2 className="font-display text-2xl sm:text-4xl leading-tight text-gray-900 mb-7">By-products</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-px bg-brand-line border border-brand-line">
            {BYPRODUCTS_DATA.map((b) => (
              <ScrollReveal key={b.n} width="100%">
                <div className="bg-white hover:bg-[#FFFDF5] transition-colors duration-300 px-8 py-9 h-full">
                  <h3 className="font-display text-2xl text-gray-900 mb-3">{b.n}</h3>
                  <p className="text-sm leading-relaxed text-gray-500 font-light">{b.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
