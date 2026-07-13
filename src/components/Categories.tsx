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
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=1200&q=88',
    },
    {
      id: 'creme',
      name: t('nav.creams'),
      kicker: language === 'ro' ? 'Texturi care îngrijesc' : 'Textures that care',
      description: t('categories.creams_desc'),
      image: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=1200&q=88',
    },
    {
      id: 'ingrijire',
      name: t('nav.skincare'),
      kicker: language === 'ro' ? 'Ritualuri pentru fiecare zi' : 'Everyday rituals',
      description: t('categories.skincare_desc'),
      image: 'https://images.unsplash.com/photo-1585652757141-8837d676fac8?auto=format&fit=crop&w=1200&q=88',
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
              ? 'Trei colecții, o singură idee: produse pe care abia aștepți să le folosești și pe care îți place să le păstrezi aproape.'
              : 'Three collections, one idea: products you look forward to using and love keeping close.'}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-12 md:auto-rows-[520px]">
          {categories.map((category, index) => (
            <Link
              to={`/${category.id}`}
              key={category.id}
              className={`group relative min-h-[440px] overflow-hidden bg-[#2b2025] ${index === 0 ? 'md:col-span-5' : index === 1 ? 'md:col-span-4' : 'md:col-span-3'}`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1118]/90 via-[#1d1118]/18 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-8">
                <p className="mb-2 text-[9px] font-medium uppercase tracking-[.25em] text-white/65">{category.kicker}</p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl font-medium md:text-4xl">{category.name}</h3>
                    <p className="mt-2 text-sm text-white/72">{category.description}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 transition group-hover:bg-white group-hover:text-[#281922]">
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
