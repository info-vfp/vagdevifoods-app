import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Img from '../components/Img';
import WhatsAppIcon from '../components/WhatsAppIcon';
import WhatsAppFAB from '../components/WhatsAppFAB';
import MobileActionBar from '../components/MobileActionBar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { buildWhatsAppLink } from '../constants';
import { SURYA_TRANSLATIONS } from '../content/suryaTranslations';
import { SURYA_SKUS, COOK_METHODS, SURYA_COLOURS, SURYA_BUYERS, SURYA_TICKER } from '../content/suryaContent';
import { buildGraph, breadcrumbSchema, ORGANISATION_ID } from '../content/structuredData';
import { absoluteUrl } from '../content/seo';
import { useLanguage } from '../context/LanguageContext';

type HeroPack = 'pink' | 'black';

const HERO_GRADIENTS: Record<HeroPack, { bg: string; solid: string; ink: string }> = {
  pink: { bg: 'linear-gradient(158deg,#E4187C 0%,#B00E5C 55%,#7C0740 100%)', solid: '#B00E5C', ink: '#96094D' },
  black: { bg: 'linear-gradient(158deg,#3A3A3A 0%,#1E1E1E 55%,#0D0D0D 100%)', solid: '#1E1E1E', ink: '#1A1A1A' },
};

const HERO_FACTS: Record<HeroPack, { n: string; l: string }[]> = {
  pink: [{ n: 'JSR', l: 'Lachkari Kolam' }, { n: 'North', l: 'Strongest market' }, { n: '10·26·30', l: 'Kg packs' }],
  black: [{ n: 'HMT', l: 'Ponni type · boiled' }, { n: 'South', l: 'Strongest market' }, { n: '10·26·30', l: 'Kg packs' }],
};

const WA_DEALER_LINK = buildWhatsAppLink("Hello, I'd like to stock Vagdevi's Surya rice.\n• City: \n• Shop / business name: \n• Monthly volume: ");
const WA_HERO_LINK = buildWhatsAppLink("Hello, I'd like to order Vagdevi's Surya rice.\n• Pink JSR or Black HMT: \n• Pack size (10 / 26 / 30 kg): \n• Delivery city: ");

const SuryaPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = SURYA_TRANSLATIONS[lang];
  const [hero, setHero] = useState<HeroPack>('pink');
  const [methodKey, setMethodKey] = useState<typeof COOK_METHODS[number]['key']>('cooker');

  const heroTheme = HERO_GRADIENTS[hero];
  const heroFacts = HERO_FACTS[hero];
  const method = COOK_METHODS.find((m) => m.key === methodKey)!;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FB] text-[#2A0F1E] font-sans">
      <SEO
        keywords="surya rice, surya rice brand, JSR lachkari kolam, HMT boiled rice, rice dealer telangana"
        structuredData={buildGraph(
          {
            '@type': 'CollectionPage',
            name: "Vagdevi's Surya Rice",
            url: absoluteUrl('/surya'),
            about: { '@id': ORGANISATION_ID },
          },
          breadcrumbSchema('/surya')
        )}
      />

      <header className="sticky top-0 z-[80] bg-[#FFF8FB]/90 backdrop-blur-md border-b border-[#F6DCE8]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 h-[72px] flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            aria-label="Back to Vagdevi Foods"
            className="inline-flex items-center gap-2 min-h-[44px] min-w-[44px] text-[11px] font-bold tracking-[0.14em] uppercase text-[#8A6675] hover:text-[#C4136F] transition-colors flex-shrink-0"
          >
            <span aria-hidden="true">←</span>
            <span className="hidden sm:inline">Vagdevi Foods</span>
          </Link>
          <Link to="/surya" className="mx-auto flex items-center min-h-[44px]">
            <Img src="images/logos/surya_brand_logo.webp" alt="Vagdevi's Surya" className="h-10 sm:h-11 w-auto" loading="eager" />
          </Link>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <LanguageSwitcher />
            {/* Hidden on phones — the sticky action bar carries this same CTA down there,
                and at 375px the full header row overflows the viewport. */}
            <a
              href={WA_DEALER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#C4136F] hover:bg-brand-whatsapp text-white px-[18px] py-3 rounded-full text-[11px] font-extrabold tracking-[0.11em] uppercase transition-colors duration-300"
            >
              {t.navCta}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1" id="top">
        {/* Hero */}
        <section className="relative overflow-hidden transition-colors duration-700" style={{ background: heroTheme.bg }}>
          <div className="absolute -top-[18%] -left-[10%] w-[640px] h-[640px] rounded-full blur-[100px] pointer-events-none animate-[sr-blob_11s_ease-in-out_infinite]" style={{ background: 'rgba(255,224,138,.3)' }} />
          <div className="absolute inset-0 opacity-[.06] pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[length:26px_26px]" />

          <div className="relative max-w-[1300px] mx-auto px-4 sm:px-6 pt-14 grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-center min-h-[calc(100dvh-72px)]">
            <div>
              <div className="inline-flex items-center gap-2.5 bg-white/[.16] border border-white/30 px-4 py-2.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE08A]" />
                <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-white">{t.badge}</span>
              </div>
              <h1 className="font-display text-[42px] sm:text-7xl lg:text-[88px] leading-[.98] tracking-tight text-white mb-5">
                {t.heroA}<br /><span className="italic font-medium text-[#FFE08A]">{t.heroB}</span>
              </h1>
              <p className="font-serif text-2xl leading-relaxed text-white/85 max-w-lg mb-8">{t.heroSub}</p>

              <div className="flex flex-wrap gap-2.5 mb-7">
                {(['pink', 'black'] as HeroPack[]).map((key) => {
                  const active = hero === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setHero(key)}
                      className={`cursor-pointer flex items-center gap-2.5 px-5 py-3 pl-4 rounded-full text-xs font-extrabold tracking-wide transition-all duration-300 border-[1.5px] ${active ? 'bg-white text-[#2A0F1E] border-white' : 'bg-white/10 text-white border-white/30'
                        }`}
                    >
                      <span className="w-[18px] h-[18px] rounded-full border-2 border-white/85 flex-shrink-0" style={{ background: key === 'pink' ? '#E4187C' : '#1A1A1A' }} />
                      {key === 'pink' ? 'Pink · JSR' : 'Black · HMT'}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3 items-center mb-11">
                <a
                  href={WA_HERO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white px-8 py-[19px] rounded-full text-xs font-extrabold tracking-[0.12em] uppercase shadow-[0_16px_34px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1"
                  style={{ color: heroTheme.ink }}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  {t.heroCta}
                </a>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-baseline gap-1.5 text-white">
                    <span className="font-display text-[34px] font-bold leading-none">₹75</span>
                    <span className="text-xs font-bold tracking-wider uppercase opacity-80">/ kg</span>
                  </div>
                  <span className="text-[10.5px] font-semibold tracking-wider uppercase text-white/65">{t.priceNote}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-px bg-white/[.22] border-y border-white/[.22]">
                {heroFacts.map((f) => (
                  <div key={f.l} className="px-3.5 py-[18px] transition-colors duration-700" style={{ background: heroTheme.solid }}>
                    <div className="font-display text-[23px] text-[#FFE08A] leading-none mb-1.5">{f.n}</div>
                    <div className="text-[9.5px] font-bold tracking-[0.14em] uppercase text-white/85 leading-snug">{f.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center self-stretch py-11 pb-16 min-h-[420px] sm:min-h-[520px]">
              <div className="absolute w-[min(420px,80%)] aspect-square rounded-full border border-dashed border-white/30 animate-[sr-spin_46s_linear_infinite]" />
              <div className="absolute w-[min(310px,64%)] aspect-square rounded-full bg-white/[.13] blur-[28px]" />
              <div className="absolute bottom-[88px] w-[210px] h-[26px] rounded-full bg-black/[.42] blur-[20px]" />
              {hero === 'pink' ? (
                <>
                  <Img src="images/products/surya/pack_pink_jsr.webp" loading="eager" fetchPriority="high" alt="Vagdevi's Surya JSR Lachkari Kolam, pink pack" className="relative z-[2] max-h-[min(62dvh,520px)] max-w-[88%] w-auto drop-shadow-[0_28px_50px_rgba(0,0,0,0.42)] animate-[sr-float_8s_ease-in-out_infinite]" />
                  <Img src="images/products/surya/pack_black_hmt.webp" alt="" aria-hidden="true" className="absolute right-[2%] bottom-24 z-[1] h-[min(34dvh,270px)] w-auto opacity-40 drop-shadow-[0_18px_34px_rgba(0,0,0,0.34)] animate-[sr-float2_9.5s_ease-in-out_infinite]" />
                </>
              ) : (
                <>
                  <Img src="images/products/surya/pack_black_hmt.webp" loading="eager" fetchPriority="high" alt="Vagdevi's Surya HMT boiled rice, black pack" className="relative z-[2] max-h-[min(62dvh,520px)] max-w-[88%] w-auto drop-shadow-[0_28px_50px_rgba(0,0,0,0.42)] animate-[sr-float_8s_ease-in-out_infinite]" />
                  <Img src="images/products/surya/pack_pink_jsr.webp" alt="" aria-hidden="true" className="absolute right-[2%] bottom-24 z-[1] h-[min(34dvh,270px)] w-auto opacity-40 drop-shadow-[0_18px_34px_rgba(0,0,0,0.34)] animate-[sr-float2_9.5s_ease-in-out_infinite]" />
                </>
              )}
            </div>
          </div>

          <div className="relative border-t border-white/20 bg-black/[.14] overflow-hidden py-3.5">
            <div className="flex w-max animate-[sr-marquee_32s_linear_infinite]">
              {[...SURYA_TICKER, ...SURYA_TICKER].map((w, i) => (
                <span key={i} className="inline-flex items-center gap-[22px] px-[22px] text-[10.5px] font-extrabold tracking-[0.22em] uppercase text-white/60 whitespace-nowrap">
                  {w}<span className="w-1 h-1 rounded-full bg-[#FFE08A]" />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Pink vs Black */}
        <section className="bg-[#FFF8FB] py-14 sm:py-24 px-4 sm:px-6">
          <div className="max-w-[1300px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="text-[10.5px] font-extrabold tracking-[0.26em] uppercase text-[#C4136F] mb-4">{t.pickKicker}</div>
              <h2 className="font-display text-[32px] sm:text-5xl leading-[1.04] tracking-tight text-[#2A0F1E] mb-[18px]">{t.pickTitle}</h2>
              <p className="font-serif text-xl leading-relaxed text-[#7A566A]">{t.pickSub}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {SURYA_SKUS.map((s) => (
                <div key={s.key} className="rounded-[28px] overflow-hidden relative flex flex-col transition-shadow duration-300 hover:shadow-[0_34px_66px_-30px_rgba(42,15,30,0.5)]" style={{ background: s.bg }}>
                  <div className="absolute -top-[60px] -right-[60px] w-[260px] h-[260px] rounded-full bg-white/10 blur-[48px]" />
                  <div className="relative px-9 pt-9 flex justify-between items-start gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-white/[.16] border border-white/[.26] px-3.5 py-1.5 rounded-full mb-[18px]">
                        <span className="text-[9.5px] font-extrabold tracking-[0.18em] uppercase text-white">{s.tag}</span>
                      </div>
                      <h3 className="font-display text-[30px] sm:text-4xl leading-[1.02] text-white mb-2">{s.name}</h3>
                      <div className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: s.accent }}>{s.variety}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-display text-3xl text-white leading-none">₹1,950</div>
                      <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/60 mt-1.5">26 kg bag</div>
                    </div>
                  </div>

                  <div className="relative flex justify-center px-6 pt-6 pb-2">
                    <Img src={s.img} alt={s.name} sizes="(min-width: 640px) 320px, 60vw" className="h-[min(38dvh,320px)] w-auto max-w-full drop-shadow-[0_24px_44px_rgba(0,0,0,0.45)] transition-transform duration-700 hover:-translate-y-2.5 hover:scale-[1.03]" />
                  </div>

                  <div className="relative px-9 pb-9 flex flex-col gap-5 mt-auto">
                    <p className="font-serif text-xl leading-relaxed text-white/90">{s.pitch}</p>
                    <div className="grid grid-cols-2 gap-px bg-white/20">
                      {s.specs.map((sp) => (
                        <div key={sp.k} className="px-4 py-3.5" style={{ background: s.key === 'pink' ? '#B00E5C' : '#1E1E1E' }}>
                          <div className="text-[9px] font-extrabold tracking-[0.16em] uppercase text-white/85 mb-1.5">{sp.k}</div>
                          <div className="text-[13.5px] font-semibold text-white leading-snug">{sp.v}</div>
                        </div>
                      ))}
                    </div>
                    <a
                      href={buildWhatsAppLink(`Hello, I'd like to order Surya ${s.short} (${s.variety}).\n• Pack size (10 / 26 / 30 kg): \n• Quantity: \n• Delivery city: `)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 bg-white px-6 py-4 rounded-full text-[11.5px] font-extrabold tracking-[0.12em] uppercase transition-transform duration-300 hover:-translate-y-0.5"
                      style={{ color: s.ink }}
                    >
                      {t.orderOn} {s.short} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cook it right */}
        <section className="bg-[#2A0F1E] text-white py-14 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute -top-[10%] -right-[8%] w-[520px] h-[520px] rounded-full bg-[#C4136F]/[.32] blur-[100px] animate-[sr-blob_13s_ease-in-out_infinite] pointer-events-none" />
          <div className="relative max-w-[1300px] mx-auto">
            <div className="grid lg:grid-cols-[1fr_.8fr] gap-11 items-end mb-11">
              <div>
                <div className="text-[10.5px] font-extrabold tracking-[0.26em] uppercase text-[#F7A8CE] mb-4">{t.cookKicker}</div>
                <h2 className="font-display text-[30px] sm:text-5xl leading-[1.05] tracking-tight">{t.cookTitle}</h2>
              </div>
              <p className="font-serif text-xl leading-relaxed text-white/70">{t.cookSub}</p>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {COOK_METHODS.map((m) => {
                const active = m.key === methodKey;
                return (
                  <button
                    key={m.key}
                    onClick={() => setMethodKey(m.key)}
                    className={`cursor-pointer flex-shrink-0 snap-start px-5 min-h-[44px] rounded-full text-[11px] font-extrabold tracking-[0.13em] uppercase transition-all duration-300 border ${active ? 'bg-white text-[#2A0F1E] border-white' : 'bg-white/[.06] text-white/80 border-white/[.24]'
                      }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-[.95fr_1.05fr] bg-white/5 border border-white/[.14] rounded-3xl overflow-hidden">
              <div className="p-8 sm:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-white/[.12]">
                <div>
                  <h3 className="font-display text-[26px] sm:text-4xl leading-tight mb-3">{method.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-white/70 font-light">{method.blurb}</p>
                </div>
                <div className="grid grid-cols-3 gap-px bg-white/[.16]">
                  {method.dials.map((d) => (
                    <div key={d.k} className="bg-[#2A0F1E] px-4 py-5">
                      <div className="font-display text-2xl text-[#FFE08A] leading-none mb-2">{d.v}</div>
                      <div className="text-[9.5px] font-bold tracking-[0.14em] uppercase text-white/55 leading-snug">{d.k}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <span className="w-[34px] h-px bg-[#F7A8CE]" />
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#F7A8CE]">{method.pack}</span>
                </div>
              </div>
              <div className="p-8 sm:p-10 flex flex-col gap-0.5">
                {method.steps.map((st) => (
                  <div key={st.n} className="flex gap-[18px] py-[18px] border-b border-white/10 last:border-0">
                    <span className="font-display text-[15px] font-bold text-[#F7A8CE] flex-shrink-0 w-[26px] pt-0.5">{st.n}</span>
                    <div>
                      <div className="text-[15px] font-semibold text-white mb-1.5">{st.t}</div>
                      <p className="text-[13.5px] leading-relaxed text-white/65 font-light">{st.d}</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-white/60 italic mt-4">{t.cookFoot}</p>
              </div>
            </div>
          </div>
        </section>

        {/* The full range */}
        <section className="bg-white py-14 sm:py-24 px-4 sm:px-6 border-y border-[#F6DCE8]">
          <div className="max-w-[1300px] mx-auto">
            <div className="grid lg:grid-cols-[1fr_.78fr] gap-11 items-end mb-11">
              <div>
                <div className="text-[10.5px] font-extrabold tracking-[0.26em] uppercase text-[#C4136F] mb-4">{t.rangeKicker}</div>
                <h2 className="font-display text-[30px] sm:text-5xl leading-[1.05] tracking-tight text-[#2A0F1E]">{t.rangeTitle}</h2>
              </div>
              <p className="font-serif text-xl leading-relaxed text-[#7A566A]">{t.rangeSub}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F1E2EA] border border-[#F1E2EA]">
              {SURYA_COLOURS.map((c) => (
                <div key={c.name} className="bg-white hover:bg-[#FFF8FB] transition-colors duration-300 px-[26px] py-[30px] flex flex-col gap-3.5">
                  <div className="flex items-center gap-3">
                    <span className="w-[34px] h-[34px] rounded-full flex-shrink-0 shadow-[0_6px_14px_-6px_rgba(0,0,0,0.5)]" style={{ background: c.hex }} />
                    <div>
                      <div className="font-display text-xl text-[#2A0F1E] leading-tight">{c.name}</div>
                      <div className="text-[9.5px] font-extrabold tracking-[0.16em] uppercase text-[#C4136F] mt-1">{c.variety}</div>
                    </div>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-[#7A566A] font-light">{c.d}</p>
                  <div className="mt-auto text-[10px] font-bold tracking-[0.14em] uppercase text-[#8A6B79]">{c.sizes}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-[#FFF8FB] py-14 sm:py-24 px-4 sm:px-6">
          <div className="max-w-[1300px] mx-auto">
            <div className="grid lg:grid-cols-[1.05fr_.95fr] border border-[#F1E2EA] rounded-3xl overflow-hidden bg-white mb-6">
              <div className="min-h-[300px] lg:min-h-[400px] overflow-hidden">
                <Img src="images/mill/plant_silos.webp" sizes="(min-width: 1024px) 52vw, 100vw" alt="The Vagdevi mill at Yadgarpally, Miryalaguda" className="w-full h-full object-cover object-[center_60%]" />
              </div>
              <div className="p-8 sm:p-11 flex flex-col justify-center gap-5">
                <div className="text-[10.5px] font-extrabold tracking-[0.24em] uppercase text-[#C4136F]">{t.trustKicker}</div>
                <h2 className="font-display text-2xl sm:text-4xl leading-tight text-[#2A0F1E]">{t.trustTitle}</h2>
                <p className="text-[15px] leading-relaxed text-[#5C3B4C] font-light">{t.trustBody}</p>
                <div className="flex flex-wrap gap-2.5">
                  {t.trustChips.map((chip) => (
                    <span key={chip} className="text-[10px] font-extrabold tracking-[0.13em] uppercase text-[#7C0740] bg-[#FDF0F6] border border-[#F6DCE8] px-3.5 py-2.5 rounded-full">{chip}</span>
                  ))}
                </div>
                <Link to="/mill" className="inline-flex items-center min-h-[44px] text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#2A0F1E] self-start hover:text-[#C4136F]">
                  <span className="border-b-2 border-[#C4136F] pb-1">{t.trustCta} →</span>
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-px bg-[#F1E2EA] border border-[#F1E2EA] rounded-2xl overflow-hidden">
              {SURYA_BUYERS.map((b) => (
                <div key={b.who} className="bg-white px-[34px] py-[38px] flex flex-col gap-4">
                  <div className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#C4136F]">{b.who}</div>
                  <h3 className="font-display text-2xl leading-tight text-[#2A0F1E]">{b.t}</h3>
                  <p className="text-sm leading-relaxed text-[#7A566A] font-light">{b.d}</p>
                  <a href={buildWhatsAppLink(b.waMessage)} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center min-h-[44px] text-[11px] font-extrabold tracking-[0.13em] uppercase text-[#C4136F]">
                    {b.cta} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#E4187C] to-[#7C0740] text-white py-14 sm:py-24 px-4 sm:px-6">
          <div className="absolute -top-24 -left-16 w-[460px] h-[460px] rounded-full bg-[#FFE08A]/25 blur-[90px] animate-[sr-blob_12s_ease-in-out_infinite] pointer-events-none" />
          <div className="relative max-w-2xl mx-auto text-center">
            <Img src="images/logos/surya_brand_logo.webp" alt="Vagdevi's Surya" className="h-20 w-auto mx-auto mb-7 drop-shadow-[0_10px_26px_rgba(0,0,0,0.35)]" />
            <h2 className="font-display text-[32px] sm:text-6xl leading-[1.04] tracking-tight mb-5">{t.endTitle}</h2>
            <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/85 mb-9 max-w-lg mx-auto">{t.endSub}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={WA_DEALER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white text-[#7C0740] px-8 py-5 rounded-full text-xs font-extrabold tracking-[0.12em] uppercase shadow-[0_16px_34px_-14px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {t.endCta}
              </a>
              <a href="tel:+919000416808" className="inline-flex items-center gap-2.5 border-[1.5px] border-white/40 text-white px-8 py-5 rounded-full text-xs font-extrabold tracking-[0.12em] uppercase transition-colors duration-300 hover:bg-white/10">
                +91 90004 16808
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2A0F1E] text-white/70 py-14 px-4 sm:px-6">
        <div className="max-w-[1300px] mx-auto flex flex-wrap gap-8 items-start justify-between">
          <div className="max-w-[340px] flex flex-col gap-3.5">
            <Img src="images/logos/vagdevi_footer_logo.webp" alt="Vagdevi Food Products" className="h-[42px] w-auto brightness-0 invert opacity-85 self-start" />
            <p className="font-serif text-lg leading-relaxed text-white/60">Surya is a brand of Vagdevi Food Products Private Limited — milled at Yadgarpally, Miryalaguda, Telangana.</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#F7A8CE] mb-1">Order &amp; enquiries</div>
            <a href={WA_DEALER_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] text-sm text-white font-semibold hover:text-[#F7A8CE]">WhatsApp · +91 90004 16808</a>
            <a href="mailto:info@vagdevifoods.com" className="inline-flex items-center min-h-[44px] text-[13.5px] text-white/70 hover:text-[#F7A8CE]">info@vagdevifoods.com</a>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#F7A8CE] mb-1">Compliance</div>
            <span className="text-[12.5px]">FSSAI 13618008000475</span>
            <span className="text-[12.5px]">ISO 22000:2018</span>
            <Link to="/" className="inline-flex items-center min-h-[44px] text-[12.5px] text-[#F7A8CE] font-semibold hover:text-white">The mill behind Surya →</Link>
          </div>
        </div>
        <div className="max-w-[1300px] mx-auto mt-[34px] border-t border-white/10 pt-[22px] flex flex-wrap gap-3.5 justify-between text-[11.5px] text-white/55">
          <span>© 2026 Vagdevi Food Products Private Limited.</span>
          <span>Love in every bite.</span>
        </div>
      </footer>

      {/* Bottom padding on mobile keeps the sticky action bar from covering the footer. */}
      <div className="h-[68px] lg:hidden" aria-hidden="true" />
      <WhatsAppFAB link={WA_DEALER_LINK} />
      <MobileActionBar whatsappLink={WA_DEALER_LINK} whatsappLabel={t.navCta} />
    </div>
  );
};

export default SuryaPage;
