import React from 'react';
import { Flame, Gem, Leaf, MoonStar, Sparkles, Waves } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FragranceNotesProps {
  features?: string[];
}

type NoteGroup = {
  key: 'top' | 'heart' | 'base';
  label: string;
  title: string;
  notes: string[];
};

const noteVisual = (note: string) => {
  const normalized = note.toLowerCase();
  if (/piper|nucșoară|scorțișoară|cuișoare|pepper|nutmeg|cinnamon|clove|spicy/.test(normalized)) {
    return { Icon: Flame, tint: 'from-[#bb6d42] via-[#8d3d46] to-[#321c28]', ring: 'border-[#db9a77]/45' };
  }
  if (/oud|tabac|cedru|santal|lemn|patchouli|vetiver|woody|tobacco|wood/.test(normalized)) {
    return { Icon: Gem, tint: 'from-[#9e6b50] via-[#4c302c] to-[#211720]', ring: 'border-[#cda27f]/40' };
  }
  if (/vanilie|ambră|musc|amber|vanilla|musk/.test(normalized)) {
    return { Icon: MoonStar, tint: 'from-[#e5bb75] via-[#9a6249] to-[#402530]', ring: 'border-[#f0d095]/45' };
  }
  if (/lămâie|lime|grapefruit|bergamotă|citr|lemon|citrus/.test(normalized)) {
    return { Icon: Waves, tint: 'from-[#c9e2d0] via-[#76aaa6] to-[#27505b]', ring: 'border-[#b9e2dc]/45' };
  }
  if (/trandafir|iasomie|iris|flor|rose|jasmine|floral/.test(normalized)) {
    return { Icon: Leaf, tint: 'from-[#e4acba] via-[#92556d] to-[#3c2032]', ring: 'border-[#f1cbd3]/45' };
  }
  return { Icon: Sparkles, tint: 'from-[#d4c1d8] via-[#7b627f] to-[#302337]', ring: 'border-[#d9c9df]/40' };
};

const noteDescriptor = (note: string, language: 'ro' | 'en') => {
  const normalized = note.toLowerCase();
  if (/piper|pepper/.test(normalized)) return language === 'ro' ? 'vibrant' : 'vibrant';
  if (/nucșoară|nutmeg/.test(normalized)) return language === 'ro' ? 'uscată' : 'dry';
  if (/scorțișoară|cinnamon/.test(normalized)) return language === 'ro' ? 'caldă' : 'warm';
  if (/cuișoare|clove/.test(normalized)) return language === 'ro' ? 'aromată' : 'aromatic';
  if (/oud|lemn|wood/.test(normalized)) return language === 'ro' ? 'dens' : 'deep';
  if (/tabac|tobacco/.test(normalized)) return language === 'ro' ? 'catifelat' : 'velvety';
  if (/vanilie|vanilla/.test(normalized)) return language === 'ro' ? 'catifelată' : 'soft';
  if (/ambră|amber/.test(normalized)) return language === 'ro' ? 'rășinoasă' : 'resinous';
  if (/bergamotă|lămâie|lime|grapefruit|citr|lemon/.test(normalized)) return language === 'ro' ? 'luminoasă' : 'bright';
  if (/trandafir|iasomie|iris|flor|rose|jasmine|floral/.test(normalized)) return language === 'ro' ? 'florală' : 'floral';
  return language === 'ro' ? 'semnătură' : 'signature';
};

