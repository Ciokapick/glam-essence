import { ProductService } from './ProductService';
import { getFromDb, saveToDb } from '@/utils/jsonDb';
import { Language } from '@/contexts/LanguageContext';
import DatabaseService from './DatabaseService';

// Hybrid product service that supports both JSON and database
export class ProductServiceHybrid {
  private static useDatabase = false;
  private static databaseCheckPromise: Promise<boolean> | null = null;

  /**
   * Check if database is available and should be used
   */
  private static async shouldUseDatabase(): Promise<boolean> {
    if (this.databaseCheckPromise) {
      return this.databaseCheckPromise;
    }

    this.databaseCheckPromise = this.performDatabaseCheck();
    return this.databaseCheckPromise;
  }

  /**
   * Perform database availability check
   */
  private static async performDatabaseCheck(): Promise<boolean> {
    try {
      // Check if we should use database (can be controlled by environment variable)
      const useDb = process.env.USE_DATABASE === 'true';
      if (!useDb) {
        return false;
      }

      // Initialize database connection
      await DatabaseService.initialize();
      
      // Test database connection
      const healthCheck = await DatabaseService.healthCheck();
      const isConnected = healthCheck.connected && healthCheck.status === 'healthy';
      
      if (isConnected) {
        console.log('✅ Using database for products');
        this.useDatabase = true;
        return true;
      } else {
        console.log('⚠️ Database not available, falling back to JSON');
        this.useDatabase = false;
        return false;
      }
    } catch (error) {
      console.log('⚠️ Database connection failed, falling back to JSON:', error);
      this.useDatabase = false;
      return false;
    }
  }

  /**
   * Get all products (hybrid implementation)
   */
  static async getAllProducts(options: {
    category?: string;
    language?: Language;
  } = {}) {
    const { category, language = 'en' } = options;

    if (await this.shouldUseDatabase()) {
      try {
        // Use database
        const result = await ProductService.getAllProducts({ category, language });
        return result.products;
      } catch (error) {
        console.error('Database error, falling back to JSON:', error);
        // Fallback to JSON
      }
    }

    // Fallback to JSON
    try {
      const products = getFromDb<Record<string, any>>('products', {});
      const productArray = Object.values(products);
      
      // Filter by category if specified
      let filteredProducts = productArray;
      if (category) {
        filteredProducts = productArray.filter(product => 
          product.category?.toLowerCase() === category.toLowerCase()
        );
      }

      // Apply language localization for JSON products
      return filteredProducts.map(product => ({
        ...product,
        name: product.name || product.name_en || 'Product',
        description: product.description || '',
        features: Array.isArray(product.features) ? product.features : []
      }));
    } catch (error) {
      console.error('JSON fallback error:', error);
      return [];
    }
  }

  /**
   * Get featured products (hybrid implementation)
   */
  static async getFeaturedProducts(language: Language = 'en', limit: number = 8) {
    if (await this.shouldUseDatabase()) {
      try {
        return await ProductService.getFeaturedProducts(language, limit);
      } catch (error) {
        console.error('Database error, falling back to JSON:', error);
      }
    }

    // Fallback to JSON
    try {
      const products = getFromDb<Record<string, any>>('products', {});
      const productArray = Object.values(products);
      
      const featuredProducts = productArray
        .filter(product => product.featured || product.isFeatured)
        .slice(0, limit);

      return featuredProducts.map(product => ({
        ...product,
        name: product.name || product.name_en || 'Featured Product',
        description: product.description || ''
      }));
    } catch (error) {
      console.error('JSON fallback error:', error);
      return [];
    }
  }

  /**
   * Get products by category (hybrid implementation)
   */
  static async getProductsByCategory(category: string, language: Language = 'en') {
    if (await this.shouldUseDatabase()) {
      try {
        return await ProductService.getProductsByCategory(category, language);
      } catch (error) {
        console.error('Database error, falling back to JSON:', error);
      }
    }

    // Fallback to JSON
    try {
      const products = getFromDb<Record<string, any>>('products', {});
      const productArray = Object.values(products);
      
      const categoryProducts = productArray.filter(product => 
        product.category?.toLowerCase() === category.toLowerCase()
      );

      return categoryProducts.map(product => ({
        ...product,
        name: product.name || product.name_en || 'Product',
        description: product.description || ''
      }));
    } catch (error) {
      console.error('JSON fallback error:', error);
      return [];
    }
  }

