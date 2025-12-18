import mongoose, { Schema, Document } from 'mongoose';
import { Language } from '@/contexts/LanguageContext';

// Multilingual text interface
interface MultilingualText {
  en: string;
  ro: string;
}

// Product features interface
interface ProductFeatures {
  en: string[];
  ro: string[];
}

// Product gallery interface
interface ProductGallery {
  url: string;
  alt: {
    en: string;
    ro: string;
  };
}

// Product schema interface
export interface IProduct extends Document {
  // Basic product info
  slug: string;
  sku: string;
  
  // Multilingual fields
  name: MultilingualText;
  description: MultilingualText;
  details: MultilingualText;
  
  // Pricing and inventory
  price: number;
  stock: number;
  category: string;
  
  // Product media
  image: string;
  gallery: ProductGallery[];
  
  // Product metadata
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  
  // Product features (multilingual)
  features: ProductFeatures;
  
  // SEO and metadata
  metaTitle: MultilingualText;
  metaDescription: MultilingualText;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Product schema
const ProductSchema = new Schema<IProduct>({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  
  // Multilingual text fields
  name: {
    en: { type: String, required: true, trim: true },
    ro: { type: String, required: true, trim: true }
  },
  description: {
    en: { type: String, required: true },
    ro: { type: String, required: true }
  },
  details: {
    en: { type: String, required: true },
    ro: { type: String, required: true }
  },
  
  // Pricing and inventory
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  
  // Product media
  image: {
    type: String,
    required: true
  },
  gallery: [{
    url: { type: String, required: true },
    alt: {
      en: { type: String, required: true },
      ro: { type: String, required: true }
    }
  }],
  
  // Product metadata
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    min: 0,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  
  // Product features (multilingual)
  features: {
    en: [{ type: String, required: true }],
    ro: [{ type: String, required: true }]
  },
  
  // SEO and metadata
  metaTitle: {
    en: { type: String, required: true },
    ro: { type: String, required: true }
  },
  metaDescription: {
    en: { type: String, required: true },
    ro: { type: String, required: true }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
ProductSchema.index({ slug: 1 });
ProductSchema.index({ sku: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ isActive: 1, isFeatured: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ 'name.en': 'text', 'name.ro': 'text', 'description.en': 'text', 'description.ro': 'text' });

// Static methods for easy access to localized content
ProductSchema.statics.getLocalizedName = function(product: IProduct, language: Language): string {
  return product.name[language] || product.name.en;
};

ProductSchema.statics.getLocalizedDescription = function(product: IProduct, language: Language): string {
  return product.description[language] || product.description.en;
};

ProductSchema.statics.getLocalizedDetails = function(product: IProduct, language: Language): string {
  return product.details[language] || product.details.en;
};

ProductSchema.statics.getLocalizedFeatures = function(product: IProduct, language: Language): string[] {
  return product.features[language] || product.features.en;
};

ProductSchema.statics.getLocalizedMetaTitle = function(product: IProduct, language: Language): string {
  return product.metaTitle[language] || product.metaTitle.en;
};

ProductSchema.statics.getLocalizedMetaDescription = function(product: IProduct, language: Language): string {
  return product.metaDescription[language] || product.metaDescription.en;
};

// Pre-save middleware to generate slug from name if not provided
ProductSchema.pre('save', function(next) {
  if (!this.slug && this.name.en) {
    this.slug = this.name.en.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  next();
});

// Pre-save middleware to generate SKU if not provided
ProductSchema.pre('save', function(next) {
  if (!this.sku) {
    this.sku = `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }
  next();
});

// Export the Product model
export const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;