import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { language } = useLanguage();
  const copy = language === 'ro' ? {
    eyebrow: 'Ghid olfactiv',
    title: 'Nu alegi doar un parfum. Alegi felul în care vrei să fii ținută minte.',
    body: 'Începe cu starea pe care vrei s-o porți. Floral pentru lumină, citric pentru energie, lemnos pentru profunzime sau oriental pentru o prezență care rămâne.',
    cta: 'Găsește-ți familia olfactivă',
    notes: ['Floral · luminos', 'Citric · energic', 'Lemnos · profund', 'Oriental · magnetic'],
  } : {
    eyebrow: 'Scent guide',
    title: 'You are not choosing a fragrance. You are choosing how you want to be remembered.',
    body: 'Start with the mood you want to wear. Floral for light, citrus for energy, woody for depth, or oriental for a presence that lingers.',
    cta: 'Find your fragrance family',
    notes: ['Floral · luminous', 'Citrus · energetic', 'Woody · grounded', 'Oriental · magnetic'],
  };

  return (
    <section className="overflow-hidden bg-[#d9c1bc]">
      <div className="grid min-h-[680px] lg:grid-cols-2">
        <div className="relative min-h-[460px] overflow-hidden lg:min-h-full">
          <img
            src="/ParfumWoodyElegance.jpg"
            alt="Parfum Woody Elegance într-o compoziție editorială"
            className="absolute inset-0 h-full w-full object-cover transition duration-[1800ms] hover:scale-[1.025]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 text-[9px] font-medium uppercase tracking-[.25em] text-white/75">Woody Elegance · Eau de Parfum</p>
        </div>

        <div className="flex items-center bg-[#eee2dd] px-6 py-20 md:px-14 lg:px-[10%]">
          <div className="max-w-2xl">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.3em] text-[#9c5967]">{copy.eyebrow}</p>
            <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-[-.035em] text-[#281922] md:text-6xl">{copy.title}</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[#6d5f65] md:text-base">{copy.body}</p>

            <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-[#281922]/12 py-6">
              {copy.notes.map((note) => <span key={note} className="text-[10px] font-medium uppercase tracking-[.16em] text-[#4a3941]">{note}</span>)}
            </div>

            <Link to="/parfumuri" className="group mt-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.16em] text-[#281922]">
              {copy.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
