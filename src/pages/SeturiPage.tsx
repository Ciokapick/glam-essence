import { useEffect } from 'react';
import { ArrowDown, Gift, ShoppingBag, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

const giftSets = [
  {
    id: 'gift-light-duet',
    price: 429.99,
    oldPrice: 489.99,
    images: ['/products/perfumes/editorial/fresh-citrus.webp', '/products/skincare/campaign/face-serum.webp'],
    ro: {
      eyebrow: 'PROASPĂT · LUMINOS',
      name: 'Duet de lumină',
      description: 'Fresh Citrus și serul Radiance, reunite pentru dimineți luminoase și energie curată.',
      includes: ['Fresh Citrus Eau de Toilette', 'Ser facial Radiance', 'Ambalaj cadou'],
    },
    en: {
      eyebrow: 'FRESH · LUMINOUS',
      name: 'The light duet',
      description: 'Fresh Citrus and the Radiance serum, brought together for bright mornings and clean energy.',
      includes: ['Fresh Citrus Eau de Toilette', 'Radiance facial serum', 'Gift packaging'],
    },
  },
  {
    id: 'gift-evening-ritual',
    price: 559.99,
    oldPrice: 619.99,
    images: ['/products/perfumes/editorial/floral-extravagance.webp', '/products/skincare/campaign/night-cream.webp', '/products/skincare/campaign/face-oil.webp'],
    ro: {
      eyebrow: 'FLORAL · RECONFORTANT',
      name: 'Ritual de seară',
      description: 'Un parfum floral, o cremă nutritivă și câteva picături de ulei pentru un final de zi mai lent.',
      includes: ['Floral Extravagance Eau de Parfum', 'Cremă nutritivă de noapte', 'Ulei de față nutritiv', 'Ambalaj cadou'],
    },
    en: {
      eyebrow: 'FLORAL · COMFORTING',
      name: 'The evening ritual',
      description: 'A floral fragrance, a nourishing cream and a few drops of oil for a slower end to the day.',
      includes: ['Floral Extravagance Eau de Parfum', 'Nourishing night cream', 'Nourishing face oil', 'Gift packaging'],
    },
  },
  {
    id: 'gift-atelier-selection',
    price: 629.99,
    oldPrice: 679.99,
    images: ['/products/perfumes/editorial/oriental-mystique.webp', '/products/skincare/campaign/face-cream.webp', '/products/skincare/campaign/body-cream.webp'],
    ro: {
      eyebrow: 'ORIENTAL · COMPLET',
      name: 'Selecția atelierului',
      description: 'Parfum, îngrijirea tenului și confort pentru corp într-o selecție completă, construită pentru a impresiona.',
      includes: ['Oriental Mystique Eau de Parfum', 'Cremă hidratantă Luxury', 'Cremă de corp Intense', 'Ambalaj cadou'],
    },
    en: {
      eyebrow: 'ORIENTAL · COMPLETE',
      name: 'The atelier selection',
      description: 'Fragrance, face care and body comfort in a complete selection created to make an impression.',
      includes: ['Oriental Mystique Eau de Parfum', 'Luxury moisturising cream', 'Intense body cream', 'Gift packaging'],
    },
  },
] as const;

const copy = {
  ro: {
    eyebrow: 'Glam Essence · Selecții pentru a fi oferite',
    title: 'Un cadou bun spune: te-am observat.',
    intro: 'Nu am pus produse la întâmplare într-o cutie. Am construit trei stări complete, fiecare cu propriul parfum, ritm și moment.',
    cta: 'Descoperă selecțiile',
    manifesto: ['ALES', 'ÎMPACHETAT', 'OFERIT', 'PĂSTRAT'],
    storyLabel: 'Gestul din spatele obiectului',
    storyTitle: 'Cadoul începe cu persoana, nu cu ocazia.',
    storyText: 'Alege lumină pentru cineva energic, un ritual de seară pentru cineva care are nevoie să încetinească sau selecția atelierului când vrei să oferi întreaga experiență Glam Essence.',
    collectionLabel: 'Trei stări gata de oferit',
    collectionTitle: 'Alege universul care seamănă cu persoana la care te gândești.',
    add: 'Adaugă setul în coș',
    includes: 'Setul include',
    closingLabel: 'Pregătit pentru momentul potrivit',
    closingTitle: 'Unele lucruri sunt frumoase înainte să fie deschise.',
    closingText: 'Fiecare selecție este gândită ca un obiect complet: produse care funcționează împreună, o ordine firească și o prezentare care păstrează surpriza.',
  },
  en: {
    eyebrow: 'Glam Essence · Selections made to be given',
    title: 'A good gift says: I noticed you.',
    intro: 'We did not place random products in a box. We built three complete moods, each with its own fragrance, rhythm and moment.',
    cta: 'Discover the selections',
    manifesto: ['CHOSEN', 'WRAPPED', 'GIVEN', 'REMEMBERED'],
    storyLabel: 'The gesture behind the object',
    storyTitle: 'The gift begins with the person, not the occasion.',
    storyText: 'Choose light for someone energetic, an evening ritual for someone who needs to slow down, or the atelier selection when you want to offer the full Glam Essence experience.',
    collectionLabel: 'Three moods, ready to give',
    collectionTitle: 'Choose the world that feels like the person on your mind.',
    add: 'Add gift set to cart',
    includes: 'The set includes',
    closingLabel: 'Ready for the right moment',
    closingTitle: 'Some things are beautiful before they are opened.',
    closingText: 'Each selection is considered as a complete object: products that work together, a natural order and a presentation that preserves the surprise.',
  },
};

const SeturiPage = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const content = copy[language];

  useEffect(() => {
    window.scrollTo(0, 0);
    const elements = document.querySelectorAll<HTMLElement>('[data-collection-reveal]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );
    elements.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 80}ms`);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [language]);

  const addGiftSet = (set: (typeof giftSets)[number]) => {
    addToCart({
      id: set.id,
      name: set[language].name,
      price: set.price,
      image: set.images[0],
      category: language === 'ro' ? 'Set cadou' : 'Gift set',
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbf8f5] text-[#281922]">
      <Navbar />

      <main>
        <section className="relative grid min-h-[78svh] overflow-hidden bg-[#241820] pt-[104px] text-white lg:grid-cols-[.86fr_1.14fr]">
          <div className="relative z-10 flex flex-col justify-end px-6 pb-14 pt-24 sm:px-10 lg:px-[7vw] lg:pb-[9vh]">
            <p className="mb-7 text-[10px] font-semibold uppercase tracking-[.28em] text-[#e4bcc8]" data-collection-reveal>{content.eyebrow}</p>
            <h1 className="max-w-[760px] font-serif text-[clamp(3.5rem,7vw,7.6rem)] font-medium leading-[.88] tracking-[-.058em]" data-collection-reveal>{content.title}</h1>
            <p className="mt-8 max-w-xl text-sm leading-7 text-white/64 sm:text-base" data-collection-reveal>{content.intro}</p>
            <a href="#gift-collection" className="mt-10 inline-flex w-fit items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/75 transition hover:text-white" data-collection-reveal>
              {content.cta}<ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>

          <div className="relative min-h-[48svh] overflow-hidden lg:min-h-0">
            <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(36,24,32,1)_0%,transparent_34%),linear-gradient(0deg,rgba(36,24,32,.65)_0%,transparent_38%)]" />
            <img src="/products/skincare/family-reference.webp" alt="Selecția completă Glam Essence" className="story-hero-image h-full w-full object-cover" />
            <div className="story-floating-card absolute bottom-[7vh] right-[4vw] z-20 hidden rounded-[1.4rem] border border-white/20 bg-[#241820]/72 p-5 text-white shadow-2xl backdrop-blur-xl sm:block">
              <Gift className="h-5 w-5 text-[#e4bcc8]" strokeWidth={1.5} />
              <p className="mt-7 text-[9px] uppercase tracking-[.22em] text-white/50">Glam Essence</p>
              <p className="mt-2 font-serif text-2xl">Chosen with intention.</p>
            </div>
            <div className="glam-grain absolute inset-0 z-20" />
          </div>
        </section>

        <div className="story-marquee border-y border-black/10 bg-[#d9aebb] py-4 text-[#281922]" aria-hidden="true">
          <div className="story-marquee-track">
            {[...content.manifesto, ...content.manifesto].map((word, index) => (
              <span key={`${word}-${index}`} className="flex items-center gap-8 whitespace-nowrap font-serif text-2xl italic sm:text-3xl">
                {word}<span className="h-1.5 w-1.5 rounded-full bg-current" />
              </span>
            ))}
          </div>
        </div>

        <section className="bg-[#f5ece9] px-5 py-24 sm:px-8 lg:px-[7vw] lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-[9vw]">
            <div data-collection-reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#9d5469]">{content.storyLabel}</p>
              <h2 className="mt-5 font-serif text-[clamp(3rem,5vw,5.7rem)] leading-[.94] tracking-[-.052em]">{content.storyTitle}</h2>
            </div>
            <div className="flex flex-col justify-end" data-collection-reveal>
              <Sparkles className="h-7 w-7 text-[#a85f74]" strokeWidth={1.4} />
              <p className="mt-8 max-w-2xl text-base leading-8 text-[#281922]/62 sm:text-lg">{content.storyText}</p>
            </div>
          </div>
        </section>

        <section id="gift-collection" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-[7vw] lg:py-32">
          <div className="max-w-5xl" data-collection-reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#9d5469]">{content.collectionLabel}</p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,5vw,5.7rem)] leading-[.94] tracking-[-.052em]">{content.collectionTitle}</h2>
          </div>

          <div className="mx-auto mt-16 max-w-6xl space-y-6">
            {giftSets.map((set, index) => {
              const localized = set[language];
              return (
                <article key={set.id} className="grid overflow-hidden rounded-[1.75rem] border border-[#281922]/10 bg-white lg:grid-cols-[.94fr_1.06fr]" data-collection-reveal>
                  <div className={`grid min-h-[350px] gap-px bg-[#281922] sm:min-h-[390px] ${set.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2'}`}>
                    {set.images.map((image, imageIndex) => (
                      <img
                        key={image}
                        src={image}
                        alt={localized.includes[imageIndex] || localized.name}
                        className={`h-full w-full object-cover transition duration-1000 hover:scale-[1.025] ${set.images.length === 3 && imageIndex === 0 ? 'row-span-2' : ''}`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#a05a6c]">{localized.eyebrow}</p>
                        <span className="font-serif text-3xl italic text-[#281922]/20">0{index + 1}</span>
                      </div>
                      <h3 className="mt-6 font-serif text-4xl tracking-[-.04em] sm:text-5xl">{localized.name}</h3>
                      <p className="mt-5 max-w-xl text-sm leading-7 text-[#281922]/60">{localized.description}</p>
                      <p className="mt-8 text-[9px] font-semibold uppercase tracking-[.2em] text-[#281922]/45">{content.includes}</p>
                      <ul className="mt-4 space-y-2 text-sm text-[#281922]/68">
                        {localized.includes.map((item) => <li key={item} className="border-b border-[#281922]/10 pb-2">{item}</li>)}
                      </ul>
                    </div>
                    <div className="mt-10 flex flex-col gap-5 border-t border-[#281922]/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-3xl">{set.price.toFixed(2)} lei</span>
                        <span className="text-xs text-[#281922]/38 line-through">{set.oldPrice.toFixed(2)} lei</span>
                      </div>
                      <button onClick={() => addGiftSet(set)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#281922] px-6 py-4 text-[10px] font-semibold uppercase tracking-[.15em] text-white transition hover:-translate-y-1 hover:bg-[#593044]">
                        <ShoppingBag className="h-4 w-4" />{content.add}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="relative mx-4 mb-4 overflow-hidden rounded-[2rem] bg-[#281922] px-6 py-24 text-center text-white sm:mx-6 sm:px-10 lg:py-32" data-collection-reveal>
          <div className="story-orbit story-orbit-one border-white/10" />
          <div className="story-orbit story-orbit-two border-white/10" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#d9aebb]">{content.closingLabel}</p>
            <h2 className="mt-6 font-serif text-[clamp(3.2rem,6vw,6.6rem)] leading-[.92] tracking-[-.055em]">{content.closingTitle}</h2>
            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">{content.closingText}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeturiPage;
