import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Img from '../components/Img';
import ScrollReveal from '../components/ScrollReveal';
import WhatsAppIcon from '../components/WhatsAppIcon';
import {
  HERO_STATS, TICKER_ITEMS, PILLARS_DATA, CERTIFICATIONS,
  SURYA_PACK_PINK_URL, SURYA_PACK_BLACK_URL, WHATSAPP_BULK_QUOTE_LINK,
  COMPANY_CONTACT_PHONE, GEO_COORDINATES,
} from '../constants';
import { HOME_MILL_STEPS } from '../content/millJourney';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { buildGraph, organizationSchema, websiteSchema, breadcrumbSchema } from '../content/structuredData';
import { useLanguage } from '../context/LanguageContext';

const HomePage: React.FC = () => {
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];

  // Title/description now come from the route registry in content/seo.ts.
  const structuredData = buildGraph(
    organizationSchema(),
    websiteSchema(),
    breadcrumbSchema('/')
  );

  return (
    <div className="bg-brand-cream font-sans overflow-x-hidden">
      <SEO
        keywords="rice mill telangana, bulk rice suppliers, JSR HMT RNR rice, rice exporters miryalaguda, rice mill miryalaguda, paddy procurement nalgonda"
        structuredData={structuredData}
      />

      {/* Hero */}
      <section className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(85%_70%_at_78%_10%,rgba(212,175,55,0.20),transparent_62%),radial-gradient(70%_60%_at_6%_94%,rgba(238,128,34,0.13),transparent_62%)]" />
        <div className="absolute -top-[14%] -right-[6%] w-[520px] h-[520px] rounded-full bg-brand-secondary/[.13] blur-[90px] animate-[vf-pulse_9s_ease-in-out_infinite] pointer-events-none" />

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 grid lg:grid-cols-[1.12fr_.88fr] gap-12 items-center min-h-[calc(100dvh-74px)]">
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
              <p className="font-serif text-[17px] sm:text-2xl leading-relaxed text-white/80 max-w-xl mb-9">{t.heroSub}</p>
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
                  className="inline-flex items-center gap-2.5 border border-white/30 text-white px-8 py-[19px] rounded-full text-xs font-bold tracking-[0.13em] uppercase transition-colors duration-300 hover:bg-white/10 hover:border-brand-secondary"
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
            <div className="absolute w-[420px] h-[420px] rounded-full bg-brand-secondary/[.20] blur-[90px]" />
            <div className="relative flex items-end justify-center gap-3 sm:gap-6 w-full max-w-[540px] mx-auto">
              {/* Both packs share one keyframe with no rotation. Previously each used a
                  different float with opposing rotations, so they wobbled against each other
                  and read as unstable — packshots should sit level. The wrapper carries the
                  animation and the image keeps the shadow, so the animated node only ever
                  changes transform and stays on the compositor. */}
              <div className="relative flex flex-col items-center w-[46%]">
                <div className="absolute bottom-3 w-[70%] h-[20px] rounded-full bg-black/[.5] blur-[16px]" />
                <div className="relative w-full will-change-transform animate-[vf-drift_6s_ease-in-out_infinite]">
                  <Img
                    src={SURYA_PACK_PINK_URL}
                    alt="Vagdevi's Surya JSR Lachkari Kolam rice, 26 kg — pink pack"
                    width={399}
                    height={626}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto drop-shadow-[0_26px_46px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <span className="mt-4 text-[10px] font-bold tracking-[0.18em] uppercase text-white/70">Pink · JSR</span>
              </div>
              <div className="relative flex flex-col items-center w-[46%]">
                <div className="absolute bottom-3 w-[70%] h-[20px] rounded-full bg-black/[.5] blur-[16px]" />
                {/* Negative delay starts this one already part-way through the cycle, so the
                    two drift in gentle counterpoint instead of moving in lockstep. */}
                <div className="relative w-full will-change-transform animate-[vf-drift_6s_ease-in-out_infinite] [animation-delay:-1.5s]">
                  <Img
                    src={SURYA_PACK_BLACK_URL}
                    alt="Vagdevi's Surya HMT rice, 26 kg — black pack"
                    width={399}
                    height={626}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto drop-shadow-[0_26px_46px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <span className="mt-4 text-[10px] font-bold tracking-[0.18em] uppercase text-white/70">Black · HMT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/[.13] bg-white/[.03] overflow-hidden py-4">
          <div className="flex w-max animate-[vf-marquee_38s_linear_infinite]">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((w, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-6 text-[10.5px] font-bold tracking-[0.22em] uppercase text-white/60 whitespace-nowrap">
                {w}<span className="w-1 h-1 rounded-full bg-brand-secondary" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — The location */}
      <section className="bg-brand-cream py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="grid lg:grid-cols-2 gap-7 sm:gap-14 items-end mb-9 sm:mb-12">
              <div>
                <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-brand-gold-ink mb-4">01 — {t.s1kicker}</div>
                <h2 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-gray-900">{t.s1title}</h2>
              </div>
              <p className="font-serif text-[17px] sm:text-xl leading-relaxed text-gray-600 pb-1">
                Miryalaguda mills the paddy of the Nagarjuna Sagar command area — the reason Nalgonda district is called the rice bowl of Telangana. Our plant stands on Survey Nos. 328 to 333, Vijayawada Road, Yadgarpally, inside that belt, so paddy reaches the intake yard the same day it leaves the field.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal width="100%">
            <div className="relative h-[min(42dvh,500px)] sm:h-[min(56dvh,500px)] overflow-hidden border border-brand-line mb-9 sm:mb-12">
              <Img src="images/mill/plant_silos.webp" sizes="(min-width: 1280px) 1216px, 100vw" alt="Paddy dryers, elevators and steel silos at the Yadgarpally plant" className="w-full h-full object-cover object-[center_62%]" />
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
                <div className="bg-white hover:bg-[#FFFDF5] transition-colors duration-300 px-6 py-7 sm:px-8 sm:py-10 h-full">
                  <div className="font-display text-sm font-bold text-brand-gold-ink tracking-[0.2em] mb-5">{p.i}</div>
                  <h3 className="font-display text-2xl leading-tight text-gray-900 mb-3">{p.t}</h3>
                  <p className="text-sm leading-relaxed text-gray-500 font-light">{p.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Inside the mill */}
      <section className="bg-white border-y border-brand-line py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="mb-8 sm:mb-12">
              <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-brand-gold-ink mb-4">02 — {t.s2kicker}</div>
              <h2 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-gray-900 max-w-3xl">{t.s2title}</h2>
            </div>
          </ScrollReveal>
          {/* Stacked vertically, these six steps ran 3.2 screens on a 375px phone — a quarter
              of the whole homepage for one section. Swiping through them costs about one screen
              instead. Every word stays in the DOM, so nothing is lost to crawlers or to anyone
              reading with assistive tech; only the presentation changes. Same snap-scroll
              pattern as the Mill page stage tabs. The negative margin lets the row bleed to the
              screen edge so the peek of the next card reads as "there is more this way". */}
          {/* scroll-pl-4 matches the px-4: without it snap-start aligns each card to the raw
              scroll-port edge and the padding is scrolled straight out of view. */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-pl-4 no-scrollbar -mx-4 px-4 pb-2 sm:mx-0 sm:px-0 sm:pb-0">
            {HOME_MILL_STEPS.map((st) => (
              <div key={st.n} className="snap-start shrink-0 w-[78%] sm:w-auto">
                <div className="relative h-[180px] sm:h-[220px] overflow-hidden bg-brand-cream border border-brand-line group">
                  <Img src={st.src} alt={st.t} sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 78vw" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: st.pos }} />
                </div>
                <div className="flex items-baseline gap-2.5 mt-4">
                  <span className="font-display text-sm font-bold text-brand-gold-ink">{st.n}</span>
                  <h3 className="font-display text-xl text-gray-900">{st.t}</h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-500 font-light mt-1.5">{st.d}</p>
              </div>
            ))}
          </div>
          <ScrollReveal width="100%">
            <div className="mt-9 sm:mt-11 flex flex-wrap gap-5 items-center justify-between border-t border-brand-line pt-8">
              <p className="font-serif text-[17px] sm:text-xl leading-relaxed text-gray-600 max-w-lg">Every photograph on this site was taken inside our own mill. Walk the whole plant, stage by stage.</p>
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
      <section className="relative bg-brand-dark text-white overflow-hidden py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_60%_at_88%_18%,rgba(212,175,55,0.15),transparent_62%)]" />
        <div className="relative max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="mb-8 sm:mb-12">
              <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#E8CE74] mb-4">03 — {t.s3kicker}</div>
              <h2 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-white max-w-3xl">{t.s3title}</h2>
            </div>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            <ScrollReveal width="100%">
              <Link to="/surya" className="block relative overflow-hidden bg-gradient-to-br from-[#E4187C] to-[#96094D] p-6 sm:p-10 border border-white/[.14] h-full">
                <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/[.13] blur-[44px]" />
                <div className="relative flex justify-between items-start gap-5">
                  <div className="max-w-xs">
                    <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/80 mb-3.5">Consumer brand</div>
                    <Img src="images/logos/surya_brand_logo.webp" alt="Vagdevi's Surya" className="h-[54px] sm:h-[70px] w-auto mb-4 sm:mb-5 drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]" />
                    <p className="font-serif text-[17px] sm:text-xl leading-relaxed text-white/90 mb-6">Pink for the north, black for the south. JSR Lachkari Kolam and HMT in 10, 26 and 30 kg. “Love in every bite.”</p>
                    <span className="inline-flex items-center gap-2 bg-white text-[#96094D] px-5 py-3.5 rounded-full text-[11px] font-extrabold tracking-[0.13em] uppercase">{t.suryaCta} →</span>
                  </div>
                  <Img src={SURYA_PACK_BLACK_URL} alt="Surya HMT rice, black pack" sizes="(min-width: 640px) 135px, 96px" className="w-24 sm:w-[135px] h-auto drop-shadow-[0_22px_40px_rgba(0,0,0,0.5)] flex-shrink-0" />
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal width="100%">
              <Link to="/products" className="block relative overflow-hidden bg-white/5 hover:bg-white/[.09] transition-colors duration-300 p-6 sm:p-10 border border-white/[.14] h-full">
                <div className="relative flex justify-between items-start gap-5">
                  <div className="max-w-xs">
                    <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/60 mb-3.5">Household brand</div>
                    <Img src="images/logos/dwaraka_brand_logo.webp" alt="Dwaraka" className="h-[54px] sm:h-[70px] w-auto mb-4 sm:mb-5" />
                    <p className="font-serif text-[17px] sm:text-xl leading-relaxed text-white/70 mb-6">Short, thick grain built for fermentation — idli and dosa batter that behaves the same way every single time.</p>
                    <span className="inline-flex items-center gap-2 border border-white/35 text-white px-5 py-3.5 rounded-full text-[11px] font-extrabold tracking-[0.13em] uppercase">{t.allProducts} →</span>
                  </div>
                  <Img src="images/products/brands/dwaraka_pack_1.webp" alt="Dwaraka pack" sizes="(min-width: 640px) 135px, 96px" className="w-24 sm:w-[135px] h-auto drop-shadow-[0_22px_40px_rgba(0,0,0,0.45)] flex-shrink-0" />
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 04 — The paper trail */}
      <section className="bg-brand-cream py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="grid lg:grid-cols-[1fr_.85fr] gap-7 sm:gap-12 items-end mb-8 sm:mb-11">
              <div>
                <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-brand-gold-ink mb-4">04 — {t.s4kicker}</div>
                <h2 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-gray-900">{t.s4title}</h2>
              </div>
              <p className="font-serif text-[17px] sm:text-xl leading-relaxed text-gray-600">Numbers you can verify before you place an order. Full-resolution copies of all three, plus lab reports and a company profile, are sent on request.</p>
            </div>
          </ScrollReveal>
          {/* On a phone the 250px certificate scans are unreadable anyway — they were costing
              2.3 screens to show three thumbnails nobody can read. Below `sm` the card turns on
              its side: a narrow strip of the document for recognition, and the part that
              actually matters — registration number and validity — leading the text. The full
              card layout is unchanged from `sm` up. */}
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {CERTIFICATIONS.map((c) => (
              <ScrollReveal key={c.name} width="100%">
                <div className="bg-white border border-brand-line flex flex-row sm:flex-col h-full hover:shadow-[0_22px_44px_-22px_rgba(10,18,48,0.28)] transition-shadow duration-300">
                  <div className="w-[96px] shrink-0 sm:w-auto sm:h-[250px] overflow-hidden bg-brand-cream border-r sm:border-r-0 sm:border-b border-brand-line">
                    <Img src={c.src} alt={c.name} sizes="(min-width: 640px) 33vw, 96px" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-4 sm:p-7 flex flex-col gap-2.5 sm:gap-3.5 flex-1 min-w-0">
                    <h3 className="font-display text-lg sm:text-xl text-gray-900 leading-snug">{c.name}</h3>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between gap-3.5"><span className="text-gray-500 uppercase font-bold text-[10px] tracking-wider">{c.numberLabel}</span><span className="text-gray-800 font-semibold text-right text-[11.5px]">{c.number}</span></div>
                      <div className="flex justify-between gap-3.5"><span className="text-gray-500 uppercase font-bold text-[10px] tracking-wider">Valid to</span><span className="text-gray-800 font-semibold text-right text-[11.5px]">{c.validTo}</span></div>
                    </div>
                    <p className="text-[12.5px] sm:text-[13.5px] leading-relaxed text-gray-500 font-light mt-auto">{c.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gold CTA */}
      <section className="relative overflow-hidden bg-brand-secondary text-brand-dark py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-white/[.22] blur-[60px]" />
        <ScrollReveal width="100%">
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight mb-5">{t.ctaTitle}</h2>
            <p className="font-serif text-[17px] sm:text-xl leading-relaxed text-brand-dark/80 mb-9 max-w-xl mx-auto">One message with your variety, quantity and delivery city is enough. We reply with a price, a lab report and a dispatch date.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={WHATSAPP_BULK_QUOTE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-brand-dark text-white px-8 py-[19px] rounded-full text-xs font-extrabold tracking-[0.13em] uppercase transition-all duration-300 hover:bg-brand-whatsapp hover:-translate-y-1"
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
