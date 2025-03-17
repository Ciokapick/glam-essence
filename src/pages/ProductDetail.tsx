
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
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
import { toast } from "@/hooks/use-toast";
import ProductCard from '@/components/ProductCard';

// Mock product data
const productsData = {
  "parfum-floral-extravagance": {
    id: "1",
    slug: "parfum-floral-extravagance",
    name: "Parfum Floral Extravagance",
    price: 349.99,
    oldPrice: 399.99,
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Parfum",
    isNew: true,
    rating: 5,
    reviewCount: 47,
    description: "Parfumul Floral Extravagance este o capodoperă olfactivă ce combină note florale prețioase cu accente orientale subtile. Un parfum sofisticat și elegant, perfect pentru ocazii speciale sau pentru utilizare zilnică atunci când doriți să ieșiți în evidență. Persistența îndelungată și siajul remarcabil vă vor înconjura într-un văl de rafinament pe tot parcursul zilei.",
    details: "Un parfum floral elegant cu note de vârf de trandafir de Damasc și iasomie, urmate de note de mijloc de iris și ylang-ylang. Bazele calde de mosc, ambră și vanilie oferă profunzime și persistență parfumului.",
    features: [
      "Note de vârf: Trandafir de Damasc, Iasomie",
      "Note de mijloc: Iris, Ylang-Ylang",
      "Note de bază: Mosc, Ambră, Vanilie",
      "Concentrație: Parfum (25%)",
      "Persistență îndelungată: 8-10 ore",
      "Fabricat în Franța",
      "Ingrediente de cea mai înaltă calitate"
    ],
    sku: "PFE-001",
    stock: 15
  }
};

// Similar products for recommendations
const similarProducts = [
  {
    id: "2",
    name: "Parfum Oriental Mystique",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Parfum Oriental",
    isSale: true,
    discount: 10,
    rating: 4
  },
  {
    id: "3",
    name: "Parfum Fresh Citrus",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Parfum Citric",
    rating: 4
  },
  {
    id: "6",
    name: "Parfum Spicy Noir",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Parfum Condimentat",
    isNew: true,
    rating: 5
  },
  {
    id: "4",
    name: "Parfum Woody Elegance",
    price: 419.99,
    image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Parfum Lemnos",
    rating: 5
  }
];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, you would fetch the product by slug from an API
    // Here we're using mock data
    const fetchedProduct = productsData[slug as keyof typeof productsData];
    
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setLoading(false);
    } else {
      // Product not found, redirect to 404
      navigate('/404');
    }
  }, [slug, navigate]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity
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
    toast({
      title: "Adăugat la favorite",
      description: `${product.name} a fost adăugat la lista ta de favorite.`,
      variant: "default",
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 w-1/3 bg-gray-200 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div>
                  <div className="h-8 w-2/3 bg-gray-200 mb-4"></div>
                  <div className="h-6 w-1/4 bg-gray-200 mb-6"></div>
                  <div className="h-4 w-full bg-gray-200 mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-200 mb-6"></div>
                  <div className="h-10 w-full bg-gray-200 mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) return null;
  
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
              <li className="text-foreground font-medium truncate">{product.name}</li>
            </ol>
          </nav>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={product.gallery[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
                
                {product.isNew && (
                  <Badge className="absolute top-4 left-4 bg-beauty-mint text-beauty-mint-foreground border-0">
                    Nou
                  </Badge>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
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
                <span className="text-2xl font-bold mr-3">{product.price.toFixed(2)} lei</span>
                {product.oldPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.oldPrice.toFixed(2)} lei
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground mb-8">
                {product.description}
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
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} disponibile
                </span>
              </div>
              
              {/* Add to Cart */}
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
                  className="border-beauty-magenta/30 hover:bg-beauty-magenta/5 hover:border-beauty-magenta/50"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Adaugă la favorite
                </Button>
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
                <Button variant="ghost" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mb-16">
            <Tabs defaultValue="details">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="details">Detalii produs</TabsTrigger>
                <TabsTrigger value="features">Caracteristici</TabsTrigger>
                <TabsTrigger value="reviews">Reviews (47)</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="p-6 rounded-lg bg-gray-50/50">
                <h3 className="text-xl font-semibold mb-4">Descriere</h3>
                <p className="mb-4">{product.details}</p>
                <p className="mb-4">
                  Floral Extravagance este un parfum vibrant, o explozie de note florale delicate și sofisticate. Inițial, veți fi întâmpinați de prospețimea trandafirului de Damasc și de dulceața iasomiei, urmate de eleganta combinație de iris și ylang-ylang. Bazele de mosc, ambră și vanilie adaugă căldură și persistență, completând această creație olfactivă cu o semnătură distinctivă și memorabilă.
                </p>
                <p>
                  Acest parfum este perfect pentru ocazii speciale, dar versatil și pentru utilizare zilnică. Caracterul său rafinat se potrivește unei persoane încrezătoare, care apreciază luxul și calitatea premium.
                </p>
              </TabsContent>
              <TabsContent value="features" className="p-6 rounded-lg bg-gray-50/50">
                <h3 className="text-xl font-semibold mb-4">Caracteristici</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-beauty-magenta mt-1.5 mr-3"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-2">SKU: {product.sku}</h4>
                  <p className="text-sm text-muted-foreground">Categoria: {product.category}</p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-6 rounded-lg bg-gray-50/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Reviews (47)</h3>
                  <Button>Adaugă un review</Button>
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
                    <p className="mt-2">Parfum absolut minunat! Persistă toată ziua și primesc complimente ori de câte ori îl port. Ambalajul este elegant și luxos. Recomand cu încredere!</p>
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
                    <p className="mt-2">Un parfum deosebit, cu note florale bine echilibrate. Persistența este foarte bună, însă ar fi putut fi puțin mai intensă spre sfârșitul zilei. În rest, sunt foarte mulțumit de achiziție.</p>
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
                    <p className="mt-2">Am comandat acest parfum pentru soțul meu și este încântat! Notele florale sunt subtile și elegante, potrivite pentru un bărbat rafinat. Livrarea a fost rapidă, iar produsul a ajuns în condiții perfecte. Cu siguranță vom mai comanda de la GlamEssence!</p>
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

export default ProductDetail;
