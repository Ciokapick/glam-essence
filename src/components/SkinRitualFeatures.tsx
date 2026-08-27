import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizeProductFeature } from '@/utils/productCopy';

interface SkinRitualFeaturesProps {
  features?: string[];
  images?: string[];
  productName?: string;
  productSlug?: string;
}

type ChapterKey = 'formula' | 'effect' | 'ritual';

type Chapter = {
  key: ChapterKey;
  eyebrow: string;
  title: string;
  intro: string;
  features: string[];
  image?: string;
  accent: string;
};

const formulaPattern = /acid|ceramid|ulei|oil|unt de|butter|vitamin|retinol|peptid|cafein|caffeine|extract|complex|argil|clay|cărbune|charcoal|niacinamid|panthenol|omega|colagen|collagen|iod|hialuronic|hyaluronic/i;
const ritualPattern = /textur|formulă non|non-greasy|absorb|fără|free from|potrivit|suitable|testat|tested|oftalmologic|ophthalm|dermatologic|ph |parfum|fragrance|se usucă|dries|săptămân|weekly|rezultate vizibile|visible results/i;

const skincareRitualImages: Record<string, Record<ChapterKey, string>> = {
  'crema-hidratanta-luxury': {
    formula: '/products/skincare/rituals/luxury-face-cream-formula.jpg',
    effect: '/products/skincare/rituals/luxury-face-cream-effect.jpg',
    ritual: '/products/skincare/rituals/luxury-face-cream-ritual.jpg',
  },
  'crema-contur-ochi-anti-age': {
    formula: '/products/skincare/rituals/eye-cream-formula.jpg',
    effect: '/products/skincare/rituals/eye-cream-effect.jpg',
    ritual: '/products/skincare/rituals/eye-cream-ritual.jpg',
  },
  'crema-de-maini-silk': {
    formula: '/products/skincare/rituals/hand-cream-formula.jpg',
    effect: '/products/skincare/rituals/hand-cream-effect.jpg',
    ritual: '/products/skincare/rituals/hand-cream-ritual.jpg',
  },
  'crema-de-corp-intense': {
    formula: '/products/skincare/rituals/body-cream-formula.jpg',
    effect: '/products/skincare/rituals/body-cream-effect.jpg',
    ritual: '/products/skincare/rituals/body-cream-ritual.jpg',
  },
  'crema-nutritiva-de-noapte': {
    formula: '/products/skincare/rituals/night-cream-formula.jpg',
    effect: '/products/skincare/rituals/night-cream-effect.jpg',
    ritual: '/products/skincare/rituals/night-cream-ritual.jpg',
  },
  'crema-anticelulitică': {
    formula: '/products/skincare/rituals/anti-cellulite-formula.jpg',
    effect: '/products/skincare/rituals/anti-cellulite-effect.jpg',
    ritual: '/products/skincare/rituals/anti-cellulite-ritual.jpg',
  },
  'ser-facial-radiance': {
    formula: '/products/skincare/rituals/face-serum-formula.jpg',
    effect: '/products/skincare/rituals/face-serum-effect.jpg',
    ritual: '/products/skincare/rituals/face-serum-ritual.jpg',
  },
  'masca-faciala-detox': {
    formula: '/products/skincare/rituals/detox-mask-formula.jpg',
    effect: '/products/skincare/rituals/detox-mask-effect.jpg',
    ritual: '/products/skincare/rituals/detox-mask-ritual.jpg',
  },
  'spuma-de-curatare': {
    formula: '/products/skincare/rituals/cleansing-foam-formula.jpg',
    effect: '/products/skincare/rituals/cleansing-foam-effect.jpg',
    ritual: '/products/skincare/rituals/cleansing-foam-ritual.jpg',
  },
  'tonic-purificator': {
    formula: '/products/skincare/rituals/toner-formula.jpg',
    effect: '/products/skincare/rituals/toner-effect.jpg',
    ritual: '/products/skincare/rituals/toner-ritual.jpg',
  },
  'ulei-de-fata-nutritiv': {
    formula: '/products/skincare/rituals/face-oil-formula.jpg',
    effect: '/products/skincare/rituals/face-oil-effect.jpg',
    ritual: '/products/skincare/rituals/face-oil-ritual.jpg',
  },
};

