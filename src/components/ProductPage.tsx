
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
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "@/hooks/use-toast";
import ProductCard from '@/components/ProductCard';
import { similarProducts } from '@/data/products';
import { getProductStock, stockUpdateEmitter } from '@/utils/jsonDb';

interface ProductPageProps {
  product: any;
}

const ProductPage: React.FC<ProductPageProps> = ({ product: initialProduct }) => {
  const { t } = useLanguage();
  const [product, setProduct] = useState<any>(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  useEffect(() => {
    const fetchStockInfo = async () => {
      if (product?.id) {
        const currentStock = await getProductStock(product.id);
        console.log(`ProductPage: Initial stock for ${product.name} (${product.id}): ${currentStock}`);
        setProduct(prev => ({
          ...prev,
          stock: currentStock
        }));
      }
    };
    
    fetchStockInfo();
    
    const unsubscribe = stockUpdateEmitter.subscribe((productId, newStock) => {
      if (product?.id === productId) {
        console.log(`ProductPage: Stock updated for ${product.name} (${product.id}): ${newStock}`);
        setProduct(prev => ({
          ...prev,
          stock: newStock
        }));
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [product?.id, product?.name]);
  
  const handleAddToCart = () => {
    if (product) {
      if (!product?.stock || product.stock <= 0) {
        toast({
          title: t('toast.out_of_stock'),
          description: t('toast.out_of_stock_desc'),
          variant: "destructive",
        });
        return;
      }
      
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        discount: product.isSale ? product.discount : undefined
      }, quantity);
      
      toast({
        title: t('toast.added_to_cart'),
        description: t('toast.added_to_cart_desc').replace('{productName}', t(product.name)),
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
          title: t('toast.removed_from_wishlist'),
          description: t('toast.removed_from_wishlist_desc').replace('{productName}', t(product.name)),
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
          title: t('toast.added_to_wishlist'),
          description: t('toast.added_to_wishlist_desc').replace('{productName}', t(product.name)),
          variant: "default",
        });
      }
    }
  };
  
  const isFavorite = isInWishlist(product?.id);
  
  console.log(`ProductPage image for ${product?.name}: ${product?.image}`);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="flex text-sm text-muted-foreground mb-6">
            <ol className="flex items-center">
              <li><a href="/" className="hover:text-foreground">{t('product.breadcrumb.home')}</a></li>
              <li><ChevronRight className="h-4 w-4 mx-2" /></li>
              <li><a href="/parfumuri" className="hover:text-foreground">{t('product.breadcrumb.perfumes')}</a></li>
              <li><ChevronRight className="h-4 w-4 mx-2" /></li>
              <li className="text-foreground font-medium truncate">{t(product?.name)}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
                
                {product?.isNew && (
                  <Badge className="absolute top-4 left-4 bg-beauty-mint text-beauty-mint-foreground border-0">
                    {t('product.new_badge')}
                  </Badge>
                )}
                
                {product?.isSale && (
                  <Badge className="absolute top-4 left-4 bg-beauty-rose text-beauty-rose-foreground border-0">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{t(product?.name)}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < (product?.rating || 0) ? 'text-beauty-gold fill-beauty-gold' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product?.reviewCount || 0} {t('product.reviews')}</span>
              </div>
              
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
              
              <p className="text-muted-foreground mb-8">
                {product?.description}
              </p>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-medium">{t('product.quantity')}</span>
                <div className="flex items-center border rounded-md">
                  <button
                    className="px-3 py-2 hover:bg-gray-100"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                  <button
                    className="px-3 py-2 hover:bg-gray-100"
                    onClick={() => setQuantity(q => Math.min((product?.stock || 0), q + 1))}
                    disabled={quantity >= (product?.stock || 0)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product?.stock || 0} {t('product.available')}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white flex-1 px-4 py-2 rounded flex items-center justify-center"
                  onClick={() => {
                    if (!product?.stock || product.stock <= 0) {
                      toast({
                        title: t('toast.out_of_stock'),
                        description: t('toast.out_of_stock_desc'),
                        variant: "destructive",
                      });
                      return;
                    }
                    
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                      discount: product.isSale ? product.discount : undefined
                    }, quantity);
                    
                    toast({
                      title: t('toast.added_to_cart'),
                      description: t('toast.added_to_cart_desc').replace('{productName}', t(product.name)),
                      variant: "default",
                    });
                  }}
                  disabled={!product?.stock || product.stock <= 0}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {product?.stock && product.stock > 0 ? t('product.add_to_cart') : t('product.out_of_stock')}
                </button>
                <button
                  className={`border px-4 py-2 rounded flex items-center justify-center ${
                    isInWishlist(product?.id)
                      ? "bg-beauty-rose/10 border-beauty-rose text-beauty-rose hover:bg-beauty-rose/20"
                      : "border-beauty-magenta/30 hover:bg-beauty-magenta/5 hover:border-beauty-magenta/50"
                  }`}
                  onClick={() => {
                    if (product) {
                      if (isInWishlist(product.id)) {
                        removeFromWishlist(product.id);
                        toast({
                          title: t('toast.removed_from_wishlist'),
                          description: t('toast.removed_from_wishlist_desc').replace('{productName}', t(product.name)),
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
                          title: t('toast.added_to_wishlist'),
                          description: t('toast.added_to_wishlist_desc').replace('{productName}', t(product.name)),
                          variant: "default",
                        });
                      }
                    }
                  }}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isInWishlist(product?.id) ? 'fill-beauty-rose' : ''}`} />
                  {isInWishlist(product?.id) ? t('product.remove_from_wishlist') : t('product.add_to_wishlist')}
                </button>
              </div>
              
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-beauty-magenta mr-3" />
                  <span className="text-sm">{t('product.free_shipping')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-beauty-magenta mr-3" />
                  <span className="text-sm">{t('product.shipping_24h')}</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-beauty-magenta mr-3" />
                  <span className="text-sm">{t('product.authenticity_warranty')}</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                <button className="inline-flex items-center gap-1 text-sm px-3 py-1 hover:bg-gray-100 rounded-md">
                  <Share2 className="h-4 w-4" />
                  {t('product.share')}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <Tabs defaultValue="details">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="details">{t('product.product_details')}</TabsTrigger>
                <TabsTrigger value="features">{t('product.features')}</TabsTrigger>
                <TabsTrigger value="reviews">{t('product.reviews_title')} ({product?.reviewCount || 0})</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="p-6 rounded-lg bg-gray-50/50">
                <h3 className="text-xl font-semibold mb-4">{t('product.description')}</h3>
                <p className="mb-4">{product?.details}</p>
                <p className="mb-4">
                  {product?.name} {t('language') === 'ro' ? 'este un produs premium, creat cu cele mai bune ingrediente pentru a oferi o experiență de utilizare deosebită. Calitatea sa excepțională se reflectă în fiecare detaliu, de la compoziție la ambalaj.' : 'is a premium product, created with the finest ingredients to provide an exceptional user experience. Its exceptional quality is reflected in every detail, from composition to packaging.'}
                </p>
                <p>
                  {t('language') === 'ro' ? 'Acest produs este perfect pentru utilizare zilnică, oferind rezultate remarkable și satisfacție garantată. Fiecare utilizare vă va convinge de calitatea sa superioară și de valoarea investiției în frumusețea și încrederea personală.' : 'This product is perfect for daily use, offering remarkable results and guaranteed satisfaction. Each use will convince you of its superior quality and the value of investing in beauty and personal confidence.'}
                </p>
              </TabsContent>
              <TabsContent value="features" className="p-6 rounded-lg bg-gray-50/50">
                <h3 className="text-xl font-semibold mb-4">{t('product.features')}</h3>
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
                  <h4 className="font-medium mb-2">{t('product.sku')} {product?.sku}</h4>
                  <p className="text-sm text-muted-foreground">{t('product.category')} {product?.category}</p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-6 rounded-lg bg-gray-50/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">{t('product.reviews_title')} ({product?.reviewCount || 0})</h3>
                  <button className="px-4 py-2 bg-beauty-magenta hover:bg-beauty-magenta/90 text-white rounded">{t('product.add_review')}</button>
                </div>
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
          
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('product.similar_products')}</h2>
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

