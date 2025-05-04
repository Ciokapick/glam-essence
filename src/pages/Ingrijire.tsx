
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { ingrijireProducts } from '@/data/ingrijireProducts';
import { getAllProducts } from '@/utils/jsonDb';

const Ingrijire = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch the products from the database (localStorage)
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        
        // Filter and map only ingrijire products with their actual stock levels
        const ingrijireProductsList = Object.keys(ingrijireProducts).map(slug => {
          const productWithStock = allProducts[slug] || ingrijireProducts[slug];
          return {
            ...ingrijireProducts[slug],
            stock: productWithStock?.stock || 0,
            slug: slug // Ensure slug is available for ProductCard
          };
        });
        
        setProducts(ingrijireProductsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to static data if there's an error
        const staticProducts = Object.values(ingrijireProducts).map(product => ({
          ...product,
          slug: product.slug
        }));
        setProducts(staticProducts);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-40 bg-gray-200 rounded-2xl mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square bg-gray-200 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${parseInt(product.id.split('-')[1]) * 0.1}s` }}>
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

export default Ingrijire;
