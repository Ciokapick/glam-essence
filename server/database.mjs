import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const dataDirectory = path.resolve(process.env.DATA_DIR || path.join(root, 'data'));
mkdirSync(dataDirectory, { recursive: true });

export const databasePath = path.join(dataDirectory, 'glam-essence.sqlite');
export const db = new DatabaseSync(databasePath);
db.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    price REAL NOT NULL CHECK(price >= 0),
    old_price REAL,
    image TEXT NOT NULL,
    gallery TEXT NOT NULL DEFAULT '[]',
    category TEXT NOT NULL,
    is_new INTEGER NOT NULL DEFAULT 0,
    is_sale INTEGER NOT NULL DEFAULT 0,
    rating REAL NOT NULL DEFAULT 0,
    review_count INTEGER NOT NULL DEFAULT 0,
    discount REAL,
    description TEXT NOT NULL DEFAULT '',
    details TEXT NOT NULL DEFAULT '',
    features TEXT NOT NULL DEFAULT '[]',
    sku TEXT NOT NULL UNIQUE,
    stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    total REAL NOT NULL CHECK(total >= 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','processing','completed','canceled')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL CHECK(price >= 0),
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    image TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    email TEXT PRIMARY KEY,
    locale TEXT NOT NULL DEFAULT 'ro',
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active','unsubscribed')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pending_checkouts (
    stripe_session_id TEXT PRIMARY KEY,
    payload TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','completed','expired')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const orderColumns = new Set(db.prepare('PRAGMA table_info(orders)').all().map((column) => column.name));
if (!orderColumns.has('payment_status')) db.exec("ALTER TABLE orders ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'cash_on_delivery'");
if (!orderColumns.has('payment_reference')) db.exec("ALTER TABLE orders ADD COLUMN payment_reference TEXT NOT NULL DEFAULT ''");

const seedProducts = JSON.parse(readFileSync(path.join(import.meta.dirname, 'seed-products.json'), 'utf8'));
const productCount = db.prepare('SELECT COUNT(*) AS count FROM products').get().count;

if (productCount === 0) {
  const insert = db.prepare(`
    INSERT INTO products (
      id, slug, name, price, old_price, image, gallery, category, is_new, is_sale,
      rating, review_count, discount, description, details, features, sku, stock
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  db.exec('BEGIN');
  try {
    for (const product of seedProducts) {
      insert.run(
        product.id, product.slug, product.name, product.price, product.oldPrice ?? null,
        product.image, JSON.stringify(product.gallery || []), product.category,
        product.isNew ? 1 : 0, product.isSale ? 1 : 0, product.rating || 0,
        product.reviewCount || 0, product.discount ?? null, product.description || '',
        product.details || '', JSON.stringify(product.features || []), product.sku, product.stock || 0,
      );
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

const decodeProduct = (row) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  price: row.price,
  oldPrice: row.old_price ?? undefined,
  image: row.image,
  gallery: JSON.parse(row.gallery),
  category: row.category,
  isNew: Boolean(row.is_new),
  isSale: Boolean(row.is_sale),
  rating: row.rating,
  reviewCount: row.review_count,
  discount: row.discount ?? undefined,
  description: row.description,
  details: row.details,
  features: JSON.parse(row.features),
  sku: row.sku,
  stock: row.stock,
});

export function listProducts() {
  return db.prepare('SELECT * FROM products ORDER BY CAST(id AS INTEGER), created_at').all().map(decodeProduct);
}

export function getProductBySlug(slug) {
  const row = db.prepare('SELECT * FROM products WHERE slug = ?').get(slug);
  return row ? decodeProduct(row) : null;
}

export function createProduct(input) {
  const id = randomUUID();
  const slugBase = String(input.slug || input.name).toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const slug = `${slugBase}-${id.slice(0, 6)}`;
  const image = input.image || 'https://placehold.co/800x800/png';
  db.prepare(`INSERT INTO products
    (id, slug, name, price, image, gallery, category, rating, review_count, description, details, features, sku, stock)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, ?, ?)`)
    .run(id, slug, input.name, input.price, image, JSON.stringify([image]), input.category,
      input.description || 'Produs nou în catalog.', input.details || '', JSON.stringify(input.features || []),
      input.sku || `GE-${id.slice(0, 8).toUpperCase()}`, input.stock || 0);
  return getProductBySlug(slug);
}

export function updateProduct(id, input) {
  const current = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  if (!current) return null;
  db.prepare(`UPDATE products SET name = ?, price = ?, category = ?, stock = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
    .run(input.name ?? current.name, input.price ?? current.price, input.category ?? current.category,
      input.stock ?? current.stock, input.image ?? current.image, id);
  return decodeProduct(db.prepare('SELECT * FROM products WHERE id = ?').get(id));
}

export function deleteProduct(id) {
  return db.prepare('DELETE FROM products WHERE id = ?').run(id).changes > 0;
}

export function createOrder(input) {
  const id = `GE-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`;
  const getProduct = db.prepare('SELECT * FROM products WHERE id = ?');
  const insertOrder = db.prepare(`INSERT INTO orders
    (id, customer_name, customer_email, customer_address, customer_phone, total, payment_status, payment_reference) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const insertItem = db.prepare(`INSERT INTO order_items
    (order_id, product_id, name, price, quantity, image, category) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const reduceStock = db.prepare('UPDATE products SET stock = stock - ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND stock >= ?');

  db.exec('BEGIN IMMEDIATE');
  try {
    let subtotal = 0;
    const items = input.items.map((item) => {
      const product = getProduct.get(item.id);
      if (!product) throw new Error(`Produsul ${item.id} nu mai există.`);
      const quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity < 1 || product.stock < quantity) {
        throw new Error(`Stoc insuficient pentru ${product.name}.`);
      }
      const unitPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;
      subtotal += unitPrice * quantity;
      return { product, quantity, unitPrice };
    });
    const total = Math.round((subtotal + 15) * 100) / 100;
    insertOrder.run(id, input.customer.name, input.customer.email, input.customer.address, input.customer.phone, total, input.paymentStatus || 'cash_on_delivery', input.paymentReference || '');
    for (const { product, quantity, unitPrice } of items) {
      if (reduceStock.run(quantity, product.id, quantity).changes !== 1) throw new Error(`Stoc insuficient pentru ${product.name}.`);
      insertItem.run(id, product.id, product.name, unitPrice, quantity, product.image, product.category);
    }
    db.exec('COMMIT');
    return getOrder(id);
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function decodeOrder(row) {
  const items = db.prepare('SELECT product_id AS id, name, price, quantity, image, category FROM order_items WHERE order_id = ?').all(row.id);
  return {
    id: row.id,
    items,
    total: row.total,
    customer: { name: row.customer_name, email: row.customer_email, address: row.customer_address, phone: row.customer_phone },
    status: row.status,
    paymentStatus: row.payment_status,
    paymentReference: row.payment_reference,
    date: row.created_at,
  };
}

export function getOrder(id) {
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
  return row ? decodeOrder(row) : null;
}

export function listOrders() {
  return db.prepare('SELECT * FROM orders ORDER BY datetime(created_at) DESC').all().map(decodeOrder);
}

export function updateOrderStatus(id, status) {
  return db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id).changes > 0 ? getOrder(id) : null;
}

export function deleteOrder(id) {
  return db.prepare('DELETE FROM orders WHERE id = ?').run(id).changes > 0;
}

export function prepareCheckout(items) {
  const getProduct = db.prepare('SELECT * FROM products WHERE id = ?');
  return items.map((item) => {
    const product = getProduct.get(item.id);
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || product.stock < quantity) throw new Error('Un produs nu mai este disponibil în cantitatea selectată.');
    const price = product.discount ? product.price * (1 - product.discount / 100) : product.price;
    return { id: product.id, name: product.name, image: product.image, category: product.category, quantity, price };
  });
}

export function savePendingCheckout(sessionId, input) {
  db.prepare('INSERT OR REPLACE INTO pending_checkouts (stripe_session_id, payload) VALUES (?, ?)').run(sessionId, JSON.stringify(input));
}

export function completePendingCheckout(sessionId) {
  const row = db.prepare("SELECT * FROM pending_checkouts WHERE stripe_session_id = ? AND status = 'pending'").get(sessionId);
  if (!row) return null;
  const input = JSON.parse(row.payload);
  const order = createOrder({ ...input, paymentStatus: 'paid', paymentReference: sessionId });
  db.prepare("UPDATE pending_checkouts SET status = 'completed', updated_at = CURRENT_TIMESTAMP WHERE stripe_session_id = ?").run(sessionId);
  return order;
}

export function subscribeNewsletter(email, locale = 'ro') {
  db.prepare(`INSERT INTO newsletter_subscribers (email, locale) VALUES (?, ?)
    ON CONFLICT(email) DO UPDATE SET locale = excluded.locale, status = 'active', updated_at = CURRENT_TIMESTAMP`).run(email, locale);
  return { email, locale, status: 'active' };
}
