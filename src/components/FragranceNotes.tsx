import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizeProductFeature } from '@/utils/productCopy';

interface FragranceNotesProps {
  features?: string[];
  productSlug?: string;
}

type NoteGroup = {
  key: 'top' | 'heart' | 'base';
  label: string;
  title: string;
  notes: string[];
  image?: string;
};

const perfumeNoteImages: Record<string, Record<NoteGroup['key'], string>> = {
  'parfum-floral-extravagance': {
    top: '/products/perfumes/notes/rose-jasmine.jpg',
    heart: '/products/perfumes/notes/iris-ylang-ylang.jpg',
    base: '/products/perfumes/notes/musk-amber-vanilla.jpg',
  },
  'parfum-oriental-mystique': {
    top: '/products/perfumes/notes/bergamot-cardamom.jpg',
    heart: '/products/perfumes/notes/rose-jasmine-alternate.jpg',
    base: '/products/perfumes/notes/musk-amber-vanilla.jpg',
  },
  'parfum-fresh-citrus': {
    top: '/products/perfumes/notes/lemon-lime-grapefruit.jpg',
    heart: '/products/perfumes/notes/mint-basil.jpg',
    base: '/products/perfumes/notes/cedar-musk.jpg',
  },
  'parfum-woody-elegance': {
    top: '/products/perfumes/notes/bergamot-black-pepper.jpg',
    heart: '/products/perfumes/notes/cedar-sandalwood.jpg',
    base: '/products/perfumes/notes/vetiver-patchouli-amber.jpg',
  },
  'parfum-aquatic-breeze': {
    top: '/products/perfumes/notes/citrus-mint.jpg',
    heart: '/products/perfumes/notes/marine-lavender.jpg',
    base: '/products/perfumes/notes/musk-amber.jpg',
  },
  'parfum-spicy-noir': {
    top: '/products/perfumes/notes/pepper-nutmeg.jpg',
    heart: '/products/perfumes/notes/cinnamon-clove.jpg',
    base: '/products/perfumes/notes/vanilla-oud-tobacco.jpg',
  },
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

const FragranceNotes: React.FC<FragranceNotesProps> = ({ features = [], productSlug }) => {
  const { language } = useLanguage();
  const [activeKey, setActiveKey] = useState<NoteGroup['key']>('top');
  const localizedFeatures = features.map((feature) => localizeProductFeature(feature, language));
  const noteFeatures = (label: 'top' | 'heart' | 'base') => {
    const pattern = label === 'top' ? /^(?:Note de vârf|Top notes):\s*/i : label === 'heart' ? /^(?:Note de mijloc|Middle notes):\s*/i : /^(?:Note de bază|Base notes):\s*/i;
    return localizedFeatures
      .filter((feature) => pattern.test(feature))
      .flatMap((feature) => feature.replace(pattern, '').split(',').map((note) => note.trim()))
      .filter(Boolean);
  };
  const noteGroups: NoteGroup[] = [
    {
      key: 'top',
      label: language === 'ro' ? 'Note de vârf' : 'Top notes',
      title: language === 'ro' ? 'Prima impresie' : 'The first impression',
      notes: noteFeatures('top'),
      image: productSlug ? perfumeNoteImages[productSlug]?.top : undefined,
    },
    {
      key: 'heart',
      label: language === 'ro' ? 'Note de mijloc' : 'Middle notes',
      title: language === 'ro' ? 'Inima compoziției' : 'The heart of the composition',
      notes: noteFeatures('heart'),
      image: productSlug ? perfumeNoteImages[productSlug]?.heart : undefined,
    },
    {
      key: 'base',
      label: language === 'ro' ? 'Note de bază' : 'Base notes',
      title: language === 'ro' ? 'Amprenta rămasă' : 'The lasting trace',
      notes: noteFeatures('base'),
      image: productSlug ? perfumeNoteImages[productSlug]?.base : undefined,
    },
  ];

  const supportingDetails = localizedFeatures.filter((feature) => !/^(?:Note de (?:vârf|mijloc|bază)|(?:Top|Middle|Base) notes):/i.test(feature));
  const activeGroup = noteGroups.find((group) => group.key === activeKey) || noteGroups[0];

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
        <p className="max-w-sm text-sm leading-6 text-white/55">{language === 'ro' ? 'Explorează cele trei acte ale parfumului. Treci peste un nivel pentru a-i schimba atmosfera.' : 'Explore the three acts of the fragrance. Hover a chapter to shift its atmosphere.'}</p>
      </div>

      <div className="relative mt-8 grid gap-8 lg:grid-cols-[minmax(0,.82fr)_minmax(17rem,.9fr)] lg:items-stretch">
        <div key={activeGroup.key} className={`relative isolate flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.35rem] border border-white/15 bg-gradient-to-br p-6 shadow-2xl transition-all duration-700 ${activeGroup.key === 'top' ? 'from-[#406c70] via-[#2c343f] to-[#241820]' : activeGroup.key === 'heart' ? 'from-[#92556d] via-[#422535] to-[#241820]' : 'from-[#aa704d] via-[#422a2d] to-[#241820]'}`}>
          {activeGroup.image && (
            <img
              key={activeGroup.image}
              src={activeGroup.image}
              alt={`${activeGroup.label}: ${activeGroup.notes.join(', ')}`}
              className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[fade-in_.65s_ease-out]"
              loading="lazy"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#160d13]/25 via-[#160d13]/15 to-[#160d13]/95" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#160d13]/40 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -right-16 -top-14 h-52 w-52 rounded-full border border-white/15 opacity-60" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full border border-white/10 opacity-50" />
          <div className="glam-grain absolute inset-0" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.25em] text-white/55">{activeGroup.label}</p>
              <p className="mt-3 max-w-xs font-serif text-4xl leading-[.94] tracking-[-.04em] sm:text-5xl">{activeGroup.title}</p>
            </div>
            <span className="font-serif text-7xl italic leading-none text-white/15">0{noteGroups.findIndex((group) => group.key === activeGroup.key) + 1}</span>
          </div>

          <div className="relative mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {activeGroup.notes.map((note, noteIndex) => (
              <div key={note} className="group/note rounded-2xl border border-white/20 bg-[#1a1017]/55 p-4 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-white/40 hover:bg-[#1a1017]/75">
                <span className="mb-5 block font-serif text-xs italic text-white/45">0{noteIndex + 1}</span>
                <span className="block text-sm font-medium text-white/95">{note}</span>
                <span className="mt-1.5 block text-[9px] uppercase tracking-[.17em] text-white/55">{noteDescriptor(note, language)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col gap-3">
          {noteGroups.map((group, groupIndex) => {
            const isActive = group.key === activeKey;
            return (
              <button key={group.key} type="button" onMouseEnter={() => setActiveKey(group.key)} onFocus={() => setActiveKey(group.key)} onClick={() => setActiveKey(group.key)} className={`group/level relative flex flex-1 items-center gap-4 overflow-hidden rounded-[1.15rem] border p-5 text-left transition-all duration-500 ${isActive ? 'border-[#d9aebb]/55 bg-white/[.12] shadow-lg' : 'border-white/10 bg-white/[.035] hover:border-white/25 hover:bg-white/[.08]'}`}>
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border font-serif text-sm italic transition ${isActive ? 'border-[#f1d5dd] bg-[#d9aebb] text-[#281922]' : 'border-white/20 bg-[#3b2732] text-[#f4dbe1]'}`}>0{groupIndex + 1}</span>
                <span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold uppercase tracking-[.2em] text-[#d9aebb]">{group.label}</span><span className="mt-1 block font-serif text-2xl text-white/90">{group.title}</span><span className="mt-2 block text-xs text-white/45">{group.notes.length} {language === 'ro' ? 'note' : 'notes'}</span></span>
                <span className={`text-2xl font-light transition duration-500 ${isActive ? 'translate-x-0 text-[#f1d5dd]' : '-translate-x-2 text-white/20 group-hover/level:translate-x-0 group-hover/level:text-white/60'}`}>↗</span>
              </button>
            );
          })}
          <p className="mt-auto px-1 pt-3 text-[10px] uppercase tracking-[.18em] text-white/35">{language === 'ro' ? 'Hover sau click pentru a explora' : 'Hover or click to explore'}</p>
        </div>
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
