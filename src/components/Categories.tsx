import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Categories = () => {
  const { t, language } = useLanguage();
  const categories = [
    {
      id: 'parfumuri',
      name: t('nav.perfumes'),
      kicker: language === 'ro' ? 'Semnătura ta invizibilă' : 'Your invisible signature',
      description: t('categories.perfumes_desc'),
      image: '/products/perfumes/editorial/floral-extravagance.webp',
      accent: '#e2aebd',
      accentLabel: language === 'ro' ? 'Burgundy + chihlimbar' : 'Burgundy + amber',
      overlay: 'from-[#2a111d]/95 via-[#4b2032]/28 to-[#b86d45]/8',
    },
    {
      id: 'face-care',
      name: t('nav.face_care'),
      kicker: language === 'ro' ? 'Ritualul tenului' : 'The face ritual',
      description: language === 'ro' ? 'Curățare, hidratare și tratament' : 'Cleanse, hydrate and treat',
      image: '/products/skincare/campaign/face-serum.webp',
      accent: '#add5df',
      accentLabel: language === 'ro' ? 'Albastru mineral' : 'Mineral blue',
      overlay: 'from-[#102632]/95 via-[#326878]/28 to-[#b9e0e7]/8',
    },
    {
      id: 'body-care',
      name: t('nav.body_care'),
      kicker: language === 'ro' ? 'Confort pentru piele' : 'Comfort for skin',
      description: language === 'ro' ? 'Texturi pentru mâini și corp' : 'Textures for hands and body',
      image: '/products/skincare/campaign/body-cream.webp',
      accent: '#dfb897',
      accentLabel: 'Champagne + terracotta',
      overlay: 'from-[#352119]/95 via-[#855439]/28 to-[#e7c5a8]/8',
    },
    {
      id: 'seturi',
      name: language === 'ro' ? 'Seturi cadou' : 'Gift sets',
      kicker: language === 'ro' ? 'Gesturi atent alese' : 'Considered gestures',
      description: language === 'ro' ? 'Colecții pregătite pentru a fi oferite' : 'Collections ready to be gifted',
      image: '/products/skincare/family-reference.webp',
      accent: '#e3b8c6',
      accentLabel: language === 'ro' ? 'Roz prăfuit + ivory' : 'Dusty pink + ivory',
      overlay: 'from-[#351c28]/95 via-[#8e5267]/24 to-[#f2e5df]/10',
    },
  ];

  return (
    <section id="categories" className="bg-[#f7f2ee] py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-8">
        <div className="mb-12 grid gap-5 md:grid-cols-[.8fr_1.2fr] md:items-end md:gap-16">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.3em] text-[#9c5967]">
              {language === 'ro' ? 'Universul Glam Essence' : 'The Glam Essence world'}
            </p>
            <h2 className="font-serif text-4xl font-medium leading-none tracking-[-.035em] text-[#281922] md:text-6xl">
              {language === 'ro' ? 'Alege-ți ritualul.' : 'Choose your ritual.'}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#6f6268] md:justify-self-end md:text-base">
            {language === 'ro'
              ? 'Patru colecții, o singură idee: produse pe care abia aștepți să le folosești și pe care îți place să le păstrezi aproape.'
              : 'Four collections, one idea: products you look forward to using and love keeping close.'}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:auto-rows-[500px]">
          {categories.map((category) => (
            <Link
              to={`/${category.id}`}
              key={category.id}
              className="group relative min-h-[440px] overflow-hidden bg-[#2b2025] outline outline-1 outline-transparent transition-[outline-color,transform] duration-500 hover:-translate-y-1 hover:outline-white/30"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.overlay}`} />
              <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ backgroundColor: category.accent }} />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-8">
                <div className="mb-3 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[.22em] text-white/66">
                  <span className="h-px w-7 transition-all duration-500 group-hover:w-11" style={{ backgroundColor: category.accent }} />
                  <span>{category.accentLabel}</span>
                </div>
                <p className="mb-2 text-[9px] font-medium uppercase tracking-[.25em] text-white/65">{category.kicker}</p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl font-medium md:text-4xl">{category.name}</h3>
                    <p className="mt-2 text-sm text-white/72">{category.description}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 transition duration-300 group-hover:rotate-6 group-hover:text-[#281922]" style={{ backgroundColor: category.accent }}>
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
