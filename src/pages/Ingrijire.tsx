import EditorialCollectionPage, { type EditorialCollectionConfig } from '@/components/EditorialCollectionPage';
import { products } from '@/data/products';

const BODY_CARE_SLUGS = [
  'crema-de-maini-silk',
  'crema-de-corp-intense',
  'crema-anticelulitică',
] as const;

const bodyProducts = BODY_CARE_SLUGS.map((slug) => products[slug]);

const config: EditorialCollectionConfig = {
  theme: 'body',
  products: bodyProducts,
  collectionId: 'body-collection',
  heroImage: '/products/skincare/campaign/body-cream.webp',
  heroImageAlt: 'Crema de corp Intense într-un decor cald și tactil',
  floatingImage: '/products/skincare/campaign/hand-cream.webp',
  floatingImageAlt: 'Crema de mâini Silk pe texturi naturale',
  closingImage: '/products/skincare/campaign/body-treatment.webp',
  closingImageAlt: 'Tratamentul pentru corp în univers mineral',
  closingHref: '/product/crema-anticelulitică',
  copy: {
    ro: {
      eyebrow: 'Glam Essence · Îngrijirea corpului',
      title: 'Un ritual care nu se oprește la linia maxilarului.',
      intro: 'Texturi bogate, gesturi lente și câteva minute în care îngrijirea corpului devine parte din starea ta, nu încă o obligație.',
      cta: 'Încetinește ritmul',
      manifesto: ['CATIFELARE', 'CONFORT', 'MASAJ', 'TEXTURĂ', 'PREZENȚĂ'],
      storyLabel: 'Dincolo de rutină',
      storyTitle: 'Corpul simte diferența dintre un pas făcut repede și un gest făcut cu atenție.',
      storyText: 'Am păstrat colecția intenționat concentrată: o textură pentru mâini, una pentru confortul întregului corp și un tratament dedicat masajului.',
      gestures: [
        { number: '01', title: 'Mâinile', text: 'Primul gest al zilei și cel mai ușor de repetat — o textură care intră repede în piele.' },
        { number: '02', title: 'Corpul', text: 'O cremă generoasă pentru după duș, când pielea este încă ușor umedă și receptivă.' },
        { number: '03', title: 'Masajul', text: 'Un tratament aplicat lent, prin mișcări ferme, acolo unde corpul cere mai multă atenție.' },
      ],
      collectionLabel: 'Colecția pentru corp',
      collectionTitle: 'Trei produse. Trei gesturi care chiar au loc în viața reală.',
      collectionText: 'Fără o listă artificial de lungă: doar texturi distincte, cu roluri clare și universuri vizuale proprii.',
      closingLabel: 'Timp pentru tine',
      closingTitle: 'Masajul schimbă produsul într-o experiență.',
      closingText: 'Tratamentul pentru corp este construit în jurul mișcării, texturii și acelui moment rar în care încetinești intenționat.',
      closingCta: 'Descoperă tratamentul',
    },
    en: {
      eyebrow: 'Glam Essence · Body care',
      title: 'A ritual that does not stop at the jawline.',
      intro: 'Rich textures, slower gestures and a few minutes in which body care becomes part of your mood, not another obligation.',
      cta: 'Slow the rhythm',
      manifesto: ['SOFTNESS', 'COMFORT', 'MASSAGE', 'TEXTURE', 'PRESENCE'],
      storyLabel: 'Beyond routine',
      storyTitle: 'The body feels the difference between a rushed step and a gesture made with attention.',
      storyText: 'We kept the collection intentionally focused: one texture for hands, one for full-body comfort and one treatment dedicated to massage.',
      gestures: [
        { number: '01', title: 'The hands', text: 'The first gesture of the day and the easiest to repeat — a texture that absorbs quickly.' },
        { number: '02', title: 'The body', text: 'A generous cream for after the shower, while skin is still slightly damp and receptive.' },
        { number: '03', title: 'The massage', text: 'A treatment applied slowly, with deliberate movement, wherever the body asks for more attention.' },
      ],
      collectionLabel: 'The body collection',
      collectionTitle: 'Three products. Three gestures that fit real life.',
      collectionText: 'No artificially long list: only distinct textures with clear roles and visual worlds of their own.',
      closingLabel: 'Time for yourself',
      closingTitle: 'Massage turns the product into an experience.',
      closingText: 'The body treatment is built around movement, texture and that rare moment when you intentionally slow down.',
      closingCta: 'Discover the treatment',
    },
  },
};

const BodyCare = () => <EditorialCollectionPage config={config} />;

export default BodyCare;
