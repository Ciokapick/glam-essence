import EditorialCollectionPage, { type EditorialCollectionConfig } from '@/components/EditorialCollectionPage';
import { products } from '@/data/products';

const FACE_CARE_SLUGS = [
  'crema-hidratanta-luxury',
  'crema-contur-ochi-anti-age',
  'crema-nutritiva-de-noapte',
  'ser-facial-radiance',
  'masca-faciala-detox',
  'spuma-de-curatare',
  'tonic-purificator',
  'ulei-de-fata-nutritiv',
] as const;

const faceProducts = FACE_CARE_SLUGS.map((slug) => products[slug]);

const config: EditorialCollectionConfig = {
  theme: 'face',
  products: faceProducts,
  collectionId: 'face-collection',
  heroImage: '/products/skincare/campaign/face-serum.webp',
  heroImageAlt: 'Serul Radiance într-un univers de lumină aurie',
  floatingImage: '/products/skincare/campaign/toner.webp',
  floatingImageAlt: 'Tonicul purificator în lumină acvatică',
  closingImage: '/products/skincare/campaign/night-cream.webp',
  closingImageAlt: 'Crema nutritivă de noapte în decor nocturn',
  closingHref: '/product/crema-nutritiva-de-noapte',
  copy: {
    ro: {
      eyebrow: 'Glam Essence · Ritualuri pentru ten',
      title: 'Pielea nu cere perfecțiune. Cere consecvență.',
      intro: 'Opt texturi construite pentru momente diferite ale zilei — curățare, echilibru, tratament, hidratare și refacere.',
      cta: 'Construiește ritualul',
      manifesto: ['CURĂȚĂ', 'ECHILIBREAZĂ', 'TRATEAZĂ', 'HIDRATEAZĂ', 'PROTEJEAZĂ'],
      storyLabel: 'Un ritual clar',
      storyTitle: 'Mai puține produse alese la întâmplare. Mai multă logică între pași.',
      storyText: 'O rutină bună nu trebuie să fie lungă. Trebuie să aibă un început blând, un tratament potrivit și o textură care închide ritualul fără să încarce pielea.',
      gestures: [
        { number: '01', title: 'Pregătește', text: 'Spuma și tonicul îndepărtează surplusul și aduc pielea într-un punct calm, receptiv.' },
        { number: '02', title: 'Concentrează', text: 'Serul, uleiul și îngrijirea ochilor aduc texturi țintite exact acolo unde ai nevoie.' },
        { number: '03', title: 'Păstrează', text: 'Crema de zi sau de noapte sigilează confortul și transformă pașii într-un ritual complet.' },
      ],
      collectionLabel: 'Îngrijirea tenului',
      collectionTitle: 'De la prima atingere de apă până la ultima textură a serii.',
      collectionText: 'Produsele sunt separate clar pe roluri, astfel încât să poți construi o rutină scurtă sau una completă fără redundanță.',
      closingLabel: 'Ritualul de seară',
      closingTitle: 'Noaptea este momentul în care rutina încetinește.',
      closingText: 'Crema nutritivă de noapte încheie ziua cu o textură bogată, reconfortantă, creată pentru momentul în care nu te mai grăbești nicăieri.',
      closingCta: 'Descoperă ritualul de noapte',
    },
    en: {
      eyebrow: 'Glam Essence · Face rituals',
      title: 'Skin does not ask for perfection. It asks for consistency.',
      intro: 'Eight textures created for different moments of the day — cleansing, balance, treatment, hydration and repair.',
      cta: 'Build the ritual',
      manifesto: ['CLEANSE', 'BALANCE', 'TREAT', 'HYDRATE', 'PROTECT'],
      storyLabel: 'A clear ritual',
      storyTitle: 'Fewer products chosen at random. More logic between steps.',
      storyText: 'A good routine does not need to be long. It needs a gentle beginning, the right treatment and a texture that closes the ritual without weighing skin down.',
      gestures: [
        { number: '01', title: 'Prepare', text: 'Foam and toner remove excess and bring skin to a calm, receptive starting point.' },
        { number: '02', title: 'Concentrate', text: 'Serum, oil and eye care bring targeted textures exactly where you need them.' },
        { number: '03', title: 'Preserve', text: 'Day or night cream seals in comfort and turns the steps into a complete ritual.' },
      ],
      collectionLabel: 'Face care',
      collectionTitle: 'From the first touch of water to the final texture of the evening.',
      collectionText: 'Products are clearly separated by role, so you can build a concise or complete routine without redundancy.',
      closingLabel: 'The evening ritual',
      closingTitle: 'Night is when the routine slows down.',
      closingText: 'The nourishing night cream closes the day with a rich, comforting texture made for the moment when there is nowhere left to rush.',
      closingCta: 'Discover the night ritual',
    },
  },
};

const FaceCare = () => <EditorialCollectionPage config={config} />;

export default FaceCare;
