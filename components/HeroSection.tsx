import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroCarousel from './HeroCarousel';
import { SHORT_COMPANY_NAME, COMPANY_TAGLINE, HERO_PRODUCT_BAG_1_URL, HERO_PRODUCT_BAG_2_URL, RICE_BRANDS_DATA } from '../constants';

const HeroSection: React.FC = () => {
  // Combine Hero images and brand images for the carousel
  // Prioritize Hero images as they are likely high quality cutouts
  const carouselImages = [
    // Add ALL pack images from each brand
    ...RICE_BRANDS_DATA.flatMap((brand) =>
      brand.packagingImageUrls.length > 0
        ? brand.packagingImageUrls.map((url, idx) => ({
          id: `brand-${brand.name}-${idx}`,
          url: url,
          alt: `${brand.name} Rice ${idx + 1}`
        }))
        : []
    )
  ];

  return (
    <div className="relative bg-brand-bg overflow-hidden font-sans min-h-screen flex items-center pt-24 pb-10 lg:py-0">
      {/* Abstract Background Elements - Cleaner and Lighter */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-bg-alt/50 -skew-x-12 transform origin-top-right z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-24 w-full">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-20 items-center">
          {/* Left Text Content */}
          <div className="md:col-span-7 lg:col-span-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-sm sm:text-2xl text-brand-secondary mb-3 font-semibold tracking-wider uppercase">
                {COMPANY_TAGLINE}
              </h2>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl font-bold text-brand-primary sm:text-6xl lg:text-7xl leading-tight tracking-tight mb-4"
            >
              The Gold Standard <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-yellow-600">
                of Premium Rice
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-3 max-w-lg mx-auto md:mx-0 text-base sm:text-lg text-text-body leading-relaxed font-light"
            >
              Experience the purity and tradition in every grain. Vagdevi Foods brings you the finest selection of rice, processed with care and delivered with trust.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-brand-secondary hover:bg-yellow-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                View Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-brand-primary border-2 border-brand-primary/10 hover:border-brand-primary/30 rounded-full hover:bg-gray-50 transition-all duration-300"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Right Image Content - Carousel */}
          <div className="md:col-span-5 lg:col-span-6 flex justify-center items-center relative mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full max-w-lg"
            >
              {/* Product Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-secondary/20 rounded-full blur-[80px] -z-10"></div>

              <HeroCarousel images={carouselImages} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
