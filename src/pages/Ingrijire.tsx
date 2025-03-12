
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Ingrijire = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      id: "1",
      name: "Ser facial Radiance",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Ser",
      rating: 5
    },
    {
      id: "2",
      name: "Mască facială detox",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Mască",
      isNew: true,
      rating: 4
    },
    {
      id: "3",
      name: "Spumă de curățare",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Curățare",
      rating: 4
    },
    {
      id: "4",
      name: "Tonic purificator",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Tonic",
      rating: 4
    },
    {
      id: "5",
      name: "Ulei de față nutritiv",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1617075062639-5c9ae153b45f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Ulei",
      isSale: true,
      discount: 20,
      rating: 5
    },
    {
      id: "6",
      name: "Exfoliant enzimatic",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Exfoliant",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-beauty-hotpink/30 to-beauty-hotpink/10 p-8 md:p-12 mb-12 animate-fade-in">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Produse de îngrijire premiate</h1>
              <p className="text-lg text-gray-700 mb-6">
                O rutină completă pentru toți pașii necesari unui ten perfect și sănătos.
              </p>
              <Button className="bg-beauty-hotpink text-white hover:bg-beauty-hotpink/90">
                Descoperă colecția
              </Button>
            </div>
          </div>
          
          {/* Filter section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Produse de îngrijire</h2>
              <p className="text-muted-foreground">Rutina completă pentru frumusețea ta</p>
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
            <Button variant="outline" className="border-beauty-hotpink/30 hover:bg-beauty-hotpink/5 hover:border-beauty-hotpink/50">
              Încarcă mai multe
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ingrijire;
