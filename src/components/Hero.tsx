import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

type HeroWorld = {
  id: 'perfume' | 'face' | 'body';
  image: string;
  imagePosition: string;
  href: string;
  accent: string;
  wash: string;
  copy: {
    ro: { label: string; eyebrow: string; title: string; subtitle: string; cta: string; detail: string };
    en: { label: string; eyebrow: string; title: string; subtitle: string; cta: string; detail: string };
  };
};

const worlds: HeroWorld[] = [
  {
    id: 'perfume',
    image: '/editorial/home/hero-perfume.png',
    imagePosition: 'object-center',
    href: '/parfumuri',
    accent: '#e2aebd',
    wash: 'radial-gradient(circle at 78% 34%,rgba(165,74,105,.22),transparent 36%),linear-gradient(90deg,rgba(30,13,22,.94) 0%,rgba(54,23,37,.68) 43%,rgba(40,13,25,.08) 73%)',
    copy: {
      ro: { label: 'Parfum', eyebrow: 'Universul olfactiv · 2026', title: 'O prezență care rămâne în aer.', subtitle: 'Compoziții memorabile, construite în straturi — lumină, textură și o urmă care devine semnătura ta.', cta: 'Descoperă parfumurile', detail: 'Burgundy · chihlimbar · flori nocturne' },
      en: { label: 'Fragrance', eyebrow: 'The fragrance world · 2026', title: 'A presence that lingers in the air.', subtitle: 'Memorable compositions built in layers — light, texture and a trail that becomes your signature.', cta: 'Discover fragrances', detail: 'Burgundy · amber · nocturnal florals' },
    },
  },
  {
    id: 'face',
    image: '/editorial/home/hero-face.png',
    imagePosition: 'object-center',
    href: '/face-care',
    accent: '#acd8e3',
    wash: 'radial-gradient(circle at 74% 30%,rgba(127,197,214,.24),transparent 38%),linear-gradient(90deg,rgba(12,31,42,.95) 0%,rgba(25,60,72,.65) 43%,rgba(22,52,61,.05) 74%)',
    copy: {
      ro: { label: 'Îngrijirea tenului', eyebrow: 'Ritualuri pentru ten · apă și lumină', title: 'Pielea nu cere perfecțiune. Cere consecvență.', subtitle: 'Texturi limpezi și pași cu rol precis, de la prima atingere de apă până la ritualul lent al serii.', cta: 'Construiește ritualul', detail: 'Albastru mineral · sticlă · hidratare' },
      en: { label: 'Face care', eyebrow: 'Face rituals · water and light', title: 'Skin does not ask for perfection. It asks for consistency.', subtitle: 'Clear textures and purposeful steps, from the first touch of water to the slower evening ritual.', cta: 'Build your ritual', detail: 'Mineral blue · glass · hydration' },
    },
  },
  {
    id: 'body',
    image: '/editorial/home/hero-body.png',
    imagePosition: 'object-center',
    href: '/body-care',
    accent: '#e0c1a3',
    wash: 'radial-gradient(circle at 76% 38%,rgba(194,124,83,.22),transparent 40%),linear-gradient(90deg,rgba(45,28,22,.95) 0%,rgba(82,52,37,.67) 43%,rgba(52,30,22,.08) 74%)',
    copy: {
      ro: { label: 'Îngrijirea corpului', eyebrow: 'Ritualuri tactile · ingrediente naturale', title: 'Îngrijirea devine un gest pe care îl simți.', subtitle: 'Satin, unturi botanice și texturi bogate pentru momentele în care alegi să încetinești intenționat.', cta: 'Explorează îngrijirea corpului', detail: 'Champagne · terracotta · texturi calde' },
      en: { label: 'Body care', eyebrow: 'Tactile rituals · natural ingredients', title: 'Care becomes a gesture you can feel.', subtitle: 'Satin, botanical butters and rich textures for the moments when you choose to slow down intentionally.', cta: 'Explore body care', detail: 'Champagne · terracotta · warm textures' },
    },
  },
];

const Hero = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = worlds[activeIndex];
  const content = active.copy[language];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % worlds.length), 7800);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="glam-hero relative flex h-[100svh] min-h-[720px] items-end overflow-hidden bg-[#24151d] text-white" aria-roledescription={language === 'ro' ? 'prezentare automată' : 'automatic showcase'} aria-label={language === 'ro' ? 'Universurile Glam Essence' : 'Glam Essence worlds'}>
      <div className="absolute inset-0" aria-hidden="true">
        {worlds.map((world, index) => (
          <div key={world.id} className={`absolute inset-0 transition-[opacity,transform] [transition-duration:1600ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] motion-reduce:transform-none motion-reduce:transition-none ${index === activeIndex ? 'scale-100 opacity-100' : 'scale-[1.035] opacity-0'}`}>
            <img src={world.image} alt="" className={`h-full w-full object-cover ${world.imagePosition}`} loading={index === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 transition-[background] [transition-duration:1400ms] motion-reduce:transition-none" style={{ background: active.wash }} />
      <div className="absolute inset-0 bg-[#160d13]/55 md:bg-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,10,.2)_0%,transparent_34%,rgba(17,9,13,.54)_100%)]" />
      <div className="glam-grain absolute inset-0" />

      <div className="container relative z-10 mx-auto px-5 pb-14 pt-40 md:px-8 md:pb-20 lg:pb-24">
        <div key={`${active.id}-${language}`} className="max-w-[850px] animate-fade-in motion-reduce:animate-none">
          <div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.3em] text-white/74">
            <span className="h-px w-10" style={{ backgroundColor: active.accent }} />
            {content.eyebrow}
          </div>
          <h1 className="max-w-[820px] font-serif text-[clamp(3.25rem,7.8vw,7.6rem)] font-medium leading-[.89] tracking-[-.052em] text-white">{content.title}</h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-white/78 sm:text-base md:text-lg md:leading-8">{content.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to={active.href} className="group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[10px] font-semibold uppercase tracking-[.17em] text-[#281922] transition duration-300 hover:-translate-y-0.5 hover:bg-white" style={{ backgroundColor: active.accent }}>
              {content.cta}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <span className="px-1 py-2 text-[9px] font-medium uppercase tracking-[.2em] text-white/56 sm:px-4">{content.detail}</span>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-2" role="tablist" aria-label={language === 'ro' ? 'Alege universul' : 'Choose a world'}>
          {worlds.map((world, index) => {
            const selected = index === activeIndex;
            return (
              <button key={world.id} type="button" role="tab" aria-selected={selected} aria-label={world.copy[language].label} onClick={() => setActiveIndex(index)} className={`group flex items-center gap-2 py-3 text-[9px] font-semibold uppercase tracking-[.18em] transition-colors ${selected ? 'text-white' : 'text-white/44 hover:text-white/78'}`}>
                <span className={`block h-px transition-all duration-500 motion-reduce:transition-none ${selected ? 'w-10' : 'w-5 group-hover:w-7'}`} style={{ backgroundColor: selected ? world.accent : 'rgba(255,255,255,.34)' }} />
                <span className="hidden sm:inline">{world.copy[language].label}</span>
              </button>
            );
          })}
        </div>

        <a href="#categories" className="absolute bottom-8 right-6 hidden items-center gap-3 text-[9px] font-semibold uppercase tracking-[.22em] text-white/60 transition hover:text-white md:flex">
          {language === 'ro' ? 'Descoperă colecțiile' : 'Discover the collections'}
          <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
