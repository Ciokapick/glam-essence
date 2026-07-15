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
  'hero.new_title_line1': { en: 'Beauty,', ro: 'Frumusețea,' },
  'hero.new_title_line2': { en: 'Grown by', ro: 'Cultivată de' },
  'hero.new_title_line3': { en: 'the Earth.', ro: 'Pământ.' },
  'hero.new_subtitle': { en: 'Formulated from rare minerals, precious clays, and crystal infusions. Each formula honors the slow power of time, touch, and transformation.', ro: 'Formulate din minerale rare, argile prețioase și infuzii de cristal. Fiecare formulă onorează puterea lentă a timpului, atingerii și transformării.' },
  
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
  'common.product': { en: 'Product', ro: 'Produs' },
  
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
  'products.eye_contour_cream_desc': { en: 'This eye contour cream effectively combats the signs of aging in the delicate eye area. It reduces wrinkles, dark circles and bags under the eyes, providing a younger and rested appearance.', ro: 'Crema contur ochi Anti-Age combate eficient semnele îmbătrânirii din zona delicată a ochilor. Reduce ridurile, cearcănele și pungile de sub ochi, oferind un aspect mai tânăr și odihnit.' },
  
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
  
  // Creme (Creams) page translations
  'creme.title': { en: 'Creams for perfect care', ro: 'Creme pentru îngrijire perfectă' },
  'creme.subtitle': { en: 'Our unique formula offers intensive hydration and protection for all skin types.', ro: 'Formula noastră unică oferă hidratare intensă și protecție pentru toate tipurile de piele.' },
  'creme.discover_collection': { en: 'Discover the Collection', ro: 'Descoperă colecția' },
  'creme.all_creams': { en: 'All Creams', ro: 'Toate cremele' },
  'creme.hydration_solutions': { en: 'Hydration solutions for all needs', ro: 'Soluții de hidratare pentru toate nevoile' },
  'creme.filter': { en: 'Filter', ro: 'Filtrează' },
  'creme.sort': { en: 'Sort', ro: 'Sortează' },
  
  // Product categories for creams
  'creme.face_category': { en: 'Face Cream', ro: 'Cremă față' },
  'creme.eye_category': { en: 'Eye Cream', ro: 'Cremă ochi' },
  'creme.hands_category': { en: 'Hands Cream', ro: 'Cremă mâini' },
  'creme.body_category': { en: 'Body Cream', ro: 'Cremă corp' },
  'creme.oil_category': { en: 'Facial Oil', ro: 'Ulei' },
  'creme.serum_category': { en: 'Serum', ro: 'Ser' },
  'creme.mask_category': { en: 'Mask', ro: 'Mască' },
  'creme.cleanser_category': { en: 'Cleanser', ro: 'Curățare' },
  'creme.toner_category': { en: 'Toner', ro: 'Tonic' },
  
  // Product names for creams
  'creme.luxury_cream': { en: 'Luxury Moisturizing Cream', ro: 'Cremă hidratantă Luxury' },
  'creme.eye_contour_cream': { en: 'Eye Contour Anti-Age Cream', ro: 'Cremă contur ochi Anti-Age' },
  'creme.hands_silk_cream': { en: 'Hands Silk Cream', ro: 'Cremă de mâini Silk' },
  'creme.body_intense_cream': { en: 'Body Intense Cream', ro: 'Cremă de corp Intense' },
  'creme.night_nourishing_cream': { en: 'Night Nourishing Cream', ro: 'Cremă nutritivă de noapte' },
  'creme.anti_cellulite_cream': { en: 'Anti-Cellulite Cream', ro: 'Cremă anticelulitică' },
  'creme.facial_serum': { en: 'Facial Radiance Serum', ro: 'Ser facial Radiance' },
  'creme.facial_detox_mask': { en: 'Facial Detox Mask', ro: 'Mască facială detox' },
  'creme.cleansing_foam': { en: 'Cleansing Foam', ro: 'Spumă de curățare' },
  'creme.purifying_toner': { en: 'Purifying Toner', ro: 'Tonic purificator' },
  'creme.nourishing_face_oil': { en: 'Nourishing Face Oil', ro: 'Ulei de față nutritiv' },
  
  // ProductPage translations
  'product.breadcrumb.home': { en: 'Home', ro: 'Acasă' },
  'product.breadcrumb.perfumes': { en: 'Perfumes', ro: 'Parfumuri' },
  'product.breadcrumb.creams': { en: 'Creams', ro: 'Creme' },
  'product.new_badge': { en: 'New', ro: 'Nou' },
  'product.reviews': { en: 'reviews', ro: 'recenzii' },
  'product.quantity': { en: 'Quantity:', ro: 'Cantitate:' },
  'product.available': { en: 'available', ro: 'disponibile' },
  'product.add_to_cart': { en: 'Add to Cart', ro: 'Adaugă în coș' },
  'product.out_of_stock': { en: 'Out of Stock', ro: 'Stoc epuizat' },
  'product.add_to_wishlist': { en: 'Add to Wishlist', ro: 'Adaugă la favorite' },
  'product.remove_from_wishlist': { en: 'Remove from Wishlist', ro: 'Eliminat de la favorite' },
  'product.share': { en: 'Share', ro: 'Distribuie' },
  'product.free_shipping': { en: 'Free shipping for orders over 300 lei', ro: 'Livrare gratuită pentru comenzi peste 300 lei' },
  'product.shipping_24h': { en: 'Shipping within 24 hours', ro: 'Expediere în 24 de ore' },
  'product.authenticity_warranty': { en: '100% authenticity warranty', ro: 'Garanție de autenticitate 100%' },
  'product.product_details': { en: 'Product Details', ro: 'Detalii produs' },
  'product.features': { en: 'Features', ro: 'Caracteristici' },
  'product.reviews_title': { en: 'Reviews', ro: 'Recenzii' },
  'product.add_review': { en: 'Add a Review', ro: 'Adaugă o recenzie' },
  'product.description': { en: 'Description', ro: 'Descriere' },
  'product.sku': { en: 'SKU:', ro: 'SKU:' },
  'product.category': { en: 'Category:', ro: 'Categoria:' },
  'product.similar_products': { en: 'Similar Products', ro: 'Produse similare' },
  
  // Toast messages
  'toast.added_to_cart': { en: 'Added to cart', ro: 'Adăugat în coș' },
  'toast.added_to_cart_desc': { en: '{productName} has been added to your cart.', ro: '{productName} a fost adăugat în coșul tău.' },
  'toast.removed_from_wishlist': { en: 'Removed from favorites', ro: 'Eliminat de la favorite' },
  'toast.removed_from_wishlist_desc': { en: '{productName} has been removed from your favorites list.', ro: '{productName} a fost eliminat din lista ta de favorite.' },
  'toast.added_to_wishlist': { en: 'Added to favorites', ro: 'Adăugat la favorite' },
  'toast.added_to_wishlist_desc': { en: '{productName} has been added to your favorites list.', ro: '{productName} a fost adăugat la lista ta de favorite.' },
  'toast.out_of_stock': { en: 'Out of stock', ro: 'Stoc epuizat' },
  'toast.out_of_stock_desc': { en: 'Sorry, this product is no longer available in stock.', ro: 'Ne pare rău, acest produs nu mai este disponibil în stoc.' },
  
  // Skincare (Îngrijire) page translations
  'ingrijire.title': { en: 'Award-winning skincare products', ro: 'Produse de îngrijire premiate' },
  'ingrijire.subtitle': { en: 'A complete routine for all the steps needed for perfect and healthy skin.', ro: 'O rutină completă pentru toți pașii necesari unui ten perfect și sănătos.' },
  'ingrijire.discover_collection': { en: 'Discover the Collection', ro: 'Descoperă colecția' },
  'ingrijire.skincare_products': { en: 'Skincare Products', ro: 'Produse de îngrijire' },
  'ingrijire.complete_routine': { en: 'Complete routine for your beauty', ro: 'Rutina completă pentru frumusețea ta' },
  'ingrijire.filter': { en: 'Filter', ro: 'Filtrează' },
  'ingrijire.sort': { en: 'Sort', ro: 'Sortează' },
  
  // Cart translations
  'cart.title': { en: 'Your Cart', ro: 'Coșul tău' },
  'cart.close_cart': { en: 'Close cart', ro: 'Închide coșul' },
  'cart.empty_title': { en: 'Your cart is empty', ro: 'Coșul tău este gol' },
  'cart.empty_subtitle': { en: 'Add products to start shopping', ro: 'Adaugă produse pentru a începe cumpărăturile' },
  'cart.continue_shopping': { en: 'Continue Shopping', ro: 'Continuă cumpărăturile' },
  'cart.subtotal': { en: 'Subtotal', ro: 'Subtotal' },
  'cart.shipping': { en: 'Shipping', ro: 'Transport' },
  'cart.total': { en: 'Total', ro: 'Total' },
  'cart.clear_cart': { en: 'Clear Cart', ro: 'Golește coșul' },
  'cart.checkout': { en: 'Checkout', ro: 'Finalizează comanda' },
  
  // Wishlist translations
  'wishlist.title': { en: 'My Favorites List', ro: 'Lista mea de favorite' },
  'wishlist.subtitle': { en: 'Your favorite products are saved here for easy reference.', ro: 'Produsele tale favorite sunt salvate aici pentru referință ușoară.' },
  'wishlist.favorite_products': { en: 'favorite products', ro: 'produse favorite' },
  'wishlist.clear_list': { en: 'Clear List', ro: 'Șterge lista' },
  'wishlist.empty_title': { en: 'Your favorites list is empty', ro: 'Lista ta de favorite este goală' },
  'wishlist.empty_subtitle': { en: 'Add products to favorites to find them easily later.', ro: 'Adaugă produse la favorite pentru a le putea găsi ușor mai târziu.' },
  'wishlist.continue_shopping': { en: 'Continue Shopping', ro: 'Continuă cumpărăturile' },
  
  // Admin translations
  'admin.login.title': { en: 'Administrator', ro: 'Administrator' },
  'admin.login.subtitle': { en: 'Login to administration panel', ro: 'Autentificare în panoul de administrare' },
  'admin.login.username': { en: 'Username', ro: 'Nume utilizator' },
  'admin.login.password': { en: 'Password', ro: 'Parolă' },
  'admin.login.login': { en: 'Login', ro: 'Autentificare' },
  'admin.login.logging_in': { en: 'Logging in...', ro: 'Autentificare...' },
  'admin.login.back_to_store': { en: 'Back to store', ro: 'Înapoi la magazin' },
  'admin.login.success': { en: 'Login successful', ro: 'Autentificare reușită' },
  'admin.login.welcome': { en: 'Welcome to the administration panel.', ro: 'Bine ai venit în panoul de administrare.' },
  'admin.login.failed': { en: 'Login failed', ro: 'Autentificare eșuată' },
  'admin.login.invalid_credentials': { en: 'Username or password is incorrect.', ro: 'Numele de utilizator sau parola sunt incorecte.' },
  
  // Admin Dashboard
  'admin.dashboard.title': { en: 'Dashboard', ro: 'Dashboard' },
  'admin.dashboard.subtitle': { en: 'Overview of your store', ro: 'Privire generală asupra magazinului tău' },
  'admin.dashboard.orders': { en: 'Orders', ro: 'Comenzi' },
  'admin.dashboard.products': { en: 'Products', ro: 'Produse' },
  'admin.dashboard.revenue': { en: 'Revenue', ro: 'Venituri' },
  'admin.dashboard.view_orders': { en: 'View orders →', ro: 'Vezi comenzile →' },
  'admin.dashboard.view_products': { en: 'View products →', ro: 'Vezi produsele →' },
  'admin.dashboard.recent_orders': { en: 'Recent Orders', ro: 'Comenzi recente' },
  'admin.dashboard.recent_orders_subtitle': { en: 'Last 5 orders placed', ro: 'Ultimele 5 comenzi plasate' },
  'admin.dashboard.no_recent_orders': { en: 'No recent orders.', ro: 'Nu există comenzi recente.' },
  'admin.dashboard.view_all_orders': { en: 'View all orders', ro: 'Vezi toate comenzile' },
  
  // Admin Sidebar
  'admin.sidebar.admin_panel': { en: 'Admin Panel', ro: 'Admin Panel' },
  'admin.sidebar.dashboard': { en: 'Dashboard', ro: 'Dashboard' },
  'admin.sidebar.orders': { en: 'Orders', ro: 'Comenzi' },
  'admin.sidebar.products': { en: 'Products', ro: 'Produse' },
  'admin.sidebar.logout': { en: 'Logout', ro: 'Deconectare' },
  'admin.sidebar.open_menu': { en: 'Open admin menu', ro: 'Deschide meniul admin' },
  'admin.sidebar.hide_menu': { en: 'Hide admin menu', ro: 'Ascunde meniul admin' },
  'admin.sidebar.logout_success': { en: 'Logout successful', ro: 'Deconectare reușită' },
  'admin.sidebar.logout_message': { en: 'You have been logged out of the administration panel.', ro: 'Ai fost deconectat din panoul de administrare.' },
  
  // Admin Products
  'admin.products.title': { en: 'Products', ro: 'Produse' },
  'admin.products.subtitle': { en: 'Manage your store products', ro: 'Gestionează produsele din magazinul tău' },
  'admin.products.add_product': { en: 'Add Product', ro: 'Adaugă produs' },
  'admin.products.add_new_product': { en: 'Add New Product', ro: 'Adaugă produs nou' },
  'admin.products.product_name': { en: 'Product Name', ro: 'Nume produs' },
  'admin.products.price': { en: 'Price (lei)', ro: 'Preț (lei)' },
  'admin.products.category': { en: 'Category', ro: 'Categorie' },
  'admin.products.stock': { en: 'Stock', ro: 'Stoc' },
  'admin.products.image_url': { en: 'Image URL', ro: 'URL Imagine' },
  'admin.products.cancel': { en: 'Cancel', ro: 'Anulează' },
  'admin.products.add': { en: 'Add', ro: 'Adaugă' },
  'admin.products.edit_product': { en: 'Edit Product', ro: 'Editează produs' },
  'admin.products.save': { en: 'Save', ro: 'Salvează' },
  'admin.products.search_products': { en: 'Search products...', ro: 'Caută produse...' },
  'admin.products.image': { en: 'Image', ro: 'Imagine' },
  'admin.products.product_name_header': { en: 'Product Name', ro: 'Nume Produs' },
  'admin.products.category_header': { en: 'Category', ro: 'Categorie' },
  'admin.products.price_header': { en: 'Price', ro: 'Preț' },
  'admin.products.stock_header': { en: 'Stock', ro: 'Stoc' },
  'admin.products.actions': { en: 'Actions', ro: 'Acțiuni' },
  'admin.products.error': { en: 'Error', ro: 'Eroare' },
  'admin.products.all_fields_required': { en: 'All fields are required.', ro: 'Toate câmpurile sunt obligatorii.' },
  'admin.products.success': { en: 'Success', ro: 'Succes' },
  'admin.products.added_success': { en: 'Product added successfully.', ro: 'Produsul a fost adăugat cu succes.' },
  'admin.products.updated_success': { en: 'Product updated successfully.', ro: 'Produsul a fost actualizat cu succes.' },
  'admin.products.deleted_success': { en: 'Product deleted successfully.', ro: 'Produsul a fost șters cu succes.' },
  'admin.products.confirm_delete': { en: 'Are you sure you want to delete this product?', ro: 'Ești sigur că vrei să ștergi acest produs?' },
  'admin.products.stock_updated': { en: 'Stock updated', ro: 'Stoc actualizat' },
  'admin.products.stock_update_message': { en: 'Stock has been updated to {stock} units.', ro: 'Stocul a fost actualizat la {stock} unități.' },
  
  // Admin Orders
  'admin.orders.title': { en: 'Orders', ro: 'Comenzi' },
  'admin.orders.subtitle': { en: 'Manage customer orders ({count} orders)', ro: 'Gestionează comenzile clienților ({count} comenzi)' },
  'admin.orders.refresh': { en: 'Refresh', ro: 'Reîmprospătează' },
  'admin.orders.search_orders': { en: 'Search by ID, name or email...', ro: 'Caută după ID, nume sau email...' },
  'admin.orders.order_id': { en: 'Order ID', ro: 'ID Comandă' },
  'admin.orders.customer': { en: 'Customer', ro: 'Client' },
  'admin.orders.total': { en: 'Total', ro: 'Total' },
  'admin.orders.date': { en: 'Date', ro: 'Data' },
  'admin.orders.status': { en: 'Status', ro: 'Status' },
  'admin.orders.actions': { en: 'Actions', ro: 'Acțiuni' },
  'admin.orders.details': { en: 'Details', ro: 'Detalii' },
  'admin.orders.loading_orders': { en: 'Loading orders...', ro: 'Se încarcă comenzile...' },
  'admin.orders.no_orders': { en: 'No orders to display.', ro: 'Nu există comenzi de afișat.' },
  'admin.orders.error': { en: 'Error', ro: 'Eroare' },
  'admin.orders.load_error': { en: 'Could not load orders. Try again.', ro: 'Nu s-au putut încărca comenzile. Încearcă din nou.' },
  'admin.orders.status_updated': { en: 'Status updated', ro: 'Status actualizat' },
  'admin.orders.status_update_message': { en: 'Order #{orderId} has been marked as {status}.', ro: 'Comanda #{orderId} a fost marcată ca {status}.' },
  'admin.orders.deleted': { en: 'Order deleted', ro: 'Comandă ștearsă' },
  'admin.orders.delete_message': { en: 'Order #{orderId} has been deleted successfully.', ro: 'Comanda #{orderId} a fost ștearsă cu succes.' },
  'admin.orders.confirm_delete': { en: 'Are you sure you want to delete this order?', ro: 'Ești sigur că vrei să ștergi această comandă?' },
  'admin.orders.details_title': { en: 'Order Details #{orderId}', ro: 'Detalii comandă #{orderId}' },
  'admin.orders.customer_info': { en: 'Customer Information', ro: 'Informații client' },
  'admin.orders.name': { en: 'Name:', ro: 'Nume:' },
  'admin.orders.email': { en: 'Email:', ro: 'Email:' },
  'admin.orders.phone': { en: 'Phone:', ro: 'Telefon:' },
  'admin.orders.address': { en: 'Address:', ro: 'Adresă:' },
  'admin.orders.ordered_products': { en: 'Ordered Products', ro: 'Produse comandate' },
  'admin.orders.quantity': { en: 'Qty', ro: 'Cant.' },
  'admin.orders.order_total': { en: 'Order Total:', ro: 'Total comandă:' },
  'admin.orders.update_status': { en: 'Update Status', ro: 'Actualizează status' },
  'admin.orders.pending': { en: 'Pending', ro: 'În așteptare' },
  'admin.orders.processing': { en: 'Processing', ro: 'În procesare' },
  'admin.orders.completed': { en: 'Completed', ro: 'Finalizată' },
  'admin.orders.canceled': { en: 'Canceled', ro: 'Anulată' },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
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
      if (key.includes('.')) console.warn(`Translation missing for key: ${key}`);
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
