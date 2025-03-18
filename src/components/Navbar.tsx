
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-bold">
            <span className="gold-gradient">Glam</span>
            <span className="font-light">Essence</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium relative animated-border pb-1">Acasă</Link>
            <Link to="/parfumuri" className="font-medium relative animated-border pb-1">Parfumuri</Link>
            <Link to="/creme" className="font-medium relative animated-border pb-1">Creme</Link>
            <Link to="/ingrijire" className="font-medium relative animated-border pb-1">Îngrijire</Link>
          </nav>
          
          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full relative" asChild>
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-beauty-rose text-white text-xs h-5 w-5 flex items-center justify-center">{wishlistItems}</Badge>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full relative" onClick={openCart}>
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-primary text-xs h-5 w-5 flex items-center justify-center">{totalItems}</Badge>
              )}
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4 py-4">
            <Link to="/" className="font-medium p-2" onClick={toggleMobileMenu}>Acasă</Link>
            <Link to="/parfumuri" className="font-medium p-2" onClick={toggleMobileMenu}>Parfumuri</Link>
            <Link to="/creme" className="font-medium p-2" onClick={toggleMobileMenu}>Creme</Link>
            <Link to="/ingrijire" className="font-medium p-2" onClick={toggleMobileMenu}>Îngrijire</Link>
            <Link to="/wishlist" className="font-medium p-2" onClick={toggleMobileMenu}>Favorite</Link>
          </nav>
          <div className="flex justify-around py-4 border-t">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/wishlist" onClick={toggleMobileMenu}>
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-beauty-rose text-white text-xs h-5 w-5 flex items-center justify-center">{wishlistItems}</Badge>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-primary text-xs h-5 w-5 flex items-center justify-center">{totalItems}</Badge>
              )}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
