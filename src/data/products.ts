
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
  "parfum-oriental-mystique": {
    id: "2",
    slug: "parfum-oriental-mystique",
    name: "Parfum Oriental Mystique",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595425970377-75accd411a5a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1615526675651-91ee6f2e35b7?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Parfum Oriental",
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
    name: "Parfum Fresh Citrus",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611414129830-44e5563c0091?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588618575327-95834477028b?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Parfum Citric",
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
    name: "Parfum Woody Elegance",
    price: 419.99,
    image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594033677177-39908202d630?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551446339-5501f611e9a8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566150308864-39049370d85e?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Parfum Lemnos",
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
    name: "Parfum Aquatic Breeze",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576073719676-aa95576db207?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531022493105-969fe1d18187?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578996834254-13d1b661a5ed?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Parfum Acvatic",
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
    name: "Parfum Spicy Noir",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591375782226-461d9a617541?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1575330933415-cea1e7ce53eb?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558730174-cc150ae8949f?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Parfum Condimentat",
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
    category: "Cremă față",
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
    sku: "CHL-007",
    stock: 25
  },
  "crema-contur-ochi-anti-age": {
    id: "8",
    slug: "crema-contur-ochi-anti-age",
    name: "Cremă contur ochi Anti-Age",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591019052241-e4d95a5dc3fc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1607602132700-068258431c6c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Cremă ochi",
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
    name: "Cremă de mâini Silk",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604417589065-0bf5a8c1cf8a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584949514486-e41a89cc8c5f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1614622823813-5ea94ae8e71c?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Cremă mâini",
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
    name: "Cremă de corp Intense",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598454444466-9e698fe928f2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601049413574-272fdde8203e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Cremă corp",
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
    name: "Cremă nutritivă de noapte",
    price: 139.99,
    image: "https://plus.unsplash.com/premium_photo-1661520861264-f1ece30dbfbf?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://plus.unsplash.com/premium_photo-1661520861264-f1ece30dbfbf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573575154902-f3865f297edf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1629198735626-2aa3500e9321?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Cremă față",
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
    name: "Cremă anticelulitică",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582056509381-33c1ce732b2a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4abbd90?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Cremă corp",
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
    name: "Ser facial Radiance",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1619451427882-6aaaded0cc61?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1619451427882-6aaaded0cc61?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546552356-3fae876a61ca?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4abbd90?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Ser",
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
    name: "Mască facială detox",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4abbd90?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Mască",
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
    name: "Spumă de curățare",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1597354984706-fac992d9306f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Curățare",
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
    name: "Tonic purificator",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248516420-0a337a5f1587?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Tonic",
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
    name: "Ulei de față nutritiv",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605637465697-e8a9f2511816?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248533428-7c51fe77be21?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618330834871-dd22122b59e4?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Ulei",
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
  },
  "crema-nutritiva-de-noapte-ingrjire": {
    id: "18",
    slug: "crema-nutritiva-de-noapte-ingrjire",
    name: "Cremă nutritivă de noapte",
    price: 89.99,
    image: "https://plus.unsplash.com/premium_photo-1661520861264-f1ece30dbfbf?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://plus.unsplash.com/premium_photo-1661520861264-f1ece30dbfbf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573575154902-f3865f297edf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1629198735626-2aa3500e9321?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Cremă",
    rating: 4,
    reviewCount: 22,
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
    sku: "CNN-018",
    stock: 18
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
