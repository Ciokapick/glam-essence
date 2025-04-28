
// DOM Elements
const cartBtn = document.getElementById('cartBtn');
const wishlistBtn = document.getElementById('wishlistBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const cartSidebar = document.getElementById('cartSidebar');
const wishlistSidebar = document.getElementById('wishlistSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const closeWishlistBtn = document.getElementById('closeWishlistBtn');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const wishlistItems = document.getElementById('wishlistItems');
const cartCount = document.getElementById('cartCount');
const wishlistCount = document.getElementById('wishlistCount');
const featuredProductsContainer = document.getElementById('featuredProducts');
const newsletterForm = document.getElementById('newsletterForm');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  console.log('App initialized');
  
  // Initialize database
  initializeDb();
  
  // Render UI components
  renderFeaturedProducts();
  updateCartCount();
  updateWishlistCount();
  
  // Add event listeners
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Cart and wishlist toggles
  cartBtn.addEventListener('click', toggleCart);
  wishlistBtn.addEventListener('click', toggleWishlist);
  closeCartBtn.addEventListener('click', toggleCart);
  closeWishlistBtn.addEventListener('click', toggleWishlist);
  overlay.addEventListener('click', closeAllSidebars);
  
  // Listen for stock updates
  window.addEventListener('stockUpdated', handleStockUpdate);
  
  // Newsletter form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
}

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  
  if (cartSidebar.classList.contains('active')) {
    renderCartItems();
  }
}

// Toggle wishlist sidebar
function toggleWishlist() {
  wishlistSidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  
  if (wishlistSidebar.classList.contains('active')) {
    renderWishlistItems();
  }
}

// Close all sidebars
function closeAllSidebars() {
  cartSidebar.classList.remove('active');
  wishlistSidebar.classList.remove('active');
  overlay.classList.remove('active');
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast active ' + type;
  
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// Update cart count badge
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = count;
}

// Update wishlist count badge
function updateWishlistCount() {
  const wishlist = getWishlist();
  wishlistCount.textContent = wishlist.length;
}

// Format price
function formatPrice(price) {
  return price.toFixed(2) + ' RON';
}

// Calculate discounted price
function calculateDiscountedPrice(price, discount) {
  return discount ? price * (1 - discount / 100) : price;
}

// Render featured products on homepage
function renderFeaturedProducts() {
  if (!featuredProductsContainer) return;
  
  const featuredProducts = getFeaturedProducts(4);
  
  if (featuredProducts.length === 0) {
    featuredProductsContainer.innerHTML = '<div class="empty-state"><div class="empty-icon">📦</div><h3 class="empty-title">Nu există produse</h3><p class="empty-description">Nu am găsit produse pentru afișare.</p></div>';
    return;
  }
  
  featuredProductsContainer.innerHTML = featuredProducts.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-badges">
          ${product.discount ? `<span class="product-badge badge-sale">-${product.discount}%</span>` : ''}
          ${product.isNew ? '<span class="product-badge badge-new">Nou</span>' : ''}
        </div>
        <div class="product-actions">
          <button class="product-action-btn add-to-wishlist-btn" data-id="${product.id}" title="Adaugă la favorite">❤</button>
          <button class="product-action-btn quick-view-btn" data-id="${product.id}" title="Vizualizare rapidă">👁️</button>
        </div>
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-category">${product.category}</div>
        <div class="product-footer">
          <div class="product-price-container">
            ${product.discount ? `<span class="product-price-original">${formatPrice(product.price)}</span>` : ''}
            <span class="product-price">${formatPrice(calculateDiscountedPrice(product.price, product.discount))}</span>
          </div>
          <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Adaugă</button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add event listeners to product buttons
  addProductEventListeners();
}

// Add event listeners to product buttons
function addProductEventListeners() {
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const productId = e.target.dataset.id;
      const products = getAllProducts();
      const product = Object.values(products).find(p => p.id === productId);
      
      if (product) {
        addToCart(product);
        updateCartCount();
        showToast(`${product.name} a fost adăugat în coș`);
      }
    });
  });
  
  // Add to wishlist buttons
  document.querySelectorAll('.add-to-wishlist-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const productId = e.target.dataset.id;
      const products = getAllProducts();
      const product = Object.values(products).find(p => p.id === productId);
      
      if (product) {
        if (isInWishlist(productId)) {
          removeFromWishlist(productId);
          updateWishlistCount();
          showToast(`${product.name} a fost eliminat din favorite`);
          button.classList.remove('active');
        } else {
          addToWishlist(product);
          updateWishlistCount();
          showToast(`${product.name} a fost adăugat la favorite`);
          button.classList.add('active');
        }
      }
    });
  });
  
  // Mark wishlist buttons as active if product is in wishlist
  document.querySelectorAll('.add-to-wishlist-btn').forEach(button => {
    const productId = button.dataset.id;
    if (isInWishlist(productId)) {
      button.classList.add('active');
    }
  });
  
  // Quick view buttons can be implemented in future
  document.querySelectorAll('.quick-view-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const productId = e.target.dataset.id;
      const products = getAllProducts();
      const product = Object.values(products).find(p => p.id === productId);
      
      if (product) {
        // For simplicity, just redirect to product page
        window.location.href = `product.html?slug=${product.slug}`;
      }
    });
  });
}

