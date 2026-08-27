
import React from 'react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, Trash2, X } from 'lucide-react';

const WishlistPage = () => {
  const { items, clearWishlist, removeFromWishlist } = useWishlist();
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#281922]">
      <Navbar />

      <main className="pt-[104px]">
        <section className="relative isolate overflow-hidden bg-[#281922] text-[#fffaf7]">
          <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#a04e62]/35 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#d9aebb]/20 blur-3xl" />
          <div className="container relative mx-auto grid min-h-[350px] items-end gap-10 px-5 py-14 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:py-20">
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#d9aebb]">{t('wishlist.eyebrow')}</p>
              <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[.95] tracking-[-.045em] sm:text-6xl md:text-7xl">{t('wishlist.editorial_title')}</h1>
              <p className="mt-7 max-w-lg text-sm leading-7 text-white/65 sm:text-base">{t('wishlist.editorial_subtitle')}</p>
            </div>

            <div className="relative w-full max-w-[18rem] border border-white/20 bg-white/[.06] p-6 backdrop-blur-sm md:mb-1">
              <Sparkles className="h-5 w-5 text-[#d9aebb]" strokeWidth={1.5} />
              <p className="mt-10 font-serif text-4xl leading-none">{items.length.toString().padStart(2, '0')}</p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/55">{t('wishlist.saved_label')}</p>
              <div className="mt-6 h-px bg-white/15" />
              <p className="mt-4 text-xs leading-5 text-white/55">{language === 'ro' ? 'Păstrează aici produsele care îți vorbesc.' : 'Keep the products that speak to you close.'}</p>
            </div>
          </div>
        </section>

        {items.length > 0 ? (
          <>
            <div className="container relative z-10 mx-auto -mt-7 px-5 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-[#281922]/10 bg-[#fffdfb] p-4 pl-5 shadow-[0_18px_50px_rgba(40,25,34,.08)] sm:p-5 sm:pl-6">
                <p className="text-sm text-[#6f6268]"><span className="font-semibold text-[#281922]">{items.length}</span> {t('wishlist.favorite_products')}</p>
                <button type="button" onClick={clearWishlist} className="inline-flex items-center gap-2 rounded-full border border-[#281922]/15 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#6f6268] transition hover:border-[#a04e62] hover:text-[#a04e62]">
                  <Trash2 className="h-3.5 w-3.5" />
                  {t('wishlist.clear_list')}
                </button>
              </div>
            </div>

            <div className="container mx-auto grid gap-x-6 gap-y-14 px-5 py-16 sm:grid-cols-2 sm:px-8 md:py-20 lg:grid-cols-3">
              {items.map((item) => (
                <div key={item.id} className="group relative animate-fade-in">
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                    discount={item.discount}
                  />
                  <button type="button" onClick={() => removeFromWishlist(item.id)} className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-[#281922]/10 bg-[#fffdfb]/90 text-[#6f6268] opacity-0 shadow-sm backdrop-blur transition hover:bg-white hover:text-[#a04e62] group-hover:opacity-100 focus:opacity-100" aria-label={t('wishlist.remove_item')}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="container mx-auto px-5 py-16 sm:px-8 md:py-24">
            <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-[#281922]/10 bg-[#e9f1ef] px-6 py-14 text-center sm:px-10">
              <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#b9dce0]/70 blur-2xl" />
              <div className="relative mx-auto max-w-xl">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#281922]/15 bg-white/60 text-[#a04e62]"><Heart className="h-6 w-6" strokeWidth={1.5} /></div>
                <p className="mt-7 text-[10px] font-semibold uppercase tracking-[.25em] text-[#66858b]">{t('wishlist.empty_eyebrow')}</p>
                <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-.04em] sm:text-5xl">{t('wishlist.empty_title')}</h2>
                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#607377]">{t('wishlist.empty_subtitle')}</p>
                <Link to="/parfumuri" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#281922] px-5 py-3 text-[10px] font-semibold uppercase tracking-[.14em] text-white transition hover:bg-[#a04e62]">
                  <ArrowLeft className="h-4 w-4" />
                  {t('wishlist.continue_shopping')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
