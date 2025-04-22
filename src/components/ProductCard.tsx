
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from "@/hooks/use-toast";
import ProductDetailsPopup from './ProductDetailsPopup';
import { getProductStock } from '@/utils/jsonDb';

interface ProductCardProps {
  id: string;
  slug?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  rating?: number;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug,
  name,
  price,
  image,
  category,
  isNew,
  isSale,
  discount,
  rating = 0,
  description
}) => {
  const { addToCart } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [stock, setStock] = useState<number>(0);
  
  useEffect(() => {
    // Fetch the current stock from the database
    const fetchStock = async () => {
      const currentStock = await getProductStock(id);
      setStock(currentStock);
    };
    
    fetchStock();
  }, [id]);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    });
    
    toast({
      title: "Adăugat în coș",
      description: `${name} a fost adăugat în coșul tău.`,
      variant: "default",
    });
  };
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopupOpen(true);
  };
  
  const productUrl = slug ? `/product/${slug}` : `/product/${id}`;
  
  // Calculate discounted price if on sale
  const finalPrice = isSale && discount ? price * (1 - discount / 100) : price;
  
  return (
    <>
      <Link to={productUrl} className="group block">
        <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square mb-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={handleQuickView}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
              aria-label="Quick view"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className={`p-2 bg-white rounded-full ${stock > 0 ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
          
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
        
        <div>
          <h3 className="font-medium text-lg mb-1 group-hover:text-beauty-magenta transition-colors">{name}</h3>
          <p className="text-muted-foreground mb-2">{category}</p>
          
          {/* Star rating */}
          {rating > 0 && (
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-4 w-4 ${i < rating ? 'text-beauty-gold fill-beauty-gold' : 'text-gray-300'}`}
                />
              ))}
            </div>
          )}
          
          {/* Price display */}
          <div className="flex items-center">
            {isSale && discount ? (
              <>
                <span className="font-bold mr-2">{finalPrice.toFixed(2)} lei</span>
                <span className="text-muted-foreground text-sm line-through">{price.toFixed(2)} lei</span>
              </>
            ) : (
              <span className="font-bold">{price.toFixed(2)} lei</span>
            )}
          </div>
          
          {/* Stock info */}
          <div className="text-sm text-muted-foreground mt-1">
            {stock > 0 ? `${stock} în stoc` : 'Stoc epuizat'}
          </div>
        </div>
      </Link>
      
      {isPopupOpen && (
        <ProductDetailsPopup
          id={id}
          name={name}
          price={price}
          image={image}
          category={category}
          isNew={isNew}
          isSale={isSale}
          discount={discount}
          rating={rating}
          description={description}
          stock={stock}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
