
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

const FeaturedProducts = () => {
  const products = [
    {
      id: "1",
      name: "Parfum Floral Extravagance",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1546030869-e4b4c3e37aaa?q=80&w=774&auto=format&fit=crop",
      category: "Parfum",
      isNew: true,
      rating: 5
    },
    {
      id: "2",
      name: "Cremă hidratantă Luxury",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=774&auto=format&fit=crop",
      category: "Cremă",
      isSale: true,
      discount: 15,
      rating: 4
    },
    {
      id: "3",
      name: "Ser facial Radiance",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=774&auto=format&fit=crop",
      category: "Îngrijire",
      rating: 5
    },
    {
      id: "4",
      name: "Parfum Oriental Mystique",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1592945403407-9edf9a51ad8b?q=80&w=774&auto=format&fit=crop",
      category: "Parfum",
      isSale: true,
      discount: 10,
      rating: 4
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-beauty-mint/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Produse populare</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descoperă selecția noastră de produse premium, create pentru a-ți îmbunătăți rutina zilnică de frumusețe.
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
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Vezi toate produsele
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
