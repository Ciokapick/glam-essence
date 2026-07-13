import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import ProductDetailsPopup from './ProductDetailsPopup';
import { getProductStock, stockUpdateEmitter } from '@/utils/jsonDb';

interface ProductCardProps {
  id: string;
  slug?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  rating?: number;
  description?: string;
}

const ProductCard = ({ id, slug, name, price, image, category, isNew, isSale, discount, rating = 0, description }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    getProductStock(id).then(setStock);
    return stockUpdateEmitter.subscribe((productId, nextStock) => {
      if (id === productId) setStock(nextStock);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (stock <= 0) {
      toast({ title: t('toast.out_of_stock'), description: t('toast.out_of_stock_desc'), variant: 'destructive' });
      return;
    }
    addToCart({ id, name, price, image, category, discount: isSale ? discount : undefined });
    toast({ title: t('toast.added_to_cart'), description: t('toast.added_to_cart_desc').replace('{productName}', t(name)) });
  };

  const productUrl = slug ? `/product/${slug}` : `/product/${name.toLowerCase().replace(/\s+/g, '-')}`;
  const finalPrice = isSale && discount ? price * (1 - discount / 100) : price;

  return (
    <>
      <article className="group">
        <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-[#f2ece9]">
          <Link to={productUrl} aria-label={`${language === 'ro' ? 'Vezi' : 'View'} ${t(name)}`}>
            <img src={image} alt={t(name)} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]" loading="lazy" />
          </Link>
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-2 bg-gradient-to-t from-black/50 to-transparent p-4 pt-14 transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#281922] transition hover:bg-[#f2e7e3]"
              aria-label={language === 'ro' ? 'Previzualizare rapidă' : 'Quick view'}
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className="flex h-11 flex-1 items-center justify-center gap-2 bg-white px-4 text-[10px] font-semibold uppercase tracking-[.14em] text-[#281922] transition hover:bg-[#f2e7e3] disabled:cursor-not-allowed disabled:opacity-55"
            >
              <ShoppingBag className="h-4 w-4" />
              {stock > 0 ? t('common.add_to_cart') : t('product.out_of_stock')}
            </button>
          </div>
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {isNew && <Badge className="rounded-none border-0 bg-[#281922] px-3 py-1 text-[9px] uppercase tracking-[.14em] text-white">{t('product.new_badge')}</Badge>}
            {isSale && discount && <Badge className="rounded-none border-0 bg-[#a04e62] px-3 py-1 text-[9px] tracking-[.14em] text-white">-{discount}%</Badge>}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[9px] font-medium uppercase tracking-[.2em] text-[#9c7d87]">{t(category)}</p>
            <Link to={productUrl} className="font-serif text-xl text-[#281922] transition group-hover:text-[#9c5967]">{t(name)}</Link>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="font-medium text-[#281922]">{finalPrice.toFixed(2)} lei</span>
              {isSale && discount && <span className="text-xs text-[#9b8d92] line-through">{price.toFixed(2)} lei</span>}
            </div>
          </div>
          <Link to={productUrl} className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#281922]/15 text-[#281922] transition hover:border-[#281922]" aria-label={language === 'ro' ? 'Detalii produs' : 'Product details'}>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </article>

      {isPopupOpen && (
        <ProductDetailsPopup
          id={id} name={name} price={price} image={image} category={category} isNew={isNew}
          isSale={isSale} discount={discount} rating={rating} description={description} stock={stock}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
