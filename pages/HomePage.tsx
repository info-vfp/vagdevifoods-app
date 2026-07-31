import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import WhatsAppIcon from '../components/WhatsAppIcon';
import {
  HERO_STATS, TICKER_ITEMS, PILLARS_DATA, CERTIFICATIONS,
  SURYA_PACK_PINK_URL, SURYA_PACK_BLACK_URL, WHATSAPP_BULK_QUOTE_LINK,
  COMPANY_CONTACT_PHONE, GEO_COORDINATES,
} from '../constants';
import { HOME_MILL_STEPS } from '../content/millJourney';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { useLanguage } from '../context/LanguageContext';

const HomePage: React.FC = () => {
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Vagdevi Food Products",
      "url": "https://info-vfp.github.io/vagdevifoods-app",
      "logo": "https://info-vfp.github.io/vagdevifoods-app/images/logos/vagdevi_nav_logo.webp",
      "description": "ISO 22000:2018 certified rice mill at Yadgarpally, Miryalaguda, Telangana. Bulk supply, private label and export of JSR, HMT and RNR steam and double-boiled rice.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": COMPANY_CONTACT_PHONE,
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi", "te", "ta", "kn"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WholesaleStore",
      "name": "Vagdevi Food Products - Rice Mill",
      "description": "Bulk rice millers and exporters of JSR, HMT and RNR steam and double-boiled rice.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sy. Nos. 328–333, Vijayawada Road, Yadgarpally",
        "addressLocality": "Miryalaguda",
        "addressRegion": "Telangana",
        "postalCode": "508207",
        "addressCountry": "IN"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": GEO_COORDINATES.lat, "longitude": GEO_COORDINATES.lng },
    },
  ];

  return (
    <div className="bg-brand-cream font-sans overflow-x-hidden">
      <SEO
        title="Vagdevi Food Products — Bulk Rice Millers & Exporters, Miryalaguda"
        description="ISO 22000:2018 certified rice mill at Yadgarpally, Miryalaguda, Telangana. Bulk supply, private label and export of JSR, HMT and RNR steam and double-boiled rice. FSSAI 13618008000475 · APEDA RCMC 221976."
        keywords="rice mill telangana, bulk rice suppliers, JSR HMT RNR rice, rice exporters miryalaguda"
        structuredData={structuredData}
      />

      {/* Hero */}
      <section className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(85%_70%_at_78%_10%,rgba(212,175,55,0.20),transparent_62%),radial-gradient(70%_60%_at_6%_94%,rgba(238,128,34,0.13),transparent_62%)]" />
        <div className="absolute -top-[14%] -right-[6%] w-[520px] h-[520px] rounded-full bg-brand-secondary/[.13] blur-[90px] animate-[vf-pulse_9s_ease-in-out_infinite] pointer-events-none" />

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 grid lg:grid-cols-[1.12fr_.88fr] gap-12 items-center min-h-[calc(100vh-74px)]">
          <div>
            <ScrollReveal direction="up">
              <div className="flex items-center gap-3 mb-7">
                <span className="w-10 h-px bg-brand-secondary" />
                <span className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#E8CE74]">Yadgarpally · Miryalaguda · Telangana</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <h1 className="font-display text-[38px] sm:text-6xl lg:text-7xl leading-[1.03] tracking-tight text-white mb-6">
                {t.heroA}<br /><span className="text-brand-secondary italic font-medium">{t.heroB}</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.18}>
              <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/80 max-w-xl mb-9">{t.heroSub}</p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.28}>
              <div className="flex flex-wrap gap-3 mb-12">
                <a
                  href={WHATSAPP_BULK_QUOTE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden inline-flex items-center gap-2.5 bg-brand-secondary text-brand-dark px-8 py-[19px] rounded-full text-xs font-extrabold tracking-[0.13em] uppercase shadow-[0_14px_34px_-12px_rgba(212,175,55,0.6)] transition-transform duration-300 hover:-translate-y-1"
                >
                  {t.ctaQuote}
                </a>
                <Link
                  to="/business"
                  className="inline-flex items-center gap-2.5 border border-white/28 text-white px-8 py-[19px] rounded-full text-xs font-bold tracking-[0.13em] uppercase transition-colors duration-300 hover:bg-white/10 hover:border-brand-secondary"
                >
                  {t.ctaSpecs}
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.38}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[.14] border-y border-white/[.14]">
                {HERO_STATS.map((s) => (
                  <div key={s.l} className="bg-brand-dark px-4 py-5">
                    <div className="font-display text-2xl font-bold text-brand-secondary leading-none mb-1.5">{s.n}</div>
                    <div className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-white/55 leading-snug">{s.l}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="relative flex items-center justify-center self-stretch py-12">
            <div className="absolute w-[330px] h-[330px] rounded-full bg-brand-secondary/[.22] blur-[80px]" />
            <div className="absolute bottom-[60px] w-[230px] h-[30px] rounded-full bg-black/[.55] blur-[22px]" />
            <img
              src={SURYA_PACK_PINK_URL}
              alt="Vagdevi's Surya JSR Lachkari Kolam rice, 26 kg"
              className="relative max-h-[min(64vh,560px)] max-w-full w-auto drop-shadow-[0_30px_55px_rgba(0,0,0,0.5)] animate-[vf-float_7.5s_ease-in-out_infinite]"
            />
          </div>
        </div>

        <div className="relative border-t border-white/[.13] bg-white/[.03] overflow-hidden py-4">
          <div className="flex w-max animate-[vf-marquee_38s_linear_infinite]">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((w, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-6 text-[10.5px] font-bold tracking-[0.22em] uppercase text-white/45 whitespace-nowrap">
                {w}<span className="w-1 h-1 rounded-full bg-brand-secondary" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — The location */}
      <section className="bg-brand-cream py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="grid lg:grid-cols-2 gap-14 items-end mb-12">
              <div>
                <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#A8842A] mb-4">01 — {t.s1kicker}</div>
                <h2 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-gray-900">{t.s1title}</h2>
              </div>
              <p className="font-serif text-xl leading-relaxed text-gray-600 pb-1">
                Miryalaguda mills the paddy of the Nagarjuna Sagar command area — the reason Nalgonda district is called the rice bowl of Telangana. Our plant stands on Survey Nos. 328 to 333, Vijayawada Road, Yadgarpally, inside that belt, so paddy reaches the intake yard the same day it leaves the field.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal width="100%">
            <div className="relative h-[min(56vh,500px)] overflow-hidden border border-brand-line mb-12">
              <img src="images/mill/plant_silos.png" alt="Paddy dryers, elevators and steel silos at the Yadgarpally plant" className="w-full h-full object-cover object-[center_62%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/[.74] via-brand-dark/[.04] to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-wrap gap-3 items-end justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#E8CE74] mb-2">The plant</div>
                  <div className="font-display text-2xl sm:text-3xl text-white leading-tight">Sy. Nos. 328–333, Vijayawada Road</div>
                </div>
                <div className="text-[11px] tracking-[0.14em] text-white/70 uppercase">{GEO_COORDINATES.lat}° N &nbsp;/&nbsp; {GEO_COORDINATES.lng}° E</div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-px bg-brand-line border border-brand-line">
            {PILLARS_DATA.map((p) => (
              <ScrollReveal key={p.t} width="100%">
                <div className="bg-white hover:bg-[#FFFDF5] transition-colors duration-300 px-8 py-10 h-full">
                  <div className="font-display text-sm font-bold text-brand-secondary tracking-[0.2em] mb-5">{p.i}</div>
                  <h3 className="font-display text-2xl leading-tight text-gray-900 mb-3">{p.t}</h3>
                  <p className="text-sm leading-relaxed text-gray-500 font-light">{p.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Inside the mill */}
      <section className="bg-white border-y border-brand-line py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="mb-12">
              <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#A8842A] mb-4">02 — {t.s2kicker}</div>
              <h2 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-gray-900 max-w-3xl">{t.s2title}</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_MILL_STEPS.map((st) => (
              <ScrollReveal key={st.n} width="100%">
                <div>
                  <div className="relative h-[220px] overflow-hidden bg-brand-cream border border-brand-line group">
                    <img src={st.src} alt={st.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: st.pos }} />
                  </div>
                  <div className="flex items-baseline gap-2.5 mt-4">
                    <span className="font-display text-sm font-bold text-brand-secondary">{st.n}</span>
                    <h3 className="font-display text-xl text-gray-900">{st.t}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500 font-light mt-1.5">{st.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal width="100%">
            <div className="mt-11 flex flex-wrap gap-5 items-center justify-between border-t border-brand-line pt-8">
              <p className="font-serif text-xl leading-relaxed text-gray-600 max-w-lg">Every photograph on this site was taken inside our own mill. Walk the whole plant, stage by stage.</p>
              <Link
                to="/mill"
                className="inline-flex items-center gap-2.5 bg-brand-dark text-white px-7 py-4 rounded-full text-[11.5px] font-extrabold tracking-[0.13em] uppercase transition-all duration-300 hover:bg-brand-secondary hover:text-brand-dark hover:-translate-y-0.5 flex-shrink-0"
              >
                {t.navMill} →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 03 — Our brands */}
      <section className="relative bg-brand-dark text-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_60%_at_88%_18%,rgba(212,175,55,0.15),transparent_62%)]" />
        <div className="relative max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="mb-12">
              <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#E8CE74] mb-4">03 — {t.s3kicker}</div>
              <h2 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-white max-w-3xl">{t.s3title}</h2>
            </div>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal width="100%">
              <Link to="/surya" className="block relative overflow-hidden bg-gradient-to-br from-[#E4187C] to-[#96094D] p-9 sm:p-10 border border-white/[.14] h-full">
                <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/[.13] blur-[44px]" />
                <div className="relative flex justify-between items-start gap-5">
                  <div className="max-w-xs">
                    <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/80 mb-3.5">Consumer brand</div>
                    <img src="images/logos/surya_brand_logo.webp" alt="Vagdevi's Surya" className="h-[70px] w-auto mb-5 drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]" />
                    <p className="font-serif text-xl leading-relaxed text-white/90 mb-6">Pink for the north, black for the south. JSR Lachkari Kolam and HMT in 10, 26 and 30 kg. “Love in every bite.”</p>
                    <span className="inline-flex items-center gap-2 bg-white text-[#96094D] px-5 py-3.5 rounded-full text-[11px] font-extrabold tracking-[0.13em] uppercase">{t.suryaCta} →</span>
                  </div>
                  <img src={SURYA_PACK_BLACK_URL} alt="Surya HMT rice, black pack" className="w-32 sm:w-[135px] h-auto drop-shadow-[0_22px_40px_rgba(0,0,0,0.5)] flex-shrink-0" />
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal width="100%">
              <Link to="/products" className="block relative overflow-hidden bg-white/5 hover:bg-white/[.09] transition-colors duration-300 p-9 sm:p-10 border border-white/[.14] h-full">
                <div className="relative flex justify-between items-start gap-5">
                  <div className="max-w-xs">
                    <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/60 mb-3.5">Household brand</div>
                    <img src="images/logos/dwaraka_brand_logo.webp" alt="Dwaraka" className="h-[70px] w-auto mb-5" />
                    <p className="font-serif text-xl leading-relaxed text-white/70 mb-6">Short, thick grain built for fermentation — idli and dosa batter that behaves the same way every single time.</p>
                    <span className="inline-flex items-center gap-2 border border-white/35 text-white px-5 py-3.5 rounded-full text-[11px] font-extrabold tracking-[0.13em] uppercase">{t.allProducts} →</span>
                  </div>
                  <img src="images/products/brands/dwaraka_pack_1.webp" alt="Dwaraka pack" className="w-32 sm:w-[135px] h-auto drop-shadow-[0_22px_40px_rgba(0,0,0,0.45)] flex-shrink-0" />
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 04 — The paper trail */}
      <section className="bg-brand-cream py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="grid lg:grid-cols-[1fr_.85fr] gap-12 items-end mb-11">
              <div>
                <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#A8842A] mb-4">04 — {t.s4kicker}</div>
                <h2 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-gray-900">{t.s4title}</h2>
              </div>
              <p className="font-serif text-xl leading-relaxed text-gray-600">Numbers you can verify before you place an order. Full-resolution copies of all three, plus lab reports and a company profile, are sent on request.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((c) => (
              <ScrollReveal key={c.name} width="100%">
                <div className="bg-white border border-brand-line flex flex-col h-full hover:shadow-[0_22px_44px_-22px_rgba(10,18,48,0.28)] transition-shadow duration-300">
                  <div className="h-[250px] overflow-hidden bg-brand-cream border-b border-brand-line">
                    <img src={c.src} alt={c.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col gap-3.5 flex-1">
                    <h3 className="font-display text-xl text-gray-900">{c.name}</h3>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between gap-3.5"><span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider">{c.numberLabel}</span><span className="text-gray-800 font-semibold text-right text-[11.5px]">{c.number}</span></div>
                      <div className="flex justify-between gap-3.5"><span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider">Valid to</span><span className="text-gray-800 font-semibold text-right text-[11.5px]">{c.validTo}</span></div>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-gray-500 font-light mt-auto">{c.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gold CTA */}
      <section className="relative overflow-hidden bg-brand-secondary text-brand-dark py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-white/[.22] blur-[60px]" />
        <ScrollReveal width="100%">
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight mb-5">{t.ctaTitle}</h2>
            <p className="font-serif text-xl leading-relaxed text-brand-dark/80 mb-9 max-w-xl mx-auto">One message with your variety, quantity and delivery city is enough. We reply with a price, a lab report and a dispatch date.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={WHATSAPP_BULK_QUOTE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-brand-dark text-white px-8 py-[19px] rounded-full text-xs font-extrabold tracking-[0.13em] uppercase transition-all duration-300 hover:bg-[#1D9E5A] hover:-translate-y-1"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {t.ctaWhatsapp}
              </a>
              <a
                href={`tel:+${COMPANY_CONTACT_PHONE.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-2.5 border-[1.5px] border-brand-dark/35 text-brand-dark px-8 py-[19px] rounded-full text-xs font-extrabold tracking-[0.13em] uppercase transition-colors duration-300 hover:bg-brand-dark/[.08]"
              >
                {COMPANY_CONTACT_PHONE}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default HomePage;
