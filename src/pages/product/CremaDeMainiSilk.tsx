
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from "@/hooks/use-toast";
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CremaDeMainiSilk = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = products["crema-de-maini-silk"];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        discount: product.isSale ? product.discount : undefined
      });
      
      toast({
        title: "Adăugat în coș",
        description: `${product.name} a fost adăugat în coșul tău.`,
        variant: "default",
      });
    }
  };
  
  const handleAddToWishlist = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        toast({
          title: "Eliminat de la favorite",
          description: `${product.name} a fost eliminat din lista ta de favorite.`,
          variant: "default",
        });
      } else {
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          discount: product.isSale ? product.discount : undefined
        });
        toast({
          title: "Adăugat la favorite",
          description: `${product.name} a fost adăugat la lista ta de favorite.`,
          variant: "default",
        });
      }
    }
  };

  const isFavorite = isInWishlist(product.id);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-beauty-mint text-beauty-mint-foreground border-0">
                  Nou
                </Badge>
              )}
              
              {product.isSale && (
                <Badge className="absolute top-4 left-4 bg-beauty-rose text-beauty-rose-foreground border-0">
                  -{product.discount}%
                </Badge>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < product.rating ? 'text-beauty-gold fill-beauty-gold' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
              </div>
              
              {/* Price */}
              <div className="flex items-center mb-6">
                {product.isSale ? (
                  <>
                    <span className="text-2xl font-bold mr-3">
                      {(product.price * (1 - product.discount! / 100)).toFixed(2)} lei
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {product.price.toFixed(2)} lei
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold mr-3">{product.price.toFixed(2)} lei</span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground mb-8">
                {product.description}
              </p>
              
              {/* Add to Cart/Wishlist */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button 
                  className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Adaugă în coș
                </Button>
                <Button 
                  variant="outline" 
                  className={`${
                    isFavorite 
                      ? "bg-beauty-rose/10 border-beauty-rose text-beauty-rose hover:bg-beauty-rose/20" 
                      : "border-beauty-magenta/30 hover:bg-beauty-magenta/5 hover:border-beauty-magenta/50"
                  }`}
                  onClick={handleAddToWishlist}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-beauty-rose' : ''}`} />
                  {isFavorite ? 'Eliminat de la favorite' : 'Adaugă la favorite'}
                </Button>
              </div>
              
              {/* Product Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Detalii produs</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-beauty-magenta mt-1.5 mr-3"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CremaDeMainiSilk;