// Render cart items
function renderCartItems() {
  const cart = getCart();
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-state"><div class="empty-icon">🛒</div><h3 class="empty-title">Coșul tău este gol</h3><p class="empty-description">Adaugă produse în coș pentru a continua cumpărăturile.</p></div>';
    cartTotal.textContent = formatPrice(0);
    return;
  }
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-content">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-price">
          ${formatPrice(calculateDiscountedPrice(item.price, item.discount) * item.quantity)}
        </div>
        <div class="cart-item-actions">
          <div class="quantity-control">
            <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
            <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
            <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
          </div>
          <button class="remove-btn" data-id="${item.id}">Elimină</button>
        </div>
      </div>
    </div>
  `).join('');
  
  cartTotal.textContent = formatPrice(getCartTotal());
  
  // Add event listeners to cart item buttons
  addCartItemEventListeners();
}

// Add event listeners to cart item buttons
function addCartItemEventListeners() {
  // Decrease quantity buttons
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', function(e) {
      const productId = e.target.dataset.id;
      const cart = getCart();
      const item = cart.find(item => item.id === productId);
      
      if (item && item.quantity > 1) {
        updateCartQuantity(productId, item.quantity - 1);
        renderCartItems();
        updateCartCount();
      }
    });
  });
  
  // Increase quantity buttons
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', function(e) {
      const productId = e.target.dataset.id;
      const cart = getCart();
      const item = cart.find(item => item.id === productId);
      
      if (item) {
        updateCartQuantity(productId, item.quantity + 1);
        renderCartItems();
        updateCartCount();
      }
    });
  });
  
  // Quantity input fields
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', function(e) {
      const productId = e.target.dataset.id;
      const quantity = parseInt(e.target.value);
      
      if (!isNaN(quantity) && quantity > 0) {
        updateCartQuantity(productId, quantity);
        renderCartItems();
        updateCartCount();
      }
    });
  });
  
  // Remove buttons
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const productId = e.target.dataset.id;
      removeFromCart(productId);
      renderCartItems();
      updateCartCount();
      showToast('Produsul a fost eliminat din coș');
    });
  });
}

// Render wishlist items
function renderWishlistItems() {
  const wishlist = getWishlist();
  
  if (wishlist.length === 0) {
    wishlistItems.innerHTML = '<div class="empty-state"><div class="empty-icon">❤</div><h3 class="empty-title">Lista ta de favorite este goală</h3><p class="empty-description">Adaugă produse la favorite pentru a le găsi ușor mai târziu.</p></div>';
    return;
  }
  
  wishlistItems.innerHTML = wishlist.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-content">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-price">
          ${item.discount ? `<span class="product-price-original">${formatPrice(item.price)}</span>` : ''}
          ${formatPrice(calculateDiscountedPrice(item.price, item.discount))}
        </div>
        <div class="cart-item-actions">
          <button class="btn btn-primary add-to-cart-from-wishlist" data-id="${item.id}">Adaugă în coș</button>
          <button class="remove-btn" data-id="${item.id}">Elimină</button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add event listeners to wishlist item buttons
  addWishlistItemEventListeners();
}

// Add event listeners to wishlist item buttons
function addWishlistItemEventListeners() {
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart-from-wishlist').forEach(button => {
    button.addEventListener('click', function(e) {
      const productId = e.target.dataset.id;
      const products = getAllProducts();
      const product = Object.values(products).find(p => p.id === productId);
      
      if (product) {
        addToCart(product);
        updateCartCount();
        showToast(`${product.name} a fost adăugat în coș`);
      }
    });
  });
  
  // Remove buttons
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const productId = e.target.dataset.id;
      removeFromWishlist(productId);
      renderWishlistItems();
      updateWishlistCount();
      showToast('Produsul a fost eliminat din favorite');
    });
  });
}

// Handle newsletter form submit
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  if (email) {
    // In a real app, you would send this to a backend
    showToast(`Te-ai abonat cu succes cu adresa ${email}`);
    e.target.reset();
  }
}

// Handle stock updates
function handleStockUpdate(e) {
  const { productId, newStock } = e.detail;
  console.log(`Stock updated for product ${productId}: ${newStock}`);
  
  // If we're on a product page, update the stock display
  const stockElement = document.querySelector(`.product-stock[data-id="${productId}"]`);
  if (stockElement) {
    stockElement.textContent = `Stoc: ${newStock} bucăți`;
  }
}

// Create additional pages (parfumuri.html, etc.) as needed with similar structure
