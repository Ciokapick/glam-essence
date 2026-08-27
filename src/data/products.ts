
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
    name: "parfumuri.floral_extravagance",
    price: 349.99,
    oldPrice: 399.99,
    image: "/products/perfumes/editorial/floral-extravagance.webp",
    gallery: ["/products/perfumes/editorial/floral-extravagance.webp", "/ParfumFloralExtravagance.jpg"],
    category: "parfumuri.floral_category",
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
  "parfum-oriental-mystique": {
    id: "2",
    slug: "parfum-oriental-mystique",
    name: "parfumuri.oriental_mystique",
    price: 399.99,
    image: "/products/perfumes/editorial/oriental-mystique.webp",
    gallery: ["/products/perfumes/editorial/oriental-mystique.webp", "/ParfumOrientalMystique.png"],
    category: "parfumuri.oriental_category",
    isSale: true,
    discount: 10,
    rating: 4,
    reviewCount: 35,
    description: "Un parfum oriental sofisticat, cu note calde de vanilie, mosc și lemn de santal. Perfect pentru serile elegante și ocaziile speciale.",
    details: "Parfum Oriental Mystique este o compoziție bogată și misterioasă, perfectă pentru momentele în care doriți să impresionați. Cu o persistență îndelungată, acest parfum vă va însoți pe tot parcursul serii.",
    features: [
      "Note de vârf: bergamotă, cardamom",
      "Note de mijloc: trandafir, iasomie",
      "Note de bază: mosc, ambră, vanilie",
      "Concentrație: Eau de Parfum",
      "Persistență: 8-10 ore",
      "Fabricat în Franța",
      "Ambalaj de lux"
    ],
    sku: "POM-002",
    stock: 12
  },
  "parfum-fresh-citrus": {
    id: "3",
    slug: "parfum-fresh-citrus",
    name: "parfumuri.fresh_citrus",
    price: 299.99,
    image: "/products/perfumes/editorial/fresh-citrus.webp",
    gallery: ["/products/perfumes/editorial/fresh-citrus.webp", "/ParfumFreshCitrus.png"],
    category: "parfumuri.citrus_category",
    rating: 4,
    reviewCount: 28,
    description: "Un parfum revigorant cu note proaspete de citrice și accente verzi. Perfect pentru utilizarea de zi și pentru zilele călduroase de vară.",
    details: "Parfum Fresh Citrus aduce un val de prospețime în colecția noastră. Note vibrante de citrice combinate cu accente verzi creează o experiență olfactivă revigorantă.",
    features: [
      "Note de vârf: lămâie, lime, grapefruit",
      "Note de mijloc: mentă, busuioc",
      "Note de bază: lemn de cedru, mosc",
      "Concentrație: Eau de Toilette",
      "Persistență: 4-6 ore",
      "Potrivit pentru utilizare zilnică",
      "Ambalaj eco-friendly"
    ],
    sku: "PFC-003",
    stock: 20
  },
  "parfum-woody-elegance": {
    id: "4",
    slug: "parfum-woody-elegance",
    name: "parfumuri.woody_elegance",
    price: 419.99,
    image: "/products/perfumes/editorial/woody-elegance.webp",
    gallery: ["/products/perfumes/editorial/woody-elegance.webp", "/ParfumWoodyElegance.jpg"],
    category: "parfumuri.woody_category",
    rating: 5,
    reviewCount: 31,
    description: "Un parfum lemnos sofisticat cu note calde de santal, cedru și vetiver. Ideal pentru bărbații care apreciază eleganța clasică și rafinamentul.",
    details: "Parfum Woody Elegance este o compoziție rafinată care emană masculinitate și încredere. Notele lemnoase oferă profunzime și caracter acestui parfum de excepție.",
    features: [
      "Note de vârf: bergamotă, piper negru",
      "Note de mijloc: cedru, santal",
      "Note de bază: vetiver, patchouli, ambră",
      "Concentrație: Eau de Parfum",
      "Persistență: 7-9 ore",
      "Fabricat cu ingrediente rare",
      "Sticlă elegantă din sticlă groasă"
    ],
    sku: "PWE-004",
    stock: 8
  },
  "parfum-aquatic-breeze": {
    id: "5",
    slug: "parfum-aquatic-breeze",
    name: "parfumuri.aquatic_breeze",
    price: 329.99,
    image: "/products/perfumes/editorial/aquatic-breeze.webp",
    gallery: ["/products/perfumes/editorial/aquatic-breeze.webp", "/ParfumAquaticBreeze.avif"],
    category: "parfumuri.aquatic_category",
    isSale: true,
    discount: 15,
    rating: 4,
    reviewCount: 22,
    description: "Un parfum acvatic proaspăt care evocă briza mării și aerul curat al coastei. Perfect pentru zilele calde de vară și pentru iubitorii de note marine.",
    details: "Parfum Aquatic Breeze captează esența mării într-o sticlă elegantă. Un parfum proaspăt și revigorant care vă va transporta instantaneu la malul mării.",
    features: [
      "Note de vârf: citrice, mentă",
      "Note de mijloc: note marine, lavandă",
      "Note de bază: musc, ambră",
      "Concentrație: Eau de Toilette",
      "Persistență: 5-7 ore",
      "Inspirat de coastele mediteraneene",
      "Ambalaj premium"
    ],
    sku: "PAB-005",
    stock: 15
  },
  "parfum-spicy-noir": {
    id: "6",
    slug: "parfum-spicy-noir",
    name: "parfumuri.spicy_noir",
    price: 449.99,
    image: "/products/perfumes/editorial/spicy-noir.webp",
    gallery: ["/products/perfumes/editorial/spicy-noir.webp", "/ParfumSpicyNoir.avif"],
    category: "parfumuri.spicy_category",
    isNew: true,
    rating: 5,
    reviewCount: 17,
    description: "Un parfum îndrăzneț și seducător, cu note condimentate și accente orientale. Perfect pentru serile speciale și pentru bărbații care nu se tem să iasă în evidență.",
    details: "Parfum Spicy Noir este un parfum intens și misterios, care combină note condimentate cu accente orientale bogate. Un parfum pentru bărbatul care nu se teme să lase o impresie de neuitat.",
    features: [
      "Note de vârf: piper negru, nucșoară",
      "Note de mijloc: scorțișoară, cuișoare",
      "Note de bază: vanilie, lemn de oud, tabac",
      "Concentrație: Extrait de Parfum",
      "Persistență: 10-12 ore",
      "Fabricat cu ingrediente rare și prețioase",
      "Sticlă de lux cu capac auriu"
    ],
    sku: "PSN-006",
    stock: 10
  },
  "crema-hidratanta-luxury": {
    id: "7",
    slug: "crema-hidratanta-luxury",
    name: "creme.luxury_cream",
    price: 129.99,
    oldPrice: 152.99,
    image: "/products/skincare/editorial/face-cream.webp",
    gallery: ["/products/skincare/editorial/face-cream.webp", "/products/skincare/face-cream.webp"],
    category: "creme.face_category",
    isSale: true,
    discount: 15,
    rating: 4,
    reviewCount: 32,
    description: "products.luxury_cream_desc",
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
    sku: "CHL-007",
    stock: 25
  },
  "crema-contur-ochi-anti-age": {
    id: "8",
    slug: "crema-contur-ochi-anti-age",
    name: "creme.eye_contour_cream",
    price: 149.99,
    image: "/products/skincare/editorial/eye-cream.webp",
    gallery: ["/products/skincare/editorial/eye-cream.webp", "/products/skincare/eye-cream.webp"],
    category: "creme.eye_category",
    rating: 5,
    reviewCount: 24,
    description: "Crema contur ochi Anti-Age combate eficient semnele îmbătrânirii din zona delicată a ochilor. Reduce ridurile, cearcănele și pungile de sub ochi, oferind un aspect mai tânăr și odihnit.",
    details: "O cremă specializată pentru zona delicată din jurul ochilor, formulată pentru a combate ridurile, cearcănele și pungile. Conține peptide, cafeină și extract de ceai verde pentru rezultate vizibile.",
    features: [
      "Reduce ridurile fine și liniile de expresie",
      "Diminuează cearcănele și pungile de sub ochi",
      "Conține peptide pentru stimularea colagenului",
      "Cafeină pentru reducerea pungilor și a cearcănelor",
      "Extract de ceai verde cu proprietăți antioxidante",
      "Textura ușoară, non-grasă",
      "Oftalmologic testată"
    ],
    sku: "COA-008",
    stock: 18
  },
  "crema-de-maini-silk": {
    id: "9",
    slug: "crema-de-maini-silk",
    name: "creme.hands_silk_cream",
    price: 59.99,
    image: "/products/skincare/editorial/hand-cream.webp",
    gallery: ["/products/skincare/editorial/hand-cream.webp", "/products/skincare/hand-cream.webp"],
    category: "creme.hands_category",
    rating: 4,
    reviewCount: 42,
    description: "Crema de mâini Silk oferă hidratare intensă și protecție pentru mâinile uscate și deteriorate. Formula sa bogată, cu unt de shea, ulei de măsline și vitamina E, hrănește și repară pielea, lăsând mâinile moi și catifelate.",
    details: "O cremă luxoasă pentru mâini care hidratează intens și protejează împotriva factorilor externi. Textura sa mătăsoasă se absoarbe rapid, fără a lăsa o senzație grasă.",
    features: [
      "Hidratare intensă și de lungă durată",
      "Unt de shea pentru repararea pielii uscate",
      "Ulei de măsline pentru nutriție",
      "Vitamina E cu proprietăți antioxidante",
      "Parfum delicat și relaxant",
      "Formulă non-grasă, cu absorbție rapidă",
      "Protejează împotriva factorilor externi"
    ],
    sku: "CMS-009",
    stock: 30
  },
  "crema-de-corp-intense": {
    id: "10",
    slug: "crema-de-corp-intense",
    name: "creme.body_intense_cream",
    price: 89.99,
    image: "/products/skincare/editorial/body-cream.webp",
    gallery: ["/products/skincare/editorial/body-cream.webp", "/products/skincare/body-cream.webp"],
    category: "creme.body_category",
    isNew: true,
    rating: 4,
    reviewCount: 29,
    description: "Crema de corp Intense oferă o hidratare profundă și de lungă durată pentru pielea uscată și deshidratată. Formula sa bogată, cu unt de shea, ulei de cocos și vitamina E, hrănește intens pielea, lăsând-o catifelată, elastică și revitalizată.",
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
    sku: "CDC-010",
    stock: 22
  },
  "crema-nutritiva-de-noapte": {
    id: "11",
    slug: "crema-nutritiva-de-noapte",
    name: "creme.night_nourishing_cream",
    price: 139.99,
    image: "/products/skincare/editorial/night-cream.webp",
    gallery: ["/products/skincare/editorial/night-cream.webp", "/products/skincare/night-cream.webp"],
    category: "creme.face_category",
    rating: 5,
    reviewCount: 26,
    description: "Crema nutritivă de noapte hrănește și regenerează pielea în timpul somnului. Formula sa bogată, cu retinol, peptide și uleiuri naturale, stimulează reînnoirea celulară și producția de colagen, pentru un ten mai ferm și mai strălucitor.",
    details: "O cremă de noapte intens nutritivă, dezvoltată pentru a lucra în armonie cu ritmul natural al pielii în timpul somnului. Textura bogată oferă hidratare intensă și nutrienți esențiali pentru regenerarea pielii.",
    features: [
      "Retinol pentru stimularea reînnoirii celulare",
      "Peptide pentru producția de colagen",
      "Uleiuri naturale pentru nutriție",
      "Ceramide pentru refacerea barierei cutanate",
      "Textură bogată și reconfortantă",
      "Parfum relaxant pentru un somn liniștit",
      "Fără parabeni și siliconi"
    ],
    sku: "CNN-011",
    stock: 16
  },
  "crema-anticelulitică": {
    id: "12",
    slug: "crema-anticelulitică",
    name: "creme.anti_cellulite_cream",
    price: 109.99,
    image: "/products/skincare/editorial/body-treatment.webp",
    gallery: ["/products/skincare/editorial/body-treatment.webp", "/products/skincare/body-treatment.webp"],
    category: "creme.body_category",
    isSale: true,
    discount: 10,
    rating: 4,
    reviewCount: 33,
    description: "Crema anticelulitică combate eficient aspectul de coajă de portocală și reduce celulita. Formula sa avansată, cu cafeină, extract de centella asiatica și complex de iod marin, îmbunătățește microcirculația și ajută la eliminarea toxinelor.",
    details: "O cremă specializată pentru combaterea celulitei și îmbunătățirea aspectului pielii. Conține ingrediente active care stimulează microcirculația și ajută la reducerea aspectului de coajă de portocală.",
    features: [
      "Cafeină pentru stimularea microcirculației",
      "Extract de centella asiatica pentru fermitate",
      "Complex de iod marin pentru drenaj limfatic",
      "Reduce aspectul de coajă de portocală",
      "Îmbunătățește elasticitatea pielii",
      "Textura ușoară, cu absorbție rapidă",
      "Rezultate vizibile în 4-6 săptămâni de utilizare"
    ],
    sku: "CAC-012",
    stock: 20
  },
  "ser-facial-radiance": {
    id: "13",
    slug: "ser-facial-radiance",
    name: "creme.facial_serum",
    price: 189.99,
    image: "/products/skincare/editorial/face-serum.webp",
    gallery: ["/products/skincare/editorial/face-serum.webp", "/products/skincare/face-serum.webp"],
    category: "creme.serum_category",
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
    sku: "SFR-013",
    stock: 18
  },
  "masca-faciala-detox": {
    id: "14",
    slug: "masca-faciala-detox",
    name: "creme.facial_detox_mask",
    price: 79.99,
    image: "/products/skincare/editorial/detox-mask.webp",
    gallery: ["/products/skincare/editorial/detox-mask.webp", "/products/skincare/detox-mask.webp"],
    category: "creme.mask_category",
    isNew: true,
    rating: 4,
    reviewCount: 27,
    description: "Masca facială detox purifică profund pielea, eliminând impuritățile și toxinele acumulate. Formula sa bogată în argilă, cărbune activ și extracte botanice, curăță porii, absoarbe excesul de sebum și revigorează tenul.",
    details: "O mască intensă de purificare, ideală pentru tenul gras sau mixt. Conține argilă și cărbune activ pentru a absorbi impuritățile și a decongestiona porii, oferind un ten curat și proaspăt.",
    features: [
      "Argilă Kaolin pentru purificare profundă",
      "Cărbune activ pentru detoxifiere",
      "Extract de hamamelis cu proprietăți astringente",
      "Curăță porii și reduce aspectul acestora",
      "Absoarbe excesul de sebum",
      "Se usucă complet în 10-15 minute",
      "Potrivită pentru utilizare săptămânală"
    ],
    sku: "MFD-014",
    stock: 25
  },
  "spuma-de-curatare": {
    id: "15",
    slug: "spuma-de-curatare",
    name: "creme.cleansing_foam",
    price: 69.99,
    image: "/products/skincare/editorial/cleansing-foam.webp",
    gallery: ["/products/skincare/editorial/cleansing-foam.webp", "/products/skincare/cleansing-foam.webp"],
    category: "creme.cleanser_category",
    rating: 4,
    reviewCount: 35,
    description: "Spuma de curățare îndepărtează eficient machiajul, impuritățile și excesul de sebum, fără a usca sau irita pielea. Formula sa delicată, cu extracte botanice și acid hialuronic, curăță în profunzime, respectând echilibrul natural al pielii.",
    details: "O spumă de curățare blândă dar eficientă, potrivită pentru utilizare zilnică. Curăță în profunzime pielea, îndepărtând impuritățile și machiajul, fără a perturba bariera naturală a pielii.",
    features: [
      "Curățare delicată și eficientă",
      "Îndepărtează machiajul, inclusiv cel rezistent la apă",
      "Acid hialuronic pentru hidratare",
      "Extract de aloe vera pentru calmare",
      "pH echilibrat",
      "Fără sulfați și parabeni",
      "Potrivită pentru toate tipurile de piele"
    ],
    sku: "SDC-015",
    stock: 28
  },
  "tonic-purificator": {
    id: "16",
    slug: "tonic-purificator",
    name: "creme.purifying_toner",
    price: 59.99,
    image: "/products/skincare/editorial/toner.webp",
    gallery: ["/products/skincare/editorial/toner.webp", "/products/skincare/toner.webp"],
    category: "creme.toner_category",
    rating: 4,
    reviewCount: 30,
    description: "Tonicul purificator reechilibrează pH-ul pielii după curățare, reduce aspectul porilor și pregătește tenul pentru absorbția optimă a produselor de îngrijire ulterioare. Formula sa revigorantă, cu extract de hamamelis, acid salicilic și niacinamidă, purifică și calmează pielea, oferind o senzație de prospețime.",
    details: "Un tonic revigorant care completează perfect rutina de curățare. Purifică, tonifiază și reechilibrează pH-ul pielii, lăsând-o curată, proaspătă și pregătită pentru absorbția produselor de îngrijire ulterioare.",
    features: [
      "Extract de hamamelis cu proprietăți astringente",
      "Acid salicilic pentru exfoliere blândă",
      "Niacinamidă pentru reducerea porilor",
      "Panthenol pentru calmare",
      "pH echilibrat",
      "Fără alcool și parfum",
      "Potrivit pentru ten mixt și gras"
    ],
    sku: "TPF-016",
    stock: 22
  },
  "ulei-de-fata-nutritiv": {
    id: "17",
    slug: "ulei-de-fata-nutritiv",
    name: "creme.nourishing_face_oil",
    price: 129.99,
    image: "/products/skincare/editorial/face-oil.webp",
    gallery: ["/products/skincare/editorial/face-oil.webp", "/products/skincare/face-oil.webp"],
    category: "creme.oil_category",
    isSale: true,
    discount: 20,
    rating: 5,
    reviewCount: 29,
    description: "Uleiul de față nutritiv hrănește în profunzime pielea uscată și deshidratată. Formula sa bogată, cu uleiuri prețioase de argan, jojoba și trandafir sălbatic, oferă nutrienți esențiali și antioxidanți puternici, lăsând tenul catifelat, elastic și radiant.",
    details: "Un ulei facial luxos, formulat cu uleiuri prețioase pentru nutriție intensă și protecție antioxidantă. Ușor și non-comedogenic, se absoarbe rapid, oferind hidratare profundă fără a lăsa o senzație grasă.",
    features: [
      "Ulei de argan bogat în vitamina E",
      "Ulei de jojoba similar cu sebumul natural",
      "Ulei de trandafir sălbatic bogat în vitamina C",
      "Omega 3, 6 și 9 pentru regenerare",
      "Textura ușoară, non-comedogenică",
      "Fără parfumuri sintetice",
      "Potrivit pentru ten uscat și matur"
    ],
    sku: "UFN-017",
    stock: 15
  }
};

// Create similar products for recommendations
export const similarProducts = [
  {
    id: "5",
    name: "Parfum Aquatic Breeze",
    price: 329.99,
    image: "/products/perfumes/editorial/aquatic-breeze.webp",
    category: "parfumuri.aquatic_category",
    isSale: true,
    discount: 15,
    rating: 4
  },
  {
    id: "6",
    name: "Parfum Spicy Noir",
    price: 449.99,
    image: "/products/perfumes/editorial/spicy-noir.webp",
    category: "parfumuri.spicy_category",
    isNew: true,
    rating: 5
  },
  {
    id: "7",
    name: "creme.luxury_cream",
    price: 129.99,
    image: "/products/skincare/editorial/face-cream.webp",
    category: "creme.face_category",
    isSale: true,
    discount: 15,
    rating: 4,
    stock: 25
  },
  {
    id: "8",
    name: "creme.body_intense_cream",
    price: 89.99,
    image: "/products/skincare/editorial/body-cream.webp",
    category: "creme.body_category",
    isNew: true,
    rating: 4,
    stock: 22
  }
];
