
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Parfumuri from "./pages/Parfumuri";
import Creme from "./pages/Creme";
import Ingrijire from "./pages/Ingrijire";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./components/Cart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Cart />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/parfumuri" element={<Parfumuri />} />
            <Route path="/creme" element={<Creme />} />
            <Route path="/ingrijire" element={<Ingrijire />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
