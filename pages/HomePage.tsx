import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';
import { RICE_VARIETIES_DATA, RICE_BRANDS_DATA, CORE_VALUES_DATA, MARKETS_DATA, CULINARY_GUIDE_DATA, SHORT_COMPANY_NAME } from '../constants';
import type { CompanyHighlight } from '../types';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Vagdevi Food Products",
      "url": "https://info-vfp.github.io/vagdevifoods-app",
      "logo": "https://info-vfp.github.io/vagdevifoods-app/images/ui/logo-bg-removed.png",
      "description": "Premium quality rice and food products made with care.",
      "sameAs": []
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Vagdevi Food Products",
      "alternateName": "Vagdevi Foods",
      "url": "https://info-vfp.github.io/vagdevifoods-app"
    }
  ];

  return (
    <div className="bg-brand-bg font-sans overflow-x-hidden selection:bg-brand-secondary selection:text-white">
      <SEO
        title="Vagdevi Food Products - The Essence of Premium Rice"
        description="Experience the finest rice, cultivated with care and processed for perfection. Vagdevi Food Products brings you the taste of tradition and trust."
        keywords="premium rice, food products, Vagdevi Foods, authentic rice, Indian rice brands"
        structuredData={structuredData}
      />

      <HeroSection />

      {/* Core Values Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-bg-alt/30 -skew-y-3 transform origin-top-left -z-10 scale-110"></div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction='up' width="100%">
            <SectionTitle
              title="Our Commitment to Excellence"
              subtitle={`At ${SHORT_COMPANY_NAME}, we believe that true quality is a promise kept. Our operations are guided by unwavering principles that ensure every grain tells a story of purity.`}
              textAlignment="text-center"
            />
          </ScrollReveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES_DATA.map((value: CompanyHighlight, index: number) => (
              <ScrollReveal key={value.title} delay={index * 0.1} direction='up' className="h-full">
                <div
                  className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-premium hover:shadow-glass-hover transition-all duration-500 ease-out hover:-translate-y-2 border border-brand-bg-alt group h-full flex flex-col items-center text-center"
                >
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-brand-secondary blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-brand-bg text-brand-secondary mx-auto border border-brand-secondary/20 group-hover:scale-110 transition-transform duration-500">
                      {value.icon || <span className="text-4xl">🌾</span>}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-primary mb-3">{value.title}</h3>
                  <p className="mt-2 text-sm text-text-body leading-relaxed font-light">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section (Brands) */}
      <section className="py-24 sm:py-32 bg-brand-bg relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal width="100%">
            <SectionTitle
              title="Our Premium Collections"
              subtitle={`Discover the distinct character of our signature brands, ${RICE_BRANDS_DATA.map(b => b.name).join(' and ')}. Crafted for those who appreciate the finer things in life.`}
            />
          </ScrollReveal>

          <div className="mt-16 grid gap-16 md:grid-cols-2">
            {RICE_BRANDS_DATA.map((brand, index) => (
              <ScrollReveal key={brand.name} direction={index % 2 === 0 ? 'left' : 'right'} delay={0.2}>
                <div
                  className="bg-white rounded-3xl shadow-premium overflow-hidden flex flex-col items-center p-10 md:p-14 text-center hover:shadow-glass-hover transition-all duration-500 ease-out border border-brand-bg-alt/50 group h-full"
                >
                  <div className="h-28 md:h-36 w-full flex items-center justify-center mb-6 p-6 bg-brand-bg-alt/30 rounded-2xl group-hover:bg-brand-bg-alt/50 transition-colors">
                    <img src={brand.logoUrl} alt={`${brand.name} Logo`} className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm" />
                  </div>
                  <h3 className="text-4xl font-display font-bold text-brand-primary mb-2">{brand.name}</h3>
                  <p className="text-sm text-brand-secondary font-bold tracking-[0.2em] uppercase mb-8">{brand.tagline}</p>

                  <div className="my-2 w-full flex justify-center relative">
                    {/* Podium Effect */}
                    <div className="absolute bottom-0 w-48 h-12 bg-black/5 rounded-[100%] blur-xl transform scale-y-50"></div>
                    {brand.packagingImageUrls.slice(0, 1).map((url, idx) => (
                      <div key={idx} className="relative z-10 transition-transform duration-700 group-hover:scale-105">
                        <img src={url} alt={`${brand.name} packaging ${idx + 1}`} className="object-contain h-72 md:h-80 w-auto drop-shadow-2xl" />
                      </div>
                    ))}
                  </div>

                  <p className="text-text-body text-lg mb-8 mt-8 flex-grow px-2 leading-relaxed font-light max-w-md mx-auto">{brand.description}</p>

                  <Link to="/products" className="inline-flex items-center px-10 py-4 border-2 border-brand-primary text-sm font-bold uppercase tracking-wider rounded-full text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:scale-105">
                    Explore {brand.name}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Culinary Inspiration / Guide Section */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-bg-alt/30 -skew-x-12 transform origin-top-right z-0"></div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal width="100%">
            <SectionTitle
              title="Find Your Perfect Match"
              subtitle="Every dish deserves the right grain. Explore our culinary guide to elevate your favorite recipes."
              textAlignment="text-center"
            />
          </ScrollReveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {CULINARY_GUIDE_DATA.map((item, index) => (
              <ScrollReveal key={item.dish} delay={index * 0.1} direction='up' className="h-full">
                <div className="bg-brand-bg rounded-2xl p-8 border border-brand-secondary/10 hover:border-brand-secondary/30 transition-all duration-300 hover:shadow-lg h-full flex flex-col group">
                  <div className="text-6xl mb-6 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-2xl font-display font-bold text-brand-primary mb-2">{item.dish}</h3>
                  <p className="text-sm font-bold text-brand-secondary uppercase tracking-wider mb-4">Best With: {item.recommendation}</p>
                  <p className="text-text-body font-light leading-relaxed flex-grow">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Varieties Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal width="100%">
            <SectionTitle
              title="Curated Rice Varieties"
              subtitle="Explore our selection of premium rice varieties, processed to perfection. Each grain reflects our dedication to culinary excellence."
            />
          </ScrollReveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {RICE_VARIETIES_DATA.slice(0, 4).map((variety, index) => (
              <ScrollReveal key={variety.name} delay={index * 0.1} direction='up' className="h-full">
                <ProductCard
                  name={variety.name}
                  description={variety.description}
                  imageUrl={variety.imageUrl}
                  details={variety.types}
                  linkPath="/products"
                />
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link to="/products" className="inline-flex items-center text-lg font-bold text-brand-primary hover:text-brand-secondary group transition-all duration-300">
              <span className="border-b-2 border-transparent group-hover:border-brand-secondary transition-all duration-300">View All Rice Varieties</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Presence Snippet */}
      <section className="py-24 sm:py-32 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary opacity-90"></div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal width="100%">
            <h2 className="text-4xl font-display font-bold sm:text-5xl mb-6 text-white">Serving Key Markets Across India</h2>
            <p className="mt-6 text-xl text-brand-bg-alt/80 max-w-3xl mx-auto leading-relaxed font-light">
              Our distribution network proudly delivers Quality rice and ensures reliable Supply to states like <span className="text-brand-secondary font-medium">{MARKETS_DATA.slice(0, 3).map(m => m.name).join(', ')}</span>, and we are continually expanding.
            </p>
            <div className="mt-12">
              <Link
                to="/contact"
                className="inline-block bg-brand-secondary text-brand-primary font-bold py-4 px-12 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl uppercase tracking-wider"
              >
                Partner With Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
