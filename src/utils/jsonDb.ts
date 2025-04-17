
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
      }
    });
  } else {
    // Update existing stored products
    const productKey = Object.keys(allProducts).find(key => allProducts[key].id === productId);
    if (productKey) {
      allProducts[productKey].stock = newStock;
      saveToDb('products', allProducts);
    }
  }
};

// Initialize products database on application start
export const initializeProductsDb = async (): Promise<void> => {
  const storedProducts = getFromDb<Record<string, any>>('products', {});
  
  // Only initialize if we don't have products stored yet
  if (Object.keys(storedProducts).length === 0) {
    const { products } = await import('@/data/products');
    saveToDb('products', products);
  }
};
