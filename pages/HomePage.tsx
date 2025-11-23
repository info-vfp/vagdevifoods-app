
import React from 'react';
import HeroSection from '../components/HeroSection';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import { RICE_VARIETIES_DATA, RICE_BRANDS_DATA, CORE_VALUES_DATA, MARKETS_DATA, WHY_CHOOSE_US_BG_URL, SHORT_COMPANY_NAME, FARMER_MASCOT_URL } from '../constants';
import type { CompanyHighlight } from '../types';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="bg-brand-bg font-sans overflow-x-hidden">
      <HeroSection />

      {/* Core Values Section */}
      {/* Core Values Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 bg-brand-bg-alt/50 skew-y-3 transform origin-top-left -z-10"></div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Commitment to Excellence"
            subtitle={`At ${SHORT_COMPANY_NAME}, our operations are guided by our core principles: Uncompromising Quality, Enduring Trust, and Dependable Supply.`}
          />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES_DATA.map((value: CompanyHighlight, index: number) => (
              <div
                key={value.title}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass hover:shadow-glass-hover transition-all duration-500 ease-out hover:-translate-y-2 border border-brand-bg-alt text-center group"
              >
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-brand-cream text-brand-saffron mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                  {value.icon || <span className="text-4xl">🌾</span>}
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-espresso mb-3">{value.title}</h3>
                <p className="mt-2 text-sm text-text-body leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section (Brands) */}
      <section className="py-24 sm:py-32 bg-brand-bg-alt relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-saffron/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-espresso/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            title="Our Premium Rice Brands"
            subtitle={`Discover excellence with ${RICE_BRANDS_DATA.map(b => b.name).join(' and ')}, founded on Quality and Trust.`}
          />
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            {RICE_BRANDS_DATA.map((brand, index) => (
              <div
                key={brand.name}
                className="bg-white rounded-2xl shadow-premium overflow-hidden flex flex-col items-center p-10 md:p-12 text-center hover:shadow-glass-hover transition-all duration-500 ease-out hover:-translate-y-2 border border-brand-bg-alt group"
              >
                <div className="h-24 md:h-32 w-full flex items-center justify-center mb-6 p-4 bg-brand-bg-alt/30 rounded-xl group-hover:bg-brand-bg-alt/50 transition-colors">
                  <img src={brand.logoUrl} alt={`${brand.name} Logo`} className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-brand-espresso mb-2">{brand.name}</h3>
                <p className="text-sm text-brand-saffron font-bold tracking-widest uppercase mb-4">{brand.tagline}</p>
                <p className="text-text-body text-base mb-8 flex-grow px-4 leading-relaxed">{brand.description}</p>
                <div className="grid grid-cols-2 gap-6 my-6 w-full">
                  {brand.packagingImageUrls.slice(0, 2).map((url, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-all duration-500">
                      <div className="absolute inset-0 bg-brand-espresso/0 group-hover:bg-brand-espresso/5 transition-colors z-10"></div>
                      <img src={url} alt={`${brand.name} packaging ${idx + 1}`} className="object-contain h-48 w-full bg-white transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  ))}
                </div>
                <Link to="/products" className="mt-6 inline-flex items-center px-8 py-3 border border-brand-espresso text-sm font-semibold rounded-full text-brand-espresso hover:bg-brand-espresso hover:text-white transition-all duration-300 transform hover:scale-105">
                  Explore {brand.name} <span className="ml-2">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "From the fields to your plate" / Why Choose Us Section */}
      <section
        className="py-32 sm:py-40 bg-cover bg-center bg-no-repeat bg-fixed relative"
        style={{ backgroundImage: `url(${WHY_CHOOSE_US_BG_URL})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/90 via-brand-bg/80 to-brand-bg/90"></div>
        <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <SectionTitle
            title="From Our Fields to Your Plate"
            subtitle="Our commitment to Quality and Trust ensures that every grain embodies purity and flavor. We guarantee a reliable Supply of wholesome rice."
          />
          <img src={FARMER_MASCOT_URL} alt="Smiling Farmer Mascot" className="mx-auto my-8 h-32 w-auto rounded-full shadow-glass hover:shadow-glass-hover transition-transform duration-500 hover:scale-110 border-4 border-white" />
          <p className="text-text-body text-xl leading-relaxed mb-10 font-light">
            {SHORT_COMPANY_NAME} combines generations of farming wisdom with modern milling techniques. Our dedication to fair practices and sustainable agriculture supports our promise of Quality, fosters Trust, and ensures dependable Supply.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-brand-saffron hover:bg-brand-gold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Learn About Our Process
          </Link>
        </div>
      </section>

      {/* Popular Varieties Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Popular Rice Varieties"
            subtitle="Each variety reflects our dedication to Quality, available in Steam and Double Boiled options to meet your needs."
          />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {RICE_VARIETIES_DATA.slice(0, 4).map((variety, index) => (
              <ProductCard
                key={variety.name}
                name={variety.name}
                description={variety.description}
                imageUrl={variety.imageUrl}
                details={variety.types}
                linkPath="/products"
              />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/products" className="inline-flex items-center text-lg font-semibold text-brand-saffron hover:text-brand-gold group transition-all duration-300 transform hover:scale-105">
              View All Rice Varieties <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Presence Snippet */}
      <section className="py-24 sm:py-32 bg-brand-espresso text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-serif font-bold sm:text-5xl mb-6">Serving Key Markets Across India</h2>
          <p className="mt-6 text-xl text-brand-bg-alt/80 max-w-3xl mx-auto leading-relaxed font-light">
            Our distribution network proudly delivers Quality rice and ensures reliable Supply to states like {MARKETS_DATA.slice(0, 3).map(m => m.name).join(', ')}, and we are continually expanding.
          </p>
          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-block bg-brand-saffron text-brand-espresso font-bold py-4 px-10 rounded-full shadow-lg hover:bg-brand-gold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
