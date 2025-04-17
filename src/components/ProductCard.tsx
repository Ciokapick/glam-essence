
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from "@/hooks/use-toast";
import ProductDetailsPopup from './ProductDetailsPopup';
import { products } from '@/data/products';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  discount?: number;
  description?: string;
  features?: string[];
  reviewCount?: number;
  stock?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  isSale = false,
  rating = 0,
  discount = 0,
  description,
  features,
  reviewCount = 0,
  stock = 0
}) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(id);
  const [showDetails, setShowDetails] = useState(false);
  
  // Get the actual stock from products data to ensure synchronization
  const productSlug = Object.keys(products).find(key => products[key].id === id);
  const actualStock = productSlug ? products[productSlug].stock : stock;
  const isOutOfStock = actualStock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isOutOfStock) {
      toast({
        title: "Produs indisponibil",
        description: "Ne pare rău, acest produs nu este momentan în stoc.",
        variant: "destructive",
      });
      return;
    }
    
    addToCart({
      id,
      name,
      price,
      image,
      category,
      discount: isSale ? discount : undefined
    });
    
    toast({
      title: "Adăugat în coș",
      description: `${name} a fost adăugat în coșul tău.`,
      variant: "default",
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromWishlist(id);
      toast({
        title: "Eliminat de la favorite",
        description: `${name} a fost eliminat din lista ta de favorite.`,
        variant: "default",
      });
    } else {
      addToWishlist({
        id,
        name,
        price,
        image,
        category,
        discount: isSale ? discount : undefined
      });
      toast({
        title: "Adăugat la favorite",
        description: `${name} a fost adăugat la lista ta de favorite.`,
        variant: "default",
      });
    }
  };

  const handleShowDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDetails(true);
  };

  return (
    <>
      <div className="product-card group block cursor-pointer" onClick={handleShowDetails}>
        <div className="relative overflow-hidden rounded-t-xl h-64">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover product-image" 
          />
          
          <div className="shimmer animate-shimmer"></div>
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-beauty-mint text-beauty-mint-foreground border-0">Nou</Badge>
            )}
            {isSale && (
              <Badge className="bg-beauty-rose text-beauty-rose-foreground border-0">-{discount}%</Badge>
            )}
          </div>
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Button 
                size="sm" 
                className="bg-white text-black hover:bg-white/90 rounded-full"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                {isOutOfStock ? 'Indisponibil' : 'Adaugă'}
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className={`${isFavorite ? 'bg-beauty-rose text-white' : 'bg-white text-black'} hover:bg-white/90 rounded-full`}
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="bg-white text-black hover:bg-white/90 rounded-full"
                onClick={handleShowDetails}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="text-sm text-muted-foreground mb-1">{category}</div>
          <h3 className="font-medium text-lg mb-2">{name}</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {isSale ? (
                  <>
                    <span className="text-muted-foreground line-through mr-2">{price.toFixed(2)} lei</span>
                    <span className="font-semibold">{(price * (1 - discount / 100)).toFixed(2)} lei</span>
                  </>
                ) : (
                  <span className="font-semibold">{price.toFixed(2)} lei</span>
                )}
              </div>
              
              {rating > 0 && (
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-4 w-4 ${i < rating ? 'text-beauty-gold' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className={`text-sm ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
              {isOutOfStock ? 'Indisponibil' : `În stoc: ${actualStock} buc`}
            </div>
          </div>
        </div>
      </div>

      <ProductDetailsPopup 
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        product={{
          id,
          name,
          price,
          image,
          category,
          isNew,
          isSale,
          discount,
          rating,
          reviewCount,
          description,
          features,
          stock: actualStock
        }}
      />
    </>
  );
};

export default ProductCard;
