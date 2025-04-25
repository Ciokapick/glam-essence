
/**
 * Simple JSON database utility functions
 */

// Event emitter for stock updates
class StockUpdateEmitter {
  private listeners: ((productId: string, newStock: number) => void)[] = [];

  public subscribe(listener: (productId: string, newStock: number) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public emit(productId: string, newStock: number) {
    this.listeners.forEach(listener => listener(productId, newStock));
    console.log(`Stock update emitted for product ${productId}: ${newStock}`);
  }
}

export const stockUpdateEmitter = new StockUpdateEmitter();

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
    console.log(`Data saved successfully for key: ${key}`);
  } catch (e) {
    console.error(`Error saving data to localStorage for key: ${key}`, e);
  }
};

// Update product stock in the "database"
export const updateProductStock = (productId: string, newStock: number): void => {
  // Force ensure we have products initialized
  initializeProductsDb().then(() => {
    const allProducts = getFromDb<Record<string, any>>('products', {});
    
    if (Object.keys(allProducts).length > 0) {
      const productKey = Object.keys(allProducts).find(key => allProducts[key].id === productId);
      
      if (productKey) {
        // Update the stock value
        console.log(`Updating stock for ${productKey} (${productId}): ${allProducts[productKey].stock} -> ${newStock}`);
        allProducts[productKey].stock = newStock;
        
        // Save back to localStorage
        saveToDb('products', allProducts);
        
        // Emit update event
        stockUpdateEmitter.emit(productId, newStock);
      } else {
        console.error(`Product with ID ${productId} not found in DB`);
      }
    } else {
      console.error('No products found in database for update operation');
    }
  });
};

// Get product stock level
export const getProductStock = async (productId: string): Promise<number> => {
  // Ensure products are initialized
  await initializeProductsDb();
  
  const allProducts = getFromDb<Record<string, any>>('products', {});
  
  if (Object.keys(allProducts).length > 0) {
    const productKey = Object.keys(allProducts).find(key => allProducts[key].id === productId);
    if (productKey && allProducts[productKey].stock !== undefined) {
      console.log(`Getting stock for ${productKey} (${productId}): ${allProducts[productKey].stock}`);
      return allProducts[productKey].stock;
    }
  }
  
  // Return 0 if stock can't be determined
  return 0;
};

// Initialize products database on application start
export const initializeProductsDb = async (): Promise<void> => {
  const storedProducts = getFromDb<Record<string, any>>('products', {});
  
  // Only initialize if we don't have products stored yet
  if (Object.keys(storedProducts).length === 0) {
    const { products } = await import('@/data/products');
    // Deep clone products to make sure we don't have reference issues
    const productsCopy = JSON.parse(JSON.stringify(products));
    saveToDb('products', productsCopy);
    console.log('Products database initialized');
  }
};

// Get all products from database
export const getAllProducts = async (): Promise<Record<string, any>> => {
  // Ensure products are initialized
  await initializeProductsDb();
  
  return getFromDb<Record<string, any>>('products', {});
};

// Get all orders from database and sort by date (newest first)
export const getAllOrders = (): any[] => {
  const orders = getFromDb<any[]>('orders', []);
  return orders.sort((a, b) => {
    // Convert date strings to Date objects for sorting
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

// Save a new order and update product stocks
export const saveOrder = (order: any): void => {
  // Get existing orders
  const existingOrders = getAllOrders();
  
  // Add new order to the list
  const updatedOrders = [...existingOrders, order];
  
  // Save updated orders
  saveToDb('orders', updatedOrders);
  console.log('Order saved successfully:', order);
  
  // Update product stock for each item in the order
  order.items.forEach((item: any) => {
    updateProductStockAfterOrder(item.id, item.quantity);
  });
};

// Helper function to update stock after an order
const updateProductStockAfterOrder = (productId: string, quantity: number): void => {
  // Get current product
  getProductStock(productId).then(currentStock => {
    // Calculate new stock by subtracting the ordered quantity
    const newStock = Math.max(0, currentStock - quantity);
    
    // Update the stock
    updateProductStock(productId, newStock);
  });
};
