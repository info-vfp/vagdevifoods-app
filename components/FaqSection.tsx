import React from 'react';
import ScrollReveal from './ScrollReveal';
import type { FaqItem } from '../content/faq';

interface FaqSectionProps {
  items: FaqItem[];
  kicker: string;
  title: string;
  intro?: string;
}

/**
 * Questions and answers as native <details> disclosures.
 *
 * Native rather than a scripted accordion on purpose: it works before the JavaScript arrives,
 * is keyboard- and screen-reader-accessible for free, and every answer stays in the
 * pre-rendered HTML — collapsed answers are still read by search and AI crawlers, which is
 * half the reason this section exists. The FAQPage structured data is built from the same
 * array, so the markup can never claim an answer the page does not show.
 */
const FaqSection: React.FC<FaqSectionProps> = ({ items, kicker, title, intro }) => (
  <section className="bg-white border-t border-brand-line py-12 sm:py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="faq-title">
    <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-8 lg:gap-14">
      <ScrollReveal width="100%">
        <div className="lg:sticky lg:top-28">
          <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-brand-orange-ink mb-4">{kicker}</div>
          <h2 id="faq-title" className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-gray-900 mb-5">{title}</h2>
          {intro && <p className="font-serif text-[17px] sm:text-xl leading-relaxed text-gray-600">{intro}</p>}
        </div>
      </ScrollReveal>
      <div className="border-t border-brand-line">
        {items.map((item) => (
          <details key={item.q} className="group border-b border-brand-line">
            <summary className="flex items-start justify-between gap-5 py-5 sm:py-6 min-h-[44px] cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/50">
              <h3 className="font-display text-lg sm:text-xl leading-snug text-gray-900">{item.q}</h3>
              {/* A plus that turns into a cross when open — no icon font, no script. */}
              <span aria-hidden="true" className="relative mt-1.5 w-4 h-4 flex-shrink-0 text-brand-orange-ink transition-transform duration-300 group-open:rotate-45">
                <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-current" />
                <span className="absolute inset-y-0 start-1/2 w-[2px] -translate-x-1/2 rtl:translate-x-1/2 bg-current" />
              </span>
            </summary>
            <p className="pb-6 -mt-1 pe-9 text-[15px] leading-relaxed text-gray-600">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
