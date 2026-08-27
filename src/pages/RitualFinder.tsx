import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, Product } from '@/data/products';
import { finderQuestions, recommendationRules } from '@/data/discovery';
import '@/styles/discovery.css';

type Answers = Partial<Record<'skin' | 'moment' | 'goal' | 'texture', string>>;

const copy = {
  ro: {
    eyebrow: 'Glam Essence · Ritual Finder',
    title: 'Patru alegeri. Un ritual care chiar ți se potrivește.',
    intro: 'Nu căutăm o rutină perfectă. Alegem câteva texturi care au sens pentru pielea și ritmul tău.',
    step: 'gestul', of: 'din', back: 'Înapoi', continue: 'Continuă', result: 'Construiește ritualul',
    resultEyebrow: 'Ritualul tău, în trei gesturi', resultTitle: 'Mai puține produse. Mai multă intenție.',
    resultText: 'Selecția pornește de la răspunsurile tale și combină curățarea, tratamentul și confortul într-o ordine simplă.',
    restart: 'Refă ritualul', discover: 'Descoperă produsul', price: 'lei',
    steps: ['Pregătește', 'Concentrează', 'Păstrează'],
    note: 'Recomandarea este orientativă și nu înlocuiește sfatul dermatologic.',
  },
  en: {
    eyebrow: 'Glam Essence · Ritual Finder',
    title: 'Four choices. One ritual that truly fits you.',
    intro: 'We are not looking for a perfect routine. We choose a few textures that make sense for your skin and rhythm.',
    step: 'gesture', of: 'of', back: 'Back', continue: 'Continue', result: 'Build my ritual',
    resultEyebrow: 'Your ritual, in three gestures', resultTitle: 'Fewer products. More intention.',
    resultText: 'Your selection starts with your answers and combines cleansing, treatment and comfort in one simple order.',
    restart: 'Start again', discover: 'Discover the product', price: 'lei',
    steps: ['Prepare', 'Focus', 'Preserve'],
    note: 'This recommendation is a guide and does not replace dermatological advice.',
  },
};

const resolveRecommendations = (answers: Answers): Product[] => {
  const scores = new Map<string, number>();
  Object.values(answers).forEach((answer) => {
    if (!answer) return;
    recommendationRules[answer]?.forEach((slug, rank) => {
      scores.set(slug, (scores.get(slug) ?? 0) + (3 - rank));
    });
  });

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => products[slug])
    .filter(Boolean)
    .slice(0, 3);
};

