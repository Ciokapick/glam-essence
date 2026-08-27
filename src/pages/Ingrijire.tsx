
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';

const BODY_CARE_SLUGS = [
  'crema-de-maini-silk',
  'crema-de-corp-intense',
  'crema-anticelulitică',
] as const;

const BodyCare = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayProducts = BODY_CARE_SLUGS.map((slug) => products[slug]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="mb-12 grid overflow-hidden rounded-3xl border border-[#281922]/10 bg-[#f4eee9] animate-fade-in md:grid-cols-[0.95fr_1.05fr]">
            <div className="flex max-w-2xl flex-col justify-center p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('ingrijire.title')}</h1>
              <p className="text-lg text-gray-700 mb-6">
                {t('ingrijire.subtitle')}
              </p>
              <Button
                className="w-fit bg-[#7b263d] text-white hover:bg-[#641d31]"
                onClick={() => document.getElementById('body-care-collection')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('ingrijire.discover_collection')}
              </Button>
            </div>
            <div className="grid min-h-[330px] grid-cols-2 bg-[#281922]">
              <img src="/products/skincare/campaign/hand-cream.webp" alt="Hand care" className="h-full w-full object-cover" />
              <img src="/products/skincare/campaign/body-cream.webp" alt="Body care" className="h-full w-full object-cover" />
            </div>
          </div>
          
          {/* Filter section */}
          <div id="body-care-collection" className="flex scroll-mt-28 flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold">{t('ingrijire.skincare_products')}</h2>
              <p className="text-muted-foreground">{t('ingrijire.complete_routine')}</p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {t('ingrijire.filter')}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {t('ingrijire.sort')}
              </Button>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {displayProducts.map((product) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${parseInt(product.id) * 0.1}s` }}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BodyCare;
