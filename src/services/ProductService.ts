import { Product, IProduct } from '@/models/Product';
import { Language } from '@/contexts/LanguageContext';
import mongoose from 'mongoose';

// Product service class
export class ProductService {
  
  /**
   * Get all products with optional filtering and pagination
   */
  static async getAllProducts(options: {
    category?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    language?: Language;
  } = {}) {
    const {
      category,
      isActive = true,
      isFeatured,
      page = 1,
      limit = 20,
      search,
      language = 'en'
    } = options;

    // Build query
    const query: any = {};
    
    if (category) query.category = category;
    if (isActive !== undefined) query.isActive = isActive;
    if (isFeatured !== undefined) query.isFeatured = isFeatured;
    if (search) {
      query.$or = [
        { 'name.en': { $regex: search, $options: 'i' } },
        { 'name.ro': { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } },
        { 'description.ro': { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    // Transform products to include localized content
    const localizedProducts = products.map(product => ({
      ...product,
      name: product.name[language] || product.name.en,
      description: product.description[language] || product.description.en,
      details: product.details[language] || product.details.en,
      features: product.features[language] || product.features.en,
      metaTitle: product.metaTitle[language] || product.metaTitle.en,
      metaDescription: product.metaDescription[language] || product.metaDescription.en
    }));

    return {
      products: localizedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get product by slug with localization
   */
  static async getProductBySlug(slug: string, language: Language = 'en') {
    const product = await Product.findOne({ slug, isActive: true }).lean();
    
    if (!product) {
      return null;
    }

    // Return product with localized content
    return {
      ...product,
      name: product.name[language] || product.name.en,
      description: product.description[language] || product.description.en,
      details: product.details[language] || product.details.en,
      features: product.features[language] || product.features.en,
      metaTitle: product.metaTitle[language] || product.metaTitle.en,
      metaDescription: product.metaDescription[language] || product.metaDescription.en
    };
  }

  /**
   * Get product by ID with localization
   */
  static async getProductById(id: string, language: Language = 'en') {
    const product = await Product.findById(id).lean();
    
    if (!product) {
      return null;
    }

    // Return product with localized content
    return {
      ...product,
      name: product.name[language] || product.name.en,
      description: product.description[language] || product.description.en,
      details: product.details[language] || product.details.en,
      features: product.features[language] || product.features.en,
      metaTitle: product.metaTitle[language] || product.metaTitle.en,
      metaDescription: product.metaDescription[language] || product.metaDescription.en
    };
  }

  /**
   * Get featured products
   */
  static async getFeaturedProducts(language: Language = 'en', limit: number = 8) {
    const products = await Product.find({ 
      isActive: true, 
      isFeatured: true 
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Return products with localized content
    return products.map(product => ({
      ...product,
      name: product.name[language] || product.name.en,
      description: product.description[language] || product.description.en,
      details: product.details[language] || product.details.en,
      features: product.features[language] || product.features.en,
      metaTitle: product.metaTitle[language] || product.metaTitle.en,
      metaDescription: product.metaDescription[language] || product.metaDescription.en
    }));
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(category: string, language: Language = 'en', limit?: number) {
    const query = Product.find({ category, isActive: true });
    
    if (limit) {
      query.limit(limit);
    }

    const products = await query.sort({ createdAt: -1 }).lean();

    // Return products with localized content
    return products.map(product => ({
      ...product,
      name: product.name[language] || product.name.en,
      description: product.description[language] || product.description.en,
      details: product.details[language] || product.details.en,
      features: product.features[language] || product.features.en,
      metaTitle: product.metaTitle[language] || product.metaTitle.en,
      metaDescription: product.metaDescription[language] || product.metaDescription.en
    }));
  }

  /**
   * Search products
   */
  static async searchProducts(searchTerm: string, language: Language = 'en', limit: number = 20) {
    const products = await Product.find({
      $or: [
        { 'name.en': { $regex: searchTerm, $options: 'i' } },
        { 'name.ro': { $regex: searchTerm, $options: 'i' } },
        { 'description.en': { $regex: searchTerm, $options: 'i' } },
        { 'description.ro': { $regex: searchTerm, $options: 'i' } },
        { 'tags': { $regex: searchTerm, $options: 'i' } }
      ],
      isActive: true
    })
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    // Return products with localized content
    return products.map(product => ({
      ...product,
      name: product.name[language] || product.name.en,
      description: product.description[language] || product.description.en,
      details: product.details[language] || product.details.en,
      features: product.features[language] || product.features.en,
      metaTitle: product.metaTitle[language] || product.metaTitle.en,
      metaDescription: product.metaDescription[language] || product.metaDescription.en
    }));
  }

  /**
   * Create a new product
   */
  static async createProduct(productData: Partial<IProduct>) {
    try {
      const product = new Product(productData);
      await product.save();
      return product.toObject();
    } catch (error: any) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  /**
   * Update a product
   */
  static async updateProduct(id: string, productData: Partial<IProduct>) {
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { ...productData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      if (!product) {
        throw new Error('Product not found');
      }

      return product.toObject();
    } catch (error: any) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  /**
   * Delete a product
   */
  static async deleteProduct(id: string) {
    try {
      const product = await Product.findByIdAndDelete(id);
      
      if (!product) {
        throw new Error('Product not found');
      }

      return { message: 'Product deleted successfully' };
    } catch (error: any) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  /**
   * Update product stock
   */
  static async updateStock(id: string, newStock: number) {
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { stock: newStock, updatedAt: new Date() },
        { new: true }
      );

      if (!product) {
        throw new Error('Product not found');
      }

      return product.toObject();
    } catch (error: any) {
      throw new Error(`Failed to update stock: ${error.message}`);
    }
  }

  /**
   * Get all categories
   */
  static async getCategories() {
    try {
      const categories = await Product.distinct('category', { isActive: true });
      return categories.sort();
    } catch (error: any) {
      throw new Error(`Failed to get categories: ${error.message}`);
    }
  }

  /**
   * Get product statistics
   */
  static async getProductStats() {
    try {
      const stats = await Product.aggregate([
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            activeProducts: {
              $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
            },
            featuredProducts: {
              $sum: { $cond: [{ $eq: ['$isFeatured', true] }, 1, 0] }
            },
            outOfStockProducts: {
              $sum: { $cond: [{ $eq: ['$stock', 0] }, 1, 0] }
            },
            lowStockProducts: {
              $sum: { $cond: [{ $lt: ['$stock', 10] }, 1, 0] }
            },
            averagePrice: { $avg: '$price' },
            totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
          }
        }
      ]);

      return stats[0] || {
        totalProducts: 0,
        activeProducts: 0,
        featuredProducts: 0,
        outOfStockProducts: 0,
        lowStockProducts: 0,
        averagePrice: 0,
        totalValue: 0
      };
    } catch (error: any) {
      throw new Error(`Failed to get product stats: ${error.message}`);
    }
  }
}

export default ProductService;