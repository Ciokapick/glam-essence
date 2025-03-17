
import React from 'react';
import { useWishlist } from '@/contexts/WishlistContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WishlistPage = () => {
  const { items, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Lista mea de favorite</h1>
          <p className="text-muted-foreground">
            Produsele tale favorite sunt salvate aici pentru referință ușoară.
          </p>
        </div>

        {items.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">{items.length} produse favorite</p>
              <Button variant="outline" onClick={clearWishlist}>
                Șterge lista
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item.id} className="animate-fade-in">
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                    discount={item.discount}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <Heart className="h-10 w-10 text-beauty-rose" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Lista ta de favorite este goală</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Adaugă produse la favorite pentru a le putea găsi ușor mai târziu.
            </p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continuă cumpărăturile
              </Link>
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
