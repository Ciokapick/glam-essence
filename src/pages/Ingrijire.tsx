
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { getAllProducts, getProductStock, stockUpdateEmitter } from '@/utils/jsonDb';

const Ingrijire = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        
        // Filter only skincare products
        const skinCareProducts = Object.values(allProducts).filter((product: any) => 
          ['ser', 'spumă', 'tonic', 'ulei', 'mască'].some(type => 
            product.category && product.category.toLowerCase().includes(type.toLowerCase())
          )
        );
        
        // Add stock information to products
        const productsWithStock = await Promise.all(skinCareProducts.map(async (product: any) => {
          const stock = await getProductStock(product.id);
          return { ...product, stock };
        }));
        
        setProducts(productsWithStock);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skincare products:", error);
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
      id: "ser-facial-radiance",
      name: "Ser facial Radiance",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1619451427882-6aaaded0cc61?w=800&auto=format&fit=crop&q=80",
      category: "Ser",
      rating: 5,
      slug: "ser-facial-radiance"
    },
    {
      id: "masca-faciala-detox",
      name: "Mască facială detox",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Mască",
      isNew: true,
      rating: 4,
      slug: "masca-faciala-detox"
    },
    {
      id: "spuma-de-curatare",
      name: "Spumă de curățare",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      category: "Curățare",
      rating: 4,
      slug: "spuma-de-curatare"
    },
    {
      id: "tonic-purificator",
      name: "Tonic purificator",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Tonic",
      rating: 4,
      slug: "tonic-purificator"
    },
    {
      id: "ulei-de-fata-nutritiv",
      name: "Ulei de față nutritiv",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?w=800&auto=format&fit=crop&q=80",
      category: "Ulei",
      isSale: true,
      discount: 20,
      rating: 5,
      slug: "ulei-de-fata-nutritiv"
    },
    {
      id: "crema-nutritiva-de-noapte",
      name: "Cremă nutritivă de noapte",
      price: 89.99,
      image: "https://plus.unsplash.com/premium_photo-1661520861264-f1ece30dbfbf?w=800&auto=format&fit=crop&q=80",
      category: "Cremă",
      rating: 4,
      slug: "crema-nutritiva-de-noapte"
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

export default Ingrijire;
