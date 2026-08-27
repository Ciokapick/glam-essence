import { useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Product } from '@/data/products';

type Language = 'ro' | 'en';

type LocalizedCollectionCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  manifesto: string[];
  storyLabel: string;
  storyTitle: string;
  storyText: string;
  gestures: Array<{ number: string; title: string; text: string }>;
  collectionLabel: string;
  collectionTitle: string;
  collectionText: string;
  closingLabel: string;
  closingTitle: string;
  closingText: string;
  closingCta: string;
};

type ThemeName = 'perfume' | 'face' | 'body';

export type EditorialCollectionConfig = {
  theme: ThemeName;
  copy: Record<Language, LocalizedCollectionCopy>;
  products: Product[];
  heroImage: string;
  heroImageAlt: string;
  floatingImage: string;
  floatingImageAlt: string;
  closingImage: string;
  closingImageAlt: string;
  collectionId: string;
  closingHref: string;
};

const themes = {
  perfume: {
    hero: 'bg-[#21131b]',
    accent: 'text-[#e0afbe]',
    ticker: 'bg-[#d9aebb] text-[#281922]',
    number: 'text-[#a85f74]',
    story: 'bg-[#fbf8f5]',
    closing: 'bg-[#3b202d] text-white',
    closingMuted: 'text-white/62',
    button: 'bg-[#d9aebb] text-[#281922] hover:bg-white',
  },
  face: {
    hero: 'bg-[#15232d]',
    accent: 'text-[#a9d4df]',
    ticker: 'bg-[#afd2dc] text-[#15232d]',
    number: 'text-[#4f8795]',
    story: 'bg-[#f3f7f7]',
    closing: 'bg-[#d9e9ed] text-[#172630]',
    closingMuted: 'text-[#172630]/62',
    button: 'bg-[#172630] text-white hover:bg-[#31505c]',
  },
  body: {
    hero: 'bg-[#30221c]',
    accent: 'text-[#d8bda4]',
    ticker: 'bg-[#cbb49e] text-[#30221c]',
    number: 'text-[#956e54]',
    story: 'bg-[#f6f0e9]',
    closing: 'bg-[#49352a] text-white',
    closingMuted: 'text-white/62',
    button: 'bg-[#d8bda4] text-[#30221c] hover:bg-white',
  },
} as const;

