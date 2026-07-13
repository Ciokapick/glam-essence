import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const CheckoutSuccess = () => {
  const { clearCart } = useCart();
  useEffect(() => clearCart(), [clearCart]);

  return (
    <main className="grid min-h-screen place-items-center bg-[#fbf8f5] px-5 text-center text-[#281922]">
      <div className="max-w-xl">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#9c5967]" />
        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[.3em] text-[#9c5967]">Plată confirmată</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight md:text-7xl">Comanda ta este în lucru.</h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#74666d]">Am primit plata și pregătim produsele. Confirmarea comenzii va ajunge la adresa folosită la plată.</p>
        <Link to="/" className="mt-9 inline-flex h-12 items-center bg-[#281922] px-7 text-[10px] font-semibold uppercase tracking-[.18em] text-white">Înapoi la magazin</Link>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
