#!/usr/bin/env ts-node

/**
 * MongoDB Connection Test and Seeding Script
 * This script tests the database connection and seeds sample data
 */

import { database } from '@/config/database';
import { Product } from '@/models/Product';
import { Order } from '@/models/Order';
import seedDatabase from './seedDatabase';

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...');
  
  try {
    // Test database connection
    await database.connect();
    
    // Check connection status
    const healthCheck = await database.isConnected();
    if (healthCheck) {
      console.log('✅ MongoDB connection successful!');
      
      // Test basic operations
      const productCount = await Product.countDocuments();
      const orderCount = await Order.countDocuments();
      
      console.log(`📊 Current database status:`);
      console.log(`   Products: ${productCount}`);
      console.log(`   Orders: ${orderCount}`);
      
      if (productCount === 0) {
        console.log('🌱 Database is empty. Seeding sample data...');
        await seedDatabase();
        
        // Verify seeding
        const newProductCount = await Product.countDocuments();
        const newOrderCount = await Order.countDocuments();
        
        console.log(`✅ Seeding completed!`);
        console.log(`   New products: ${newProductCount}`);
        console.log(`   New orders: ${newOrderCount}`);
      } else {
        console.log('ℹ️  Database already contains data. Skipping seeding.');
      }
      
      console.log('\n🎉 Database setup complete!');
      console.log('\n📋 Next steps:');
      console.log('   1. Run "npm run dev" to start the development server');
      console.log('   2. Visit http://localhost:5173 to see your site');
      console.log('   3. Test the multilingual features (EN/RO switcher)');
      console.log('   4. Access admin panel at /admin');
      
      return true;
    } else {
      console.log('❌ MongoDB connection failed!');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Database connection error:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure MongoDB is running');
    console.log('   2. Check your MONGODB_URI in .env.local');
    console.log('   3. For local MongoDB: make sure it\'s on port 27017');
    console.log('   4. For MongoDB Atlas: check your network settings');
    return false;
  } finally {
    try {
      await database.disconnect();
    } catch (error) {
      console.warn('⚠️  Error disconnecting from database:', error);
    }
  }
}

// Run the test
if (require.main === module) {
  testConnection()
    .then((success) => {
      if (success) {
        console.log('\n✨ Everything is ready! Happy coding! 🚀');
        process.exit(0);
      } else {
        console.log('\n❌ Setup failed. Please check the errors above.');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('❌ Unexpected error:', error);
      process.exit(1);
    });
}

export default testConnection;