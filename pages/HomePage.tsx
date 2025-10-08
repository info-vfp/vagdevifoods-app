import React from 'react';
import HeroSection from '../components/HeroSection';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import { RICE_VARIETIES_DATA, RICE_BRANDS_DATA, CORE_VALUES_DATA, MARKETS_DATA, WHY_CHOOSE_US_BG_URL, SHORT_COMPANY_NAME, FARMER_MASCOT_URL } from '../constants';
import type { CompanyHighlight } from '../types';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <>
      <title>Vagdevi Foods - Premium Quality Rice and Food Products</title>
      <meta name="description" content="Vagdevi Foods offers premium quality rice varieties like HMT, JSR, and RNR, along with other food products. We are committed to providing healthy and delicious food products to our customers." />
      <div className="bg-brand-bg font-sans">
        <HeroSection />

        {/* Core Values Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle 
              title="Our Commitment to Excellence"
              subtitle={`At ${SHORT_COMPANY_NAME}, our operations are guided by our core principles: Uncompromising Quality, Enduring Trust, and Dependable Supply.`}
            />
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {CORE_VALUES_DATA.map((value: CompanyHighlight, index: number) => (
                <div 
                  key={value.title} 
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 border border-amber-100 text-center"
                >
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-orange/10 text-brand-orange mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                    {value.icon || <span className="text-3xl">🌾</span>}
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-brand-brown-dark">{value.title}</h3>
                  <p className="mt-2 text-sm text-brand-text-on-light">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section (Brands) */}
        <section className="py-16 sm:py-24 bg-brand-orange/5">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle 
              title="Our Premium Rice Brands" 
              subtitle={`Discover excellence with ${RICE_BRANDS_DATA.map(b => b.name).join(' and ')}, founded on Quality and Trust.`} 
            />
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {RICE_BRANDS_DATA.map((brand, index) => (
                <div 
                  key={brand.name} 
                  className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col items-center p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1"
                >
                  <img src={brand.logoUrl} alt={`${brand.name} Logo`} className="h-20 md:h-24 w-auto mb-4 object-contain transition-transform duration-300 hover:scale-105"/>
                  <h3 className="text-2xl font-serif font-semibold text-brand-brown-dark mb-1">{brand.name}</h3>
                  <p className="text-sm text-brand-orange font-medium mb-3">{brand.tagline}</p>
                  <p className="text-brand-text-on-light text-sm mb-4 flex-grow px-4">{brand.description}</p>
                   <div className="grid grid-cols-2 gap-4 my-4">
                      {brand.packagingImageUrls.slice(0,2).map((url, idx) => (
                          <img key={idx} src={url} alt={`${brand.name} packaging ${idx + 1}`} className="rounded-md shadow-md object-contain h-40 w-full transition-transform duration-300 hover:scale-105" />
                      ))}
                  </div>
                  <Link to="/products" className="mt-4 inline-block text-sm font-medium text-brand-orange hover:text-brand-brown-dark group transition-all duration-300 transform hover:scale-105">
                    Explore {brand.name} <span className="group-hover:ml-1 transition-transform duration-300">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* "From the fields to your plate" / Why Choose Us Section */}
        <section 
          className="py-16 sm:py-24 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `linear-gradient(rgba(255,251,235,0.85), rgba(255,251,235,0.85)), url(${WHY_CHOOSE_US_BG_URL})` }}
        >
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionTitle 
              title="From Our Fields to Your Plate"
              subtitle="Our commitment to Quality and Trust ensures that every grain embodies purity and flavor. We guarantee a reliable Supply of wholesome rice."
            />
            <img src={FARMER_MASCOT_URL} alt="Smiling Farmer Mascot" className="mx-auto my-6 h-24 w-auto rounded-full shadow-lg transition-transform duration-300 hover:scale-110"/>
            <p className="text-brand-text-on-light leading-relaxed mb-8">
              {SHORT_COMPANY_NAME} combines generations of farming wisdom with modern milling techniques. Our dedication to fair practices and sustainable agriculture supports our promise of Quality, fosters Trust, and ensures dependable Supply.
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-orange hover:bg-opacity-80 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Learn About Our Process
            </Link>
          </div>
        </section>

         {/* Popular Rice Varieties Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle 
              title="Our Popular Rice Varieties" 
              subtitle="Each variety reflects our dedication to Quality, available in Steam and Double Boiled options to meet your needs." 
            />
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
             <div className="text-center mt-12">
              <Link to="/products" className="text-base font-medium text-brand-orange hover:text-brand-brown-dark group transition-all duration-300 transform hover:scale-105">
                View All Rice Varieties <span className="group-hover:ml-1 transition-transform duration-300">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

         {/* Market Presence Snippet */}
        <section className="py-16 sm:py-24 bg-brand-brown-medium text-brand-text-on-dark">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold sm:text-4xl">Serving Key Markets Across India</h2>
            <p className="mt-4 text-lg text-amber-100 max-w-3xl mx-auto">
              Our distribution network proudly delivers Quality rice and ensures reliable Supply to states like {MARKETS_DATA.slice(0,3).map(m => m.name).join(', ')}, and we are continually expanding.
            </p>
            <div className="mt-10">
              <Link
                to="/contact" 
                className="inline-block bg-brand-orange text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;