const SkinRitualFeatures: React.FC<SkinRitualFeaturesProps> = ({
  features = [],
  images = [],
  productName = '',
  productSlug,
}) => {
  const { language } = useLanguage();
  const [activeKey, setActiveKey] = useState<ChapterKey>('formula');

  const localizedFeatures = useMemo(
    () => features.map((feature) => ({
      source: feature,
      label: localizeProductFeature(feature, language),
    })),
    [features, language],
  );

  const groupedFeatures = useMemo(() => {
    const groups: Record<ChapterKey, string[]> = { formula: [], effect: [], ritual: [] };

    localizedFeatures.forEach(({ source, label }) => {
      const searchable = `${source} ${label}`;
      if (formulaPattern.test(searchable)) groups.formula.push(label);
      else if (ritualPattern.test(searchable)) groups.ritual.push(label);
      else groups.effect.push(label);
    });

    const fallbackOrder: ChapterKey[] = ['formula', 'effect', 'ritual'];
    fallbackOrder.forEach((key) => {
      if (groups[key].length > 0) return;
      const donor = fallbackOrder.find((candidate) => groups[candidate].length > 1);
      if (donor) groups[key].push(groups[donor].pop() as string);
    });

    return groups;
  }, [localizedFeatures]);

  const visualImages = useMemo(() => {
    const generatedWorlds = productSlug ? skincareRitualImages[productSlug] : undefined;
    const preferredImages = generatedWorlds
      ? [generatedWorlds.formula, generatedWorlds.effect, generatedWorlds.ritual]
      : images;
    return Array.from(new Set(preferredImages.filter(Boolean)));
  }, [images, productSlug]);

  const chapters: Chapter[] = [
    {
      key: 'formula',
      eyebrow: language === 'ro' ? '01 · Formula activă' : '01 · Active formula',
      title: language === 'ro' ? 'Ce lucrează în interior.' : 'What works within.',
      intro: language === 'ro'
        ? 'Ingredientele alese pentru roluri precise, prezentate fără jargon inutil.'
        : 'Ingredients chosen for precise roles, presented without unnecessary jargon.',
      features: groupedFeatures.formula,
      image: visualImages[0],
      accent: '#d8aeb9',
    },
    {
      key: 'effect',
      eyebrow: language === 'ro' ? '02 · Efectul' : '02 · The effect',
      title: language === 'ro' ? 'Ce simte și vede pielea.' : 'What skin feels and sees.',
      intro: language === 'ro'
        ? 'Beneficiile formulei, de la confort imediat la rezultate construite în timp.'
        : 'Formula benefits, from immediate comfort to results built over time.',
      features: groupedFeatures.effect,
      image: visualImages[1] || visualImages[0],
      accent: '#a8cbd0',
    },
    {
      key: 'ritual',
      eyebrow: language === 'ro' ? '03 · Ritualul' : '03 · The ritual',
      title: language === 'ro' ? 'Cum își găsește locul în rutină.' : 'How it fits the routine.',
      intro: language === 'ro'
        ? 'Textură, toleranță și gesturi de utilizare care fac produsul ușor de păstrat aproape.'
        : 'Texture, tolerance and use cues that make the product easy to keep close.',
      features: groupedFeatures.ritual,
      image: visualImages[2] || visualImages[1] || visualImages[0],
      accent: '#d7bd96',
    },
  ];

  const activeChapter = chapters.find((chapter) => chapter.key === activeKey) || chapters[0];

  return (
    <section className="relative overflow-hidden rounded-[1.5rem] bg-[#21171d] p-5 text-white shadow-[0_24px_70px_rgba(40,25,34,.16)] sm:p-7 md:p-10">
      <div className="glam-grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#a04e62]/20 blur-3xl" />

      <header className="relative flex flex-col justify-between gap-6 border-b border-white/15 pb-7 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#d9aebb]">
            {language === 'ro' ? 'Anatomia ritualului' : 'Anatomy of the ritual'}
          </p>
          <h3 className="mt-4 max-w-xl font-serif text-4xl leading-[.95] tracking-[-.04em] sm:text-5xl">
            {language === 'ro' ? 'Formula, pusă în mișcare.' : 'The formula, set in motion.'}
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-white/55">
          {language === 'ro'
            ? 'Explorează produsul prin ingrediente, efecte și felul în care se așază în ritualul tău.'
            : 'Explore the product through its ingredients, effects and the way it settles into your ritual.'}
        </p>
      </header>

      <div className="relative mt-8 grid gap-4 lg:grid-cols-[1.08fr_.92fr] lg:gap-6">
        <div className="relative isolate min-h-[27rem] overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#35252e] sm:min-h-[31rem]">
          {activeChapter.image && (
            <img
              key={activeChapter.image}
              src={activeChapter.image}
              alt={`${productName} — ${activeChapter.eyebrow}`}
              className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[fade-in_.65s_ease-out]"
              loading="lazy"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#160d13]/15 via-[#160d13]/25 to-[#160d13]/95" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#160d13]/45 via-transparent to-transparent" />
          <div className="glam-grain pointer-events-none absolute inset-0" />

          <div className="relative flex h-full min-h-[27rem] flex-col justify-between p-5 sm:min-h-[31rem] sm:p-7">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.22em]" style={{ color: activeChapter.accent }}>
                  {activeChapter.eyebrow}
                </p>
                <h4 className="mt-4 max-w-md font-serif text-4xl leading-[.96] tracking-[-.04em] sm:text-5xl">
                  {activeChapter.title}
                </h4>
              </div>
              <span className="hidden font-serif text-7xl italic leading-none text-white/20 sm:block">
                0{chapters.findIndex((chapter) => chapter.key === activeChapter.key) + 1}
              </span>
            </div>

            <div>
              <p className="mb-5 max-w-md text-sm leading-6 text-white/70">{activeChapter.intro}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {activeChapter.features.map((feature, index) => (
                  <div
                    key={feature}
                    className="rounded-xl border border-white/20 bg-[#170f15]/60 px-4 py-3 backdrop-blur-md transition duration-500 hover:-translate-y-0.5 hover:border-white/40 hover:bg-[#170f15]/80"
                  >
                    <span className="mr-2 font-serif text-xs italic text-white/45">0{index + 1}</span>
                    <span className="text-xs leading-5 text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {chapters.map((chapter) => {
            const isActive = chapter.key === activeKey;
            return (
              <button
                key={chapter.key}
                type="button"
                onMouseEnter={() => setActiveKey(chapter.key)}
                onFocus={() => setActiveKey(chapter.key)}
                onClick={() => setActiveKey(chapter.key)}
                className={`group/chapter relative min-h-[8.5rem] overflow-hidden rounded-[1.15rem] border p-5 text-left transition-all duration-500 sm:p-6 ${
                  isActive
                    ? 'border-white/30 bg-white/[.13] shadow-[0_16px_40px_rgba(0,0,0,.16)]'
                    : 'border-white/10 bg-white/[.035] hover:border-white/25 hover:bg-white/[.08]'
                }`}
              >
                <span
                  className={`absolute bottom-0 left-0 h-1 transition-all duration-700 ${isActive ? 'w-full' : 'w-0 group-hover/chapter:w-1/3'}`}
                  style={{ backgroundColor: chapter.accent }}
                />
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-[9px] font-semibold uppercase tracking-[.2em]" style={{ color: chapter.accent }}>
                      {chapter.eyebrow}
                    </span>
                    <span className="mt-3 block font-serif text-2xl leading-none text-white/95 sm:text-3xl">
                      {chapter.title}
                    </span>
                    <span className="mt-3 block text-xs text-white/45">
                      {chapter.features.length} {language === 'ro' ? 'repere' : 'details'}
                    </span>
                  </span>
                  <span className={`text-2xl font-light transition duration-500 ${isActive ? 'translate-x-0 text-white/80' : '-translate-x-2 text-white/20 group-hover/chapter:translate-x-0 group-hover/chapter:text-white/60'}`}>
                    ↗
                  </span>
                </span>
              </button>
            );
          })}
          <p className="px-1 pt-2 text-[9px] uppercase tracking-[.18em] text-white/35">
            {language === 'ro' ? 'Hover sau click pentru a explora' : 'Hover or click to explore'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkinRitualFeatures;
