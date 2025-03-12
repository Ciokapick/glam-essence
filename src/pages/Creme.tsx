
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Creme = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      id: "1",
      name: "Cremă hidratantă Luxury",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=774&auto=format&fit=crop",
      category: "Cremă față",
      isSale: true,
      discount: 15,
      rating: 4
    },
    {
      id: "2",
      name: "Cremă contur ochi Anti-Age",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=774&auto=format&fit=crop",
      category: "Cremă ochi",
      rating: 5
    },
    {
      id: "3",
      name: "Cremă de mâini Silk",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1611375732020-7caaf6a42bbd?q=80&w=774&auto=format&fit=crop",
      category: "Cremă mâini",
      rating: 4
    },
    {
      id: "4",
      name: "Cremă de corp Intense",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=774&auto=format&fit=crop",
      category: "Cremă corp",
      isNew: true,
      rating: 4
    },
    {
      id: "5",
      name: "Cremă nutritivă de noapte",
      price: 139.99,
      image: "https://images.unsplash.com/photo-1627384113858-cdbec425ee94?q=80&w=774&auto=format&fit=crop",
      category: "Cremă față",
      rating: 5
    },
    {
      id: "6",
      name: "Cremă anticelulitică",
      price: 109.99,
      image: "https://images.unsplash.com/photo-1616691600042-31027b01af8c?q=80&w=774&auto=format&fit=crop",
      category: "Cremă corp",
      isSale: true,
      discount: 10,
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-beauty-rose/30 to-beauty-rose/10 p-8 md:p-12 mb-12 animate-fade-in">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Creme pentru îngrijire perfectă</h1>
              <p className="text-lg text-gray-700 mb-6">
                Formula noastră unică oferă hidratare intensă și protecție pentru toate tipurile de piele.
              </p>
              <Button className="bg-beauty-rose text-white hover:bg-beauty-rose/90">
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
            {products.map((product) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${parseInt(product.id) * 0.1}s` }}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          
          {/* Load more button */}
          <div className="text-center">
            <Button variant="outline" className="border-beauty-rose/30 hover:bg-beauty-rose/5 hover:border-beauty-rose/50">
              Încarcă mai multe
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Creme;
