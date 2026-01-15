
import React from 'react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import { MARKETS_DATA, SHORT_COMPANY_NAME, ABOUT_PAGE_BG_ILLUSTRATION_URL } from '../constants';
import type { MarketInfo } from '../types';
import { MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const MarketCard: React.FC<MarketInfo & { icon?: React.ReactNode }> = ({ name, description, icon }) => {
  return (
    <div className="bg-brand-bg p-6 rounded-lg shadow-subtle border border-gray-200/70 hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 ease-in-out flex flex-col">
      <div className="flex items-start mb-4">
        {icon || <MapPinIcon className="h-7 w-7 text-brand-orange mr-3 mt-0.5 flex-shrink-0" />}
        <h3 className="text-lg font-serif font-semibold text-text-heading">{name}</h3>
      </div>
      <p className="text-sm text-text-body leading-relaxed flex-grow">{description}</p>
    </div>
  );
};

const MarketsPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vagdevi Food Products",
    "areaServed": MARKETS_DATA.map(m => m.name),
    "description": "Delivering Quality rice across major Indian states."
  };

  return (
    <div className="bg-brand-bg font-sans pt-24 md:pt-32"> {/* Increased top padding to prevent Navbar overlap */}
      <SEO
        title="Markets & Presence - Vagdevi Food Products"
        description="Find Vagdevi Food Products in markets near you. We serve customers across the region with our premium food products."
        keywords="rice distributors, food supply chain, telangana rice market, karnataka rice market, maharashtra rice market"
        structuredData={structuredData}
      />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Our Extensive Market Network"
          subtitle={`Delivering Quality rice from ${SHORT_COMPANY_NAME} across major Indian states, building Trust through reliable Supply.`}
        />

        <section className="py-12 md:py-16"> {/* Adjusted padding */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {MARKETS_DATA.map((market) => (
              <MarketCard
                key={market.name}
                name={market.name}
                description={market.description}
                icon={<MapPinIcon className="h-7 w-7 text-brand-orange mr-3 mt-0.5 flex-shrink-0" />}
              />
            ))}
            <div className="bg-brand-bg-alt p-6 rounded-lg shadow-subtle border border-brand-orange/30 flex flex-col items-center text-center hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-brand-orange/10 text-brand-orange mb-4">
                <BuildingOffice2Icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-text-heading mb-2">Expanding Horizons</h3>
              <p className="text-sm text-text-body leading-relaxed flex-grow">
                We are continuously working to expand our presence, strengthening our Supply chain to deliver Quality rice and build Trust with a wider B2B customer base across India.
              </p>
            </div>
          </div>
        </section>

        <section
          className="py-20 sm:py-28 bg-brand-bg-alt rounded-xl shadow-subtle my-12 md:my-16 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(249,245,239,0.92), rgba(249,245,239,0.92)), url(${ABOUT_PAGE_BG_ILLUSTRATION_URL})` }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
              <div className="md:col-span-3 text-center md:text-left">
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-text-heading mb-5">Partner with Us for Quality & Trust</h3>
                <p className="text-text-body text-base mb-4 leading-relaxed">
                  {SHORT_COMPANY_NAME} is committed to building strong, long-term relationships with wholesalers, distributors, and large-scale retailers. We offer reliable Supply, consistent Quality, and competitive pricing, fostering mutual Trust.
                </p>
                <p className="text-text-body text-base mb-8 leading-relaxed">
                  Interested in becoming a distribution partner or have bulk purchase inquiries? We are eager to explore new business opportunities and collaborations based on shared values of Quality and Trust.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-brand-orange hover:bg-opacity-90 shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
                >
                  Contact Our Sales Team
                </Link>
              </div>
              <div className="md:col-span-2 hidden md:flex justify-center items-center">
                <BuildingOffice2Icon className="h-48 w-48 text-brand-orange opacity-10" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketsPage;
