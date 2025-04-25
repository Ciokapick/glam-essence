
import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from "@/hooks/use-toast";
import { getProductStock, stockUpdateEmitter } from '@/utils/jsonDb';

interface ProductDetailsPopupProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  rating?: number;
  description?: string;
  stock?: number;
  onClose: () => void;
}

const ProductDetailsPopup: React.FC<ProductDetailsPopupProps> = ({
  id,
  name,
  price,
  image,
  category,
  isNew,
  isSale,
  discount,
  description,
  stock: initialStock = 0,
  onClose
}) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(initialStock);
  
  // Get the latest stock information
  useEffect(() => {
    const fetchStock = async () => {
      const currentStock = await getProductStock(id);
      console.log(`ProductDetailsPopup: Initial stock for ${name} (${id}): ${currentStock}`);
      setStock(currentStock);
    };
    
    fetchStock();
    
    // Subscribe to stock updates
    const unsubscribe = stockUpdateEmitter.subscribe((productId, newStock) => {
      if (id === productId) {
        console.log(`ProductDetailsPopup: Stock updated for ${name} (${id}): ${newStock}`);
        setStock(newStock);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [id, name]);
  
  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (stock <= 0) {
      toast({
        title: "Stoc epuizat",
        description: "Ne pare rău, acest produs nu mai este disponibil în stoc.",
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
    }, quantity);
    
    toast({
      title: "Adăugat în coș",
      description: `${name} a fost adăugat în coșul tău.`,
      variant: "default",
    });
    
    onClose();
  };
  
  const handleAddToWishlist = () => {
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
  };
  
  // Calculate discounted price if on sale
  const finalPrice = isSale && discount ? price * (1 - discount / 100) : price;
  const isFavorite = isInWishlist(id);
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('popup-overlay')) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  
  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 popup-overlay bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              
              {/* Status badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-2">
                {isNew && (
                  <Badge className="bg-beauty-mint text-beauty-mint-foreground border-0">
                    Nou
                  </Badge>
                )}
                {isSale && discount && (
                  <Badge className="bg-beauty-rose text-beauty-rose-foreground border-0">
                    -{discount}%
                  </Badge>
                )}
                {stock <= 0 && (
                  <Badge variant="outline" className="bg-gray-100 border-gray-300 text-gray-700">
                    Stoc epuizat
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h3 className="text-2xl font-bold mb-2">{name}</h3>
              <p className="text-muted-foreground mb-4">{category}</p>
              
              {/* Price display */}
              <div className="flex items-center mb-4">
                {isSale && discount ? (
                  <>
                    <span className="text-xl font-bold mr-2">{finalPrice.toFixed(2)} lei</span>
                    <span className="text-muted-foreground line-through">{price.toFixed(2)} lei</span>
                  </>
                ) : (
                  <span className="text-xl font-bold">{price.toFixed(2)} lei</span>
                )}
              </div>
              
              {/* Description */}
              {description && (
                <p className="text-muted-foreground mb-6">
                  {description}
                </p>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Cantitate:</span>
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-3 py-2 hover:bg-gray-100" 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                    <button
                      className="px-3 py-2 hover:bg-gray-100" 
                      onClick={incrementQuantity}
                      disabled={quantity >= stock}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stock} disponibile
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 bg-beauty-magenta hover:bg-beauty-magenta/90 text-white py-2 px-4 rounded flex items-center justify-center"
                  onClick={handleAddToCart}
                  disabled={stock <= 0}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {stock > 0 ? 'Adaugă în coș' : 'Stoc epuizat'}
                </button>
                <button
                  className={`border py-2 px-4 rounded flex items-center justify-center ${
                    isFavorite 
                      ? "bg-beauty-rose/10 border-beauty-rose text-beauty-rose hover:bg-beauty-rose/20" 
                      : "border-beauty-magenta/30 hover:bg-beauty-magenta/5 hover:border-beauty-magenta/50"
                  }`}
                  onClick={handleAddToWishlist}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-beauty-rose' : ''}`} />
                  Adaugă la favorite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPopup;
