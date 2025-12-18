
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Parfumuri = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      id: "1",
      name: t('parfumuri.floral_extravagance'),
      price: 349.99,
      image: "/ParfumFloralExtravagance.jpg",
      category: t('parfumuri.floral_category'),
      isNew: true,
      rating: 5
    },
    {
      id: "2",
      name: t('parfumuri.oriental_mystique'),
      price: 399.99,
      image: "/ParfumOrientalMystique.png",
      category: t('parfumuri.oriental_category'),
      isSale: true,
      discount: 10,
      rating: 4
    },
    {
      id: "3",
      name: t('parfumuri.fresh_citrus'),
      price: 299.99,
      image: "/ParfumFreshCitrus.png",
      category: t('parfumuri.citrus_category'),
      rating: 4
    },
    {
      id: "4",
      name: t('parfumuri.woody_elegance'),
      price: 419.99,
      image: "/ParfumWoodyElegance.jpg",
      category: t('parfumuri.woody_category'),
      rating: 5
    },
    {
      id: "5",
      name: t('parfumuri.aquatic_breeze'),
      price: 329.99,
      image: "/ParfumAquaticBreeze.avif",
      category: t('parfumuri.aquatic_category'),
      isSale: true,
      discount: 15,
      rating: 4
    },
    {
      id: "6",
      name: t('parfumuri.spicy_noir'),
      price: 449.99,
      image: "/ParfumSpicyNoir.avif",
      category: t('parfumuri.spicy_category'),
      isNew: true,
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-beauty-magenta/30 to-beauty-hotpink/30 p-8 md:p-12 mb-12 animate-fade-in">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('parfumuri.title')}</h1>
              <p className="text-lg text-gray-700 mb-6">
                {t('parfumuri.subtitle')}
              </p>
              <Button className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white">
                {t('parfumuri.discover_collection')}
              </Button>
            </div>
          </div>
          
          {/* Filter section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold">{t('parfumuri.all_perfumes')}</h2>
              <p className="text-muted-foreground">{t('parfumuri.find_perfect')}</p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {t('parfumuri.filter')}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {t('parfumuri.sort')}
              </Button>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
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

export default Parfumuri;
