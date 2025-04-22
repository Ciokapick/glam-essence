
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Star, 
  Truck, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  ChevronRight,
  ShoppingBag
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from "@/hooks/use-toast";
import ProductCard from '@/components/ProductCard';
import { similarProducts } from '@/data/products';
import { getProductStock } from '@/utils/jsonDb';

interface ProductPageProps {
  product: any;
}

const ProductPage: React.FC<ProductPageProps> = ({ product: initialProduct }) => {
  const [product, setProduct] = useState<any>(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Fetch the latest stock information from the database
  useEffect(() => {
    const fetchStockInfo = async () => {
      if (product?.id) {
        const currentStock = await getProductStock(product.id);
        setProduct(prev => ({
          ...prev,
          stock: currentStock
        }));
      }
    };
    
    fetchStockInfo();
  }, [product?.id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        discount: product.isSale ? product.discount : undefined,
        quantity: quantity
      });
      
      toast({
        title: "Adăugat în coș",
        description: `${product.name} a fost adăugat în coșul tău.`,
        variant: "default",
      });
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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
  
  const isFavorite = isInWishlist(product?.id);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-muted-foreground mb-6">
            <ol className="flex items-center">
              <li><a href="/" className="hover:text-foreground">Acasă</a></li>
              <li><ChevronRight className="h-4 w-4 mx-2" /></li>
              <li><a href="/parfumuri" className="hover:text-foreground">Parfumuri</a></li>
              <li><ChevronRight className="h-4 w-4 mx-2" /></li>
              <li className="text-foreground font-medium truncate">{product?.name}</li>
            </ol>
          </nav>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={product?.gallery?.[selectedImage] || product?.image} 
                  alt={product?.name} 
                  className="w-full h-full object-cover" 
                />
                
                {product?.isNew && (
                  <Badge className="absolute top-4 left-4 bg-beauty-mint text-beauty-mint-foreground border-0">
                    Nou
                  </Badge>
                )}
                
                {product?.isSale && (
                  <Badge className="absolute top-4 left-4 bg-beauty-rose text-beauty-rose-foreground border-0">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product?.gallery && (
                <div className="grid grid-cols-4 gap-2">
                  {product.gallery.map((image: string, index: number) => (
                    <button
                      key={index}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-beauty-magenta' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < (product?.rating || 0) ? 'text-beauty-gold fill-beauty-gold' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product?.reviewCount || 0} reviews</span>
              </div>
              
              {/* Price */}
              <div className="flex items-center mb-6">
                {product?.isSale ? (
                  <>
                    <span className="text-2xl font-bold mr-3">
                      {((product.price || 0) * (1 - (product.discount || 0) / 100)).toFixed(2)} lei
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {(product.price || 0).toFixed(2)} lei
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold mr-3">{(product?.price || 0).toFixed(2)} lei</span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground mb-8">
                {product?.description}
              </p>
              
              {/* Quantity */}
              <div className="flex items-center space-x-4 mb-6">
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
                    disabled={quantity >= (product?.stock || 0)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product?.stock || 0} disponibile
                </span>
              </div>
              
              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button 
                  className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white flex-1 px-4 py-2 rounded flex items-center justify-center"
                  onClick={handleAddToCart}
                  disabled={!product?.stock || product.stock <= 0}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {product?.stock && product.stock > 0 ? 'Adaugă în coș' : 'Stoc epuizat'}
                </button>
                <button 
                  className={`border px-4 py-2 rounded flex items-center justify-center ${
                    isFavorite 
                      ? "bg-beauty-rose/10 border-beauty-rose text-beauty-rose hover:bg-beauty-rose/20" 
                      : "border-beauty-magenta/30 hover:bg-beauty-magenta/5 hover:border-beauty-magenta/50"
                  }`}
                  onClick={handleAddToWishlist}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-beauty-rose' : ''}`} />
                  {isFavorite ? 'Eliminat de la favorite' : 'Adaugă la favorite'}
                </button>
              </div>
              
              {/* Benefits */}
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-beauty-magenta mr-3" />
                  <span className="text-sm">Livrare gratuită pentru comenzi peste 300 lei</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-beauty-magenta mr-3" />
                  <span className="text-sm">Expediere în 24 de ore</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-beauty-magenta mr-3" />
                  <span className="text-sm">Garanție de autenticitate 100%</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                <button className="inline-flex items-center gap-1 text-sm px-3 py-1 hover:bg-gray-100 rounded-md">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mb-16">
            <Tabs defaultValue="details">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="details">Detalii produs</TabsTrigger>
                <TabsTrigger value="features">Caracteristici</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product?.reviewCount || 0})</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="p-6 rounded-lg bg-gray-50/50">
                <h3 className="text-xl font-semibold mb-4">Descriere</h3>
                <p className="mb-4">{product?.details}</p>
                <p className="mb-4">
                  {product?.name} este un produs premium, creat cu cele mai bune ingrediente pentru a oferi o experiență de utilizare deosebită. Calitatea sa excepțională se reflectă în fiecare detaliu, de la compoziție la ambalaj.
                </p>
                <p>
                  Acest produs este perfect pentru utilizare zilnică, oferind rezultate remarcabile și satisfacție garantată. Fiecare utilizare vă va convinge de calitatea sa superioară și de valoarea investiției în frumusețea și încrederea personală.
                </p>
              </TabsContent>
              <TabsContent value="features" className="p-6 rounded-lg bg-gray-50/50">
                <h3 className="text-xl font-semibold mb-4">Caracteristici</h3>
                {product?.features && (
                  <ul className="space-y-2">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-beauty-magenta mt-1.5 mr-3"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-2">SKU: {product?.sku}</h4>
                  <p className="text-sm text-muted-foreground">Categoria: {product?.category}</p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-6 rounded-lg bg-gray-50/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Reviews ({product?.reviewCount || 0})</h3>
                  <button className="px-4 py-2 bg-beauty-magenta hover:bg-beauty-magenta/90 text-white rounded">Adaugă un review</button>
                </div>
                {/* This would be a list of reviews in a real app */}
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Maria D.</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-4 w-4 text-beauty-gold fill-beauty-gold" 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">12 Mai 2023</span>
                    </div>
                    <p className="mt-2">Produs absolut minunat! Persistă toată ziua și primesc complimente ori de câte ori îl folosesc. Ambalajul este elegant și luxos. Recomand cu încredere!</p>
                  </div>
                  
                  <div className="border-b pb-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Alexandru P.</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 4 ? 'text-beauty-gold fill-beauty-gold' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">3 Aprilie 2023</span>
                    </div>
                    <p className="mt-2">Un produs deosebit, cu calitate excelentă. Sunt foarte mulțumit de achiziție și îl voi recomanda cu siguranță și prietenilor mei.</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Elena M.</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-4 w-4 text-beauty-gold fill-beauty-gold" 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">17 Martie 2023</span>
                    </div>
                    <p className="mt-2">Am comandat acest produs și sunt încântată! Calitatea este incredibilă și rezultatele sunt vizibile imediat. Livrarea a fost rapidă, iar produsul a ajuns în condiții perfecte. Cu siguranță voi mai comanda de la GlamEssence!</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Similar Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Produse similare</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <div key={product.id} className="animate-fade-in">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
