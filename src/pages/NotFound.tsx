import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const isRo = language === 'ro';

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f5f1ee] text-[#281922]">
      <Navbar />
      <main className="mx-auto grid min-h-[calc(100svh-104px)] max-w-[1440px] place-items-center px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <section className="relative w-full overflow-hidden rounded-[1.75rem] bg-[#281922] px-7 py-20 text-center text-white shadow-[0_22px_70px_rgba(40,25,34,.16)] sm:px-12 md:py-28">
          <div className="pointer-events-none absolute -left-40 -top-48 h-[34rem] w-[34rem] rounded-full border border-[#d9aebb]/20" />
          <div className="pointer-events-none absolute -bottom-56 -right-32 h-[38rem] w-[38rem] rounded-full border border-[#d9aebb]/15" />
          <Sparkles className="relative mx-auto h-7 w-7 text-[#d9aebb]" strokeWidth={1.25} />
          <p className="relative mt-8 text-[10px] font-semibold uppercase tracking-[.3em] text-[#d9aebb]">Glam Essence · 404</p>
          <p className="relative mt-7 font-serif text-[8rem] leading-[.78] tracking-[-.08em] text-white/95 sm:text-[11rem]">404</p>
          <h1 className="relative mt-10 font-serif text-4xl tracking-[-.035em] sm:text-5xl">{isRo ? 'Pagina nu a fost găsită.' : 'This page wandered away.'}</h1>
          <p className="relative mx-auto mt-5 max-w-md text-sm leading-7 text-white/60">{isRo ? 'Linkul acesta nu mai face parte din ritual. Hai să te întoarcem la colecții.' : 'This link is no longer part of the ritual. Let’s take you back to the collections.'}</p>
          <Link to="/" className="relative mt-9 inline-flex h-12 items-center gap-3 rounded-full bg-[#f8eeec] px-6 text-[10px] font-semibold uppercase tracking-[.17em] text-[#281922] transition hover:bg-white"><ArrowLeft className="h-4 w-4" />{isRo ? 'Înapoi la magazin' : 'Back to the store'}<ArrowUpRight className="h-4 w-4" /></Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
