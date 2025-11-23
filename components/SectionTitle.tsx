import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  textAlignment?: 'text-center' | 'text-left' | 'text-right';
  // animationDelay prop removed
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, textAlignment = 'text-center' }) => {
  return (
    <div className={`${textAlignment} mb-12 md:mb-20 font-sans`}>
      <h2 className="text-3xl font-serif font-bold text-brand-espresso sm:text-4xl lg:text-5xl tracking-tight">{title}</h2>
      {subtitle && <p className={`mt-4 max-w-2xl ${textAlignment === 'text-center' ? 'mx-auto' : ''} text-lg text-text-muted sm:mt-5 leading-relaxed`}>{subtitle}</p>}
       <div className={`mt-6 h-1 w-24 ${textAlignment === 'text-center' ? 'mx-auto' : ''} bg-brand-gold rounded-full opacity-80`} 
            style={{ transformOrigin: textAlignment === 'text-center' ? 'center' : textAlignment === 'text-left' ? 'left' : 'right' }}
       ></div>
    </div>
  );
};

export default SectionTitle;