const RitualFinder = () => {
  const { language, t } = useLanguage();
  const c = copy[language];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isComplete, setIsComplete] = useState(false);
  const question = finderQuestions[step];
  const recommendations = useMemo(() => resolveRecommendations(answers), [answers]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isComplete]);

  const select = (value: string) => setAnswers((current) => ({ ...current, [question.id]: value }));
  const next = () => {
    if (!answers[question.id]) return;
    if (step === finderQuestions.length - 1) setIsComplete(true);
    else setStep((current) => current + 1);
  };
  const reset = () => { setAnswers({}); setStep(0); setIsComplete(false); };

  return (
    <div className="min-h-screen bg-[#f8f4f1] text-[#2b1b23]">
      <Navbar />
      <main className="pt-[104px]">
        {!isComplete ? (
          <section className="discovery-grain min-h-[calc(100vh-104px)] overflow-hidden bg-[#20141a] text-white">
            <div className="mx-auto grid min-h-[calc(100vh-104px)] max-w-[1500px] lg:grid-cols-[.72fr_1.28fr]">
              <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 px-6 py-12 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-16">
                <img src="/products/skincare/rituals/face-oil-ritual.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#20141a]/30 via-[#20141a]/70 to-[#20141a]" />
                <div className="relative z-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#e5b8c1]">{c.eyebrow}</p>
                  <h1 className="mt-8 max-w-xl font-serif text-[clamp(2.8rem,5vw,5.8rem)] leading-[.9] tracking-[-.045em]">{c.title}</h1>
                </div>
                <p className="relative z-10 mt-16 max-w-md text-sm leading-7 text-white/65 sm:text-base">{c.intro}</p>
              </div>

              <div className="flex flex-col px-5 py-9 sm:px-10 lg:px-16 lg:py-16 xl:px-24">
                <div className="flex items-center gap-4" aria-label={`${step + 1} / ${finderQuestions.length}`}>
                  {finderQuestions.map((item, index) => (
                    <span key={item.id} className={`h-px flex-1 transition-colors duration-500 ${index <= step ? 'bg-[#df9dad]' : 'bg-white/15'}`} />
                  ))}
                  <span className="text-[10px] uppercase tracking-[.2em] text-white/45">0{step + 1} / 0{finderQuestions.length}</span>
                </div>

                <div key={question.id} className="discovery-enter my-auto py-14">
                  <p className="text-[10px] font-semibold uppercase tracking-[.25em] text-[#df9dad]">{c.step} 0{step + 1} · {question.eyebrow[language]}</p>
                  <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-.025em] sm:text-5xl lg:text-6xl">{question.question[language]}</h2>
                  <div className="mt-10 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label={question.question[language]}>
                    {question.options.map((option) => {
                      const selected = answers[question.id] === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => select(option.id)}
                          className={`group min-h-28 rounded-[1.35rem] border p-5 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#df9dad] ${selected ? 'border-[#df9dad] bg-[#df9dad]/15' : 'border-white/15 bg-white/[.035] hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[.07]'}`}
                        >
                          <span className="flex items-center justify-between gap-4">
                            <span className="font-serif text-2xl">{option.label[language]}</span>
                            <span className={`grid h-6 w-6 place-items-center rounded-full border transition ${selected ? 'border-[#df9dad] bg-[#df9dad]' : 'border-white/25'}`}>
                              {selected && <span className="h-1.5 w-1.5 rounded-full bg-[#20141a]" />}
                            </span>
                          </span>
                          <span className="mt-3 block text-sm text-white/50">{option.description[language]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/55 transition hover:text-white disabled:invisible">
                    <ArrowLeft className="h-4 w-4" /> {c.back}
                  </button>
                  <button type="button" onClick={next} disabled={!answers[question.id]} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#f3e9e5] px-7 text-[10px] font-semibold uppercase tracking-[.16em] text-[#291a22] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35">
                    {step === finderQuestions.length - 1 ? c.result : c.continue} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="discovery-grain overflow-hidden">
            <div className="bg-[#20141a] px-5 py-20 text-center text-white sm:py-28">
              <Sparkles className="mx-auto h-6 w-6 text-[#df9dad]" />
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.28em] text-[#df9dad]">{c.resultEyebrow}</p>
              <h1 className="mx-auto mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,7rem)] leading-[.9] tracking-[-.05em]">{c.resultTitle}</h1>
              <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base">{c.resultText}</p>
            </div>

            <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
              <div className="grid gap-5 lg:grid-cols-3">
                {recommendations.map((product, index) => (
                  <article key={product.slug} className="group overflow-hidden rounded-[1.75rem] border border-[#2b1b23]/10 bg-white discovery-enter" style={{ animationDelay: `${index * 90}ms` }}>
                    <Link to={`/product/${product.slug}`} className="block aspect-[4/3] overflow-hidden bg-[#eee5e0]">
                      <img src={product.image} alt={t(product.name)} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                    </Link>
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#9b5d6c]">0{index + 1} · {c.steps[index]}</span>
                        <span className="text-sm font-medium">{product.price.toFixed(2)} {c.price}</span>
                      </div>
                      <h2 className="mt-5 font-serif text-3xl leading-none">{t(product.name)}</h2>
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#2b1b23]/60">{t(product.description)}</p>
                      <Link to={`/product/${product.slug}`} className="mt-7 inline-flex items-center gap-2 border-b border-[#2b1b23]/25 pb-1 text-[10px] font-semibold uppercase tracking-[.16em] transition hover:border-[#2b1b23]">
                        {c.discover} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-12 flex flex-col items-center gap-5 text-center">
                <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-[#2b1b23]/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[.16em] transition hover:border-[#2b1b23]">
                  <RotateCcw className="h-4 w-4" /> {c.restart}
                </button>
                <p className="text-xs text-[#2b1b23]/45">{c.note}</p>
              </div>
            </div>
          </section>
        )}
      </main>
      {isComplete && <Footer />}
    </div>
  );
};

export default RitualFinder;