const EditorialCollectionPage = ({ config }: { config: EditorialCollectionConfig }) => {
  const { language } = useLanguage();
  const content = config.copy[language];
  const theme = themes[config.theme];

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

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbf8f5] text-[#281922]">
      <Navbar />

      <main>
        <section className={`relative grid min-h-[80svh] overflow-hidden pt-[104px] text-white lg:grid-cols-[.94fr_1.06fr] ${theme.hero}`}>
          <div className="relative z-10 flex flex-col justify-end px-6 pb-14 pt-24 sm:px-10 lg:px-[7vw] lg:pb-[9vh]">
            <p className={`mb-7 text-[10px] font-semibold uppercase tracking-[.28em] ${theme.accent}`} data-collection-reveal>{content.eyebrow}</p>
            <h1 className="max-w-[760px] font-serif text-[clamp(3.5rem,7vw,7.6rem)] font-medium leading-[.88] tracking-[-.058em]" data-collection-reveal>{content.title}</h1>
            <p className="mt-8 max-w-xl text-sm leading-7 text-white/64 sm:text-base" data-collection-reveal>{content.intro}</p>
            <a href={`#${config.collectionId}`} className="mt-10 inline-flex w-fit items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/75 transition hover:text-white" data-collection-reveal>
              {content.cta}<ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>

          <div className="relative min-h-[52svh] lg:min-h-0">
            <div className="absolute inset-4 overflow-hidden rounded-[1.8rem] sm:inset-6 lg:inset-8 lg:rounded-[2.2rem]">
              <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,.62)_0%,transparent_26%),linear-gradient(0deg,rgba(0,0,0,.42)_0%,transparent_32%)]" />
              <img src={config.heroImage} alt={config.heroImageAlt} className="story-hero-image h-full w-full object-cover" />
              <img src={config.floatingImage} alt={config.floatingImageAlt} className="story-floating-card absolute bottom-5 right-5 z-20 hidden h-[31%] w-[24%] rounded-[1.4rem] border border-white/25 object-cover shadow-2xl sm:block lg:bottom-8 lg:right-8" />
              <div className="glam-grain absolute inset-0 z-20" />
            </div>
          </div>
        </section>

        <div className={`story-marquee border-y border-black/10 py-4 ${theme.ticker}`} aria-hidden="true">
          <div className="story-marquee-track">
            {[...content.manifesto, ...content.manifesto].map((word, index) => (
              <span key={`${word}-${index}`} className="flex items-center gap-8 whitespace-nowrap font-serif text-2xl italic tracking-[-.02em] sm:text-3xl">
                {word}<span className="h-1.5 w-1.5 rounded-full bg-current" />
              </span>
            ))}
          </div>
        </div>

        <section className={`px-5 py-24 sm:px-8 lg:px-[7vw] lg:py-32 ${theme.story}`}>
          <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-[8vw]">
            <div data-collection-reveal>
              <p className={`text-[10px] font-semibold uppercase tracking-[.24em] ${theme.number}`}>{content.storyLabel}</p>
              <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.8rem,5vw,5.5rem)] leading-[.96] tracking-[-.05em]">{content.storyTitle}</h2>
              <p className="mt-7 max-w-xl text-sm leading-7 text-[#281922]/62 sm:text-base sm:leading-8">{content.storyText}</p>
            </div>

            <div className="border-t border-[#281922]/15">
              {content.gestures.map((gesture) => (
                <article key={gesture.number} className="grid gap-4 border-b border-[#281922]/15 py-8 sm:grid-cols-[64px_1fr] sm:py-10" data-collection-reveal>
                  <span className={`font-serif text-3xl italic ${theme.number}`}>{gesture.number}</span>
                  <div>
                    <h3 className="font-serif text-2xl tracking-[-.025em] sm:text-3xl">{gesture.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#281922]/58">{gesture.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id={config.collectionId} className="scroll-mt-24 bg-[#fbf8f5] px-5 py-24 sm:px-8 lg:px-[7vw] lg:py-32">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end" data-collection-reveal>
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-[.24em] ${theme.number}`}>{content.collectionLabel}</p>
              <h2 className="mt-5 font-serif text-[clamp(2.9rem,5vw,5.6rem)] leading-[.95] tracking-[-.052em]">{content.collectionTitle}</h2>
            </div>
            <div className="flex items-end justify-between gap-8 border-b border-[#281922]/15 pb-4">
              <p className="max-w-xl text-sm leading-7 text-[#281922]/58 sm:text-base">{content.collectionText}</p>
              <span className="shrink-0 font-serif text-3xl italic text-[#281922]/35">{String(config.products.length).padStart(2, '0')}</span>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {config.products.map((product, index) => (
              <div key={product.id} className={index % 4 === 1 || index % 4 === 3 ? 'lg:translate-y-8' : ''} data-collection-reveal>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>

        <section className={`relative mx-4 mb-4 overflow-hidden rounded-[2rem] sm:mx-6 ${theme.closing}`} data-collection-reveal>
          <div className="grid min-h-[580px] lg:grid-cols-2">
            <div className="relative min-h-[360px] overflow-hidden lg:min-h-full">
              <img src={config.closingImage} alt={config.closingImageAlt} className="h-full w-full object-cover transition duration-1000 hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-[6vw]">
              <p className={`text-[10px] font-semibold uppercase tracking-[.24em] ${theme.accent}`}>{content.closingLabel}</p>
              <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.8rem)] leading-[.92] tracking-[-.055em]">{content.closingTitle}</h2>
              <p className={`mt-7 max-w-lg text-sm leading-7 sm:text-base ${theme.closingMuted}`}>{content.closingText}</p>
              <Link to={config.closingHref} className={`mt-10 inline-flex w-fit items-center gap-2 rounded-full px-7 py-4 text-[10px] font-semibold uppercase tracking-[.16em] transition hover:-translate-y-1 ${theme.button}`}>
                {content.closingCta}<ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EditorialCollectionPage;
