import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';
import { ingredientStories } from '@/data/discovery';
import '@/styles/discovery.css';

const copy = {
  ro: {
    eyebrow: 'Ingredient Atlas · Glam Essence',
    title: 'Din ce se construiește un ritual.',
    intro: 'Ingrediente pentru piele și acorduri pentru parfum — prezentate prin rolul pe care îl au, nu prin promisiuni imposibile.',
    explore: 'Explorează atlasul', index: 'Index senzorial', active: 'În prim-plan',
    role: 'Ce face', found: 'Îl regăsești în', details: 'Vezi produsul',
    note: 'Formulele cosmetice funcționează ca întreg. Atlasul descrie rolul uzual al ingredientelor, nu garantează rezultate medicale.',
  },
  en: {
    eyebrow: 'Ingredient Atlas · Glam Essence',
    title: 'What a ritual is made of.',
    intro: 'Skin ingredients and fragrance accords — presented through the role they play, without impossible promises.',
    explore: 'Explore the atlas', index: 'Sensory index', active: 'In focus',
    role: 'What it does', found: 'Find it in', details: 'View product',
    note: 'Cosmetic formulas work as a whole. The atlas describes the common role of ingredients and does not guarantee medical results.',
  },
};

const IngredientAtlas = () => {
  const { language, t } = useLanguage();
  const c = copy[language];
  const [activeId, setActiveId] = useState(ingredientStories[0].id);
  const active = useMemo(() => ingredientStories.find((ingredient) => ingredient.id === activeId) ?? ingredientStories[0], [activeId]);
  const linkedProducts = active.productSlugs.map((slug) => products[slug]).filter(Boolean);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f2ee] text-[#2a1a22]">
      <Navbar />
      <main className="pt-[104px]">
        <section className="discovery-grain relative min-h-[72vh] overflow-hidden bg-[#21151b] text-white">
          <img src="/products/perfumes/notes/vanilla-oud-tobacco.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#21151b] via-[#21151b]/85 to-[#21151b]/20" />
          <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-5 pb-14 pt-20 md:px-8 md:pb-20">
            <p className="text-[10px] font-semibold uppercase tracking-[.3em] text-[#e3aab6]">{c.eyebrow}</p>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.8rem,9vw,8.5rem)] leading-[.82] tracking-[-.055em]">{c.title}</h1>
            <div className="mt-10 flex max-w-3xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-sm leading-7 text-white/65 sm:text-base">{c.intro}</p>
              <a href="#atlas" className="inline-flex shrink-0 items-center gap-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[#e3aab6]">
                {c.explore} <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="atlas" className="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-[#2a1a22]/10 pb-6">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[.25em] text-[#9b5969]">{c.index}</p>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">01—08</h2>
            </div>
            <p className="hidden max-w-xs text-right text-xs leading-5 text-[#2a1a22]/50 sm:block">{c.note}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[.74fr_1.26fr] lg:items-start">
            <div className="grid gap-2 sm:grid-cols-2 lg:sticky lg:top-32 lg:grid-cols-1" role="listbox" aria-label={c.index}>
              {ingredientStories.map((ingredient, index) => {
                const selected = ingredient.id === active.id;
                return (
                  <button
                    key={ingredient.id}
                    type="button"
                    role="option"
                    onClick={() => setActiveId(ingredient.id)}
                    aria-selected={selected}
                    className={`group flex min-h-[5.5rem] items-center gap-5 rounded-2xl border px-5 py-4 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b5969] ${selected ? 'border-[#2a1a22] bg-[#2a1a22] text-white shadow-xl' : 'border-[#2a1a22]/10 bg-white/60 hover:-translate-y-0.5 hover:border-[#2a1a22]/30'}`}
                  >
                    <span className={`font-serif text-sm italic ${selected ? 'text-[#e3aab6]' : 'text-[#9b5969]'}`}>0{index + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-serif text-2xl">{ingredient.name[language]}</span>
                      <span className={`mt-1 block text-[8px] font-semibold uppercase tracking-[.22em] ${selected ? 'text-white/45' : 'text-[#2a1a22]/40'}`}>{ingredient.family[language]}</span>
                    </span>
                    <span className={`h-2.5 w-2.5 rounded-full border ${selected ? 'border-white/30' : 'border-black/10'}`} style={{ backgroundColor: ingredient.accent }} />
                  </button>
                );
              })}
            </div>

            <article key={active.id} className="discovery-enter overflow-hidden rounded-[2rem] bg-[#21151b] text-white shadow-[0_24px_80px_rgba(42,26,34,.16)]">
              <div className="relative aspect-[4/3] min-h-[22rem] overflow-hidden md:aspect-[16/10]">
                <img src={active.image} alt={active.name[language]} className="ingredient-panel-image h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21151b] via-transparent to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 md:p-12">
                  <p className="text-[9px] font-semibold uppercase tracking-[.25em] text-white/60">{c.active} · {active.family[language]}</p>
                  <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.8rem,6vw,6rem)] leading-[.9] tracking-[-.045em]">{active.statement[language]}</h2>
                </div>
              </div>

              <div className="grid gap-10 p-6 sm:p-9 md:grid-cols-[.8fr_1.2fr] md:p-12">
                <div>
                  <div className="flex items-center gap-3 text-[#e3aab6]">
                    <FlaskConical className="h-4 w-4" />
                    <p className="text-[9px] font-semibold uppercase tracking-[.23em]">{c.role}</p>
                  </div>
                  <p className="mt-5 font-serif text-3xl leading-tight">{active.role[language]}</p>
                  <p className="mt-5 text-sm leading-7 text-white/55">{active.detail[language]}</p>
                </div>

                <div className="border-t border-white/10 pt-7 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[.23em] text-white/40">{c.found}</p>
                  <div className="mt-5 space-y-3">
                    {linkedProducts.map((product) => (
                      <Link key={product.slug} to={`/product/${product.slug}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-3 transition hover:border-white/25 hover:bg-white/[.08]">
                        <img src={product.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-serif text-xl leading-tight">{t(product.name)}</span>
                          <span className="mt-1 block text-xs text-white/45">{product.price.toFixed(2)} lei</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-white/45 transition group-hover:translate-x-1 group-hover:text-white" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
          <p className="mt-8 text-xs leading-5 text-[#2a1a22]/45 sm:hidden">{c.note}</p>
        </section>

        <section className="bg-[#d9b9bf] px-5 py-16 text-center md:py-24">
          <p className="text-[9px] font-semibold uppercase tracking-[.25em] text-[#6e3947]">Glam Essence · Beauty atelier</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-[clamp(2.8rem,6vw,6rem)] leading-[.92] tracking-[-.04em]">
            {language === 'ro' ? 'Ingredientele au un rol. Ritualul le dă sens.' : 'Ingredients have a role. The ritual gives them meaning.'}
          </h2>
          <Link to="/ritual-finder" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#281922] px-7 py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-white transition hover:bg-[#3c2631]">
            {language === 'ro' ? 'Găsește ritualul tău' : 'Find your ritual'} <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IngredientAtlas;
