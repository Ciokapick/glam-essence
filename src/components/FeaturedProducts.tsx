import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { products as catalogue } from '@/data/products';

// Produsele vitrinei vin din catalog, nu redefinite aici: altfel ProductCard
// nu primeste slug si deduce unul din nume, care nu exista in catalog.
// Ordinea alterneaza lumile de culoare - magenta, albastru, chihlimbar, bleumarin.
const FEATURED_SLUGS = [
  'parfum-floral-extravagance',
  'crema-hidratanta-luxury',
  'ser-facial-radiance',
  'crema-nutritiva-de-noapte',
] as const;

const FeaturedProducts = () => {
  const { t, language } = useLanguage();

  const products = FEATURED_SLUGS.map((slug) => catalogue[slug]).filter(Boolean);

  return (
    <section id="featured" className="bg-[#fffdfb] py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-6 border-b border-[#281922]/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.3em] text-[#9c5967]">
              {t('featured.title')}
            </p>
            <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[1.02] tracking-[-.035em] text-[#281922] md:text-6xl">
              {language === 'ro'
                ? 'Esențiale pentru ritualul tău zilnic.'
                : 'Essentials for your daily ritual.'}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#74666d]">
            {t('featured_products.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div key={product.slug} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <Link to="/parfumuri">
            <Button className="h-12 rounded-none bg-[#281922] px-7 text-[11px] uppercase tracking-[.16em] text-white hover:bg-[#4a2d3b]">
              {t('featured_products.view_all')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
