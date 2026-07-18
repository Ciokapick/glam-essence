import { products as staticProducts, type Product } from '@/data/products';

// Static-hosting fallback: on deployments without the Node backend (e.g. the
// Netlify demo) the read-only catalogue is served from the bundled data so
// product pages keep working. Orders/admin still require the real API.
const staticCatalogue = Object.values(staticProducts);

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'canceled';

export interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
  }>;
  total: number;
  customer: { name: string; email: string; address: string; phone: string };
  status: OrderStatus;
  paymentStatus?: 'cash_on_delivery' | 'paid';
  paymentReference?: string;
  date: string;
}

export type ProductInput = Pick<Product, 'name' | 'price' | 'category' | 'stock' | 'image'> & Partial<Product>;

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    credentials: 'same-origin',
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.error || 'Cererea nu a putut fi procesată.');
  return payload as T;
}

export const api = {
  products: async () => {
    try {
      // On static hosting the SPA fallback answers /api/* with index.html and
      // status 200, so a missing backend surfaces as a null/invalid payload,
      // not as a thrown error — validate the shape before trusting it.
      const list = await request<Product[]>('/api/products');
      if (Array.isArray(list)) return list;
    } catch {
      /* fall through to static catalogue */
    }
    return staticCatalogue;
  },
  product: async (slug: string) => {
    try {
      const product = await request<Product>(`/api/products/${encodeURIComponent(slug)}`);
      if (product?.slug) return product;
    } catch {
      /* fall through to static catalogue */
    }
    const product = staticCatalogue.find((p) => p.slug === slug);
    if (product) return product;
    throw new Error('Product not found.');
  },
  placeOrder: (input: Pick<Order, 'customer' | 'items'>) => request<Order>('/api/orders', { method: 'POST', body: JSON.stringify(input) }),
  checkoutConfig: () => request<{ cardPayments: boolean }>('/api/checkout/config'),
  createCheckoutSession: (input: Pick<Order, 'customer' | 'items'>) => request<{ id: string; url: string }>('/api/checkout/session', { method: 'POST', body: JSON.stringify(input) }),
  subscribe: (email: string, locale: 'ro' | 'en') => request<{ email: string; status: string }>('/api/newsletter', { method: 'POST', body: JSON.stringify({ email, locale }) }),
  login: (email: string, password: string) => request<{ authenticated: true }>('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  session: () => request<{ authenticated: boolean }>('/api/admin/session'),
  logout: () => request<{ authenticated: false }>('/api/admin/logout', { method: 'POST' }),
  orders: () => request<Order[]>('/api/admin/orders'),
  updateOrderStatus: (id: string, status: OrderStatus) => request<Order>(`/api/admin/orders/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteOrder: (id: string) => request<void>(`/api/admin/orders/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  createProduct: (product: ProductInput) => request<Product>('/api/admin/products', { method: 'POST', body: JSON.stringify(product) }),
  updateProduct: (id: string, product: ProductInput) => request<Product>(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(product) }),
  deleteProduct: (id: string) => request<void>(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};
