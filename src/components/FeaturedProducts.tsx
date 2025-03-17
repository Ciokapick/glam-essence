
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const products = [
    {
      id: "1",
      name: "Parfum Floral Extravagance",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Parfum",
      isNew: true,
      rating: 5
    },
    {
      id: "2",
      name: "Cremă hidratantă Luxury",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cremă",
      isSale: true,
      discount: 15,
      rating: 4
    },
    {
      id: "3",
      name: "Ser facial Radiance",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80",
      category: "Îngrijire",
      rating: 5
    },
    {
      id: "4",
      name: "Cremă de corp Intense",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      category: "Cremă",
      isSale: true,
      discount: 10,
      rating: 4
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-beauty-rose/10">
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
          <Link to="/parfumuri">
            <Button className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white">
              Vezi toate produsele
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
