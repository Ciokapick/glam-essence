// Database service to manage connection and initialization
import { database } from '@/config/database';

// Database service class
export class DatabaseService {
  private static isInitialized = false;

  /**
   * Initialize database connection
   */
  static async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      await database.connect();
      this.isInitialized = true;
      console.log('✅ Database service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize database service:', error);
      throw error;
    }
  }

  /**
   * Check if database is connected
   */
  static isConnected(): boolean {
    return database.isConnected();
  }

  /**
   * Disconnect from database
   */
  static async disconnect(): Promise<void> {
    if (!this.isInitialized) {
      return;
    }

    try {
      await database.disconnect();
      this.isInitialized = false;
      console.log('✅ Database service disconnected');
    } catch (error) {
      console.error('❌ Failed to disconnect database service:', error);
      throw error;
    }
  }

  /**
   * Health check for database connection
   */
  static async healthCheck(): Promise<{
    connected: boolean;
    status: string;
    timestamp: Date;
  }> {
    try {
      const connected = this.isConnected();
      return {
        connected,
        status: connected ? 'healthy' : 'disconnected',
        timestamp: new Date()
      };
    } catch (error) {
      return {
        connected: false,
        status: 'error',
        timestamp: new Date()
      };
    }
  }
}

export default DatabaseService;