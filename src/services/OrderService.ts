import { Order, IOrder, OrderStatus } from '@/models/Order';
import mongoose from 'mongoose';

// Order service class
export class OrderService {
  
  /**
   * Get all orders with optional filtering and pagination
   */
  static async getAllOrders(options: {
    status?: OrderStatus;
    email?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}) {
    const {
      status,
      email,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = options;

    // Build query
    const query: any = {};
    
    if (status) query.status = status;
    if (email) query['customer.email'] = email.toLowerCase();

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === 'asc' ? 1 : -1;
    
    const orders = await Order.find(query)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Order.countDocuments(query);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get order by ID
   */
  static async getOrderById(id: string) {
    const order = await Order.findById(id).lean();
    return order;
  }

  /**
   * Get order by order number
   */
  static async getOrderByOrderNumber(orderNumber: string) {
    const order = await Order.findOne({ orderNumber }).lean();
    return order;
  }

  /**
   * Get orders by customer email
   */
  static async getOrdersByEmail(email: string) {
    const orders = await Order.find({ 'customer.email': email.toLowerCase() })
      .sort({ createdAt: -1 })
      .lean();
    return orders;
  }

  /**
   * Create a new order
   */
  static async createOrder(orderData: Partial<IOrder>) {
    try {
      const order = new Order(orderData);
      await order.save();
      return order.toObject();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to create order: ${errorMessage}`);
    }
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(id: string, status: OrderStatus, notes?: string) {
    try {
      const updateData: any = { 
        status, 
        updatedAt: new Date() 
      };

      // Add timestamps based on status
      if (status === 'shipped') {
        updateData.shippedAt = new Date();
      } else if (status === 'delivered') {
        updateData.deliveredAt = new Date();
      }

      if (notes) {
        updateData.adminNotes = notes;
      }

      const order = await Order.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!order) {
        throw new Error('Order not found');
      }

      return order.toObject();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to update order status: ${errorMessage}`);
    }
  }

  /**
   * Update payment status
   */
  static async updatePaymentStatus(
    id: string, 
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded',
    transactionId?: string
  ) {
    try {
      const updateData: any = {
        'payment.status': paymentStatus,
        updatedAt: new Date()
      };

      if (transactionId) {
        updateData['payment.transactionId'] = transactionId;
      }

      if (paymentStatus === 'paid') {
        updateData['payment.paidAt'] = new Date();
      }

      const order = await Order.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!order) {
        throw new Error('Order not found');
      }

      return order.toObject();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to update payment status: ${errorMessage}`);
    }
  }

  /**
   * Delete an order
   */
  static async deleteOrder(id: string) {
    try {
      const order = await Order.findByIdAndDelete(id);
      
      if (!order) {
        throw new Error('Order not found');
      }

      return { message: 'Order deleted successfully' };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to delete order: ${errorMessage}`);
    }
  }

  /**
   * Get order statistics
   */
  static async getOrderStats() {
    try {
      const stats = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: '$total' },
            averageOrderValue: { $avg: '$total' },
            pendingOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
            },
            processingOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'processing'] }, 1, 0] }
            },
            completedOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
            },
            canceledOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'canceled'] }, 1, 0] }
            },
            paidOrders: {
              $sum: { $cond: [{ $eq: ['$payment.status', 'paid'] }, 1, 0] }
            },
            pendingPayments: {
              $sum: { $cond: [{ $eq: ['$payment.status', 'pending'] }, 1, 0] }
            }
          }
        }
      ]);

      return stats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        pendingOrders: 0,
        processingOrders: 0,
        completedOrders: 0,
        canceledOrders: 0,
        paidOrders: 0,
        pendingPayments: 0
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to get order stats: ${errorMessage}`);
    }
  }

  /**
   * Get recent orders for dashboard
   */
  static async getRecentOrders(limit: number = 5) {
    try {
      const orders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

      return orders;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to get recent orders: ${errorMessage}`);
    }
  }

  /**
   * Search orders
   */
  static async searchOrders(searchTerm: string) {
    try {
      const orders = await Order.find({
        $or: [
          { orderNumber: { $regex: searchTerm, $options: 'i' } },
          { 'customer.name': { $regex: searchTerm, $options: 'i' } },
          { 'customer.email': { $regex: searchTerm, $options: 'i' } },
          { 'customer.phone': { $regex: searchTerm, $options: 'i' } }
        ]
      })
        .sort({ createdAt: -1 })
        .lean();

      return orders;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to search orders: ${errorMessage}`);
    }
  }

  /**
   * Get orders by date range
   */
  static async getOrdersByDateRange(startDate: Date, endDate: Date) {
    try {
      const orders = await Order.find({
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      })
        .sort({ createdAt: -1 })
        .lean();

      return orders;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to get orders by date range: ${errorMessage}`);
    }
  }
}

export default OrderService;