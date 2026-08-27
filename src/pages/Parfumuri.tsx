import EditorialCollectionPage, { type EditorialCollectionConfig } from '@/components/EditorialCollectionPage';
import { products } from '@/data/products';

const perfumeProducts = Object.values(products).filter((product) => product.category.startsWith('parfumuri.'));

const config: EditorialCollectionConfig = {
  theme: 'perfume',
  products: perfumeProducts,
  collectionId: 'perfume-collection',
  heroImage: '/products/perfumes/editorial/oriental-mystique.webp',
  heroImageAlt: 'Oriental Mystique în universul său nocturn',
  floatingImage: '/products/perfumes/editorial/fresh-citrus.webp',
  floatingImageAlt: 'Fresh Citrus în lumină solară',
  closingImage: '/products/perfumes/editorial/spicy-noir.webp',
  closingImageAlt: 'Spicy Noir, parfumul serilor târzii',
  closingHref: '/product/parfum-spicy-noir',
  copy: {
    ro: {
      eyebrow: 'Glam Essence · Atlas olfactiv',
      title: 'Parfumul intră în încăpere înaintea ta.',
      intro: 'Șase compoziții, fiecare construită ca un univers complet — de la transparența citrică la profunzimea condimentelor întunecate.',
      cta: 'Alege-ți prezența',
      manifesto: ['FLORAL', 'ORIENTAL', 'CITRIC', 'LEMNOS', 'ACVATIC', 'CONDIMENTAT'],
      storyLabel: 'Cum alegi un parfum',
      storyTitle: 'Nu porni de la note. Pornește de la starea pe care vrei să o lași în urmă.',
      storyText: 'Un parfum bun nu este doar plăcut. Are temperatură, ritm și o anumită distanță față de piele. Colecția noastră trece de la compoziții luminoase și apropiate la prezențe dense, create pentru seară.',
      gestures: [
        { number: '01', title: 'Lumina', text: 'Citric și acvatic pentru zile deschise, dimineți rapide și o prezență care respiră.' },
        { number: '02', title: 'Textura', text: 'Floral și oriental când vrei profunzime, detaliu și o evoluție lentă pe piele.' },
        { number: '03', title: 'Umbra', text: 'Lemnos și condimentat pentru seri târzii, contrast și o amprentă care rămâne.' },
      ],
      collectionLabel: 'Colecția completă',
      collectionTitle: 'Șase personalități. Nicio alegere generică.',
      collectionText: 'Explorează fiecare lume vizuală și deschide produsul pentru note, persistență și povestea completă a compoziției.',
      closingLabel: 'După lăsarea serii',
      closingTitle: 'Unele parfumuri nu cer atenție. O schimbă.',
      closingText: 'Spicy Noir unește condimente calde, lemn întunecat și o urmă de vanilie într-o compoziție construită pentru noapte.',
      closingCta: 'Descoperă Spicy Noir',
    },
    en: {
      eyebrow: 'Glam Essence · Fragrance atlas',
      title: 'Fragrance enters the room before you do.',
      intro: 'Six compositions, each built as a complete world — from citrus transparency to the depth of dark spices.',
      cta: 'Choose your presence',
      manifesto: ['FLORAL', 'ORIENTAL', 'CITRUS', 'WOODY', 'AQUATIC', 'SPICY'],
      storyLabel: 'How to choose a fragrance',
      storyTitle: 'Do not begin with notes. Begin with the feeling you want to leave behind.',
      storyText: 'A beautiful fragrance is more than pleasant. It has temperature, rhythm and a certain distance from skin. Our collection moves from bright, intimate compositions to dense presences made for evening.',
      gestures: [
        { number: '01', title: 'The light', text: 'Citrus and aquatic for open days, fast mornings and a presence that breathes.' },
        { number: '02', title: 'The texture', text: 'Floral and oriental when you want depth, detail and a slow evolution on skin.' },
        { number: '03', title: 'The shadow', text: 'Woody and spicy for late evenings, contrast and a signature that lingers.' },
      ],
      collectionLabel: 'The complete collection',
      collectionTitle: 'Six personalities. Nothing generic.',
      collectionText: 'Explore each visual world and open a product to discover its notes, longevity and full composition story.',
      closingLabel: 'After dark',
      closingTitle: 'Some fragrances do not ask for attention. They change it.',
      closingText: 'Spicy Noir brings warm spices, dark woods and a trace of vanilla into a composition created for the night.',
      closingCta: 'Discover Spicy Noir',
    },
  },
};

const Parfumuri = () => <EditorialCollectionPage config={config} />;

export default Parfumuri;
