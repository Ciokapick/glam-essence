
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Parfumuri = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      id: "1",
      name: "Parfum Floral Extravagance",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1546030869-e4b4c3e37aaa?q=80&w=774&auto=format&fit=crop",
      category: "Parfum Floral",
      isNew: true,
      rating: 5
    },
    {
      id: "2",
      name: "Parfum Oriental Mystique",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1592945403407-9edf9a51ad8b?q=80&w=774&auto=format&fit=crop",
      category: "Parfum Oriental",
      isSale: true,
      discount: 10,
      rating: 4
    },
    {
      id: "3",
      name: "Parfum Fresh Citrus",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=774&auto=format&fit=crop",
      category: "Parfum Citric",
      rating: 4
    },
    {
      id: "4",
      name: "Parfum Woody Elegance",
      price: 419.99,
      image: "https://images.unsplash.com/photo-1588405748681-258899429c1e?q=80&w=774&auto=format&fit=crop",
      category: "Parfum Lemnos",
      rating: 5
    },
    {
      id: "5",
      name: "Parfum Aquatic Breeze",
      price: 329.99,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=774&auto=format&fit=crop",
      category: "Parfum Acvatic",
      isSale: true,
      discount: 15,
      rating: 4
    },
    {
      id: "6",
      name: "Parfum Spicy Noir",
      price: 449.99,
      image: "https://images.unsplash.com/photo-1643266330913-2dd0ca14035d?q=80&w=774&auto=format&fit=crop",
      category: "Parfum Condimentat",
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
          <div className="rounded-2xl bg-gradient-to-r from-primary/30 to-beauty-lavender/30 p-8 md:p-12 mb-12 animate-fade-in">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Parfumuri excepționale</h1>
              <p className="text-lg text-gray-700 mb-6">
                Esențe care te inspiră, parfumuri care îți definesc personalitatea și te însoțesc pe parcursul zilei.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Descoperă colecția
              </Button>
            </div>
          </div>
          
          {/* Filter section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Toate parfumurile</h2>
              <p className="text-muted-foreground">Găsește parfumul perfect pentru tine</p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtrează
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sortează
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
          
          {/* Load more button */}
          <div className="text-center">
            <Button variant="outline" className="border-primary/30 hover:bg-primary/5 hover:border-primary/50">
              Încarcă mai multe
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Parfumuri;
