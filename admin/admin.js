
// Admin utilities

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast active ' + type;
  
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// Format price
function formatPrice(price) {
  return price.toFixed(2) + ' RON';
}

// Check admin authentication
function checkAdminAuth() {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  
  if (!isAuthenticated) {
    window.location.href = 'login.html';
  }
  
  return isAuthenticated;
}

// Update product stock
function updateProductStock(productId, newStock) {
  const allProducts = getFromDb('products', {});
  
  if (Object.keys(allProducts).length > 0) {
    const productKey = Object.keys(allProducts).find(key => allProducts[key].id === productId);
    
    if (productKey) {
      // Update the stock value
      console.log(`Updating stock for ${productKey} (${productId}): ${allProducts[productKey].stock} -> ${newStock}`);
      allProducts[productKey].stock = newStock;
      
      // Save back to localStorage
      saveToDb('products', allProducts);
      
      // Show success message
      showToast(`Stock updated for ${allProducts[productKey].name}`);
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('stockUpdated', { 
        detail: { productId, newStock } 
      }));
      
      return true;
    }
  }
  
  showToast('Failed to update stock', 'error');
  return false;
}

// Update product details
function updateProduct(productKey, productData) {
  const allProducts = getFromDb('products', {});
  
  if (allProducts[productKey]) {
    // Update product data
    allProducts[productKey] = {
      ...allProducts[productKey],
      ...productData
    };
    
    // Save back to localStorage
    saveToDb('products', allProducts);
    
    // Show success message
    showToast(`Product ${productData.name} updated successfully`);
    
    return true;
  }
  
  showToast('Failed to update product', 'error');
  return false;
}

// Delete product
function deleteProduct(productKey) {
  const allProducts = getFromDb('products', {});
  
  if (allProducts[productKey]) {
    // Delete product
    delete allProducts[productKey];
    
    // Save back to localStorage
    saveToDb('products', allProducts);
    
    // Show success message
    showToast('Product deleted successfully');
    
    return true;
  }
  
  showToast('Failed to delete product', 'error');
  return false;
}

// Add new product
function addProduct(productData) {
  const allProducts = getFromDb('products', {});
  const slug = generateSlug(productData.name);
  
  // Check if slug already exists
  if (allProducts[slug]) {
    showToast('A product with this name already exists', 'error');
    return false;
  }
  
  // Add new product
  allProducts[slug] = {
    ...productData,
    slug: slug
  };
  
  // Save back to localStorage
  saveToDb('products', allProducts);
  
  // Show success message
  showToast(`Product ${productData.name} added successfully`);
  
  return true;
}

// Generate slug from product name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get data from localStorage
function getFromDb(key, defaultValue) {
  const storedData = localStorage.getItem(key);
  if (!storedData) return defaultValue;
  
  try {
    return JSON.parse(storedData);
  } catch (e) {
    console.error(`Error parsing data from localStorage for key: ${key}`, e);
    return defaultValue;
  }
}

// Save data to localStorage
function saveToDb(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Data saved successfully for key: ${key}`);
  } catch (e) {
    console.error(`Error saving data to localStorage for key: ${key}`, e);
  }
}

// Get order status badge class
function getStatusBadgeClass(status) {
  switch (status) {
    case 'completed':
      return 'admin-badge-success';
    case 'pending':
      return 'admin-badge-warning';
    case 'processing':
      return 'admin-badge-processing';
    case 'canceled':
      return 'admin-badge-danger';
    default:
      return 'admin-badge-warning';
  }
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
  const orders = getFromDb('orders', []);
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = newStatus;
    saveToDb('orders', orders);
    showToast(`Order #${orderId} status updated to ${newStatus}`);
    return true;
  }
  
  showToast('Failed to update order status', 'error');
  return false;
}

// Admin logout
function adminLogout() {
  localStorage.removeItem('adminAuth');
  window.location.href = 'login.html';
}

