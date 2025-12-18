import DatabaseService from '@/services/DatabaseService';
import { Product } from '@/models/Product';
import { Order } from '@/models/Order';
import mongoose from 'mongoose';

// Sample product data with multilingual content
const sampleProducts = [
  {
    slug: 'floral-extravagance-perfume',
    name: {
      en: 'Floral Extravagance Perfume',
      ro: 'Parfum Floral Extravagance'
    },
    description: {
      en: 'An extraordinary floral perfume with notes of rose, jasmine and lily of the valley. Perfect for special occasions and to make a memorable impression.',
      ro: 'Un parfum floral extraordinar cu note de trandafir, iasomie și lăcrămioară. Perfect pentru ocazii speciale și pentru a face o impresie memorabilă.'
    },
    details: {
      en: 'This luxurious fragrance combines the finest floral notes to create an unforgettable scent experience. The top notes of bergamot and lemon provide a fresh opening, while the heart notes of rose, jasmine, and lily of the valley add depth and elegance. The base notes of musk and amber ensure long-lasting wear.',
      ro: 'Această fragranță de lux combină cele mai fine note florale pentru a crea o experiență olfactivă de neuitat. Notele de vârf de bergamotă și lămâie oferă o deschidere fresh, în timp ce notele de mijloc de trandafir, iasomie și lăcrămioară adaugă profunzime și eleganță. Notele de bază de mosc și ambră asigură o persistență îndelungată.'
    },
    price: 299.99,
    stock: 25,
    category: 'perfumes',
    image: '/ParfumFloralExtravagance.jpg',
    gallery: [
      {
        url: '/ParfumFloralExtravagance.jpg',
        alt: {
          en: 'Floral Extravagance Perfume Bottle',
          ro: 'Sticla Parfum Floral Extravagance'
        }
      }
    ],
    rating: 4.8,
    reviewCount: 127,
    isActive: true,
    isFeatured: true,
    tags: ['floral', 'luxury', 'women', 'long-lasting'],
    features: {
      en: [
        'Concentration: Eau de Parfum',
        'Longevity: 8-10 hours',
        'Top notes: bergamot, lemon',
        'Middle notes: rose, jasmine, lily of the valley',
        'Base notes: musk, amber',
        'Ideal for special occasions'
      ],
      ro: [
        'Concentrație: Eau de Parfum',
        'Persistență: 8-10 ore',
        'Note de vârf: bergamotă, lămâie',
        'Note de mijloc: trandafir, iasomie, lăcrămioară',
        'Note de bază: mosc, ambră',
        'Ideal pentru ocazii speciale'
      ]
    },
    metaTitle: {
      en: 'Floral Extravagance Perfume - Premium Luxury Fragrance',
      ro: 'Parfum Floral Extravagance - Fragranță Premium de Lux'
    },
    metaDescription: {
      en: 'Discover Floral Extravagance, a luxury perfume with rose, jasmine and lily of the valley notes. Long-lasting fragrance perfect for special occasions.',
      ro: 'Descoperă Floral Extravagance, un parfum de lux cu note de trandafir, iasomie și lăcrămioară. Fragranță cu persistență îndelungată, perfectă pentru ocazii speciale.'
    }
  },
  {
    slug: 'oriental-mystique-perfume',
    name: {
      en: 'Oriental Mystique Perfume',
      ro: 'Parfum Oriental Mystique'
    },
    description: {
      en: 'An enchanting oriental fragrance with exotic spices, precious woods and warm amber. Captivating and mysterious, perfect for evening wear.',
      ro: 'O fragranță orientală fermecătoare cu condimente exotice, lemnuri prețioase și ambră caldă. Fermecătoare și misterioasă, perfectă pentru purtat seara.'
    },
    details: {
      en: 'This exotic oriental perfume weaves together the most precious ingredients from the East. Opening with saffron and cardamom, it reveals a heart of oud, rose, and jasmine, anchored by a base of sandalwood, amber, and vanilla.',
      ro: 'Acest parfum oriental exotic îmbină cele mai prețioase ingrediente din Orient. Deschizându-se cu șofran și cardamom, dezvăluie o inimă de oud, trandafir și iasomie, ancorată de o bază de santal, ambră și vanilie.'
    },
    price: 399.99,
    stock: 15,
    category: 'perfumes',
    image: '/ParfumOrientalMystique.png',
    gallery: [
      {
        url: '/ParfumOrientalMystique.png',
        alt: {
          en: 'Oriental Mystique Perfume Bottle',
          ro: 'Sticla Parfum Oriental Mystique'
        }
      }
    ],
    rating: 4.9,
    reviewCount: 89,
    isActive: true,
    isFeatured: true,
    tags: ['oriental', 'luxury', 'unisex', 'evening'],
    features: {
      en: [
        'Concentration: Eau de Parfum',
        'Longevity: 10-12 hours',
        'Top notes: saffron, cardamom',
        'Middle notes: oud, rose, jasmine',
        'Base notes: sandalwood, amber, vanilla',
        'Perfect for evening wear'
      ],
      ro: [
        'Concentrație: Eau de Parfum',
        'Persistență: 10-12 ore',
        'Note de vârf: șofran, cardamom',
        'Note de mijloc: oud, trandafir, iasomie',
        'Note de bază: santal, ambră, vanilie',
        'Perfect pentru purtat seara'
      ]
    },
    metaTitle: {
      en: 'Oriental Mystique Perfume - Exotic Luxury Fragrance',
      ro: 'Parfum Oriental Mystique - Fragranță Exotică de Lux'
    },
    metaDescription: {
      en: 'Experience the mystery of Oriental Mystique perfume with exotic spices and precious woods. Captivating fragrance for evening occasions.',
      ro: 'Experimentează misterul parfumului Oriental Mystique cu condimente exotice și lemnuri prețioase. Fragranță fermecătoare pentru ocazii de seară.'
    }
  },
  {
    slug: 'luxury-moisturizing-cream',
    name: {
      en: 'Luxury Moisturizing Cream',
      ro: 'Cremă Hidratantă Luxury'
    },
    description: {
      en: 'Luxury cream with an intensely hydrating formula, enriched with hyaluronic acid and ceramides. Ideal for all skin types, including sensitive skin.',
      ro: 'Cremă de lux cu o formulă intens hidratantă, îmbogățită cu acid hialuronic și ceramide. Ideală pentru toate tipurile de piele, inclusiv cea sensibilă.'
    },
    details: {
      en: 'This premium moisturizing cream provides deep hydration and long-lasting comfort. Formulated with advanced ingredients including hyaluronic acid, ceramides, and botanical extracts, it helps restore the skin\'s natural barrier and maintains optimal moisture levels throughout the day.',
      ro: 'Această cremă hidratantă premium oferă hidratare profundă și confort de lungă durată. Formulată cu ingrediente avansate, inclusiv acid hialuronic, ceramide și extracte botanice, ajută la restabilirea barierei naturale a pielii și menține niveluri optime de hidratare pe parcursul zilei.'
    },
    price: 189.99,
    stock: 40,
    category: 'creams',
    image: '/placeholder.svg',
    gallery: [
      {
        url: '/placeholder.svg',
        alt: {
          en: 'Luxury Moisturizing Cream Jar',
          ro: 'Borcan Cremă Hidratantă Luxury'
        }
      }
    ],
    rating: 4.7,
    reviewCount: 203,
    isActive: true,
    isFeatured: true,
    tags: ['skincare', 'moisturizer', 'anti-aging', 'sensitive-skin'],
    features: {
      en: [
        'Long-lasting intensive hydration',
        'Contains hyaluronic acid and ceramides',
        'Protects the natural skin barrier',
        'Dermatologically tested',
        'Non-greasy, easily absorbed formula',
        'Suitable for all skin types'
      ],
      ro: [
        'Hidratare intensă de lungă durată',
        'Conține acid hialuronic și ceramide',
        'Protejează bariera naturală a pielii',
        'Testată dermatologic',
        'Formulă non-grasă, ușor absorbabilă',
        'Potrivită pentru toate tipurile de piele'
      ]
    },
    metaTitle: {
      en: 'Luxury Moisturizing Cream - Premium Skincare',
      ro: 'Cremă Hidratantă Luxury - Îngrijire Premium'
    },
    metaDescription: {
      en: 'Experience deep hydration with our luxury moisturizing cream. Enriched with hyaluronic acid and ceramides for all skin types.',
      ro: 'Experimentează hidratarea profundă cu crema noastră hidratantă de lux. Îmbogățită cu acid hialuronic și ceramide pentru toate tipurile de piele.'
    }
  },
  {
    slug: 'radiance-facial-serum',
    name: {
      en: 'Radiance Facial Serum',
      ro: 'Ser Facial Radiance'
    },
    description: {
      en: 'Innovative facial serum that brightens the skin, evens skin tone and visibly reduces pigment spots. Visible results after just a few uses.',
      ro: 'Ser facial inovator care iluminează tenul, uniformizează tonul pielii și reduce vizibil petele pigmentare. Rezultate vizibile după doar câteva utilizări.'
    },
    details: {
      en: 'This revolutionary facial serum combines the power of vitamin C, niacinamide, and plant-based brightening agents to deliver visible results. It targets hyperpigmentation, dark spots, and uneven skin tone while providing antioxidant protection against environmental damage.',
      ro: 'Acest ser facial revoluționar combină puterea vitaminei C, niacinamidei și agentilor de iluminare pe bază de plante pentru a oferi rezultate vizibile. Vizează hiperpigmentarea, petele întunecate și tonul neuniform al pielii, oferind în același timp protecție antioxidantă împotriva deteriorării mediului.'
    },
    price: 249.99,
    stock: 30,
    category: 'skincare',
    image: '/placeholder.svg',
    gallery: [
      {
        url: '/placeholder.svg',
        alt: {
          en: 'Radiance Facial Serum Bottle',
          ro: 'Sticla Ser Facial Radiance'
        }
      }
    ],
    rating: 4.8,
    reviewCount: 156,
    isActive: true,
    isFeatured: true,
    tags: ['serum', 'brightening', 'vitamin-c', 'anti-aging'],
    features: {
      en: [
        'Contains stabilized vitamin C',
        'Reduces pigment spots and evens skin tone',
        'Provides luminosity and radiance to the skin',
        'Antioxidant formula, fights free radicals',
        'Light texture, suitable for daily use',
        'Visible results after few applications'
      ],
      ro: [
        'Conține vitamina C stabilizată',
        'Reduce petele pigmentare și uniformizează tonul pielii',
        'Oferă luminozitate și strălucire tenului',
        'Formulă antioxidantă, combate radicalii liberi',
        'Textură ușoară, potrivită pentru utilizare zilnică',
        'Rezultate vizibile după câteva aplicări'
      ]
    },
    metaTitle: {
      en: 'Radiance Facial Serum - Brightening Skincare Treatment',
      ro: 'Ser Facial Radiance - Tratament de Iluminare a Tenului'
    },
    metaDescription: {
      en: 'Brighten and even your skin tone with our radiance facial serum. Powerful vitamin C formula reduces dark spots and pigmentation.',
      ro: 'Iluminează și uniformizează tonul tenului cu serul nostru facial Radiance. Formulă puternică cu vitamina C reduce petele întunecate și pigmentarea.'
    }
  }
];

