import { FormEvent, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const Newsletter = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const copy = language === 'ro' ? {
    eyebrow: 'Scrisori de la Glam Essence',
    title: 'Noutăți rare, trimise cu măsură.',
    body: 'Colecții noi, ghiduri de parfum și idei de ritual. Fără zgomot inutil.',
    placeholder: 'adresa ta de email',
    button: 'Mă abonez',
    success: 'Bine ai venit în universul Glam Essence.',
    privacy: 'Te poți dezabona oricând. Adresa rămâne doar pentru aceste noutăți.',
  } : {
    eyebrow: 'Letters from Glam Essence',
    title: 'Rare updates, thoughtfully sent.',
    body: 'New collections, fragrance guides, and ritual ideas. Nothing unnecessary.',
    placeholder: 'your email address',
    button: 'Subscribe',
    success: 'Welcome to the Glam Essence world.',
    privacy: 'Unsubscribe anytime. Your address is used only for these updates.',
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    toast({ title: copy.success });
    setEmail('');
  };

  return (
    <section className="bg-[#fbf8f5] py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.3em] text-[#9c5967]">{copy.eyebrow}</p>
          <h2 className="font-serif text-4xl font-medium tracking-[-.035em] text-[#281922] md:text-6xl">{copy.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#74666d] md:text-base">{copy.body}</p>

          <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-2xl flex-col border-b border-[#281922] sm:flex-row" aria-label="Newsletter">
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={copy.placeholder}
              className="h-14 flex-1 bg-transparent px-1 text-sm text-[#281922] outline-none placeholder:text-[#8e8186]"
            />
            <button type="submit" className="group inline-flex h-14 items-center justify-center gap-3 px-2 text-[10px] font-semibold uppercase tracking-[.18em] text-[#281922]">
              {copy.button}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <p className="mt-4 text-[10px] leading-5 text-[#91858a]">{copy.privacy}</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
