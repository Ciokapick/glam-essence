import { api } from '@/services/api';
import type { Product } from '@/data/products';

class StockUpdateEmitter {
  private listeners: Array<(productId: string, newStock: number) => void> = [];

  subscribe(listener: (productId: string, newStock: number) => void) {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter((entry) => entry !== listener); };
  }

  emit(productId: string, newStock: number) {
    this.listeners.forEach((listener) => listener(productId, newStock));
  }
}

export const stockUpdateEmitter = new StockUpdateEmitter();

export const initializeProductsDb = async () => {
  await api.products();
};

export const getAllProducts = async (): Promise<Record<string, Product>> => {
  const products = await api.products();
  return Object.fromEntries(products.map((product) => [product.slug, product]));
};

export const getProductStock = async (productId: string): Promise<number> => {
  const products = await api.products();
  return products.find((product) => product.id === productId)?.stock ?? 0;
};
