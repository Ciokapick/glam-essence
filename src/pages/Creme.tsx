
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';

const Creme = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayProducts = Object.values(products).filter(product => {
    const id = Number(product.id);
    return id >= 7 && id <= 17;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="grid overflow-hidden rounded-3xl border border-beauty-coral/20 bg-[#f6e9e5] md:grid-cols-[0.95fr_1.05fr] mb-12 animate-fade-in">
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#7b263d]">Glam Essence Skincare</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('creme.title')}</h1>
              <p className="text-lg text-gray-700 mb-6">
                {t('creme.subtitle')}
              </p>
              <Button className="w-fit bg-[#7b263d] text-white hover:bg-[#641d31]" onClick={() => document.getElementById('skincare-collection')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('creme.discover_collection')}
              </Button>
            </div>
            <div className="grid min-h-[340px] grid-cols-2 bg-[#281922]" aria-label="Lumile cromatice Glam Essence">
              {[
                ['/products/skincare/editorial/face-cream.webp', 'Hydrate'],
                ['/products/skincare/editorial/face-serum.webp', 'Radiance'],
                ['/products/skincare/editorial/detox-mask.webp', 'Purify'],
                ['/products/skincare/editorial/night-cream.webp', 'Night Repair'],
              ].map(([image, label]) => (
                <div key={label} className="group relative min-h-[170px] overflow-hidden">
                  <img src={image} alt={label} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute bottom-3 left-3 text-[9px] font-semibold uppercase tracking-[.22em] text-white drop-shadow">{label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Filter section */}
          <div id="skincare-collection" className="flex scroll-mt-28 flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold">{t('creme.all_creams')}</h2>
              <p className="text-muted-foreground">{t('creme.hydration_solutions')}</p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {t('creme.filter')}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {t('creme.sort')}
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

export default Creme;
