import { api } from '@/services/api';
import { products as staticProducts, type Product } from '@/data/products';

const staticCatalogue = Object.values(staticProducts);
let catalogueRequest: Promise<Product[]> | null = null;
let cachedCatalogue: Product[] | null = null;

const loadCatalogue = () => {
  if (cachedCatalogue) return Promise.resolve(cachedCatalogue);
  if (!catalogueRequest) {
    catalogueRequest = api.products()
      .then((products) => {
        cachedCatalogue = products;
        return products;
      })
      .finally(() => {
        catalogueRequest = null;
      });
  }
  return catalogueRequest;
};

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
  await loadCatalogue();
};

export const getAllProducts = async (): Promise<Record<string, Product>> => {
  const products = await loadCatalogue();
  return Object.fromEntries(products.map((product) => [product.slug, product]));
};

export const getProductStockSnapshot = (productId: string): number =>
  staticCatalogue.find((product) => product.id === productId)?.stock ?? 0;

export const getProductStock = async (productId: string): Promise<number> => {
  const products = await loadCatalogue();
  return products.find((product) => product.id === productId)?.stock ?? getProductStockSnapshot(productId);
};
