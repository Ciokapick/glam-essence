
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Parfumuri from "./pages/Parfumuri";
import Creme from "./pages/Creme";
import Ingrijire from "./pages/Ingrijire";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Cart from "./components/Cart";
import SeturiPage from "./pages/SeturiPage";
import WishlistPage from "./pages/WishlistPage";
import { products } from "./data/products";

// Import product pages
import ParfumOrientalMystique from "./pages/product/ParfumOrientalMystique";
import ParfumFreshCitrus from "./pages/product/ParfumFreshCitrus";
import ParfumFloralExtravagance from "./pages/product/ParfumFloralExtravagance";
import ParfumWoodyElegance from "./pages/product/ParfumWoodyElegance";
import ParfumAquaticBreeze from "./pages/product/ParfumAquaticBreeze";
import ParfumSpicyNoir from "./pages/product/ParfumSpicyNoir";
import CremaHidratantaLuxury from "./pages/product/CremaHidratantaLuxury";
import CremaConturOchiAntiAge from "./pages/product/CremaConturOchiAntiAge";
import CremaDeMainiSilk from "./pages/product/CremaDeMainiSilk";
import CremaDeCorpIntense from "./pages/product/CremaDeCorpIntense";
import CremaNutritivaDeNoapte from "./pages/product/CremaNutritivaDeNoapte";
import CremaAnticelulitică from "./pages/product/CremaAnticelulitică";
import SerFacialRadiance from "./pages/product/SerFacialRadiance";
import MascaFacialaDetox from "./pages/product/MascaFacialaDetox";
import SpumaDeCuratare from "./pages/product/SpumaDeCuratare";
import TonicPurificator from "./pages/product/TonicPurificator";
import UleiDeFataNutritiv from "./pages/product/UleiDeFataNutritiv";
import CremaNutritivaDeNoapteIngrijire from "./pages/product/CremaNutritivaDeNoapteIngrijire";

// Page transition wrapper
const PageTransition = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <div className="page-transition-enter-active">
      {children}
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => {
  // Create an array of product slugs from the products object
  const productSlugs = Object.keys(products);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Cart />
              <Routes>
                <Route path="/" element={<PageTransition><Index /></PageTransition>} />
                <Route path="/parfumuri" element={<PageTransition><Parfumuri /></PageTransition>} />
                <Route path="/creme" element={<PageTransition><Creme /></PageTransition>} />
                <Route path="/ingrijire" element={<PageTransition><Ingrijire /></PageTransition>} />
                <Route path="/seturi" element={<PageTransition><SeturiPage /></PageTransition>} />
                <Route path="/wishlist" element={<PageTransition><WishlistPage /></PageTransition>} />
                
                {/* Specific product pages */}
                <Route path="/parfum-oriental-mystique" element={<PageTransition><ParfumOrientalMystique /></PageTransition>} />
                <Route path="/parfum-fresh-citrus" element={<PageTransition><ParfumFreshCitrus /></PageTransition>} />
                <Route path="/parfum-floral-extravagance" element={<PageTransition><ParfumFloralExtravagance /></PageTransition>} />
                <Route path="/parfum-woody-elegance" element={<PageTransition><ParfumWoodyElegance /></PageTransition>} />
                <Route path="/parfum-aquatic-breeze" element={<PageTransition><ParfumAquaticBreeze /></PageTransition>} />
                <Route path="/parfum-spicy-noir" element={<PageTransition><ParfumSpicyNoir /></PageTransition>} />
                
                <Route path="/crema-hidratanta-luxury" element={<PageTransition><CremaHidratantaLuxury /></PageTransition>} />
                <Route path="/crema-contur-ochi-anti-age" element={<PageTransition><CremaConturOchiAntiAge /></PageTransition>} />
                <Route path="/crema-de-maini-silk" element={<PageTransition><CremaDeMainiSilk /></PageTransition>} />
                <Route path="/crema-de-corp-intense" element={<PageTransition><CremaDeCorpIntense /></PageTransition>} />
                <Route path="/crema-nutritiva-de-noapte" element={<PageTransition><CremaNutritivaDeNoapte /></PageTransition>} />
                <Route path="/crema-anticelulitică" element={<PageTransition><CremaAnticelulitică /></PageTransition>} />
                
                <Route path="/ser-facial-radiance" element={<PageTransition><SerFacialRadiance /></PageTransition>} />
                <Route path="/masca-faciala-detox" element={<PageTransition><MascaFacialaDetox /></PageTransition>} />
                <Route path="/spuma-de-curatare" element={<PageTransition><SpumaDeCuratare /></PageTransition>} />
                <Route path="/tonic-purificator" element={<PageTransition><TonicPurificator /></PageTransition>} />
                <Route path="/ulei-de-fata-nutritiv" element={<PageTransition><UleiDeFataNutritiv /></PageTransition>} />
                <Route path="/crema-nutritiva-de-noapte-ingrjire" element={<PageTransition><CremaNutritivaDeNoapteIngrijire /></PageTransition>} />
                
                {/* Dynamic routes for each product */}
                {productSlugs.map((slug) => (
                  <Route 
                    key={slug}
                    path={`/product/${slug}`} 
                    element={<PageTransition><ProductDetail /></PageTransition>} 
                  />
                ))}
                
                {/* Generic product route that will use the slug parameter */}
                <Route path="/product/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
