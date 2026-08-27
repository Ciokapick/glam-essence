export type LocalizedText = { ro: string; en: string };

export type FinderOption = {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
};

export type FinderQuestion = {
  id: 'skin' | 'moment' | 'goal' | 'texture';
  eyebrow: LocalizedText;
  question: LocalizedText;
  options: FinderOption[];
};

export const finderQuestions: FinderQuestion[] = [
  {
    id: 'skin',
    eyebrow: { ro: 'Punctul de plecare', en: 'The starting point' },
    question: { ro: 'Cum se simte pielea ta, cel mai des?', en: 'How does your skin feel most often?' },
    options: [
      { id: 'dry', label: { ro: 'Uscată', en: 'Dry' }, description: { ro: 'Cere confort și lipide', en: 'Asks for comfort and lipids' } },
      { id: 'sensitive', label: { ro: 'Sensibilă', en: 'Sensitive' }, description: { ro: 'Preferă formule blânde', en: 'Prefers gentle formulas' } },
      { id: 'combination', label: { ro: 'Mixtă', en: 'Combination' }, description: { ro: 'Are nevoie de echilibru', en: 'Needs balance' } },
      { id: 'mature', label: { ro: 'Matură', en: 'Mature' }, description: { ro: 'Caută fermitate și refacere', en: 'Looks for firmness and renewal' } },
    ],
  },
  {
    id: 'moment',
    eyebrow: { ro: 'Ritmul tău', en: 'Your rhythm' },
    question: { ro: 'Când vrei să îți rezervi ritualul?', en: 'When do you want to make time for your ritual?' },
    options: [
      { id: 'morning', label: { ro: 'Dimineața', en: 'Morning' }, description: { ro: 'Prospețime, protecție, lumină', en: 'Freshness, protection, light' } },
      { id: 'evening', label: { ro: 'Seara', en: 'Evening' }, description: { ro: 'Reparare și texturi bogate', en: 'Repair and richer textures' } },
      { id: 'weekend', label: { ro: 'Un moment lent', en: 'A slow moment' }, description: { ro: 'Mască, masaj și resetare', en: 'Mask, massage and reset' } },
    ],
  },
  {
    id: 'goal',
    eyebrow: { ro: 'Rezultatul dorit', en: 'The desired result' },
    question: { ro: 'Ce ai vrea să observi prima dată?', en: 'What would you like to notice first?' },
    options: [
      { id: 'hydrate', label: { ro: 'Mai mult confort', en: 'More comfort' }, description: { ro: 'Piele suplă și hidratată', en: 'Supple, hydrated skin' } },
      { id: 'radiance', label: { ro: 'Mai multă lumină', en: 'More radiance' }, description: { ro: 'Ton uniform și strălucire', en: 'Even tone and glow' } },
      { id: 'balance', label: { ro: 'Mai mult echilibru', en: 'More balance' }, description: { ro: 'Curățare fără senzație de piele uscată', en: 'Cleansing without tightness' } },
      { id: 'renew', label: { ro: 'Mai multă fermitate', en: 'More firmness' }, description: { ro: 'Textură netedă și refacere', en: 'Smooth texture and renewal' } },
    ],
  },
  {
    id: 'texture',
    eyebrow: { ro: 'Plăcerea aplicării', en: 'The pleasure of application' },
    question: { ro: 'Ce textură te face să revii la un produs?', en: 'Which texture makes you return to a product?' },
    options: [
      { id: 'light', label: { ro: 'Fluidă', en: 'Fluid' }, description: { ro: 'Seruri și formule care dispar în piele', en: 'Serums and formulas that melt into skin' } },
      { id: 'cream', label: { ro: 'Catifelată', en: 'Velvety' }, description: { ro: 'Creme cu senzație de confort', en: 'Comforting creams' } },
      { id: 'oil', label: { ro: 'Senzorială', en: 'Sensory' }, description: { ro: 'Uleiuri pentru masaj și strălucire', en: 'Oils for massage and glow' } },
    ],
  },
];

