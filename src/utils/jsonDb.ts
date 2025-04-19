
/**
 * Simple JSON database utility functions
 */

// Get data from localStorage
export const getFromDb = <T>(key: string, defaultValue: T): T => {
  const storedData = localStorage.getItem(key);
  if (!storedData) return defaultValue;
  
  try {
    return JSON.parse(storedData) as T;
  } catch (e) {
    console.error(`Error parsing data from localStorage for key: ${key}`, e);
    return defaultValue;
  }
};

// Save data to localStorage
export const saveToDb = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving data to localStorage for key: ${key}`, e);
  }
};

// Update product stock in the "database"
export const updateProductStock = (productId: string, newStock: number): void => {
  const allProducts = getFromDb<Record<string, any>>('products', {});
  
  // If we haven't stored products yet, get them from the imported data
  if (Object.keys(allProducts).length === 0) {
    // Import from data file on first use
    import('@/data/products').then(({ products }) => {
      const productsCopy = { ...products };
      
      // Update the specified product's stock
      const productKey = Object.keys(productsCopy).find(key => productsCopy[key].id === productId);
      if (productKey) {
        productsCopy[productKey].stock = newStock;
        saveToDb('products', productsCopy);
        console.log(`Product ${productId} stock updated to ${newStock}`);
      } else {
        console.error(`Product with ID ${productId} not found`);
      }
    });
  } else {
    // Update existing stored products
    const productKey = Object.keys(allProducts).find(key => allProducts[key].id === productId);
    if (productKey) {
      allProducts[productKey].stock = newStock;
      saveToDb('products', allProducts);
      console.log(`Product ${productId} stock updated to ${newStock} (from existing DB)`);
    } else {
      console.error(`Product with ID ${productId} not found in existing DB`);
    }
  }
};

// Get product stock level
export const getProductStock = (productId: string): Promise<number> => {
  return new Promise((resolve) => {
    const allProducts = getFromDb<Record<string, any>>('products', {});
    
    if (Object.keys(allProducts).length === 0) {
      // If no products in localStorage, get from data module
      import('@/data/products').then(({ products }) => {
        const productKey = Object.keys(products).find(key => products[key].id === productId);
        if (productKey && products[productKey].stock !== undefined) {
          resolve(products[productKey].stock);
        } else {
          resolve(0); // Default to 0 if stock not found
        }
      });
    } else {
      // Get from localStorage
      const productKey = Object.keys(allProducts).find(key => allProducts[key].id === productId);
      if (productKey && allProducts[productKey].stock !== undefined) {
        resolve(allProducts[productKey].stock);
      } else {
        resolve(0); // Default to 0 if stock not found
      }
    }
  });
};

// Initialize products database on application start
export const initializeProductsDb = async (): Promise<void> => {
  const storedProducts = getFromDb<Record<string, any>>('products', {});
  
  // Only initialize if we don't have products stored yet
  if (Object.keys(storedProducts).length === 0) {
    const { products } = await import('@/data/products');
    saveToDb('products', products);
    console.log('Products database initialized');
  } else {
    console.log('Products database already initialized');
  }
};

// Get all products from database
export const getAllProducts = async (): Promise<Record<string, any>> => {
  const storedProducts = getFromDb<Record<string, any>>('products', {});
  
  if (Object.keys(storedProducts).length === 0) {
    const { products } = await import('@/data/products');
    return products;
  }
  
  return storedProducts;
};

// Get all orders from database and sort by date (newest first)
export const getAllOrders = (): any[] => {
  const orders = getFromDb<any[]>('orders', []);
  return orders.sort((a, b) => {
    // Convert date strings to Date objects for sorting
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
