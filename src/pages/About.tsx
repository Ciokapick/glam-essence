import { useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Droplets, Feather, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const perfumeWorlds = [
  ['floral-extravagance', 'Floral'],
  ['oriental-mystique', 'Oriental'],
  ['fresh-citrus', 'Citrus'],
  ['woody-elegance', 'Woody'],
  ['aquatic-breeze', 'Aquatic'],
  ['spicy-noir', 'Spicy'],
];

const copy = {
  ro: {
    eyebrow: 'Glam Essence · Beauty atelier',
    title: 'Un ritual începe înainte să devină amintire.',
    intro: 'Construim lumi în jurul parfumului, texturii și gesturilor mici care schimbă ritmul unei zile.',
    scroll: 'Descoperă povestea',
    manifesto: ['PARFUM', 'TEXTURĂ', 'PREZENȚĂ', 'RITUAL'],
    chapterLabel: 'Povestea noastră, în trei gesturi',
    chapterTitle: 'Nu am pornit de la o listă de produse. Am pornit de la o stare.',
    chapters: [
      {
        number: '01',
        title: 'Întâi, atmosfera',
        text: 'Lumina rece a dimineții, liniștea de după ploaie, căldura unei seri târzii. Fiecare colecție începe cu o senzație pe care vrem să o păstrăm puțin mai mult.',
      },
      {
        number: '02',
        title: 'Apoi, obiectul',
        text: 'Sticlă grea, forme simple și acel burgundy recognoscibil. Ambalajul nu concurează cu ritualul; îl face mai plăcut, mai intuitiv și mai personal.',
      },
      {
        number: '03',
        title: 'La final, amintirea',
        text: 'Un parfum nu rămâne doar pe piele, iar o textură bună nu se termină odată cu aplicarea. Ceea ce rămâne este felul în care te-ai simțit în acel moment.',
      },
    ],
    principlesLabel: 'Principiile atelierului',
    principlesTitle: 'Mai puțin zgomot. Mai multă prezență.',
    principles: [
      { title: 'Senzorial, nu excesiv', text: 'Culoare, lumină și textură — folosite cu intenție, fără să acopere produsul.' },
      { title: 'Ritual, nu rutină', text: 'Produse ușor de integrat în momentele tale, nu pași complicați care cer perfecțiune.' },
      { title: 'Clar, nu grandios', text: 'Spunem ce este fiecare produs și lăsăm experiența să vorbească mai departe.' },
    ],
    worldsLabel: 'Atlasul olfactiv',
    worldsTitle: 'Șase parfumuri. Șase feluri de a intra într-o încăpere.',
    worldsText: 'Aceeași semnătură vizuală, personalități complet diferite — de la lumina citrică la adâncimea unui spicy noir.',
    closingEyebrow: 'Alege starea. Păstrează ritualul.',
    closingTitle: 'Frumusețea nu are nevoie de un motiv special.',
    closingText: 'Doar de câteva minute care să fie ale tale.',
    perfumeCta: 'Descoperă parfumurile',
    careCta: 'Explorează ritualurile',
  },
  en: {
    eyebrow: 'Glam Essence · Beauty atelier',
    title: 'A ritual begins before it becomes a memory.',
    intro: 'We build worlds around fragrance, texture and the small gestures that can change the rhythm of a day.',
    scroll: 'Discover the story',
    manifesto: ['FRAGRANCE', 'TEXTURE', 'PRESENCE', 'RITUAL'],
    chapterLabel: 'Our story, in three gestures',
    chapterTitle: 'We did not begin with a product list. We began with a feeling.',
    chapters: [
      { number: '01', title: 'First, the atmosphere', text: 'Cool morning light, the quiet after rain, the warmth of a late evening. Every collection begins with a feeling we want to hold onto for a little longer.' },
      { number: '02', title: 'Then, the object', text: 'Heavy glass, simple shapes and that recognisable burgundy. Packaging does not compete with the ritual; it makes it more intuitive, tactile and personal.' },
      { number: '03', title: 'Finally, the memory', text: 'A fragrance does not remain only on skin, and a beautiful texture does not end with application. What remains is the way that moment made you feel.' },
    ],
    principlesLabel: 'Atelier principles',
    principlesTitle: 'Less noise. More presence.',
    principles: [
      { title: 'Sensory, not excessive', text: 'Colour, light and texture — used with intention, without overshadowing the product.' },
      { title: 'Ritual, not routine', text: 'Products that fit into your moments, not complicated steps that ask for perfection.' },
      { title: 'Clear, not grandiose', text: 'We say what each product is and allow the experience to speak from there.' },
    ],
    worldsLabel: 'The fragrance atlas',
    worldsTitle: 'Six fragrances. Six ways to enter a room.',
    worldsText: 'One visual signature, completely different personalities — from citrus light to the depth of a spicy noir.',
    closingEyebrow: 'Choose the mood. Keep the ritual.',
    closingTitle: 'Beauty does not need a special occasion.',
    closingText: 'Only a few minutes that belong to you.',
    perfumeCta: 'Discover fragrances',
    careCta: 'Explore the rituals',
  },
};

const AboutPage = () => {
  const { language } = useLanguage();
  const content = copy[language];

  useEffect(() => {
    window.scrollTo(0, 0);
    const elements = document.querySelectorAll<HTMLElement>('[data-story-reveal]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );
    elements.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [language]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbf8f5] text-[#281922]">
      <Navbar />

      <main>
        <section className="relative grid min-h-[80svh] overflow-hidden bg-[#23151d] pt-[104px] text-white lg:grid-cols-[.94fr_1.06fr]">
          <div className="relative z-10 flex flex-col justify-end px-6 pb-16 pt-24 sm:px-10 lg:px-[7vw] lg:pb-[10vh]">
            <p className="mb-8 text-[10px] font-semibold uppercase tracking-[.28em] text-[#d9aebb]" data-story-reveal>{content.eyebrow}</p>
            <h1 className="max-w-[780px] font-serif text-[clamp(3.15rem,7vw,7.8rem)] font-medium leading-[.9] tracking-[-.055em]" data-story-reveal>{content.title}</h1>
            <p className="mt-8 max-w-xl text-sm leading-7 text-white/66 sm:text-base" data-story-reveal>{content.intro}</p>
            <a href="#story" className="mt-12 inline-flex w-fit items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/75 transition hover:text-white" data-story-reveal>
              {content.scroll}<ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>

          <div className="relative min-h-[52svh] lg:min-h-0">
            <div className="absolute inset-4 overflow-hidden rounded-[1.8rem] sm:inset-6 lg:inset-8 lg:rounded-[2.2rem]">
              <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,#23151d_0%,transparent_27%),linear-gradient(0deg,#23151d_0%,transparent_30%)] lg:bg-[linear-gradient(90deg,#23151d_0%,transparent_24%)]" />
              <img src="/products/perfumes/editorial/floral-extravagance.webp" alt="Floral Extravagance — universul floral Glam Essence" className="story-hero-image h-full w-full object-cover object-center" />
              <img src="/products/skincare/campaign/face-oil.webp" alt="Face Oil — ritual Glam Essence" className="story-floating-card absolute bottom-5 right-5 z-20 hidden h-[32%] w-[24%] rounded-[1.4rem] border border-white/20 object-cover shadow-2xl sm:block lg:bottom-8 lg:right-8" />
              <div className="glam-grain absolute inset-0 z-20" />
            </div>
          </div>
        </section>

        <div className="story-marquee border-y border-[#281922]/10 bg-[#d9aebb] py-4" aria-hidden="true">
          <div className="story-marquee-track">
            {[...content.manifesto, ...content.manifesto].map((word, index) => (
              <span key={`${word}-${index}`} className="flex items-center gap-8 whitespace-nowrap font-serif text-2xl italic tracking-[-.02em] sm:text-3xl">
                {word}<span className="h-1.5 w-1.5 rounded-full bg-[#281922]" />
              </span>
            ))}
          </div>
        </div>

        <section id="story" className="px-5 py-24 sm:px-8 lg:px-[7vw] lg:py-36">
          <div className="grid gap-16 lg:grid-cols-[.88fr_1.12fr] lg:gap-[8vw]">
            <div className="lg:sticky lg:top-32 lg:h-fit" data-story-reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-[#d8c8bd]">
                <img src="/products/skincare/campaign/hand-cream.webp" alt="Textura Silk din colecția de îngrijire" className="aspect-[4/5] w-full object-cover transition duration-1000 hover:scale-[1.025]" />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/25 bg-[#24171e]/72 p-5 text-white backdrop-blur-xl">
                  <p className="text-[9px] uppercase tracking-[.24em] text-white/55">Glam Essence</p>
                  <p className="mt-2 font-serif text-2xl">Beauty, held in a moment.</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#98546a]" data-story-reveal>{content.chapterLabel}</p>
              <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.7rem,5vw,5.4rem)] leading-[.98] tracking-[-.045em]" data-story-reveal>{content.chapterTitle}</h2>
              <div className="mt-16 border-t border-[#281922]/15">
                {content.chapters.map((chapter) => (
                  <article key={chapter.number} className="grid gap-5 border-b border-[#281922]/15 py-10 sm:grid-cols-[76px_1fr] sm:py-14" data-story-reveal>
                    <span className="font-serif text-4xl italic text-[#a05a6c]/55">{chapter.number}</span>
                    <div>
                      <h3 className="font-serif text-3xl tracking-[-.025em] sm:text-4xl">{chapter.title}</h3>
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#281922]/64 sm:text-base sm:leading-8">{chapter.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#281922] px-5 py-24 text-white sm:px-8 lg:px-[7vw] lg:py-32">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end" data-story-reveal>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#d9aebb]">{content.principlesLabel}</p>
              <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.8rem,5vw,5.5rem)] leading-[.95] tracking-[-.045em]">{content.principlesTitle}</h2>
            </div>
            <div className="h-px flex-1 bg-white/15 lg:mb-4 lg:max-w-xs" />
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[Sparkles, Feather, Droplets].map((Icon, index) => (
              <article key={content.principles[index].title} className="group min-h-[320px] rounded-[1.7rem] border border-white/12 bg-white/[.035] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#d9aebb]/60 hover:bg-white/[.065] sm:p-9" data-story-reveal>
                <Icon className="h-6 w-6 text-[#d9aebb] transition duration-500 group-hover:rotate-6 group-hover:scale-110" strokeWidth={1.4} />
                <div className="mt-24">
                  <span className="text-[9px] uppercase tracking-[.22em] text-white/35">0{index + 1}</span>
                  <h3 className="mt-4 font-serif text-3xl">{content.principles[index].title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/55">{content.principles[index].text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-[7vw] lg:py-36">
          <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
            <div data-story-reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#98546a]">{content.worldsLabel}</p>
              <h2 className="mt-5 font-serif text-[clamp(2.7rem,5vw,5.2rem)] leading-[.98] tracking-[-.045em]">{content.worldsTitle}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#281922]/60 sm:text-base" data-story-reveal>{content.worldsText}</p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6" data-story-reveal>
            {perfumeWorlds.map(([slug, label], index) => (
              <Link key={slug} to={`/product/parfum-${slug}`} className={`group relative overflow-hidden rounded-[1.35rem] ${index % 2 === 1 ? 'lg:translate-y-8' : ''}`}>
                <img src={`/products/perfumes/editorial/${slug}.webp`} alt={`${label} — Glam Essence`} className="aspect-[3/4] h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#20131a]/85 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                  <span className="font-serif text-lg">{label}</span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative mx-4 mb-4 overflow-hidden rounded-[2rem] bg-[#d9aebb] px-6 py-24 text-center sm:mx-6 sm:px-10 lg:py-32" data-story-reveal>
          <div className="story-orbit story-orbit-one" />
          <div className="story-orbit story-orbit-two" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[.24em]">{content.closingEyebrow}</p>
            <h2 className="mt-6 font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[.92] tracking-[-.055em]">{content.closingTitle}</h2>
            <p className="mt-6 text-sm text-[#281922]/65 sm:text-base">{content.closingText}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/parfumuri" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#281922] px-7 py-4 text-[10px] font-semibold uppercase tracking-[.16em] text-white transition hover:-translate-y-1 hover:bg-[#4b2938]">
                {content.perfumeCta}<ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/face-care" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#281922]/25 px-7 py-4 text-[10px] font-semibold uppercase tracking-[.16em] transition hover:-translate-y-1 hover:bg-white/35">
                {content.careCta}<ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
