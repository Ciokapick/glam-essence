import React, { useEffect, useState } from 'react';
import { Heart, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { getProductStock, stockUpdateEmitter } from '@/utils/jsonDb';

interface ProductDetailsPopupProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  rating?: number;
  description?: string;
  stock?: number;
  onClose: () => void;
}

const ProductDetailsPopup: React.FC<ProductDetailsPopupProps> = ({
  id, name, price, image, category, isNew, isSale, discount, description,
  stock: initialStock = 0, onClose,
}) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(initialStock);

  useEffect(() => {
    let active = true;
    getProductStock(id).then((currentStock) => { if (active) setStock(currentStock); });
    const unsubscribe = stockUpdateEmitter.subscribe((productId, newStock) => {
      if (id === productId) setStock(newStock);
    });
    return () => { active = false; unsubscribe(); };
  }, [id]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const finalPrice = isSale && discount ? price * (1 - discount / 100) : price;
  const isFavorite = isInWishlist(id);
  const incrementQuantity = () => setQuantity((current) => Math.min(current + 1, stock));
  const decrementQuantity = () => setQuantity((current) => Math.max(current - 1, 1));

  const handleAddToCart = () => {
    if (stock <= 0) {
      toast({ title: t('toast.out_of_stock'), description: t('toast.out_of_stock_desc'), variant: 'destructive' });
      return;
    }
    addToCart({ id, name, price, image, category, discount: isSale ? discount : undefined }, quantity);
    toast({ title: t('toast.added_to_cart'), description: t('toast.added_to_cart_desc').replace('{productName}', t(name)) });
    onClose();
  };

  const handleAddToWishlist = () => {
    addToWishlist({ id, name, price, image, category, discount: isSale ? discount : undefined });
    toast({ title: t('toast.added_to_wishlist'), description: t('toast.added_to_wishlist_desc').replace('{productName}', t(name)) });
  };

  return (
    <div
      className="popup-overlay fixed inset-0 z-[130] flex items-end justify-center bg-[#281922]/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <section className="relative grid max-h-[92dvh] w-[min(100%,64rem)] grid-cols-1 overflow-hidden rounded-t-[1.75rem] bg-[#fffdfb] text-[#281922] shadow-2xl sm:grid-cols-[minmax(0,46%)_minmax(0,54%)] sm:rounded-[1.75rem]" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-white/80 text-[#281922] shadow-sm backdrop-blur transition hover:bg-white" aria-label={language === 'ro' ? 'Închide previzualizarea' : 'Close quick view'}>
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-[42dvh] min-h-[230px] shrink-0 bg-[#f1e8e4] sm:h-auto sm:w-[46%] sm:min-h-[560px]">
          <img src={image} alt={t(name)} className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#281922]/25 to-transparent" />
          <div className="absolute left-5 top-5 flex flex-col gap-2">
            {isNew && <Badge className="border-0 bg-[#281922] text-[10px] uppercase tracking-[.14em] text-white">{t('product.new_badge')}</Badge>}
            {isSale && discount && <Badge className="border-0 bg-[#a04e62] text-[10px] tracking-[.14em] text-white">-{discount}%</Badge>}
            {stock <= 0 && <Badge variant="outline" className="border-white bg-white/90 text-[#67545c]">{t('product.out_of_stock')}</Badge>}
          </div>
        </div>

        <div className="min-h-0 min-w-0 overflow-y-auto p-6 sm:p-9">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#9c7d87]">{t(category)}</p>
          <h2 id="quick-view-title" className="max-w-lg font-serif text-3xl leading-[.98] tracking-[-.03em] sm:text-4xl">{t(name)}</h2>

          <div className="mt-5 flex items-baseline gap-3 border-b border-[#281922]/10 pb-5">
            <span className="text-xl font-semibold">{finalPrice.toFixed(2)} lei</span>
            {isSale && discount && <span className="text-sm text-[#9b8d92] line-through">{price.toFixed(2)} lei</span>}
          </div>

          {description && <p className="mt-6 max-w-xl text-sm leading-7 text-[#67545c]">{t(description)}</p>}

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">{t('product.quantity')}</span>
            <div className="inline-flex h-11 items-center rounded-full border border-[#281922]/15 bg-white">
              <button type="button" onClick={decrementQuantity} disabled={quantity <= 1} className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-[#f3e8e6] disabled:cursor-not-allowed disabled:opacity-35" aria-label={language === 'ro' ? 'Scade cantitatea' : 'Decrease quantity'}><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button type="button" onClick={incrementQuantity} disabled={quantity >= stock} className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-[#f3e8e6] disabled:cursor-not-allowed disabled:opacity-35" aria-label={language === 'ro' ? 'Crește cantitatea' : 'Increase quantity'}><Plus className="h-4 w-4" /></button>
            </div>
            <span className="text-xs text-[#9b8d92]">{stock} {t('product.available')}</span>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
            <button type="button" onClick={handleAddToCart} disabled={stock <= 0} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#c43de3] px-6 text-[10px] font-semibold uppercase tracking-[.15em] text-white transition hover:bg-[#a928c3] disabled:cursor-not-allowed disabled:opacity-45"><ShoppingBag className="h-4 w-4" />{stock > 0 ? t('common.add_to_cart') : t('product.out_of_stock')}</button>
            <button type="button" onClick={handleAddToWishlist} className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border px-5 text-[10px] font-semibold uppercase tracking-[.12em] transition ${isFavorite ? 'border-[#a04e62] bg-[#f8e7e9] text-[#a04e62]' : 'border-[#281922]/15 hover:bg-[#f8eeec]'}`}><Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />{language === 'ro' ? 'Favorite' : 'Wishlist'}</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPopup;
