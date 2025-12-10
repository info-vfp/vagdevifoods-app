
import React from 'react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import { RICE_VARIETIES_DATA, RICE_BRANDS_DATA, OTHER_PRODUCTS_DATA } from '../constants';
import type { RiceBrandInfo } from '../types';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Our Products - Vagdevi Food Products",
    "description": "Explore our wide range of premium rice varieties and food products. Fresh, authentic, and high quality.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": RICE_BRANDS_DATA.map((brand, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": brand.name,
          "description": brand.description,
          "image": brand.logoUrl
        }
      }))
    }
  };

  return (
    <div className="bg-brand-bg font-sans pt-12 md:pt-16"> {/* Added top padding here */}
      <SEO
        title="Our Products - Vagdevi Food Products"
        description="Explore our wide range of premium rice varieties and food products. Fresh, authentic, and high quality."
        keywords="rice products, indian rice, vagdevi products"
        structuredData={structuredData}
      />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Our Extensive Product Range"
          subtitle="Discover high-Quality rice brands, varieties, and by-products, all backed by our commitment to Trust and reliable Supply."
        />

        {/* Rice Brands Section */}
        <section className="py-12 md:py-16"> {/* Adjusted padding */}
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-heading mb-12 md:mb-16 text-center">Our Esteemed Brands: A Testament to Quality & Trust</h2>
          <div className="space-y-16 md:space-y-20">
            {RICE_BRANDS_DATA.map((brand: RiceBrandInfo, index: number) => (
              <div
                key={brand.name}
                className={`bg-brand-bg-alt p-6 md:p-8 lg:p-10 rounded-xl shadow-subtle overflow-hidden flex flex-col lg:grid lg:grid-cols-12 lg:gap-10 items-center ${index % 2 !== 0 ? 'lg:grid-flow-row-dense' : ''}`}
              >
                <div className={`lg:col-span-7 ${index % 2 !== 0 ? 'lg:col-start-6' : ''}`}>
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {brand.packagingImageUrls.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`${brand.name} packaging ${idx + 1}`}
                        className="rounded-lg shadow-card-hover object-contain w-full h-auto max-h-80 sm:max-h-96 transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
                <div className={`lg:col-span-5 mt-8 lg:mt-0 text-center lg:text-left ${index % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <img src={brand.logoUrl} alt={`${brand.name} Logo`} className="h-20 md:h-24 w-auto mb-5 object-contain mx-auto lg:mx-0 transition-transform duration-300 hover:scale-105" />
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-text-heading">{brand.name}</h3>
                  <p className="text-md text-brand-saffron font-medium my-2">{brand.tagline}</p>
                  <p className="text-text-body text-base leading-relaxed mb-6">{brand.description}</p>
                  <Link
                    to={`/contact?brand=${encodeURIComponent(brand.name)}`}
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-brand-espresso bg-brand-saffron hover:bg-brand-gold shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-saffron"
                  >
                    Enquire about {brand.name}
                  </Link>
                  <p className="mt-6 text-xs text-text-muted">Product packaging may vary. Images are illustrative.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rice Varieties Section */}
        <section className="py-20 sm:py-28 bg-brand-bg-alt rounded-xl shadow-subtle my-12 md:my-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-heading mb-6 text-center">Our Diverse Rice Varieties: Quality in Every Grain</h2>
          <p className="text-center text-text-body text-base mb-12 md:mb-16 max-w-2xl mx-auto px-4 leading-relaxed">
            All our premium rice varieties are available in both <strong>Steam Rice</strong> and <strong>Double Boiled Rice</strong> options, catering to diverse culinary preferences. Each grain promises consistent Quality and taste, ensured by our dependable Supply.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
            {RICE_VARIETIES_DATA.map((variety) => (
              <ProductCard
                key={variety.name}
                name={variety.name}
                description={variety.description}
                imageUrl={variety.imageUrl}
                details={variety.types}
                linkPath={`/contact?product=${encodeURIComponent(variety.name)}`}
              />
            ))}
          </div>
        </section>


      </div>
    </div>
  );
};

export default ProductsPage;
