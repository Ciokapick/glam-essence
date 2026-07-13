
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/Index';
import ParfumuriPage from '@/pages/Parfumuri';
import CremePage from '@/pages/Creme';
import IngrijirePage from '@/pages/Ingrijire';
import AboutPage from '@/pages/About';
import ContactPage from '@/pages/Contact';
import AccountPage from '@/pages/Account';
import Checkout from '@/pages/Checkout';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminProducts from '@/pages/AdminProducts';
import AdminOrders from '@/pages/AdminOrders';
import AdminLogin from '@/pages/AdminLogin';
import WishlistPage from '@/pages/WishlistPage';
import SeturiPage from '@/pages/SeturiPage';
import Cart from '@/components/Cart';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import ProductPages from '@/pages/ProductPages';
import InitApp from '@/components/InitApp';
import NotFound from '@/pages/NotFound';
import CheckoutSuccess from '@/pages/CheckoutSuccess';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <WishlistProvider>
            <InitApp />
            <Cart />
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/parfumuri" element={<ParfumuriPage />} />
            <Route path="/creme" element={<CremePage />} />
            <Route path="/ingrijire" element={<IngrijirePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/seturi" element={<SeturiPage />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            
            {/* Single product detail route that handles all products */}
            <Route path="/product/:slug" element={<ProductPages />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          </WishlistProvider>
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
