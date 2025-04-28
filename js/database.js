
/**
 * Simple JSON database utility functions for local storage
 */

// Get data from localStorage
const getFromDb = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  if (!storedData) return defaultValue;
  
  try {
    return JSON.parse(storedData);
  } catch (e) {
    console.error(`Error parsing data from localStorage for key: ${key}`, e);
    return defaultValue;
  }
};

// Save data to localStorage
const saveToDb = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Data saved successfully for key: ${key}`);
  } catch (e) {
    console.error(`Error saving data to localStorage for key: ${key}`, e);
  }
};

// Database initialization
const initializeDb = () => {
  initializeProducts();
};

// Initialize products database on application start
const initializeProducts = () => {
  const storedProducts = getFromDb('products', {});
  
  // Only initialize if we don't have products stored yet
  if (Object.keys(storedProducts).length === 0) {
    const products = {
      'parfum-floral-extravagance': {
        id: '1',
        name: 'Parfum Floral Extravagance',
        description: 'Un parfum floral cu note de iasomie și trandafir, perfect pentru ocazii speciale.',
        price: 350,
        category: 'parfumuri',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600',
        slug: 'parfum-floral-extravagance',
        isNew: true
      },
      'parfum-oriental-mystique': {
        id: '2',
        name: 'Parfum Oriental Mystique',
        description: 'Un parfum oriental cu note de vanilie și santal, perfect pentru seri romantice.',
        price: 420,
        category: 'parfumuri',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600',
        slug: 'parfum-oriental-mystique',
        discount: 15
      },
      'parfum-fresh-citrus': {
        id: '3',
        name: 'Parfum Fresh Citrus',
        description: 'Un parfum proaspăt cu note de citrice și mentă, perfect pentru zilele de vară.',
        price: 280,
        category: 'parfumuri',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48107?q=80&w=600',
        slug: 'parfum-fresh-citrus'
      },
      'parfum-woody-elegance': {
        id: '4',
        name: 'Parfum Woody Elegance',
        description: 'Un parfum lemnos cu note de cedru și bergamotă, perfect pentru bărbați sofisticați.',
        price: 400,
        category: 'parfumuri',
        stock: 8,
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600',
        slug: 'parfum-woody-elegance'
      },
      'crema-hidratanta-intensa': {
        id: '5',
        name: 'Cremă Hidratantă Intensă',
        description: 'O cremă hidratantă intensă pentru ten uscat, cu extract de aloe vera și acid hialuronic.',
        price: 120,
        category: 'creme',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee17b2?q=80&w=600',
        slug: 'crema-hidratanta-intensa'
      },
      'crema-anti-aging-gold': {
        id: '6',
        name: 'Cremă Anti-Aging Gold',
        description: 'Cremă premium cu particule de aur pentru combaterea ridurilor și îmbunătățirea elasticității pielii.',
        price: 250,
        category: 'creme',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1571781565036-d3f759314bab?q=80&w=600',
        slug: 'crema-anti-aging-gold',
        isNew: true
      },
      'lotiune-corp-relaxanta': {
        id: '7',
        name: 'Loțiune de Corp Relaxantă',
        description: 'Loțiune de corp cu ulei de lavandă și unt de shea pentru hidratare profundă și relaxare.',
        price: 80,
        category: 'ingrijire',
        stock: 30,
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600',
        slug: 'lotiune-corp-relaxanta',
        discount: 10
      },
      'set-ingrijire-completa': {
        id: '8',
        name: 'Set Îngrijire Completă',
        description: 'Set complet de îngrijire cu cremă de față, ser anti-aging și cremă pentru ochi.',
        price: 350,
        category: 'ingrijire',
        stock: 10,
        image: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=600',
        slug: 'set-ingrijire-completa'
      }
    };
    
    saveToDb('products', products);
    console.log('Products database initialized');
  }
};

// Update product stock
const updateProductStock = (productId, newStock) => {
  const allProducts = getFromDb('products', {});
  
  if (Object.keys(allProducts).length > 0) {
    const productKey = Object.keys(allProducts).find(key => allProducts[key].id === productId);
    
    if (productKey) {
      // Update the stock value
      console.log(`Updating stock for ${productKey} (${productId}): ${allProducts[productKey].stock} -> ${newStock}`);
      allProducts[productKey].stock = newStock;
      
      // Save back to localStorage
      saveToDb('products', allProducts);
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('stockUpdated', { 
        detail: { productId, newStock } 
      }));
    } else {
      console.error(`Product with ID ${productId} not found in DB`);
    }
  } else {
    console.error('No products found in database for update operation');
  }
};

// Get product stock level
const getProductStock = (productId) => {
  const allProducts = getFromDb('products', {});
  
  if (Object.keys(allProducts).length > 0) {
    const productKey = Object.keys(allProducts).find(key => allProducts[key].id === productId);
    if (productKey && allProducts[productKey].stock !== undefined) {
      return allProducts[productKey].stock;
    }
  }
  
  // Return 0 if stock can't be determined
  return 0;
};

// Get all products
const getAllProducts = () => {
  return getFromDb('products', {});
};

// Get product by slug
const getProductBySlug = (slug) => {
  const products = getAllProducts();
  return products[slug] || null;
};

// Get products by category
const getProductsByCategory = (category) => {
  const products = getAllProducts();
  const result = [];
  
  for (const key in products) {
    if (products[key].category === category) {
      result.push(products[key]);
    }
  }
  
  return result;
};

// Get featured products (limited number)
const getFeaturedProducts = (limit = 4) => {
  const products = getAllProducts();
  const productsArray = Object.values(products);
  return productsArray.slice(0, limit);
};

// Cart functions
const getCart = () => {
  return getFromDb('cart', []);
};

const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      category: product.category,
      discount: product.discount || 0
    });
  }
  
  saveToDb('cart', cart);
  return cart;
};

const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  saveToDb('cart', updatedCart);
  return updatedCart;
};

const updateCartQuantity = (productId, quantity) => {
  if (quantity < 1) return getCart();
  
  const cart = getCart();
  const updatedCart = cart.map(item => 
    item.id === productId ? { ...item, quantity } : item
  );
  
  saveToDb('cart', updatedCart);
  return updatedCart;
};

const clearCart = () => {
  saveToDb('cart', []);
  return [];
};

const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const price = item.discount 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    return total + (price * item.quantity);
  }, 0);
};

// Wishlist functions
const getWishlist = () => {
  return getFromDb('wishlist', []);
};

const addToWishlist = (product) => {
  const wishlist = getWishlist();
  if (wishlist.some(item => item.id === product.id)) {
    return wishlist;
  }
  
  wishlist.push({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    discount: product.discount || 0
  });
  
  saveToDb('wishlist', wishlist);
  return wishlist;
};

const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(item => item.id !== productId);
  saveToDb('wishlist', updatedWishlist);
  return updatedWishlist;
};

const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
};

const clearWishlist = () => {
  saveToDb('wishlist', []);
  return [];
};

// Orders functions
const getAllOrders = () => {
  return getFromDb('orders', []);
};

const saveOrder = (order) => {
  const orders = getAllOrders();
  orders.push(order);
  saveToDb('orders', orders);
  
  // Update product stocks
  order.items.forEach(item => {
    const currentStock = getProductStock(item.id);
    const newStock = Math.max(0, currentStock - item.quantity);
    updateProductStock(item.id, newStock);
  });
  
  return order;
};
