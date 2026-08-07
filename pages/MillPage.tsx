import React, { useState } from 'react';
import SEO from '../components/SEO';
import Img from '../components/Img';
import ScrollReveal from '../components/ScrollReveal';
import WhatsAppIcon from '../components/WhatsAppIcon';
import Carousel from '../components/Carousel';
import { WHATSAPP_MILL_VISIT_LINK } from '../constants';
import { MILL_STAGES, MILL_MACHINERY, MILL_MOSAIC } from '../content/millJourney';
import { MILL_GALLERY } from '../content/millGallery';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { buildGraph, breadcrumbSchema, ORGANISATION_ID } from '../content/structuredData';
import { absoluteUrl } from '../content/seo';
import { useLanguage } from '../context/LanguageContext';

const MillPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];
  const [stageIndex, setStageIndex] = useState(0);
  const stage = MILL_STAGES[stageIndex];

  const structuredData = buildGraph(
    { '@type': 'WebPage', name: 'The Mill', url: absoluteUrl('/mill'), about: { '@id': ORGANISATION_ID } },
    breadcrumbSchema('/mill')
  );

  return (
    <div className="bg-brand-cream font-sans">
      <SEO
        keywords="rice mill tour, rice milling process, paddy to rice journey, Yadgarpally mill"
        structuredData={structuredData}
      />

      <section className="relative text-white overflow-hidden min-h-[74dvh] flex items-end">
        <Img src="images/mill/gate_sign.webp" loading="eager" fetchPriority="high" sizes="100vw" alt="The gate of Vagdevi Food Products, Yadgarpally" className="absolute inset-0 w-full h-full object-cover object-[center_62%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/[.95] via-brand-dark/[.35] to-brand-dark/[.55]" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 w-full">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-brand-secondary" />
            <span className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#E8CE74]">{t.millKicker}</span>
          </div>
          <h1 className="font-display text-[34px] sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-3xl mb-6">{t.millTitle}</h1>
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/85 max-w-xl">{t.millSub}</p>
        </div>
      </section>

      <section className="bg-brand-dark text-white py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="mb-9">
              <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#E8CE74] mb-4">{t.journeyKicker}</div>
              <h2 className="font-display text-[28px] sm:text-5xl leading-[1.06] tracking-tight max-w-3xl">{t.journeyTitle}</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal width="100%">
            {/* One swipeable row on phones instead of eight buttons wrapping into a block.
                Negative margin lets it bleed to the screen edge so it reads as scrollable. */}
            <div className="flex gap-1.5 mb-7 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {MILL_STAGES.map((s, i) => {
                const active = i === stageIndex;
                return (
                  <button
                    key={s.n}
                    onClick={() => setStageIndex(i)}
                    className={`cursor-pointer flex-shrink-0 snap-start flex items-center gap-2 px-[18px] min-h-[44px] rounded-full text-[10.5px] font-extrabold tracking-[0.12em] uppercase transition-all duration-300 border ${active
                      ? 'bg-brand-secondary text-brand-dark border-brand-secondary'
                      : 'bg-white/[.06] text-white/85 border-white/[.22] hover:border-white/40'
                      }`}
                  >
                    {/* /55 measured 3.31:1 on the gold pill — /70 keeps the number visibly
                        secondary to the label while clearing AA at this size. */}
                    <span className={`font-display text-xs ${active ? 'text-brand-dark/70' : 'text-brand-secondary'}`}>{s.n}</span>
                    {s.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal width="100%">
            <div className="grid lg:grid-cols-[1.35fr_.65fr] border border-white/[.16] overflow-hidden bg-white/[.04]">
              <div className="relative min-h-[320px] lg:min-h-[520px] overflow-hidden bg-[#060B1C]">
                <Img src={stage.src} alt={stage.title} sizes="(min-width: 1024px) 830px, 100vw" className="w-full h-full object-cover" style={{ objectPosition: stage.pos }} />
                <div className="absolute left-0 bottom-0 p-7 bg-gradient-to-t from-[#060B1C]/90 to-transparent w-full">
                  <div className="font-display text-5xl text-brand-secondary/90 leading-none">{stage.n}</div>
                </div>
              </div>
              <div className="p-8 sm:p-10 flex flex-col gap-6 border-l-0 lg:border-l border-white/[.14]">
                <div>
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#E8CE74] mb-3.5">{stage.where}</div>
                  <h3 className="font-display text-[26px] sm:text-4xl leading-tight mb-4">{stage.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-white/75 font-light">{stage.body}</p>
                </div>
                <div className="mt-auto flex flex-col gap-px bg-white/[.16]">
                  {stage.facts.map((f) => (
                    <div key={f.k} className="bg-brand-dark px-[18px] py-4 flex justify-between gap-4 items-baseline">
                      <span className="text-[9.5px] font-extrabold tracking-[0.16em] uppercase text-white/50">{f.k}</span>
                      <span className="font-display text-lg text-white text-right">{f.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-brand-cream py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="grid lg:grid-cols-[1fr_.8fr] gap-11 items-end mb-11">
              <div>
                <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-brand-gold-ink mb-4">{t.machineryKicker}</div>
                <h2 className="font-display text-[28px] sm:text-5xl leading-[1.06] tracking-tight text-gray-900">{t.machineryTitle}</h2>
              </div>
              <p className="font-serif text-xl leading-relaxed text-gray-600">{t.machinerySub}</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-6 mb-6">
            {MILL_MACHINERY.map((m) => (
              <ScrollReveal key={m.t} width="100%">
                <div className="bg-white border border-brand-line flex flex-col h-full hover:shadow-[0_26px_50px_-26px_rgba(10,18,48,0.3)] transition-shadow duration-300">
                  <div className="h-[300px] overflow-hidden border-b border-brand-line bg-brand-cream group">
                    <Img src={m.src} alt={m.t} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: m.pos }} />
                  </div>
                  <div className="p-7 flex flex-col gap-3 flex-1">
                    <div className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-brand-gold-ink">{m.tag}</div>
                    <h3 className="font-display text-2xl leading-tight text-gray-900">{m.t}</h3>
                    <p className="text-sm leading-relaxed text-gray-500 font-light">{m.d}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-line border border-brand-line">
            {MILL_MOSAIC.map((p) => (
              <ScrollReveal key={p.cap} width="100%">
                <div className="relative h-[230px] overflow-hidden bg-brand-cream group">
                  <Img src={p.src} alt={p.cap} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: p.pos }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/[.82] to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-[11.5px] font-semibold text-white leading-snug">{p.cap}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-brand-line py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal width="100%">
            <div className="mb-9">
              <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-brand-gold-ink mb-4">More photos</div>
              <h2 className="font-display text-[28px] sm:text-5xl leading-[1.06] tracking-tight text-gray-900 max-w-3xl">More from the mill floor.</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal width="100%">
            <Carousel slides={MILL_GALLERY} />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-brand-cream border-t border-brand-line py-20 px-4 sm:px-6 lg:px-8">
        <ScrollReveal width="100%">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-[28px] sm:text-5xl leading-[1.06] tracking-tight text-gray-900 mb-[18px]">{t.visitTitle}</h2>
            <p className="font-serif text-xl leading-relaxed text-gray-600 mb-8 max-w-lg mx-auto">{t.visitSub}</p>
            <a
              href={WHATSAPP_MILL_VISIT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-brand-dark text-white px-8 py-[19px] rounded-full text-xs font-extrabold tracking-[0.13em] uppercase transition-all duration-300 hover:bg-brand-whatsapp hover:-translate-y-1"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {t.visitCta}
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default MillPage;