export const recommendationRules: Record<string, string[]> = {
  dry: ['crema-hidratanta-luxury', 'crema-nutritiva-de-noapte', 'ulei-de-fata-nutritiv'],
  sensitive: ['crema-hidratanta-luxury', 'tonic-purificator', 'spuma-de-curatare'],
  combination: ['tonic-purificator', 'spuma-de-curatare', 'ser-facial-radiance'],
  mature: ['crema-contur-ochi-anti-age', 'crema-nutritiva-de-noapte', 'ulei-de-fata-nutritiv'],
  morning: ['spuma-de-curatare', 'ser-facial-radiance', 'crema-hidratanta-luxury'],
  evening: ['tonic-purificator', 'crema-nutritiva-de-noapte', 'ulei-de-fata-nutritiv'],
  weekend: ['masca-faciala-detox', 'ulei-de-fata-nutritiv', 'crema-de-corp-intense'],
  hydrate: ['crema-hidratanta-luxury', 'crema-nutritiva-de-noapte', 'crema-de-maini-silk'],
  radiance: ['ser-facial-radiance', 'ulei-de-fata-nutritiv', 'tonic-purificator'],
  balance: ['spuma-de-curatare', 'tonic-purificator', 'masca-faciala-detox'],
  renew: ['crema-contur-ochi-anti-age', 'crema-nutritiva-de-noapte', 'ser-facial-radiance'],
  light: ['ser-facial-radiance', 'tonic-purificator', 'spuma-de-curatare'],
  cream: ['crema-hidratanta-luxury', 'crema-nutritiva-de-noapte', 'crema-contur-ochi-anti-age'],
  oil: ['ulei-de-fata-nutritiv', 'ser-facial-radiance', 'crema-de-corp-intense'],
};

export type IngredientStory = {
  id: string;
  name: LocalizedText;
  family: LocalizedText;
  statement: LocalizedText;
  role: LocalizedText;
  detail: LocalizedText;
  image: string;
  accent: string;
  productSlugs: string[];
};

