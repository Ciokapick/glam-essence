
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { getAllProducts, getProductStock, stockUpdateEmitter } from '@/utils/jsonDb';

const Creme = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        
        // Filter only cream products
        const cremeProducts = Object.values(allProducts).filter((product: any) => 
          product.category.toLowerCase().includes('crem')
        );
        
        // Add stock information to products
        const productsWithStock = await Promise.all(cremeProducts.map(async (product: any) => {
          const stock = await getProductStock(product.id);
          return { ...product, stock };
        }));
        
        setProducts(productsWithStock);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cream products:", error);
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
      id: "crema-hidratanta-luxury",
      name: "Cremă hidratantă Luxury",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cremă față",
      isSale: true,
      discount: 15,
      rating: 4,
      slug: "crema-hidratanta-luxury"
    },
    {
      id: "crema-contur-ochi-anti-age",
      name: "Cremă contur ochi Anti-Age",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cremă ochi",
      rating: 5,
      slug: "crema-contur-ochi-anti-age"
    },
    {
      id: "crema-de-maini-silk",
      name: "Cremă de mâini Silk",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cremă mâini",
      rating: 4,
      slug: "crema-de-maini-silk"
    },
    {
      id: "crema-de-corp-intense",
      name: "Cremă de corp Intense",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      category: "Cremă corp",
      isNew: true,
      rating: 4,
      slug: "crema-de-corp-intense"
    },
    {
      id: "crema-nutritiva-de-noapte",
      name: "Cremă nutritivă de noapte",
      price: 139.99,
      image: "https://plus.unsplash.com/premium_photo-1661520861264-f1ece30dbfbf?w=800&auto=format&fit=crop&q=80",
      category: "Cremă față",
      rating: 5,
      slug: "crema-nutritiva-de-noapte"
    },
    {
      id: "crema-anticelultica",
      name: "Cremă anticelulitică",
      price: 109.99,
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cremă corp",
      isSale: true,
      discount: 10,
      rating: 4,
      slug: "crema-anticelultica"
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
          <div className="rounded-2xl bg-gradient-to-r from-beauty-coral/30 to-beauty-coral/10 p-8 md:p-12 mb-12 animate-fade-in">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Creme pentru îngrijire perfectă</h1>
              <p className="text-lg text-gray-700 mb-6">
                Formula noastră unică oferă hidratare intensă și protecție pentru toate tipurile de piele.
              </p>
              <Button className="bg-beauty-coral text-white hover:bg-beauty-coral/90">
                Descoperă colecția
              </Button>
            </div>
          </div>
          
          {/* Filter section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Toate cremele</h2>
              <p className="text-muted-foreground">Soluții de hidratare pentru toate nevoile</p>
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
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${parseInt(product.id) * 0.1}s` }}>
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

export default Creme;
