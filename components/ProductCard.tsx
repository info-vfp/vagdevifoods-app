import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  name: string;
  description: string;
  imageUrl: string;
  details?: string[];
  linkPath?: string; // Optional link path
  // animationDelay prop removed as animations are removed
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, imageUrl, details, linkPath = "/contact" }) => {
  return (
    <div
      className="group bg-white rounded-xl shadow-premium overflow-hidden transition-all duration-500 ease-out hover:shadow-glass-hover hover:-translate-y-2 flex flex-col border border-brand-bg-alt font-sans"
    >
      <div className="overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-espresso/0 group-hover:bg-brand-espresso/5 transition-colors duration-500 z-10"></div>
        <img
          className="w-full h-64 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-2xl font-serif font-bold text-brand-espresso mb-3 group-hover:text-brand-brown-light transition-colors">{name}</h3>
        <p className="text-text-body text-base mb-6 flex-grow leading-relaxed">{description}</p>
        {details && details.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">Available as:</h4>
            <ul className="flex flex-wrap gap-2">
              {details.map((detail, index) => (
                <li key={index} className="text-xs font-medium bg-brand-bg-alt text-brand-brown-light px-3 py-1.5 rounded-full border border-brand-bg-alt group-hover:border-brand-gold/30 transition-colors">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link to={linkPath} className="mt-auto inline-flex items-center text-sm text-brand-saffron hover:text-brand-gold font-semibold tracking-wide transition-all duration-300 group/link">
          View Details <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;