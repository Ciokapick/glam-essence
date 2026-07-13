import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, ShoppingBag, User, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const { t, language } = useLanguage();
  const location = useLocation();
  const isHomeTop = location.pathname === '/' && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  const navClass = isHomeTop
    ? 'border-white/15 bg-transparent text-white'
    : 'border-[#2a1b23]/10 bg-[#fbf8f5]/92 text-[#271a21] shadow-[0_8px_30px_rgba(39,26,33,.06)] backdrop-blur-xl';

  const links = [
    ['/', t('nav.home')],
    ['/parfumuri', t('nav.perfumes')],
    ['/creme', t('nav.creams')],
    ['/ingrijire', t('nav.skincare')],
    ['/about', language === 'ro' ? 'Povestea noastră' : 'Our story'],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-8 items-center justify-center bg-[#281922] px-4 text-center text-[9px] font-medium uppercase tracking-[.18em] text-white/80 sm:text-[10px]">
        {language === 'ro' ? 'Livrare gratuită pentru comenzi peste 200 lei' : 'Complimentary delivery on orders over 200 lei'}
      </div>

      <div className={`border-b transition-all duration-300 ${navClass}`}>
        <div className="container mx-auto flex h-[72px] items-center justify-between px-5 md:px-8">
          <Link to="/" className="flex flex-col leading-none" aria-label="Glam Essence — acasă">
            <span className="font-serif text-[1.45rem] font-semibold tracking-[-.03em]">Glam Essence</span>
            <span className="mt-1 text-[7px] font-medium uppercase tracking-[.42em] opacity-65">Beauty atelier</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigație principală">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className={`relative py-2 text-[11px] font-medium uppercase tracking-[.15em] transition after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100 ${location.pathname === to ? 'after:scale-x-100' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:block"><LanguageSwitcher /></div>
            <Link to="/account" className="hidden rounded-full p-2.5 transition hover:bg-black/5 md:block" aria-label={language === 'ro' ? 'Contul meu' : 'My account'}>
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/wishlist" className="relative hidden rounded-full p-2.5 transition hover:bg-black/5 sm:block" aria-label={language === 'ro' ? 'Produse favorite' : 'Wishlist'}>
              <Heart className="h-[18px] w-[18px]" />
              {wishlistItems > 0 && <Badge className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border-0 bg-[#a04e62] p-0 text-[10px] text-white">{wishlistItems}</Badge>}
            </Link>
            <button onClick={openCart} className="relative rounded-full p-2.5 transition hover:bg-black/5" aria-label={language === 'ro' ? 'Deschide coșul' : 'Open cart'}>
              <ShoppingBag className="h-[18px] w-[18px]" />
              {totalItems > 0 && <Badge className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border-0 bg-[#a04e62] p-0 text-[10px] text-white">{totalItems}</Badge>}
            </button>
            <button
              className="rounded-full p-2.5 lg:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-[#281922]/10 bg-[#fbf8f5] px-5 py-7 text-[#281922] shadow-xl lg:hidden">
          <nav className="flex flex-col" aria-label="Navigație mobilă">
            {links.map(([to, label]) => (
              <Link key={to} to={to} className="border-b border-[#281922]/10 py-3.5 font-serif text-2xl">
                {label}
              </Link>
            ))}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                <Link to="/account" className="rounded-full border border-[#281922]/15 p-3" aria-label="Cont"><User className="h-5 w-5" /></Link>
                <Link to="/wishlist" className="rounded-full border border-[#281922]/15 p-3" aria-label="Favorite"><Heart className="h-5 w-5" /></Link>
              </div>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
