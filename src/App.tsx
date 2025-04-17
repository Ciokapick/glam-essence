
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Import admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";

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
                <Route path="/" element={<Index />} />
                <Route path="/parfumuri" element={<Parfumuri />} />
                <Route path="/creme" element={<Creme />} />
                <Route path="/ingrijire" element={<Ingrijire />} />
                <Route path="/seturi" element={<SeturiPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                
                {/* Specific product pages */}
                <Route path="/parfum-oriental-mystique" element={<ParfumOrientalMystique />} />
                <Route path="/parfum-fresh-citrus" element={<ParfumFreshCitrus />} />
                <Route path="/parfum-floral-extravagance" element={<ParfumFloralExtravagance />} />
                <Route path="/parfum-woody-elegance" element={<ParfumWoodyElegance />} />
                <Route path="/parfum-aquatic-breeze" element={<ParfumAquaticBreeze />} />
                <Route path="/parfum-spicy-noir" element={<ParfumSpicyNoir />} />
                
                <Route path="/crema-hidratanta-luxury" element={<CremaHidratantaLuxury />} />
                <Route path="/crema-contur-ochi-anti-age" element={<CremaConturOchiAntiAge />} />
                <Route path="/crema-de-maini-silk" element={<CremaDeMainiSilk />} />
                <Route path="/crema-de-corp-intense" element={<CremaDeCorpIntense />} />
                <Route path="/crema-nutritiva-de-noapte" element={<CremaNutritivaDeNoapte />} />
                <Route path="/crema-anticelulitică" element={<CremaAnticelulitică />} />
                
                <Route path="/ser-facial-radiance" element={<SerFacialRadiance />} />
                <Route path="/masca-faciala-detox" element={<MascaFacialaDetox />} />
                <Route path="/spuma-de-curatare" element={<SpumaDeCuratare />} />
                <Route path="/tonic-purificator" element={<TonicPurificator />} />
                <Route path="/ulei-de-fata-nutritiv" element={<UleiDeFataNutritiv />} />
                <Route path="/crema-nutritiva-de-noapte-ingrjire" element={<CremaNutritivaDeNoapteIngrijire />} />
                
                {/* Admin routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                
                {/* Dynamic routes for each product */}
                {productSlugs.map((slug) => (
                  <Route 
                    key={slug}
                    path={`/product/${slug}`} 
                    element={<ProductDetail />} 
                  />
                ))}
                
                {/* Generic product route that will use the slug parameter */}
                <Route path="/product/:slug" element={<ProductDetail />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
