
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { getAllProducts, getProductStock, stockUpdateEmitter } from '@/utils/jsonDb';

const Parfumuri = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        
        // Filter only perfume products
        const perfumeProducts = Object.values(allProducts).filter((product: any) => 
          product.category && product.category.toLowerCase().includes('parfum')
        );
        
        // Add stock information to products
        const productsWithStock = await Promise.all(perfumeProducts.map(async (product: any) => {
          const stock = await getProductStock(product.id);
          return { ...product, stock };
        }));
        
        setProducts(productsWithStock);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching perfume products:", error);
        setLoading(false);
      }
    };
    
    fetchProducts();
    
    // Set up stock update listener
    const unsubscribe = stockUpdateEmitter.subscribe((productId, newStock) => {
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId ? { ...product, stock: newStock } : product
        )
      );
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  const staticProductsData = [
    {
      id: "parfum-floral-extravagance",
      name: "Parfum Floral Extravagance",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Parfum Floral",
      isNew: true,
      rating: 5,
      slug: "parfum-floral-extravagance"
    },
    {
      id: "parfum-oriental-mystique",
      name: "Parfum Oriental Mystique",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Parfum Oriental",
      isSale: true,
      discount: 10,
      rating: 4,
      slug: "parfum-oriental-mystique"
    },
    {
      id: "parfum-fresh-citrus",
      name: "Parfum Fresh Citrus",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Parfum Citric",
      rating: 4,
      slug: "parfum-fresh-citrus"
    },
    {
      id: "parfum-woody-elegance",
      name: "Parfum Woody Elegance",
      price: 419.99,
      image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Parfum Lemnos",
      rating: 5,
      slug: "parfum-woody-elegance"
    },
    {
      id: "parfum-aquatic-breeze",
      name: "Parfum Aquatic Breeze",
      price: 329.99,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Parfum Acvatic",
      isSale: true,
      discount: 15,
      rating: 4,
      slug: "parfum-aquatic-breeze"
    },
    {
      id: "parfum-spicy-noir",
      name: "Parfum Spicy Noir",
      price: 449.99,
      image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Parfum Condimentat",
      isNew: true,
      rating: 5,
      slug: "parfum-spicy-noir"
    }
  ];

  // Merge static product data with dynamic stock data
  const displayProducts = staticProductsData.map(staticProduct => {
    const dynamicProduct = products.find(p => p.id === staticProduct.id);
    return {
      ...staticProduct,
      stock: dynamicProduct?.stock || 0
    };
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-beauty-magenta/30 to-beauty-hotpink/30 p-8 md:p-12 mb-12 animate-fade-in">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Parfumuri excepționale</h1>
              <p className="text-lg text-gray-700 mb-6">
                Esențe care te inspiră, parfumuri care îți definesc personalitatea și te însoțesc pe parcursul zilei.
              </p>
              <Button className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white">
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
            {loading ? (
              // Loading skeletons
              [...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse rounded-lg">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              displayProducts.map((product) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${parseInt(product.id.toString().replace(/\D/g, '1')) * 0.1}s` }}>
                  <ProductCard 
                    {...product}
                    slug={product.slug}
                    stockCount={product.stock}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Parfumuri;
