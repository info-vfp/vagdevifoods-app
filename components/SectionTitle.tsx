import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  textAlignment?: 'text-center' | 'text-left' | 'text-right';
  // animationDelay prop removed
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, textAlignment = 'text-center' }) => {
  return (
    <div className={`${textAlignment} mb-10 md:mb-16 font-sans`}>
      <h2 className="text-3xl font-serif font-bold text-brand-brown-dark sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className={`mt-3 max-w-2xl ${textAlignment === 'text-center' ? 'mx-auto' : ''} text-lg text-brand-text-on-light sm:mt-4`}>{subtitle}</p>}
       <div className={`mt-4 h-1 w-24 ${textAlignment === 'text-center' ? 'mx-auto' : ''} bg-brand-orange rounded-full transition-all duration-500 ease-out transform`} 
            // Removed animation classes and style properties for underline animation
            style={{ transformOrigin: textAlignment === 'text-center' ? 'center' : textAlignment === 'text-left' ? 'left' : 'right' }}
       ></div>
    </div>
  );
};

export default SectionTitle;