export const ingredientStories: IngredientStory[] = [
  {
    id: 'hyaluronic',
    name: { ro: 'Acid hialuronic', en: 'Hyaluronic acid' },
    family: { ro: 'Hidratare', en: 'Hydration' },
    statement: { ro: 'Apa devine rezervă de confort.', en: 'Water becomes a reserve of comfort.' },
    role: { ro: 'Atrage și păstrează apa la suprafața pielii.', en: 'Draws in and holds water at the skin surface.' },
    detail: { ro: 'Un umectant ales pentru pielea deshidratată, când liniile fine par mai vizibile și textura cere elasticitate.', en: 'A humectant chosen for dehydrated skin, when fine lines look more visible and texture asks for elasticity.' },
    image: '/products/skincare/rituals/luxury-face-cream-effect.jpg',
    accent: '#9fc8d3',
    productSlugs: ['crema-hidratanta-luxury', 'ser-facial-radiance'],
  },
  {
    id: 'ceramides',
    name: { ro: 'Ceramide', en: 'Ceramides' },
    family: { ro: 'Barieră', en: 'Barrier' },
    statement: { ro: 'Pielea își regăsește liniștea.', en: 'Skin finds its quiet again.' },
    role: { ro: 'Susțin bariera naturală și reduc pierderea de apă.', en: 'Support the natural barrier and reduce water loss.' },
    detail: { ro: 'Lipide compatibile cu pielea, potrivite când senzația de uscăciune revine imediat după curățare.', en: 'Skin-compatible lipids, ideal when dryness returns immediately after cleansing.' },
    image: '/products/skincare/rituals/luxury-face-cream-formula.jpg',
    accent: '#cfb394',
    productSlugs: ['crema-hidratanta-luxury', 'crema-nutritiva-de-noapte'],
  },
  {
    id: 'shea',
    name: { ro: 'Unt de shea', en: 'Shea butter' },
    family: { ro: 'Nutriție', en: 'Nourishment' },
    statement: { ro: 'O textură densă, un gest protector.', en: 'A rich texture, a protective gesture.' },
    role: { ro: 'Catifelează și aduce confort pielii uscate.', en: 'Softens and comforts dry skin.' },
    detail: { ro: 'Bogat în lipide, untul de shea transformă aplicarea într-un moment lent pentru mâini și corp.', en: 'Rich in lipids, shea butter turns application into a slow moment for hands and body.' },
    image: '/products/skincare/rituals/hand-cream-formula.jpg',
    accent: '#d6b58e',
    productSlugs: ['crema-de-maini-silk', 'crema-de-corp-intense'],
  },
  {
    id: 'vitamin-e',
    name: { ro: 'Vitamina E', en: 'Vitamin E' },
    family: { ro: 'Protecție', en: 'Protection' },
    statement: { ro: 'Lumina rămâne, stresul oxidativ nu.', en: 'Radiance stays; oxidative stress does not.' },
    role: { ro: 'Oferă suport antioxidant și completează uleiurile vegetale.', en: 'Offers antioxidant support and complements botanical oils.' },
    detail: { ro: 'Un aliat pentru formule nutritive care urmăresc suplețe, confort și un aspect luminos.', en: 'An ally in nourishing formulas designed for suppleness, comfort and luminosity.' },
    image: '/products/skincare/rituals/face-oil-effect.jpg',
    accent: '#dca958',
    productSlugs: ['ulei-de-fata-nutritiv', 'crema-de-maini-silk'],
  },
  {
    id: 'caffeine',
    name: { ro: 'Cafeină', en: 'Caffeine' },
    family: { ro: 'Privire', en: 'Eye care' },
    statement: { ro: 'Dimineața începe în jurul ochilor.', en: 'Morning begins around the eyes.' },
    role: { ro: 'Ajută la estomparea aspectului obosit și a pungilor.', en: 'Helps soften the look of fatigue and puffiness.' },
    detail: { ro: 'Folosită în formule dedicate zonei delicate, pentru un aspect mai odihnit și mai clar.', en: 'Used in formulas for the delicate eye area, for a clearer and more rested look.' },
    image: '/products/skincare/rituals/eye-cream-effect.jpg',
    accent: '#b98772',
    productSlugs: ['crema-contur-ochi-anti-age'],
  },
  {
    id: 'oud',
    name: { ro: 'Lemn de oud', en: 'Oud wood' },
    family: { ro: 'Profunzime', en: 'Depth' },
    statement: { ro: 'Umbra care dă parfumului memorie.', en: 'The shadow that gives fragrance memory.' },
    role: { ro: 'Aduce densitate, fum și o căldură rășinoasă.', en: 'Brings density, smoke and a resinous warmth.' },
    detail: { ro: 'O notă de bază cu prezență, construită pentru seri târzii și compoziții care rămân aproape de piele.', en: 'A base note with presence, made for late evenings and compositions that linger close to skin.' },
    image: '/products/perfumes/notes/vanilla-oud-tobacco.jpg',
    accent: '#8e4938',
    productSlugs: ['parfum-spicy-noir', 'parfum-woody-elegance'],
  },
  {
    id: 'vanilla',
    name: { ro: 'Vanilie', en: 'Vanilla' },
    family: { ro: 'Căldură', en: 'Warmth' },
    statement: { ro: 'O urmă caldă, niciodată inocentă.', en: 'A warm trail, never innocent.' },
    role: { ro: 'Rotunjește compoziția și îi oferă o dulceață tactilă.', en: 'Rounds the composition and gives it a tactile sweetness.' },
    detail: { ro: 'În doze atent construite, vanilia unește florile, condimentele și lemnul într-o bază memorabilă.', en: 'In carefully judged doses, vanilla binds florals, spice and woods into a memorable base.' },
    image: '/products/perfumes/notes/musk-amber-vanilla.jpg',
    accent: '#c88959',
    productSlugs: ['parfum-oriental-mystique', 'parfum-floral-extravagance', 'parfum-spicy-noir'],
  },
  {
    id: 'marine',
    name: { ro: 'Acord marin', en: 'Marine accord' },
    family: { ro: 'Prospețime', en: 'Freshness' },
    statement: { ro: 'Aer, sare și distanță.', en: 'Air, salt and distance.' },
    role: { ro: 'Deschide compoziția cu transparență și energie.', en: 'Opens the composition with transparency and energy.' },
    detail: { ro: 'Un acord abstract care evocă lumina de coastă, pielea răcorită și mișcarea apei.', en: 'An abstract accord that evokes coastal light, cooled skin and moving water.' },
    image: '/products/perfumes/notes/marine-lavender.jpg',
    accent: '#6d9aaa',
    productSlugs: ['parfum-aquatic-breeze', 'parfum-fresh-citrus'],
  },
];