const FragranceNotes: React.FC<FragranceNotesProps> = ({ features = [] }) => {
  const { language } = useLanguage();
  const noteGroups: NoteGroup[] = [
    {
      key: 'top',
      label: language === 'ro' ? 'Note de vârf' : 'Top notes',
      title: language === 'ro' ? 'Prima impresie' : 'The first impression',
      notes: features.filter((feature) => /^Note de vârf:/i.test(feature)).flatMap((feature) => feature.replace(/^Note de vârf:\s*/i, '').split(',').map((note) => note.trim())).filter(Boolean),
    },
    {
      key: 'heart',
      label: language === 'ro' ? 'Note de mijloc' : 'Middle notes',
      title: language === 'ro' ? 'Inima compoziției' : 'The heart of the composition',
      notes: features.filter((feature) => /^Note de mijloc:/i.test(feature)).flatMap((feature) => feature.replace(/^Note de mijloc:\s*/i, '').split(',').map((note) => note.trim())).filter(Boolean),
    },
    {
      key: 'base',
      label: language === 'ro' ? 'Note de bază' : 'Base notes',
      title: language === 'ro' ? 'Amprenta rămasă' : 'The lasting trace',
      notes: features.filter((feature) => /^Note de bază:/i.test(feature)).flatMap((feature) => feature.replace(/^Note de bază:\s*/i, '').split(',').map((note) => note.trim())).filter(Boolean),
    },
  ];

  const supportingDetails = features.filter((feature) => !/^Note de (vârf|mijloc|bază):/i.test(feature));

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-[#241820] p-6 text-white shadow-[0_24px_70px_rgba(40,25,34,.16)] md:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#a04e62]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#d9aebb]/10 blur-3xl" />
      <div className="glam-grain absolute inset-0" />

      <div className="relative flex flex-col justify-between gap-6 border-b border-white/15 pb-7 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#d9aebb]">{language === 'ro' ? 'Compoziția parfumului' : 'Fragrance composition'}</p>
          <h3 className="mt-4 font-serif text-4xl leading-none tracking-[-.04em] sm:text-5xl">{language === 'ro' ? 'Piramida olfactivă' : 'The scent pyramid'}</h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-white/55">{language === 'ro' ? 'O evoluție în trei acte: prima impresie, inima parfumului și amprenta care rămâne.' : 'A three-act evolution: first impression, the heart of the scent and the trace it leaves behind.'}</p>
      </div>

      <div className="relative mt-8 space-y-8">
        <div className="pointer-events-none absolute bottom-8 left-[1.15rem] top-8 w-px bg-gradient-to-b from-[#d9aebb]/70 via-[#b87488]/50 to-[#d9aebb]/20 sm:left-[1.45rem]" />
        {noteGroups.map((group, groupIndex) => (
          <section key={group.key} className="relative grid gap-5 sm:grid-cols-[minmax(9.5rem,.48fr)_minmax(0,1fr)] sm:items-center">
            <div className="relative z-10 flex items-center gap-4 bg-[#241820] pr-2 sm:block sm:bg-transparent sm:pr-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d9aebb]/55 bg-[#3b2732] font-serif text-sm italic text-[#f4dbe1] sm:h-11 sm:w-11">0{groupIndex + 1}</span>
              <div className="sm:mt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#d9aebb]">{group.label}</p>
                <p className="mt-1 font-serif text-xl text-white/90">{group.title}</p>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
              {group.notes.length > 0 ? group.notes.map((note) => {
                const { Icon, tint, ring } = noteVisual(note);
                return (
                  <div key={note} title={`${note} · ${noteDescriptor(note, language)}`} className="group/note flex min-w-[7.5rem] items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] px-3 py-3 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[.11] sm:min-w-0 sm:flex-1 sm:basis-[9rem]">
                    <span className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full border bg-gradient-to-br ${tint} ${ring} shadow-inner`}><span className="absolute inset-1 rounded-full border border-white/20 opacity-0 transition group-hover/note:opacity-100" /><Icon className="relative h-5 w-5 text-white/85" strokeWidth={1.35} /></span>
                    <span className="min-w-0"><span className="block truncate text-sm font-medium leading-5 text-white/80">{note}</span><span className="mt-0.5 block text-[9px] uppercase tracking-[.16em] text-white/35">{noteDescriptor(note, language)}</span></span>
                  </div>
                );
              }) : <p className="text-sm text-white/45">{language === 'ro' ? 'Note în curs de compunere.' : 'Notes are being composed.'}</p>}
            </div>
          </section>
        ))}
      </div>

      {supportingDetails.length > 0 && (
        <div className="relative mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[10px] font-semibold uppercase tracking-[.16em] text-white/48">
          {supportingDetails.map((detail) => <span key={detail}>{detail}</span>)}
        </div>
      )}
    </div>
  );
};

export default FragranceNotes;
