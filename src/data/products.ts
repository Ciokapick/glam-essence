
export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  gallery: string[];
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
  discount?: number;
  description: string;
  details: string;
  features: string[];
  sku: string;
  stock: number;
}

export const products: { [key: string]: Product } = {
  "parfum-floral-extravagance": {
    id: "1",
    slug: "parfum-floral-extravagance",
    name: "Parfum Floral Extravagance",
    price: 349.99,
    oldPrice: 399.99,
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Parfum",
    isNew: true,
    rating: 5,
    reviewCount: 47,
    description: "Parfumul Floral Extravagance este o capodoperă olfactivă ce combină note florale prețioase cu accente orientale subtile. Un parfum sofisticat și elegant, perfect pentru ocazii speciale sau pentru utilizare zilnică atunci când doriți să ieșiți în evidență. Persistența îndelungată și siajul remarcabil vă vor înconjura într-un văl de rafinament pe tot parcursul zilei.",
    details: "Un parfum floral elegant cu note de vârf de trandafir de Damasc și iasomie, urmate de note de mijloc de iris și ylang-ylang. Bazele calde de mosc, ambră și vanilie oferă profunzime și persistență parfumului.",
    features: [
      "Note de vârf: Trandafir de Damasc, Iasomie",
      "Note de mijloc: Iris, Ylang-Ylang",
      "Note de bază: Mosc, Ambră, Vanilie",
      "Concentrație: Parfum (25%)",
      "Persistență îndelungată: 8-10 ore",
      "Fabricat în Franța",
      "Ingrediente de cea mai înaltă calitate"
    ],
    sku: "PFE-001",
    stock: 15
  },
  "crema-hidratanta-luxury": {
    id: "2",
    slug: "crema-hidratanta-luxury",
    name: "Cremă hidratantă Luxury",
    price: 129.99,
    oldPrice: 152.99,
    image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590393802688-ab3fd5499aae?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578083881005-040fc7572338?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Cremă",
    isSale: true,
    discount: 15,
    rating: 4,
    reviewCount: 32,
    description: "Crema hidratantă Luxury oferă o hidratare intensă și de lungă durată pentru tenul uscat și deshidratat. Formula sa bogată, îmbogățită cu acid hialuronic, ceramide și extracte botanice, ajută la refacerea barierei naturale a pielii, oferind un aspect neted, catifelat și strălucitor.",
    details: "O cremă luxoasă formulată cu ingrediente premium pentru hidratare intensă. Conține acid hialuronic, ceramide, ulei de argan și extracte botanice care hrănesc și revigorează pielea. Textura ușoară se absoarbe rapid, lăsând pielea catifelată și strălucitoare.",
    features: [
      "Hidratare intensă de lungă durată",
      "Formula îmbogățită cu acid hialuronic",
      "Conține ceramide pentru refacerea barierei pielii",
      "Ulei de argan pentru nutriție",
      "Fără parabeni și sulfați",
      "Potrivită pentru ten uscat și deshidratat",
      "Testată dermatologic"
    ],
    sku: "CHL-002",
    stock: 25
  },
  "ser-facial-radiance": {
    id: "3",
    slug: "ser-facial-radiance",
    name: "Ser facial Radiance",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546552356-3fae876a61ca?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4abbd90?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Îngrijire",
    rating: 5,
    reviewCount: 41,
    description: "Serul facial Radiance este un tratament concentrat care iluminează și uniformizează tenul, reducând aspectul petelor pigmentare și oferind un ten radiant. Formula sa bogată în vitamina C, acid glicolic și extract de arbore de ceai luptă împotriva semnelor de îmbătrânire, stimulând producția de colagen și oferind un aspect întinerit.",
    details: "Un ser concentrat pentru strălucire și uniformizarea tenului. Conține 15% vitamina C stabilizată, acid glicolic și extract de arbore de ceai pentru a combate hiperpigmentarea, ridurile fine și pierderea elasticității pielii.",
    features: [
      "15% Vitamina C stabilizată",
      "Acid glicolic pentru exfoliere blândă",
      "Extract de arbore de ceai cu proprietăți antioxidante",
      "Reduce aspectul petelor pigmentare",
      "Stimulează producția de colagen",
      "Textură ușoară, non-grasă",
      "Fără parfum și alcool"
    ],
    sku: "SFR-003",
    stock: 18
  },
  "crema-de-corp-intense": {
    id: "4",
    slug: "crema-de-corp-intense",
    name: "Cremă de corp Intense",
    price: 399.99,
    oldPrice: 449.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598454444466-9e698fe928f2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601049413574-272fdde8203e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Cremă",
    isSale: true,
    discount: 10,
    rating: 4,
    reviewCount: 29,
    description: "Crema de corp Intense oferă o hidratare profundă și de lungă durată pentru pielea uscată și deshidratată. Formula sa bogată, cu unt de shea, ulei de cocos și vitamina E, hrănește intens pielea, lăsând-o catifelată, elastică și revitalizată. Parfumul delicat și textura cremoasă transformă aplicarea într-o experiență senzorială plăcută.",
    details: "O cremă luxoasă pentru hidratarea intensă a întregului corp. Conține unt de shea, ulei de cocos și vitamina E pentru nutriție și protecție. Textura bogată și cremoasă se absoarbe rapid, oferind o senzație de confort și hidratare de lungă durată.",
    features: [
      "Hidratare intensă pentru 48 de ore",
      "Unt de shea organic pentru nutriție",
      "Ulei de cocos pentru catifelare",
      "Vitamina E cu proprietăți antioxidante",
      "Parfum delicat și relaxant",
      "Fără parabeni și siliconi",
      "Potrivită pentru toate tipurile de piele"
    ],
    sku: "CDC-004",
    stock: 22
  }
};

// Create similar products for recommendations
export const similarProducts = [
  {
    id: "5",
    name: "Parfum Oriental Mystique",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Parfum Oriental",
    isSale: true,
    discount: 10,
    rating: 4
  },
  {
    id: "6",
    name: "Parfum Fresh Citrus",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Parfum Citric",
    rating: 4
  },
  {
    id: "7",
    name: "Parfum Spicy Noir",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Parfum Condimentat",
    isNew: true,
    rating: 5
  },
  {
    id: "8",
    name: "Parfum Woody Elegance",
    price: 419.99,
    image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Parfum Lemnos",
    rating: 5
  }
];
