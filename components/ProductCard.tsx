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
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:-translate-y-1 flex flex-col border border-amber-100 font-sans"
      // Removed animate-fadeInUp and style={{ animationDelay }}
    >
      <div className="overflow-hidden">
        <img 
            className="w-full h-56 object-cover object-center transition-transform duration-300 ease-in-out"
            src={imageUrl} 
            alt={name} 
            loading="lazy" 
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-serif font-bold text-brand-brown-dark mb-2">{name}</h3>
        <p className="text-brand-text-on-light text-sm mb-4 flex-grow">{description}</p>
        {details && details.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-brand-brown-medium uppercase tracking-wider mb-1">Available as:</h4>
            <ul className="flex flex-wrap gap-2">
              {details.map((detail, index) => (
                <li key={index} className="text-xs bg-brand-orange/20 text-brand-brown-medium px-2 py-1 rounded-full transition-colors duration-300 hover:bg-brand-orange/30">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}
         <Link to={linkPath} className="mt-auto inline-block text-sm text-brand-orange hover:text-brand-brown-dark font-medium transition-all duration-300 group">
            Learn More <span className="group-hover:ml-1 transition-all duration-300">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;