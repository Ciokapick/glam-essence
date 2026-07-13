import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { language } = useLanguage();
  const copy = language === 'ro' ? {
    eyebrow: 'Colecția signature · 2026',
    title: 'Frumusețea care rămâne cu tine.',
    subtitle: 'Parfumuri memorabile și ritualuri de îngrijire alese pentru textură, prezență și plăcerea fiecărei zile.',
    primary: 'Descoperă parfumurile',
    secondary: 'Explorează ritualurile',
    note: 'Esențe atent selecționate',
    detail: 'Parfum · Îngrijire · Cadouri',
    scroll: 'Descoperă colecția',
  } : {
    eyebrow: 'The signature collection · 2026',
    title: 'Beauty that stays with you.',
    subtitle: 'Memorable fragrances and considered care rituals, selected for texture, presence, and everyday pleasure.',
    primary: 'Discover fragrances',
    secondary: 'Explore the rituals',
    note: 'Considered essentials',
    detail: 'Fragrance · Care · Gifting',
    scroll: 'Discover the collection',
  };

  return (
    <section className="glam-hero relative min-h-[760px] h-[100svh] flex items-end overflow-hidden bg-[#d6b9b8]">
      <picture className="absolute inset-0">
        <source media="(max-width: 767px)" srcSet="/hero-mobile.jpg" />
        <img
          src="/hero.jpg"
          alt="Flacon de parfum Glam Essence în tonuri delicate de roz"
          className="h-full w-full object-cover object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,19,28,.84)_0%,rgba(59,31,42,.48)_43%,rgba(59,31,42,.06)_72%)] md:bg-[linear-gradient(90deg,rgba(35,19,28,.82)_0%,rgba(35,19,28,.38)_42%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,9,12,.18)_0%,transparent_38%,rgba(20,10,15,.42)_100%)]" />
      <div className="glam-grain absolute inset-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-5 md:px-8 pb-16 pt-40 md:pb-20 lg:pb-24">
        <div className="max-w-3xl text-white">
          <div className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[.3em] text-white/75">
            <span className="h-px w-10 bg-white/55" />
            {copy.eyebrow}
          </div>

          <h1 className="max-w-3xl font-serif text-[clamp(3.35rem,8.2vw,7.8rem)] font-medium leading-[.88] tracking-[-.045em] text-white">
            {copy.title}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/82 md:text-lg md:leading-8">
            {copy.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/parfumuri"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-white px-6 text-xs font-semibold uppercase tracking-[.16em] text-[#281922] transition hover:bg-[#f4e8e7]"
            >
              {copy.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/ingrijire"
              className="inline-flex min-h-12 items-center justify-center border border-white/45 bg-white/5 px-6 text-xs font-semibold uppercase tracking-[.16em] text-white backdrop-blur-sm transition hover:bg-white/12"
            >
              {copy.secondary}
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4 text-white/70">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-[.18em] text-white/90">{copy.note}</p>
              <p className="mt-1 text-xs tracking-wide">{copy.detail}</p>
            </div>
          </div>
        </div>

        <a
          href="#categories"
          className="absolute bottom-8 right-6 hidden items-center gap-3 text-[10px] font-medium uppercase tracking-[.22em] text-white/70 transition hover:text-white md:flex"
        >
          {copy.scroll}
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
