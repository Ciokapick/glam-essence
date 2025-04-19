
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/Index';
import ProductsPage from '@/pages/Parfumuri';
import AboutPage from '@/pages/About';
import ContactPage from '@/pages/Contact';
import AccountPage from '@/pages/Account';
import Checkout from '@/pages/Checkout';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminProducts from '@/pages/AdminProducts';
import AdminOrders from '@/pages/AdminOrders';
import Cart from '@/components/Cart';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { Toaster } from '@/components/ui/toaster';
import { products } from '@/data/products';
import ProductPage from '@/components/ProductPage';
import InitApp from '@/components/InitApp';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <InitApp />
          <Cart />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            
            {/* Product detail routes */}
            <Route 
              path="/product/parfum-floral-extravagance" 
              element={<ProductPage product={products["parfum-floral-extravagance"]} />} 
            />
            <Route 
              path="/product/parfum-oriental-mystique" 
              element={<ProductPage product={products["parfum-oriental-mystique"]} />} 
            />
            <Route 
              path="/product/parfum-fresh-citrus" 
              element={<ProductPage product={products["parfum-fresh-citrus"]} />} 
            />
            <Route 
              path="/product/parfum-woody-elegance" 
              element={<ProductPage product={products["parfum-woody-elegance"]} />} 
            />
            <Route 
              path="/product/parfum-aquatic-breeze" 
              element={<ProductPage product={products["parfum-aquatic-breeze"]} />} 
            />
            <Route 
              path="/product/parfum-spicy-noir" 
              element={<ProductPage product={products["parfum-spicy-noir"]} />} 
            />
            
            {/* Add routes for other products */}
            <Route 
              path="/product/crema-hidratanta-luxury" 
              element={<ProductPage product={products["crema-hidratanta-luxury"]} />} 
            />
            <Route 
              path="/product/crema-contur-ochi-anti-age" 
              element={<ProductPage product={products["crema-contur-ochi-anti-age"]} />} 
            />
            <Route 
              path="/product/crema-de-maini-silk" 
              element={<ProductPage product={products["crema-de-maini-silk"]} />} 
            />
            <Route 
              path="/product/crema-de-corp-intense" 
              element={<ProductPage product={products["crema-de-corp-intense"]} />} 
            />
            <Route 
              path="/product/crema-nutritiva-de-noapte" 
              element={<ProductPage product={products["crema-nutritiva-de-noapte"]} />} 
            />
            <Route 
              path="/product/crema-anticelulitică" 
              element={<ProductPage product={products["crema-anticelulitică"]} />} 
            />
            <Route 
              path="/product/ser-facial-radiance" 
              element={<ProductPage product={products["ser-facial-radiance"]} />} 
            />
            <Route 
              path="/product/masca-faciala-detox" 
              element={<ProductPage product={products["masca-faciala-detox"]} />} 
            />
            <Route 
              path="/product/spuma-de-curatare" 
              element={<ProductPage product={products["spuma-de-curatare"]} />} 
            />
            <Route 
              path="/product/tonic-purificator" 
              element={<ProductPage product={products["tonic-purificator"]} />} 
            />
            <Route 
              path="/product/ulei-de-fata-nutritiv" 
              element={<ProductPage product={products["ulei-de-fata-nutritiv"]} />} 
            />
            <Route 
              path="/product/crema-nutritiva-de-noapte-ingrjire" 
              element={<ProductPage product={products["crema-nutritiva-de-noapte-ingrjire"]} />} 
            />
          </Routes>
          <Toaster />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
