
import React from 'react';
import { Link } from 'react-router-dom';
import { SHORT_COMPANY_NAME, COMPANY_TAGLINE, HERO_BG_URL, HERO_PRODUCT_BAG_1_URL, HERO_PRODUCT_BAG_2_URL } from '../constants';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-brand-bg overflow-hidden font-sans">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0">
        <img 
          src={HERO_BG_URL} 
          alt="Scenic rice paddy field background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-brand-bg/30 md:from-brand-bg/95 md:via-brand-bg/70 md:to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left Text Content */}
          <div className="md:col-span-7 lg:col-span-6 text-center md:text-left">
            <h1 className="font-serif text-4xl font-bold text-text-heading sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              {SHORT_COMPANY_NAME}
            </h1>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-orange mt-2 md:mt-3">
              {COMPANY_TAGLINE}
            </h2>
            <p className="mt-5 max-w-xl mx-auto md:mx-0 text-base sm:text-lg text-text-body md:mt-6 leading-relaxed">
              Discover the true essence of premium rice, built on a foundation of uncompromised Quality, enduring Trust, and reliable Supply. We bring nourishment and flavor to your table.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-brand-orange hover:bg-opacity-90 shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
              >
                Explore Our Rice
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-brand-brown-medium text-base font-medium rounded-lg text-brand-brown-dark bg-transparent hover:bg-brand-brown-medium hover:text-white shadow-sm transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-brown-medium"
              >
                Enquire Now
              </Link>
            </div>
          </div>

          {/* Right Image Content - Simplified Product Bags */}
          <div className="md:col-span-5 lg:col-span-6 mt-12 md:mt-0 flex justify-center md:justify-end items-center">
            <div className="relative w-full max-w-md lg:max-w-lg h-72 md:h-80 lg:h-[400px]"> {/* Adjusted height */}
              {/* Product bags arranged more cleanly */}
              <div className="absolute inset-0 flex justify-center items-center space-x-4 sm:space-x-6"> {/* Adjusted spacing */}
                  <img 
                    src={HERO_PRODUCT_BAG_1_URL} 
                    alt="Dwaraka Rice Bag" 
                    className="relative w-36 sm:w-40 lg:w-48 object-contain shadow-2xl transition-transform duration-300 hover:scale-105"
                  />
                  <img 
                    src={HERO_PRODUCT_BAG_2_URL} 
                    alt="Surya Rice Bag" 
                    className="relative w-36 sm:w-40 lg:w-48 object-contain shadow-2xl transition-transform duration-300 hover:scale-105"
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
