
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
import ParfumOrientalMystique from "./pages/product/ParfumOrientalMystique";
import ParfumFreshCitrus from "./pages/product/ParfumFreshCitrus";

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
