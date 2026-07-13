
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedProducts = () => {
  const { t, language } = useLanguage();
  
  const products = [
    {
      id: "1",
      name: t('products.floral_extravagance'),
      price: 349.99,
      image: "/ParfumFloralExtravagance.jpg",
      category: "Parfum",
      isNew: true,
      rating: 5,
      reviewCount: 12,
      description: t('products.floral_extravagance_desc'),
      features: [
        t('products.top_notes'),
        t('products.middle_notes'),
        t('products.base_notes'),
        t('products.concentration'),
        t('products.longevity')
      ]
    },
    {
      id: "2",
      name: t('products.luxury_cream'),
      price: 129.99,
      image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cremă",
      isSale: true,
      discount: 15,
      rating: 4,
      reviewCount: 28,
      description: t('products.luxury_cream_desc'),
      features: [
        t('products.intensive_hydration'),
        t('products.non_greasy'),
        t('products.hyaluronic_acid'),
        t('products.skin_barrier'),
        t('products.dermatologically_tested')
      ]
    },
    {
      id: "3",
      name: t('products.radiance_serum'),
      price: 189.99,
      image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80",
      category: "Îngrijire",
      rating: 5,
      reviewCount: 19,
      description: t('products.radiance_serum_desc'),
      features: [
        t('products.stabilized_vitamin_c'),
        t('products.pigment_spots'),
        t('products.luminosity'),
        t('products.antioxidant'),
        t('products.light_texture')
      ]
    },
    {
      id: "4",
      name: t('products.intense_body_cream'),
      price: 399.99,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      category: "Cremă",
      isSale: true,
      discount: 10,
      rating: 4,
      reviewCount: 16,
      description: t('products.intense_body_cream_desc'),
      features: [
        t('products.dry_skin'),
        t('products.shea_argan'),
        t('products.delicate_fragrance'),
        t('products.quick_absorption'),
        t('products.premium_packaging')
      ]
    }
  ];

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
          {products.map((product) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${parseInt(product.id) * 0.1}s` }}>
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
