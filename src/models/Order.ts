import mongoose, { Schema, Document } from 'mongoose';

// Order status type
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'canceled';

// Order item interface
interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Customer information interface
interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Payment information interface
interface PaymentInfo {
  method: 'stripe' | 'cash' | 'bank_transfer';
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionId?: string;
  paidAt?: Date;
}

// Order schema interface
export interface IOrder extends Document {
  // OrderNumber: string;
 identification
  order  
  // Customer information
  customer: CustomerInfo;
  
  // Order items
  items: OrderItem[];
  
  // Pricing
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  
  // Order status and tracking
  status: OrderStatus;
  
  // Payment information
  payment: PaymentInfo;
  
  // Shipping information
  shippingMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  
  // Order notes
  adminNotes?: string;
  customerNotes?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
}

// Order schema
const OrderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  
  // Customer information
  customer: {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true }
  },
  
  // Order items
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true }
  }],
  
  // Pricing
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  shipping: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Order status
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'completed', 'canceled'],
    default: 'pending'
  },
  
  // Payment information
  payment: {
    method: {
      type: String,
      enum: ['stripe', 'cash', 'bank_transfer'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: { type: String },
    paidAt: { type: Date }
  },
  
  // Shipping information
  shippingMethod: {
    type: String,
    required: true,
    default: 'standard'
  },
  trackingNumber: { type: String },
  estimatedDelivery: { type: Date },
  
  // Notes
  adminNotes: { type: String },
  customerNotes: { type: String },
  
  // Timestamps
  shippedAt: { type: Date },
  deliveredAt: { type: Date }
}, {
  timestamps: true
});

// Indexes for better performance
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ 'customer.email': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ 'payment.status': 1 });

// Pre-save middleware to generate order number
OrderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.orderNumber = `ORD-${timestamp.slice(-6)}${random}`;
  }
  next();
});

// Pre-save middleware to calculate totals
OrderSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.total = this.subtotal + this.tax + this.shipping;
  }
  next();
});

// Export the Order model
export const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;