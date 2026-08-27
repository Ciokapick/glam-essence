import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, CreditCard, LockKeyhole, MapPin, Package, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/services/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const { language } = useLanguage();
  const isRo = language === 'ro';
  const [formData, setFormData] = useState({ name: '', email: '', address: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardPayments, setCardPayments] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

  useEffect(() => {
    api.checkoutConfig().then((config) => setCardPayments(config.cardPayments)).catch(() => setCardPayments(false));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const shipping = subtotal >= 200 ? 0 : 15;
  const total = subtotal + shipping;
  const copy = isRo ? {
    eyebrow: 'Glam Essence · comandă', title: 'Finalizare cu intenție.', intro: 'Alege câteva produse care îți fac ritualul mai bun. Noi le pregătim cu grijă și le trimitem spre tine.', back: 'Înapoi la magazin', details: 'Detaliile comenzii', pieces: 'produse', delivery: 'Livrare', free: 'Gratuită', total: 'Total de plată', shippingNote: shipping === 0 ? 'Ai deblocat livrarea gratuită.' : 'Livrare gratuită pentru comenzi peste 200 lei.', addressTitle: 'Unde ajunge ritualul tău?', addressIntro: 'Completează datele de livrare și îți confirmăm comanda imediat.', fullName: 'Nume complet', fullNamePlaceholder: 'Numele tău', email: 'Adresă de email', emailPlaceholder: 'unde@ajungem.ro', phone: 'Telefon', phonePlaceholder: '07xx xxx xxx', address: 'Adresă de livrare', addressPlaceholder: 'Stradă, număr, apartament, oraș', paymentTitle: 'Cum plătești?', cash: 'Plată la livrare', cashNote: 'Achită curierului când primești coletul.', card: 'Card online', cardNote: 'Continuă către plata securizată Stripe.', place: 'Plasează comanda', continueCard: 'Continuă către plata securizată', processing: 'Se procesează...', secure: 'Datele tale sunt protejate', secureNote: 'Folosim conexiuni securizate pentru fiecare comandă.', editCart: 'Editează coșul',
  } : {
    eyebrow: 'Glam Essence · order', title: 'Checkout, with intention.', intro: 'Choose a few products to make your ritual better. We will wrap them with care and send them your way.', back: 'Back to the store', details: 'Order details', pieces: 'items', delivery: 'Delivery', free: 'Complimentary', total: 'Total to pay', shippingNote: shipping === 0 ? 'You have unlocked complimentary delivery.' : 'Complimentary delivery on orders over 200 lei.', addressTitle: 'Where should your ritual arrive?', addressIntro: 'Add your delivery details and we will confirm your order right away.', fullName: 'Full name', fullNamePlaceholder: 'Your name', email: 'Email address', emailPlaceholder: 'where@we-send.com', phone: 'Phone', phonePlaceholder: '+40 7xx xxx xxx', address: 'Delivery address', addressPlaceholder: 'Street, number, apartment, city', paymentTitle: 'How would you like to pay?', cash: 'Cash on delivery', cashNote: 'Pay the courier when your parcel arrives.', card: 'Card online', cardNote: 'Continue to secure Stripe checkout.', place: 'Place order', continueCard: 'Continue to secure payment', processing: 'Processing...', secure: 'Your details are protected', secureNote: 'Every order is handled over a secure connection.', editCart: 'Edit your cart',
  };

  const updateField = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => setFormData((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const orderInput = { items, customer: { name: formData.name, email: formData.email, address: formData.address, phone: formData.phone } };
      if (paymentMethod === 'card') {
        const session = await api.createCheckoutSession(orderInput);
        window.location.assign(session.url);
        return;
      }
      const order = await api.placeOrder(orderInput);
      clearCart();
      toast({ title: isRo ? 'Comandă plasată cu succes!' : 'Order placed successfully!', description: `${isRo ? 'Referință' : 'Reference'} ${order.id}. ${isRo ? 'Plata se face la livrare.' : 'Payment is due on delivery.'}` });
      navigate('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({ title: isRo ? 'Eroare' : 'Something went wrong', description: error instanceof Error ? error.message : (isRo ? 'A apărut o eroare la plasarea comenzii.' : 'We could not place your order.'), variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f1ee] text-[#281922]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <button type="button" onClick={() => navigate('/')} className="group mb-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-[#8f5262] transition hover:text-[#281922]"><ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />{copy.back}</button>
            <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#a35b6e]">{copy.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[.98] tracking-[-.04em] md:text-7xl">{copy.title}</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#75656d]">{copy.intro}</p>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.16em] text-[#75656d]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#281922] text-white">1</span><span className="h-px w-10 bg-[#cbbbc0]" /><span className="text-[#a35b6e]">2</span><span className="h-px w-10 bg-[#cbbbc0]" /><span>3</span></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <form onSubmit={handleSubmit} className="space-y-5">
            <section className="rounded-[1.5rem] border border-[#281922]/10 bg-[#fffdfb] p-6 shadow-[0_18px_50px_rgba(40,25,34,.05)] md:p-9">
              <div className="mb-8 flex items-start justify-between gap-5"><div><div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-[#f5e6e6] text-[#9b5668]"><MapPin className="h-5 w-5" /></div><h2 className="font-serif text-3xl tracking-[-.03em]">{copy.addressTitle}</h2><p className="mt-2 text-sm leading-6 text-[#75656d]">{copy.addressIntro}</p></div><span className="hidden text-[10px] font-semibold uppercase tracking-[.16em] text-[#b48b94] md:block">01 / 03</span></div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2"><Label htmlFor="name" className="mb-2 block text-xs font-medium text-[#281922]">{copy.fullName}</Label><Input id="name" required autoComplete="name" placeholder={copy.fullNamePlaceholder} value={formData.name} onChange={updateField('name')} className="h-12 rounded-xl border-[#281922]/12 bg-[#fffdfb] px-4 text-sm placeholder:text-[#ac9ca2]" /></div>
                <div><Label htmlFor="email" className="mb-2 block text-xs font-medium text-[#281922]">{copy.email}</Label><Input id="email" type="email" required autoComplete="email" placeholder={copy.emailPlaceholder} value={formData.email} onChange={updateField('email')} className="h-12 rounded-xl border-[#281922]/12 bg-[#fffdfb] px-4 text-sm placeholder:text-[#ac9ca2]" /></div>
                <div><Label htmlFor="phone" className="mb-2 block text-xs font-medium text-[#281922]">{copy.phone}</Label><Input id="phone" type="tel" required autoComplete="tel" placeholder={copy.phonePlaceholder} value={formData.phone} onChange={updateField('phone')} className="h-12 rounded-xl border-[#281922]/12 bg-[#fffdfb] px-4 text-sm placeholder:text-[#ac9ca2]" /></div>
                <div className="md:col-span-2"><Label htmlFor="address" className="mb-2 block text-xs font-medium text-[#281922]">{copy.address}</Label><Input id="address" required autoComplete="street-address" placeholder={copy.addressPlaceholder} value={formData.address} onChange={updateField('address')} className="h-12 rounded-xl border-[#281922]/12 bg-[#fffdfb] px-4 text-sm placeholder:text-[#ac9ca2]" /></div>
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-[#281922]/10 bg-[#fffdfb] p-6 shadow-[0_18px_50px_rgba(40,25,34,.05)] md:p-9">
              <div className="mb-7 flex items-start justify-between gap-5"><div><div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-[#f5e6e6] text-[#9b5668]"><CreditCard className="h-5 w-5" /></div><h2 className="font-serif text-3xl tracking-[-.03em]">{copy.paymentTitle}</h2></div><span className="hidden text-[10px] font-semibold uppercase tracking-[.16em] text-[#b48b94] md:block">02 / 03</span></div>
              <fieldset className="space-y-3"><legend className="sr-only">{copy.paymentTitle}</legend>
                <label className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition ${paymentMethod === 'cash' ? 'border-[#a35b6e] bg-[#fcf5f4]' : 'border-[#281922]/10 hover:border-[#a35b6e]/50'}`}><input type="radio" name="payment" className="mt-1 accent-[#9b5668]" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} /><span><strong className="block text-sm font-semibold">{copy.cash}</strong><small className="mt-1 block text-xs leading-5 text-[#75656d]">{copy.cashNote}</small></span>{paymentMethod === 'cash' && <Check className="ml-auto h-5 w-5 shrink-0 text-[#9b5668]" />}</label>
                {cardPayments && <label className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition ${paymentMethod === 'card' ? 'border-[#a35b6e] bg-[#fcf5f4]' : 'border-[#281922]/10 hover:border-[#a35b6e]/50'}`}><input type="radio" name="payment" className="mt-1 accent-[#9b5668]" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /><span><strong className="block text-sm font-semibold">{copy.card}</strong><small className="mt-1 block text-xs leading-5 text-[#75656d]">{copy.cardNote}</small></span>{paymentMethod === 'card' && <Check className="ml-auto h-5 w-5 shrink-0 text-[#9b5668]" />}</label>}
              </fieldset>
            </section>
            <div className="flex items-start gap-4 rounded-2xl border border-[#281922]/10 bg-[#eee5e2] p-5 text-[#5f4f56]"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9b5668]" /><div><p className="text-xs font-semibold text-[#281922]">{copy.secure}</p><p className="mt-1 text-xs leading-5">{copy.secureNote}</p></div></div>
            <Button type="submit" disabled={isSubmitting} className="h-14 w-full rounded-xl bg-[#281922] text-xs font-semibold uppercase tracking-[.16em] text-white shadow-[0_10px_25px_rgba(40,25,34,.18)] transition hover:bg-[#432d37] md:w-auto md:min-w-[310px]">{isSubmitting ? copy.processing : paymentMethod === 'card' ? copy.continueCard : copy.place}{!isSubmitting && <ArrowUpRight className="h-4 w-4" />}</Button>
          </form>

          <aside className="lg:sticky lg:top-28">
            <section className="overflow-hidden rounded-[1.5rem] bg-[#281922] text-white shadow-[0_24px_70px_rgba(40,25,34,.2)]">
              <div className="border-b border-white/15 p-6 md:p-8"><div className="flex items-start justify-between gap-5"><div><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#d7a5ae]">03 / 03</p><h2 className="mt-3 font-serif text-3xl tracking-[-.03em]">{copy.details}</h2></div><Package className="h-5 w-5 text-[#d7a5ae]" /></div><div className="mt-8 space-y-5">{items.map((item) => { const price = item.discount ? item.price * (1 - item.discount / 100) : item.price; return <div key={item.id} className="flex gap-4"><div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f0e5e2]"><img src={item.image} alt="" className="h-full w-full object-cover" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.name}</p><p className="mt-1 text-xs text-white/50">{item.category} · {item.quantity} {copy.pieces}</p></div><p className="text-sm font-medium">{(price * item.quantity).toFixed(2)} lei</p></div>; })}</div><button type="button" onClick={() => navigate('/')} className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#d7a5ae] transition hover:text-white">{copy.editCart}<ArrowUpRight className="h-3.5 w-3.5" /></button></div>
              <div className="space-y-4 p-6 md:p-8"><div className="flex justify-between text-sm text-white/65"><span>Subtotal</span><span className="text-white">{subtotal.toFixed(2)} lei</span></div><div className="flex justify-between text-sm text-white/65"><span>{copy.delivery}</span><span className="text-white">{shipping === 0 ? copy.free : `${shipping.toFixed(2)} lei`}</span></div><div className="border-t border-white/15 pt-5"><div className="flex items-end justify-between"><span className="font-serif text-2xl">{copy.total}</span><span className="text-xl font-semibold">{total.toFixed(2)} lei</span></div><p className="mt-3 text-xs leading-5 text-[#d7a5ae]">{copy.shippingNote}</p></div></div>
            </section>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-[#75656d]"><div className="rounded-2xl border border-[#281922]/10 bg-[#fffdfb] p-4"><Truck className="mb-3 h-4 w-4 text-[#9b5668]" /><span>{isRo ? 'Expediere în 24h' : 'Ships within 24h'}</span></div><div className="rounded-2xl border border-[#281922]/10 bg-[#fffdfb] p-4"><LockKeyhole className="mb-3 h-4 w-4 text-[#9b5668]" /><span>{isRo ? 'Plată sigură' : 'Secure payment'}</span></div></div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