// Sample order data
const sampleOrders = [
  {
    customer: {
      name: 'Maria Popescu',
      email: 'maria.popescu@email.com',
      phone: '+40 723 456 789',
      address: 'Strada Victoriei 15, București, România'
    },
    items: [
      {
        productId: '1',
        name: 'Floral Extravagance Perfume',
        price: 299.99,
        quantity: 1,
        image: '/ParfumFloralExtravagance.jpg'
      },
      {
        productId: '2',
        name: 'Luxury Moisturizing Cream',
        price: 189.99,
        quantity: 2,
        image: '/placeholder.svg'
      }
    ],
    subtotal: 779.97,
    tax: 0,
    shipping: 0,
    total: 779.97,
    status: 'processing',
    payment: {
      method: 'stripe',
      status: 'paid',
      transactionId: 'txn_123456789',
      paidAt: new Date()
    },
    shippingMethod: 'standard',
    customerNotes: 'Please package carefully'
  },
  {
    customer: {
      name: 'Alexandru Ionescu',
      email: 'alex.ionescu@email.com',
      phone: '+40 734 567 890',
      address: 'Bulevardul Magheru 25, Cluj-Napoca, România'
    },
    items: [
      {
        productId: '3',
        name: 'Oriental Mystique Perfume',
        price: 399.99,
        quantity: 1,
        image: '/ParfumOrientalMystique.png'
      }
    ],
    subtotal: 399.99,
    tax: 0,
    shipping: 0,
    total: 399.99,
    status: 'pending',
    payment: {
      method: 'stripe',
      status: 'pending'
    },
    shippingMethod: 'express'
  }
];

/**
 * Seed the database with sample data
 */
export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Initialize database connection
    await DatabaseService.initialize();
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Product.deleteMany({});
    await Order.deleteMany({});
    
    // Insert sample products
    console.log('📦 Inserting sample products...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);
    
    // Insert sample orders
    console.log('📋 Inserting sample orders...');
    const orders = await Order.insertMany(sampleOrders);
    console.log(`✅ Inserted ${orders.length} orders`);
    
    console.log('🎉 Database seeding completed successfully!');
    
    // Log summary
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    console.log(`📊 Final database status: ${productCount} products, ${orderCount} orders`);
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding script failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;