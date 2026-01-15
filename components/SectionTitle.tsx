import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  textAlignment?: 'text-center' | 'text-left' | 'text-right';
  // animationDelay prop removed
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, textAlignment = 'text-center' }) => {
  return (
    <div className={`mb-12 md:mb-20 font-sans ${textAlignment}`}>
      <h2 className={`text-3xl font-serif font-bold text-brand-primary sm:text-4xl lg:text-5xl tracking-tight`}>{title}</h2>
      {subtitle && <p className={`mt-4 max-w-2xl text-lg text-text-muted sm:mt-5 leading-relaxed ${textAlignment === 'text-center' ? 'mx-auto' : ''}`}>{subtitle}</p>}
      <div className={`mt-6 h-1 w-24 bg-brand-secondary rounded-full opacity-80 ${textAlignment === 'text-center' ? 'mx-auto' : ''}`}
      ></div>
    </div>
  );
};

export default SectionTitle;