  /**
   * Get product by slug (hybrid implementation)
   */
  static async getProductBySlug(slug: string, language: Language = 'en') {
    if (await this.shouldUseDatabase()) {
      try {
        return await ProductService.getProductBySlug(slug, language);
      } catch (error) {
        console.error('Database error, falling back to JSON:', error);
      }
    }

    // Fallback to JSON
    try {
      const products = getFromDb<Record<string, any>>('products', {});
      const product = Object.values(products).find((p: any) => 
        p.slug === slug || p.id === slug || p.name?.toLowerCase().replace(/\s+/g, '-') === slug
      ) as any;

      if (!product) {
        return null;
      }

      return {
        ...product,
        name: product.name || product.name_en || 'Product',
        description: product.description || '',
        details: product.details || '',
        features: Array.isArray(product.features) ? product.features : []
      };
    } catch (error) {
      console.error('JSON fallback error:', error);
      return null;
    }
  }

  /**
   * Search products (hybrid implementation)
   */
  static async searchProducts(searchTerm: string, language: Language = 'en', limit: number = 20) {
    if (await this.shouldUseDatabase()) {
      try {
        return await ProductService.searchProducts(searchTerm, language, limit);
      } catch (error) {
        console.error('Database error, falling back to JSON:', error);
      }
    }

    // Fallback to JSON
    try {
      const products = getFromDb<Record<string, any>>('products', {});
      const productArray = Object.values(products);
      
      const searchResults = productArray.filter(product => 
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, limit);

      return searchResults.map(product => ({
        ...product,
        name: product.name || product.name_en || 'Product',
        description: product.description || ''
      }));
    } catch (error) {
      console.error('JSON fallback error:', error);
      return [];
    }
  }

  /**
   * Create product (hybrid implementation)
   */
  static async createProduct(productData: any) {
    if (await this.shouldUseDatabase()) {
      try {
        return await ProductService.createProduct(productData);
      } catch (error) {
        console.error('Database error, falling back to JSON:', error);
      }
    }

    // Fallback to JSON
    try {
      const products = getFromDb<Record<string, any>>('products', {});
      const newProduct = {
        id: `product-${Date.now()}`,
        slug: productData.slug || productData.name?.toLowerCase().replace(/\s+/g, '-'),
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      products[newProduct.slug] = newProduct;
      saveToDb('products', products);
      
      return newProduct;
    } catch (error) {
      console.error('JSON fallback error:', error);
      throw error;
    }
  }

  /**
   * Update product stock (hybrid implementation)
   */
  static async updateStock(id: string, newStock: number) {
    if (await this.shouldUseDatabase()) {
      try {
        return await ProductService.updateStock(id, newStock);
      } catch (error) {
        console.error('Database error, falling back to JSON:', error);
      }
    }

    // Fallback to JSON
    try {
      const products = getFromDb<Record<string, any>>('products', {});
      const productKey = Object.keys(products).find(key => 
        products[key].id === id || products[key].slug === id
      );

      if (!productKey) {
        throw new Error('Product not found');
      }

      products[productKey].stock = newStock;
      products[productKey].updatedAt = new Date().toISOString();

      saveToDb('products', products);
      return products[productKey];
    } catch (error) {
      console.error('JSON fallback error:', error);
      throw error;
    }
  }

  /**
   * Get categories (hybrid implementation)
   */
  static async getCategories() {
    if (await this.shouldUseDatabase()) {
      try {
        return await ProductService.getCategories();
      } catch (error) {
        console.error('Database error, falling back to JSON:', error);
      }
    }

    // Fallback to JSON
    try {
      const products = getFromDb<Record<string, any>>('products', {});
      const productArray = Object.values(products);
      
      const categories = [...new Set(productArray.map(product => product.category))];
      return categories.filter(Boolean).sort();
    } catch (error) {
      console.error('JSON fallback error:', error);
      return [];
    }
  }
}

export default ProductServiceHybrid;