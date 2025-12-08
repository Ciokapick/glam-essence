import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ro';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: {
    en: string;
    ro: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', ro: 'Acasă' },
  'nav.perfumes': { en: 'Perfumes', ro: 'Parfumuri' },
  'nav.creams': { en: 'Creams', ro: 'Creme' },
  'nav.skincare': { en: 'Skincare', ro: 'Îngrijire' },
  'nav.wishlist': { en: 'Wishlist', ro: 'Favorite' },
  'nav.admin': { en: 'Admin', ro: 'Admin' },
  'nav.cart': { en: 'Cart', ro: 'Coș' },
  
  // Hero section
  'hero.title': { en: 'Discover Your Beauty', ro: 'Descoperă-ți Frumusețea' },
  'hero.subtitle': { en: 'Premium beauty products that enhance your natural radiance', ro: 'Produse de frumusețe premium care îți accentuează strălucirea naturală' },
  'hero.cta': { en: 'Shop Now', ro: 'Cumpără Acum' },
  
  // Categories
  'categories.title': { en: 'Our Categories', ro: 'Categoriile Noastre' },
  'categories.perfumes': { en: 'Luxury Fragrances', ro: 'Parfumuri de Lux' },
  'categories.creams': { en: 'Nourishing Creams', ro: 'Creme Nutritive' },
  'categories.skincare': { en: 'Skincare Essentials', ro: 'Produse Îngrijire' },
  
  // Featured Products
  'featured.title': { en: 'Featured Products', ro: 'Produse Recomandate' },
  'featured.subtitle': { en: 'Discover our most popular beauty essentials', ro: 'Descoperă produsele noastre de frumusețe cele mai populare' },
  
  // Benefits
  'benefits.title': { en: 'Why Choose Glam Essence?', ro: 'De Ce Să Alegi Glam Essence?' },
  'benefits.natural': { en: '100% Natural', ro: '100% Natural' },
  'benefits.natural_desc': { en: 'Made with the finest natural ingredients', ro: 'Realizat cu cele mai fine ingrediente naturale' },
  'benefits.premium': { en: 'Premium Quality', ro: 'Calitate Premium' },
  'benefits.premium_desc': { en: 'Carefully crafted with attention to detail', ro: 'Realizat cu atenție la detalii' },
  'benefits.shipping': { en: 'Free Shipping', ro: 'Transport Gratuit' },
  'benefits.shipping_desc': { en: 'Free delivery on orders over $50', ro: 'Livrare gratuită pentru comenzi peste $50' },
  'benefits.support': { en: '24/7 Support', ro: 'Suport 24/7' },
  'benefits.support_desc': { en: 'Always here to help you', ro: 'Suntem mereu aici să te ajutăm' },
  
  // Testimonials
  'testimonials.title': { en: 'What Our Customers Say', ro: 'Ce Spun Clienții Noștri' },
  'testimonials.subtitle': { en: 'Real reviews from real customers', ro: 'Recenzii reale de la clienți reali' },
  
  // Newsletter
  'newsletter.title': { en: 'Stay Updated', ro: 'Rămâi la Curent' },
  'newsletter.subtitle': { en: 'Subscribe to our newsletter for the latest updates', ro: 'Abonează-te la newsletter-ul nostru pentru ultimele noutăți' },
  'newsletter.placeholder': { en: 'Enter your email address', ro: 'Introduceți adresa de email' },
  'newsletter.button': { en: 'Subscribe', ro: 'Abonează-te' },
  
  // Footer
  'footer.about': { en: 'About Glam Essence', ro: 'Despre Glam Essence' },
  'footer.about_text': { en: 'Your trusted beauty partner, offering premium cosmetics and fragrances.', ro: 'Partenerul tău de încredere în frumusețe, oferind produse cosmetice și parfumuri premium.' },
  'footer.quick_links': { en: 'Quick Links', ro: 'Link-uri Rapide' },
  'footer.contact': { en: 'Contact', ro: 'Contact' },
  'footer.address': { en: '123 Beauty Street, Bucharest, Romania', ro: 'Strada Frumuseții 123, București, România' },
  'footer.phone': { en: '+40 123 456 789', ro: '+40 123 456 789' },
  'footer.email': { en: 'info@glamessence.com', ro: 'info@glamessence.com' },
  'footer.rights': { en: 'All rights reserved.', ro: 'Toate drepturile rezervate.' },
  
  // Common
  'common.loading': { en: 'Loading...', ro: 'Se încarcă...' },
  'common.error': { en: 'Error', ro: 'Eroare' },
  'common.success': { en: 'Success', ro: 'Succes' },
  'common.add_to_cart': { en: 'Add to Cart', ro: 'Adaugă în Coș' },
  'common.buy_now': { en: 'Buy Now', ro: 'Cumpără Acum' },
  'common.view_details': { en: 'View Details', ro: 'Vezi Detalii' },
  'common.price': { en: 'Price', ro: 'Preț' },
  'common.quantity': { en: 'Quantity', ro: 'Cantitate' },
  'common.total': { en: 'Total', ro: 'Total' },
  'common.checkout': { en: 'Checkout', ro: 'Finalizează Comanda' },
  'common.continue_shopping': { en: 'Continue Shopping', ro: 'Continuă Cumpărăturile' },
  'common.empty_cart': { en: 'Your cart is empty', ro: 'Coșul tău este gol' },
  'common.remove': { en: 'Remove', ro: 'Elimină' },
  'common.update': { en: 'Update', ro: 'Actualizează' },
  'common.save': { en: 'Save', ro: 'Salvează' },
  'common.cancel': { en: 'Cancel', ro: 'Anulează' },
  'common.confirm': { en: 'Confirm', ro: 'Confirmă' },
  'common.delete': { en: 'Delete', ro: 'Șterge' },
  'common.edit': { en: 'Edit', ro: 'Editează' },
  'common.search': { en: 'Search', ro: 'Caută' },
  'common.filter': { en: 'Filter', ro: 'Filtrează' },
  'common.sort': { en: 'Sort', ro: 'Sortează' },
  'common.categories': { en: 'Categories', ro: 'Categorii' },
  'common.brands': { en: 'Brands', ro: 'Mărci' },
  'common.price_range': { en: 'Price Range', ro: 'Interval de Preț' },
  
  // Additional Footer translations
  'footer.information': { en: 'Information', ro: 'Informații' },
  'footer.about_us': { en: 'About Us', ro: 'Despre noi' },
  'footer.terms': { en: 'Terms and Conditions', ro: 'Termeni și condiții' },
  'footer.privacy': { en: 'Privacy Policy', ro: 'Politica de confidențialitate' },
  'footer.faq': { en: 'Frequently Asked Questions', ro: 'Întrebări frecvente' },
  'footer.gift_sets': { en: 'Gift Sets', ro: 'Seturi cadou' },
  'footer.bestsellers': { en: 'Bestsellers', ro: 'Bestsellers' },
  
  // Benefits translations
  'benefits.natural_ingredients': { en: 'Natural Ingredients', ro: 'Ingrediente naturale' },
  'benefits.natural_ingredients_desc': { en: 'Products created with organic ingredients for your skin.', ro: 'Produse create cu ingrediente organice, pentru pielea ta.' },
  'benefits.free_delivery': { en: 'Free Delivery', ro: 'Livrare gratuită' },
  'benefits.free_delivery_desc': { en: 'For orders over $50 throughout the country.', ro: 'Pentru comenzi de peste 200 lei în toată România.' },
  'benefits.guaranteed_quality': { en: 'Guaranteed Quality', ro: 'Calitate garantată' },
  'benefits.guaranteed_quality_desc': { en: 'All our products are tested and certified.', ro: 'Toate produsele noastre sunt testate și certificate.' },
  'benefits.special_gifts': { en: 'Special Gifts', ro: 'Cadouri speciale' },
  'benefits.special_gifts_desc': { en: 'With every order you receive samples and surprises.', ro: 'La fiecare comandă primești mostre și surprize.' },
  
  // Categories translations
  'categories.subtitle': { en: 'Explore our varied range of premium products for all your beauty needs.', ro: 'Explorează gama noastră variată de produse premium pentru toate nevoile tale de frumusețe.' },
  'categories.perfumes_desc': { en: 'Essences that tell your story', ro: 'Esențe care spun povestea ta' },
  'categories.creams_desc': { en: 'Deep hydration for your skin', ro: 'Hidratare profundă pentru pielea ta' },
  'categories.skincare_desc': { en: 'Complete routine for radiance', ro: 'Rutina completă pentru strălucire' },
  'categories.explore': { en: 'Explore', ro: 'Explorează' },
  
  // Featured Products translations
  'featured_products.subtitle': { en: 'Discover our selection of premium products designed to enhance your daily beauty routine.', ro: 'Descoperă selecția noastră de produse premium, create pentru a-ți îmbunătăți rutina zilnică de frumusețe.' },
  'featured_products.view_all': { en: 'View All Products', ro: 'Vezi toate produsele' },
  
  // Product names and descriptions
  'products.floral_extravagance': { en: 'Floral Extravagance Perfume', ro: 'Parfum Floral Extravagance' },
  'products.floral_extravagance_desc': { en: 'An extraordinary floral perfume with notes of rose, jasmine and lily of the valley. Perfect for special occasions and to make a memorable impression.', ro: 'Un parfum floral extraordinar cu note de trandafir, iasomie și lăcrămioară. Perfect pentru ocazii speciale și pentru a face o impresie memorabilă.' },
  'products.luxury_cream': { en: 'Luxury Moisturizing Cream', ro: 'Cremă hidratantă Luxury' },
  'products.luxury_cream_desc': { en: 'Luxury cream with an intensely hydrating formula, enriched with hyaluronic acid and ceramides. Ideal for all skin types, including sensitive skin.', ro: 'Cremă de lux cu o formulă intens hidratantă, îmbogățită cu acid hialuronic și ceramide. Ideală pentru toate tipurile de piele, inclusiv cea sensibilă.' },
  'products.radiance_serum': { en: 'Radiance Facial Serum', ro: 'Ser facial Radiance' },
  'products.radiance_serum_desc': { en: 'Innovative facial serum that brightens the skin, evens skin tone and visibly reduces pigment spots. Visible results after just a few uses.', ro: 'Ser facial inovator care iluminează tenul, uniformizează tonul pielii și reduce vizibil petele pigmentare. Rezultate vizibile după doar câteva utilizări.' },
  'products.intense_body_cream': { en: 'Intense Body Cream', ro: 'Cremă de corp Intense' },
  'products.intense_body_cream_desc': { en: 'Luxurious body cream with a rich texture that intensely nourishes the skin. Formula with shea butter and argan oil for deep hydration.', ro: 'Cremă de corp luxuriantă cu o textură bogată ce hrănește intens pielea. Formulă cu unt de shea și ulei de argan pentru o hidratare profundă.' },
  
  // Product features
  'products.top_notes': { en: 'Top notes: bergamot, lemon', ro: 'Note de vârf: bergamotă, lămâie' },
  'products.middle_notes': { en: 'Middle notes: rose, jasmine, lily of the valley', ro: 'Note de mijloc: trandafir, iasomie, lăcrămioară' },
  'products.base_notes': { en: 'Base notes: musk, amber', ro: 'Note de bază: mosc, ambră' },
  'products.concentration': { en: 'Concentration: Eau de Parfum', ro: 'Concentrație: Eau de Parfum' },
  'products.longevity': { en: 'Longevity: 8-10 hours', ro: 'Persistență: 8-10 ore' },
  'products.intensive_hydration': { en: 'Long-lasting intensive hydration', ro: 'Hidratare intensă de lungă durată' },
  'products.non_greasy': { en: 'Non-greasy, easily absorbed formula', ro: 'Formulă non-grasă, ușor absorbabilă' },
  'products.hyaluronic_acid': { en: 'Contains hyaluronic acid and ceramides', ro: 'Conține acid hialuronic și ceramide' },
  'products.skin_barrier': { en: 'Protects the natural skin barrier', ro: 'Protejează bariera naturală a pielii' },
  'products.dermatologically_tested': { en: 'Dermatologically tested', ro: 'Testată dermatologic' },
  'products.stabilized_vitamin_c': { en: 'Contains stabilized vitamin C', ro: 'Conține vitamina C stabilizată' },
  'products.pigment_spots': { en: 'Reduces pigment spots and evens skin tone', ro: 'Reduce petele pigmentare și uniformizează tonul pielii' },
  'products.luminosity': { en: 'Provides luminosity and radiance to the skin', ro: 'Oferă luminozitate și strălucire tenului' },
  'products.antioxidant': { en: 'Antioxidant formula, fights free radicals', ro: 'Formulă antioxidantă, combate radicalii liberi' },
  'products.light_texture': { en: 'Light texture, suitable for daily use', ro: 'Textură ușoară, potrivită pentru utilizare zilnică' },
  'products.dry_skin': { en: 'Intensive hydration for dry skin', ro: 'Hidratare intensivă pentru piele uscată' },
  'products.shea_argan': { en: 'Contains shea butter and argan oil', ro: 'Conține unt de shea și ulei de argan' },
  'products.delicate_fragrance': { en: 'Delicate, long-lasting fragrance', ro: 'Parfum delicat, de lungă durată' },
  'products.quick_absorption': { en: 'Quick absorption, no greasy residue', ro: 'Absorbție rapidă, nu lasă reziduuri grase' },
  'products.premium_packaging': { en: 'Premium, reusable packaging', ro: 'Ambalaj premium, reutilizabil' },
  
  // Testimonials translations
  'testimonials.maria_text': { en: "Since using GlamEssence products, my skin has never looked more radiant. Their perfumes are absolutely divine and last all day.", ro: "De când folosesc produsele GlamEssence, pielea mea arată mai strălucitoare ca niciodată. Parfumurile lor sunt absolut divine, durează întreaga zi." },
  'testimonials.alex_text': { en: "I received the skincare set as a gift and it was love at first use. The natural ingredients make a visible difference for my sensitive skin.", ro: "Am primit setul de îngrijire ca dar și a fost dragoste la prima utilizare. Ingredientele naturale fac o diferență vizibilă pentru tenul meu sensibil." },
  'testimonials.cristina_text': { en: "Their perfumes are unique and memorable. Every time I wear Floral Extravagance I get compliments. Exceptional quality!", ro: "Parfumurile lor sunt unice și memorabile. De fiecare dată când port Floral Extravagance primesc complimente. Calitate excepțională!" },
  'testimonials.maria_role': { en: 'Make-up Artist', ro: 'Make-up Artist' },
  'testimonials.alex_role': { en: 'Influencer', ro: 'Influencer' },
  'testimonials.cristina_role': { en: 'Designer', ro: 'Designer' },
  'testimonials.subtitle_extended': { en: 'Discover the authentic experiences of our customers with GlamEssence products.', ro: 'Descoperă experiențele autentice ale clienților noștri cu produsele GlamEssence.' },
  
  // Newsletter translations
  'newsletter.email_placeholder': { en: 'Your email address', ro: 'Adresa ta de email' },
  'newsletter.terms_text': { en: 'By subscribing, you agree to our', ro: 'Prin abonare, ești de acord cu' },
  'newsletter.terms_link': { en: 'Terms and Conditions', ro: 'Termenii și Condițiile' },
  
  // Additional translations for newsletter subtitle
  'newsletter.subtitle_extended': { en: 'Be the first to know about new collections, exclusive offers and beauty tips.', ro: 'Fii prima persoană care află despre noile colecții, oferte exclusive și sfaturi de frumusețe.' },
  
  // About page translations
  'about.title': { en: 'About Us', ro: 'Despre Noi' },
  'about.welcome': { en: 'Welcome to our story! We are a premium cosmetics brand dedicated to beauty and personal care through high-quality products.', ro: 'Bine ați venit la povestea noastră! Suntem un brand de cosmetice premium care se dedică frumuseții și îngrijirii personale prin produse de înaltă calitate.' },
  'about.mission_title': { en: 'Our Mission', ro: 'Misiunea Noastră' },
  'about.mission': { en: 'We aim to offer cosmetic products that not only look good, but also do good. Our mission is to blend science with natural ingredients to create effective and safe formulas.', ro: 'Ne-am propus să oferim produse cosmetice care nu doar că arată bine, ci fac și bine. Misiunea noastră este să îmbinăm știința cu ingredientele naturale pentru a crea formule eficiente și sigure.' },
  'about.values_title': { en: 'Our Values', ro: 'Valorile Noastre' },
  'about.values.quality': { en: 'Uncompromising quality in every product', ro: 'Calitate fără compromis în fiecare produs' },
  'about.values.transparency': { en: 'Transparency and honesty in everything we do', ro: 'Transparență și onestitate în tot ceea ce facem' },
  'about.values.nature': { en: 'Respect for nature and the environment', ro: 'Respect față de natură și mediul înconjurător' },
  'about.values.innovation': { en: 'Constant innovation and ongoing research', ro: 'Inovație constantă și cercetare continuă' },
  'about.values.responsibility': { en: 'Social responsibility and sustainability', ro: 'Responsabilitate socială și sustenabilitate' },
  'about.story_title': { en: 'Our Story', ro: 'Povestea Noastră' },
  'about.story_part1': { en: 'It all started in 2015, when our founder, passionate about cosmetics and personal care, decided to create an alternative to conventional products. Inspired by ancient traditions and combining them with modern technologies, she created a line of products that has evolved into what is today our brand.', ro: 'Totul a început în anul 2015, când fondatoarea noastră, pasionată de cosmetice și îngrijire personală, a decis să creeze o alternativă la produsele convenționale. Inspirată de tradiții vechi și îmbinându-le cu tehnologii moderne, a creat o linie de produse care a evoluat în ceea ce este astăzi brandul nostru.' },
  'about.story_part2': { en: 'Over the years, we have expanded our product range, but have remained faithful to our initial values: quality ingredients, effective formulas and a positive impact on our customers and the environment.', ro: 'De-a lungul anilor, ne-am extins gama de produse, dar am rămas fideli valorilor noastre inițiale: ingrediente de calitate, formule eficiente și un impact pozitiv asupra clienților noștri și a mediului.' },
  
  // Contact page translations
  'contact.title': { en: 'Contact Us', ro: 'Contactează-ne' },
  'contact.info_title': { en: 'Contact Information', ro: 'Informații de contact' },
  'contact.address': { en: 'Address:', ro: 'Adresa:' },
  'contact.address_value': { en: 'Example Street, No. 123, Bucharest', ro: 'Strada Exemplu, Nr. 123, București' },
  'contact.phone': { en: 'Phone:', ro: 'Telefon:' },
  'contact.email': { en: 'Email:', ro: 'Email:' },
  'contact.schedule': { en: 'Schedule:', ro: 'Program:' },
  'contact.weekdays': { en: 'Monday - Friday: 9:00 - 18:00', ro: 'Luni - Vineri: 9:00 - 18:00' },
  'contact.saturday': { en: 'Saturday: 10:00 - 14:00', ro: 'Sâmbătă: 10:00 - 14:00' },
  'contact.sunday': { en: 'Sunday: Closed', ro: 'Duminică: Închis' },
  'contact.form_title': { en: 'Send us a message', ro: 'Trimite-ne un mesaj' },
  'contact.name_placeholder': { en: 'Your name', ro: 'Numele tău' },
  'contact.email_placeholder': { en: 'Your email', ro: 'Email-ul tău' },
  'contact.subject_placeholder': { en: 'Subject', ro: 'Subiect' },
  'contact.message_placeholder': { en: 'Your message', ro: 'Mesajul tău' },
  'contact.send_button': { en: 'Send message', ro: 'Trimite mesaj' },
  'contact.message_sent_title': { en: 'Message sent', ro: 'Mesaj trimis' },
  'contact.message_sent_desc': { en: 'Thank you for your message. We will get back to you as soon as possible.', ro: 'Vă mulțumim pentru mesaj. Vom reveni cu un răspuns în cel mai scurt timp.' },
  
  // Parfumuri (Perfumes) page translations
  'parfumuri.title': { en: 'Exceptional Perfumes', ro: 'Parfumuri excepționale' },
  'parfumuri.subtitle': { en: 'Essences that inspire you, perfumes that define your personality and accompany you throughout the day.', ro: 'Esențe care te inspiră, parfumuri care îți definesc personalitatea și te însoțesc pe parcursul zilei.' },
  'parfumuri.discover_collection': { en: 'Discover the Collection', ro: 'Descoperă colecția' },
  'parfumuri.all_perfumes': { en: 'All Perfumes', ro: 'Toate parfumurile' },
  'parfumuri.find_perfect': { en: 'Find the perfect perfume for you', ro: 'Găsește parfumul perfect pentru tine' },
  'parfumuri.filter': { en: 'Filter', ro: 'Filtrează' },
  'parfumuri.sort': { en: 'Sort', ro: 'Sortează' },
  
  // Product names for parfumuri page
  'parfumuri.floral_extravagance': { en: 'Floral Extravagance Perfume', ro: 'Parfum Floral Extravagance' },
  'parfumuri.oriental_mystique': { en: 'Oriental Mystique Perfume', ro: 'Parfum Oriental Mystique' },
  'parfumuri.fresh_citrus': { en: 'Fresh Citrus Perfume', ro: 'Parfum Fresh Citrus' },
  'parfumuri.woody_elegance': { en: 'Woody Elegance Perfume', ro: 'Parfum Woody Elegance' },
  'parfumuri.aquatic_breeze': { en: 'Aquatic Breeze Perfume', ro: 'Parfum Aquatic Breeze' },
  'parfumuri.spicy_noir': { en: 'Spicy Noir Perfume', ro: 'Parfum Spicy Noir' },
  
  // Product categories
  'parfumuri.floral_category': { en: 'Floral Perfume', ro: 'Parfum Floral' },
  'parfumuri.oriental_category': { en: 'Oriental Perfume', ro: 'Parfum Oriental' },
  'parfumuri.citrus_category': { en: 'Citrus Perfume', ro: 'Parfum Citric' },
  'parfumuri.woody_category': { en: 'Woody Perfume', ro: 'Parfum Lemnos' },
  'parfumuri.aquatic_category': { en: 'Aquatic Perfume', ro: 'Parfum Acvatic' },
  'parfumuri.spicy_category': { en: 'Spicy Perfume', ro: 'Parfum Condimentat' },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to Romanian
    const saved = localStorage.getItem('language') as Language;
    return saved || 'ro';
  });

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
    
    // Update document language
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}