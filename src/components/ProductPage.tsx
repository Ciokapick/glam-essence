
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
  ShoppingBag,
  Check,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "@/hooks/use-toast";
import ProductCard from '@/components/ProductCard';
import { similarProducts, type Product } from '@/data/products';
import { getProductStock, stockUpdateEmitter } from '@/utils/jsonDb';

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product: initialProduct }) => {
  const { t, language } = useLanguage();
  const [product, setProduct] = useState<Product>(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(initialProduct.image);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const productImages = Array.from(new Set([product.image, ...(product.gallery || [])]));

  useEffect(() => {
    setSelectedImage(initialProduct.image);
  }, [initialProduct.id, initialProduct.image]);
  
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
  const isPerfume = Number(product.id) <= 6;
  const isBodyCare = ['crema-de-maini-silk', 'crema-de-corp-intense', 'crema-anticelulitică'].includes(product.slug);
  const collectionHref = isPerfume ? '/parfumuri' : isBodyCare ? '/body-care' : '/face-care';
  const collectionLabel = isPerfume ? t('product.breadcrumb.perfumes') : isBodyCare ? t('nav.body_care') : t('nav.face_care');
  
  console.log(`ProductPage image for ${product?.name}: ${product?.image}`);

  return (
    <div className="min-h-screen bg-[#fbf8f5] text-[#281922]">
      <Navbar />

      <main className="pb-20 pt-28 sm:pt-32">
        <div className="container mx-auto max-w-[1440px] px-5 md:px-8">
          <nav className="mb-8 flex text-[10px] font-semibold uppercase tracking-[.16em] text-[#9c7d87]">
            <ol className="flex min-w-0 items-center">
              <li><a href="/" className="transition hover:text-[#a04e62]">{t('product.breadcrumb.home')}</a></li>
              <li><ChevronRight className="mx-2 h-3.5 w-3.5 text-[#c6aeb5]" /></li>
              <li><a href={collectionHref} className="transition hover:text-[#a04e62]">{collectionLabel}</a></li>
              <li><ChevronRight className="mx-2 h-3.5 w-3.5 text-[#c6aeb5]" /></li>
              <li className="truncate text-[#281922]">{t(product?.name)}</li>
            </ol>
          </nav>

          <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,.92fr)] lg:gap-14">
            <div>
              <div className="relative aspect-[.98] overflow-hidden rounded-[1.75rem] bg-[#f0e8e4] shadow-[0_24px_70px_rgba(40,25,34,.08)]">
                <img
                  src={selectedImage}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
                
                {product?.isNew && (
                  <Badge className="absolute left-5 top-5 rounded-none border-0 bg-[#281922] px-3 py-1 text-[9px] font-semibold uppercase tracking-[.16em] text-white">
                    {t('product.new_badge')}
                  </Badge>
                )}
                
                {product?.isSale && (
                  <Badge className="absolute left-5 top-5 rounded-none border-0 bg-[#a04e62] px-3 py-1 text-[9px] font-semibold tracking-[.16em] text-white">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
              {productImages.length > 1 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {productImages.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className={`relative aspect-square overflow-hidden rounded-[1.1rem] border-2 bg-[#f2ece9] transition ${selectedImage === image ? 'border-[#7b263d]' : 'border-transparent hover:border-[#7b263d]/35'}`}
                      aria-label={`${t(product.name)} — ${index === 0 ? 'editorial' : 'packshot'}`}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="lg:pt-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#9c7d87]">{collectionLabel}</p>
              <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[.94] tracking-[-.045em] sm:text-6xl">{t(product?.name)}</h1>
              
              <div className="mt-5 flex items-center">
                <div className="mr-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < (product?.rating || 0) ? 'text-beauty-gold fill-beauty-gold' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#806d74]">{product?.reviewCount || 0} {t('product.reviews')}</span>
              </div>
              
              <div className="mt-6 flex items-center border-b border-[#281922]/10 pb-6">
                {product?.isSale ? (
                  <>
                    <span className="mr-3 text-3xl font-semibold tracking-[-.03em]">
                      {((product.price || 0) * (1 - (product.discount || 0) / 100)).toFixed(2)} lei
                    </span>
                    <span className="text-sm text-[#9b8d92] line-through">
                      {(product.price || 0).toFixed(2)} lei
                    </span>
                  </>
                ) : (
                  <span className="mr-3 text-3xl font-semibold tracking-[-.03em]">{(product?.price || 0).toFixed(2)} lei</span>
                )}
              </div>
              
              <p className="mt-7 max-w-xl text-base leading-8 text-[#67545c]">
                {t(product?.description)}
              </p>
              
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#806d74]">{t('product.quantity')}</span>
                <div className="flex items-center rounded-full border border-[#281922]/15 bg-white">
                  <button
                    className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#f3e8e6]"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button
                    className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#f3e8e6]"
                    onClick={() => setQuantity(q => Math.min((product?.stock || 0), q + 1))}
                    disabled={quantity >= (product?.stock || 0)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs text-[#806d74]">
                  {product?.stock || 0} {t('product.available')}
                </span>
              </div>
              
              <div className="mt-7 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                <button
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#281922] px-5 text-[10px] font-semibold uppercase tracking-[.16em] text-white transition hover:bg-[#a04e62]"
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
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {product?.stock && product.stock > 0 ? t('product.add_to_cart') : t('product.out_of_stock')}
                </button>
                <button
                  className={`inline-flex min-h-12 items-center justify-center rounded-full border px-5 text-[10px] font-semibold uppercase tracking-[.12em] transition ${
                    isInWishlist(product?.id)
                      ? "border-[#a04e62] bg-[#f8e7e9] text-[#a04e62] hover:bg-[#f3dce0]"
                      : "border-[#281922]/15 text-[#67545c] hover:border-[#a04e62] hover:text-[#a04e62]"
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
                  <Heart className={`mr-2 h-4 w-4 ${isInWishlist(product?.id) ? 'fill-current' : ''}`} />
                  {isInWishlist(product?.id) ? t('product.remove_from_wishlist') : t('product.add_to_wishlist')}
                </button>
              </div>
              
              <div className="mt-8 space-y-4 rounded-[1.25rem] border border-[#281922]/10 bg-[#e9f1ef] p-5">
                <div className="flex items-center">
                  <Truck className="mr-3 h-5 w-5 text-[#66858b]" />
                  <span className="text-sm text-[#49666b]">{t('product.free_shipping')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-[#66858b]" />
                  <span className="text-sm text-[#49666b]">{t('product.shipping_24h')}</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="mr-3 h-5 w-5 text-[#66858b]" />
                  <span className="text-sm text-[#49666b]">{t('product.authenticity_warranty')}</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                <button className="inline-flex items-center gap-2 rounded-full px-1 py-1 text-[10px] font-semibold uppercase tracking-[.16em] text-[#806d74] transition hover:text-[#a04e62]">
                  <Share2 className="h-4 w-4" />
                  {t('product.share')}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <Tabs defaultValue="details">
              <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl border border-[#281922]/10 bg-[#f1ebe8] p-1.5">
                <TabsTrigger value="details" className="rounded-xl py-3 text-xs data-[state=active]:bg-white data-[state=active]:text-[#281922] data-[state=active]:shadow-sm">{t('product.product_details')}</TabsTrigger>
                <TabsTrigger value="features" className="rounded-xl py-3 text-xs data-[state=active]:bg-white data-[state=active]:text-[#281922] data-[state=active]:shadow-sm">{t('product.features')}</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl py-3 text-xs data-[state=active]:bg-white data-[state=active]:text-[#281922] data-[state=active]:shadow-sm">{t('product.reviews_title')} ({product?.reviewCount || 0})</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-5 rounded-[1.5rem] border border-[#281922]/10 bg-white p-6 shadow-[0_18px_50px_rgba(40,25,34,.04)] md:p-10">
                <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
                  <div>
                    <div className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-[#f5e5e4] text-[#9b5668]"><Sparkles className="h-5 w-5" strokeWidth={1.5} /></div>
                    <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#a05a6c]">{language === 'ro' ? 'Despre produs' : 'About the product'}</p>
                    <h3 className="mt-4 max-w-sm font-serif text-4xl leading-[.98] tracking-[-.04em]">{t('product.description')}</h3>
                  </div>
                  <div className="max-w-3xl text-sm leading-8 text-[#67545c] md:text-base">
                    <p>{product?.details}</p>
                    <div className="mt-8 grid gap-3 border-t border-[#281922]/10 pt-6 sm:grid-cols-2">
                      <div><p className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#9c7d87]">{t('product.sku')}</p><p className="mt-2 font-medium text-[#281922]">{product?.sku}</p></div>
                      <div><p className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#9c7d87]">{t('product.category')}</p><p className="mt-2 font-medium text-[#281922]">{t(product?.category)}</p></div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="features" className="mt-5 rounded-[1.5rem] border border-[#281922]/10 bg-[#281922] p-6 text-white shadow-[0_18px_50px_rgba(40,25,34,.14)] md:p-10">
                <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-7 md:flex-row md:items-end">
                  <div><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#d9aebb]">{language === 'ro' ? 'De ce îl vei păstra' : 'Why you will keep it'}</p><h3 className="mt-4 font-serif text-4xl tracking-[-.04em]">{t('product.features')}</h3></div>
                  <p className="max-w-sm text-sm leading-6 text-white/55">{language === 'ro' ? 'Detalii clare, fără promisiuni inutile — exact ce trebuie să știi înainte să-l integrezi în ritual.' : 'Clear details, without unnecessary promises — exactly what you need to know before making it part of your ritual.'}</p>
                </div>
                {product?.features && (
                  <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 border-b border-white/10 pb-4 text-sm leading-6 text-white/78"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#d9aebb] text-[#281922]"><Check className="h-3.5 w-3.5" strokeWidth={2.5} /></span><span>{feature}</span></li>
                    ))}
                  </ul>
                )}
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
