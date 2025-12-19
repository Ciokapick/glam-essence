
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedProducts = () => {
  const { t } = useLanguage();
  
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
    <section className="py-20 bg-gradient-to-b from-[#FAFCFD] to-[#FAFCFD]/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('featured.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('featured_products.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${parseInt(product.id) * 0.1}s` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/parfumuri">
            <Button className="bg-beauty-coral hover:bg-beauty-coral/90 text-white">
              {t('featured_products.view_all')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
