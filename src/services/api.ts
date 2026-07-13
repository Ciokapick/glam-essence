import type { Product } from '@/data/products';

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
  products: () => request<Product[]>('/api/products'),
  product: (slug: string) => request<Product>(`/api/products/${encodeURIComponent(slug)}`),
  placeOrder: (input: Pick<Order, 'customer' | 'items'>) => request<Order>('/api/orders', { method: 'POST', body: JSON.stringify(input) }),
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
