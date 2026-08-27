import React, { useEffect } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart, CartItem } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { t, language } = useLanguage();
  const finalPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
  const lineTotal = finalPrice * item.quantity;

  return (
    <article className="flex gap-4 border-b border-[#281922]/10 py-5 first:pt-1">
      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-[1rem] bg-[#f1e8e4]">
        <img src={item.image} alt={t(item.name)} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-serif text-lg leading-tight text-[#281922]">{t(item.name)}</h3>
            <p className="mt-1 truncate text-[10px] font-medium uppercase tracking-[.16em] text-[#9c7d87]">{t(item.category)}</p>
          </div>
          <button type="button" onClick={() => removeFromCart(item.id)} className="-mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#806d74] transition hover:bg-[#f3e8e6] hover:text-[#9c5967]" aria-label={`${language === 'ro' ? 'Elimină' : 'Remove'} ${t(item.name)}`}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="inline-flex h-9 items-center rounded-full border border-[#281922]/15 bg-white">
            <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="grid h-9 w-9 place-items-center rounded-full text-[#67545c] transition hover:bg-[#f3e8e6] disabled:cursor-not-allowed disabled:opacity-35" aria-label={language === 'ro' ? 'Scade cantitatea' : 'Decrease quantity'}>
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-medium" aria-label={`${item.quantity} ${language === 'ro' ? 'bucăți' : 'items'}`}>{item.quantity}</span>
            <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="grid h-9 w-9 place-items-center rounded-full text-[#67545c] transition hover:bg-[#f3e8e6]" aria-label={language === 'ro' ? 'Crește cantitatea' : 'Increase quantity'}>
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="shrink-0 text-sm font-semibold text-[#281922]">{lineTotal.toFixed(2)} lei</p>
        </div>
      </div>
    </article>
  );
};

const Cart: React.FC = () => {
  const { items, isOpen, closeCart, totalItems, subtotal, clearCart } = useCart();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') closeCart(); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  const handleCheckout = () => { closeCart(); navigate('/checkout'); };
  if (!isOpen) return null;

  const shipping = subtotal >= 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-[120]" role="presentation">
      <button type="button" className="absolute inset-0 h-full w-full cursor-default bg-[#281922]/45 backdrop-blur-[2px]" onClick={closeCart} aria-label={t('cart.close_cart')} />
      <aside className="animate-slide-in-right absolute right-0 top-0 flex h-[100dvh] w-full max-w-[34rem] flex-col border-l border-[#281922]/10 bg-[#f7f3ef] text-[#281922] shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="flex shrink-0 items-center justify-between bg-[#281922] px-5 py-5 text-white sm:px-7">
          <div>
            <p className="mb-1 text-[9px] font-semibold uppercase tracking-[.2em] text-[#d9aebb]">Glam Essence · atelier</p>
            <h2 id="cart-title" className="flex items-center gap-2 font-serif text-3xl tracking-[-.03em]">{t('cart.title')} <span className="font-sans text-xs font-medium text-white/55">{totalItems}</span></h2>
          </div>
          <button type="button" onClick={closeCart} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition hover:bg-white/10" aria-label={t('cart.close_cart')}><X className="h-5 w-5" /></button>
        </header>

        {items.length === 0 ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-7 py-10 text-center">
            <div className="mb-6 grid h-20 w-20 place-items-center rounded-full border border-[#281922]/10 bg-[#e9f1ef] text-[#66858b]"><ShoppingBag className="h-8 w-8" strokeWidth={1.4} /></div>
            <h3 className="font-serif text-2xl">{t('cart.empty_title')}</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-[#806d74]">{t('cart.empty_subtitle')}</p>
            <Button onClick={closeCart} className="mt-7 h-12 rounded-full bg-[#281922] px-6 text-[10px] font-semibold uppercase tracking-[.16em] text-white hover:bg-[#593044]">{t('cart.continue_shopping')} <ArrowRight className="h-4 w-4" /></Button>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              <div className="mb-5 rounded-[1.15rem] border border-[#9abec2]/45 bg-[#e9f1ef] px-4 py-4 text-xs leading-5 text-[#49666b]">
                <div className="flex items-center justify-between gap-3">
                  <span>{shipping === 0 ? (language === 'ro' ? 'Livrarea ta este gratuită.' : 'Your delivery is complimentary.') : (language === 'ro' ? `Mai ai ${(200 - subtotal).toFixed(2)} lei pentru livrare gratuită.` : `Add ${(200 - subtotal).toFixed(2)} lei for complimentary delivery.`)}</span>
                  <span className="shrink-0 font-semibold text-[#281922]">{Math.min(Math.round((subtotal / 200) * 100), 100)}%</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/80"><div className="h-full rounded-full bg-[#66858b] transition-all" style={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }} /></div>
              </div>
              <div className="space-y-0">{items.map((item) => <CartItemRow key={item.id} item={item} />)}</div>
            </div>
            <footer className="shrink-0 border-t border-white/10 bg-[#281922] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 text-white sm:px-7">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/55"><span>{t('cart.subtotal')}</span><span className="text-white">{subtotal.toFixed(2)} lei</span></div>
                <div className="flex justify-between text-white/55"><span>{t('cart.shipping')}</span><span className="text-white">{shipping === 0 ? (language === 'ro' ? 'Gratuit' : 'Complimentary') : `${shipping.toFixed(2)} lei`}</span></div>
                <div className="mt-3 flex justify-between border-t border-white/15 pt-4 text-base font-semibold"><span>{t('cart.total')}</span><span className="text-xl">{total.toFixed(2)} lei</span></div>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-[auto_1fr]">
                <Button onClick={clearCart} variant="outline" className="h-12 rounded-full border-white/25 bg-transparent px-4 text-[10px] font-semibold uppercase tracking-[.12em] text-white/75 hover:bg-white/10 hover:text-white"><Trash2 className="h-4 w-4" /><span className="hidden sm:inline">{t('cart.clear_cart')}</span></Button>
                <Button onClick={handleCheckout} className="h-12 rounded-full bg-[#d9aebb] text-[10px] font-semibold uppercase tracking-[.16em] text-[#281922] hover:bg-white">{t('cart.checkout')} <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};

export default Cart;
