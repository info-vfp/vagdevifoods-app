import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { COMPANY_STRENGTHS_DATA, SHORT_COMPANY_NAME, ABOUT_PROMOTER_IMAGE_URL, MARKETS_DATA, COMPANY_ADDRESS } from '../constants';
import type { CompanyHighlight } from '../types';
import { MapPinIcon } from '@heroicons/react/24/outline'; 

const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-bg font-sans pt-12 md:pt-16"> {/* Added top padding here */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title={`About ${SHORT_COMPANY_NAME}`}
          subtitle={`Founded on Quality, built on Trust, and committed to reliable Supply since 2017.`}
        />

        {/* Promoter & Company Story Section */}
        <section className="py-12 md:py-16"> {/* Adjusted padding */}
          <div className="bg-brand-bg-alt shadow-subtle rounded-xl overflow-hidden lg:grid lg:grid-cols-12 lg:items-stretch">
            <div className="lg:col-span-5">
              <img 
                src={ABOUT_PROMOTER_IMAGE_URL} 
                alt="Vagdevi Food Products leadership and operations" 
                className="object-cover w-full h-72 lg:h-full transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-text-heading mb-5">Harvesting Quality, Sowing Trust, Ensuring Supply</h3>
              <div className="space-y-4 text-text-body text-base leading-relaxed">
                <p>
                  Incorporated in 2017, {SHORT_COMPANY_NAME} has rapidly established itself as a significant player in the rice milling and processing sector. Based in the heart of Telangana at {COMPANY_ADDRESS.split(',')[0]}, we are strategically positioned to source the finest paddy, ensuring top Quality from the very start.
                </p>
                <p>
                  Our foundation is built upon the extensive experience of our promoters, who bring over three decades of invaluable knowledge. This deep-rooted expertise guides our operations, from meticulous procurement and advanced processing techniques that guarantee Quality, to building lasting relationships founded on Trust and a commitment to dependable Supply.
                </p>
              </div>
              
              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="font-serif text-xl font-semibold text-text-heading mb-2">Our Mission</h4>
                  <p className="text-text-body text-base leading-relaxed">
                    To consistently provide high-Quality rice products that meet diverse customer needs through reliable Supply chains, upholding ethical practices that build Trust and contributing to the agricultural ecosystem. We aim to enhance our digital presence and online visibility nationwide.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-xl font-semibold text-text-heading mb-2">Our Vision</h4>
                  <p className="text-text-body text-base leading-relaxed">
                    To be a leading and Trusted name in the Indian rice industry, recognized for our unwavering commitment to Quality, innovation in Supply, and sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Strengths Section */}
        <section className="py-20 sm:py-28 bg-brand-bg-alt rounded-xl shadow-subtle my-12 md:my-16">
            <SectionTitle 
              title="Our Core Strengths" 
              subtitle={`What makes ${SHORT_COMPANY_NAME} a preferred partner in delivering Quality, Trust, and Supply.`} 
            />
            <div className="mt-12 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-6">
                {COMPANY_STRENGTHS_DATA.map((highlight: CompanyHighlight) => (
                <div 
                    key={highlight.title} 
                    className="bg-brand-bg p-6 rounded-lg shadow-subtle border border-gray-200/70 hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 ease-in-out flex flex-col items-center text-center"
                >
                    <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full bg-brand-orange/10 text-brand-orange mb-5">
                        {React.cloneElement(highlight.icon as React.ReactElement, { className: "h-7 w-7 md:h-8 md:w-8" })}
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-text-heading mb-2">{highlight.title}</h3>
                    <p className="text-sm text-text-body flex-grow leading-relaxed">{highlight.description}</p>
                </div>
                ))}
            </div>
        </section>
        
        {/* Market Presence Section */}
        <section className="py-20 sm:py-28">
            <SectionTitle 
              title="Our Market Presence" 
              subtitle="Delivering Quality and ensuring reliable Supply across the nation, building Trust with every grain." 
            />
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5 items-stretch justify-center">
                {MARKETS_DATA.map((market) => (
                    <div 
                        key={market.name} 
                        className="p-4 bg-brand-bg-alt rounded-lg text-center transition-all duration-300 ease-in-out hover:shadow-subtle hover:bg-brand-orange/5 transform hover:scale-105 border border-transparent hover:border-brand-orange/30 flex flex-col items-center justify-center"
                    >
                        <MapPinIcon className="h-7 w-7 text-brand-orange mx-auto mb-2 flex-shrink-0"/>
                        <p className="text-sm font-medium text-text-body">{market.name}</p>
                    </div>
                ))}
            </div>
            <p className="mt-10 text-text-body text-base text-center max-w-3xl mx-auto leading-relaxed">
                {SHORT_COMPANY_NAME} is on a steady growth trajectory, driven by our commitment to Quality, customer Trust, and efficient Supply. We are continuously investing in enhancing our storage and processing facilities to meet increasing demand.
            </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;