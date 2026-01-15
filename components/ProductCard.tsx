import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
  name: string;
  description: string;
  imageUrl: string;
  details?: string[];
  linkPath?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, imageUrl, details, linkPath = "/contact" }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-white/80 backdrop-blur-md rounded-2xl shadow-glass overflow-hidden flex flex-col border border-brand-bg-alt/50 font-sans h-full"
    >
      <div className="overflow-hidden relative h-72">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full object-cover object-center"
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
      </div>

      <div className="p-8 flex-grow flex flex-col relative z-20">
        <h3 className="text-3xl font-display font-bold text-brand-primary mb-3">{name}</h3>
        <p className="text-text-body text-base mb-6 flex-grow leading-relaxed font-light">{description}</p>

        {details && details.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-3">Available Varieties</h4>
            <div className="flex flex-wrap gap-2">
              {details.map((detail, index) => (
                <span key={index} className="text-xs font-medium bg-brand-bg text-brand-dark px-3 py-1.5 rounded-full border border-brand-bg-alt/80">
                  {detail}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link to={linkPath} className="mt-auto inline-flex items-center text-sm text-brand-secondary hover:text-brand-primary font-bold tracking-wide uppercase transition-colors group/link">
          View Details <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300">&rarr;</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;