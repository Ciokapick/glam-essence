import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import {
  databasePath, listProducts, getProductBySlug, createProduct, updateProduct, deleteProduct,
  createOrder, listOrders, updateOrderStatus, deleteOrder,
} from './database.mjs';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const port = Number(process.env.PORT || 3001);
const sessions = new Map();
const allowedStatuses = new Set(['pending', 'processing', 'completed', 'canceled']);

const json = (res, status, payload, headers = {}) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(JSON.stringify(payload));
};

const readJson = async (req) => {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 1_000_000) throw new Error('Cererea este prea mare.');
  }
  return JSON.parse(raw || '{}');
};

const equal = (left, right) => {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && timingSafeEqual(a, b);
};

const sessionId = (req) => req.headers.cookie?.split(';').map((part) => part.trim()).find((part) => part.startsWith('ge_session='))?.split('=')[1];
const isAdmin = (req) => Boolean(sessionId(req) && sessions.has(sessionId(req)));

const validateProduct = (body) => {
  if (!String(body.name || '').trim() || !String(body.category || '').trim()) throw new Error('Numele și categoria sunt obligatorii.');
  if (!Number.isFinite(Number(body.price)) || Number(body.price) < 0) throw new Error('Prețul nu este valid.');
  if (!Number.isInteger(Number(body.stock)) || Number(body.stock) < 0) throw new Error('Stocul nu este valid.');
  return { ...body, name: String(body.name).trim(), category: String(body.category).trim(), price: Number(body.price), stock: Number(body.stock) };
};

async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/health') return json(res, 200, { status: 'ok', database: path.basename(databasePath) });
  if (req.method === 'GET' && url.pathname === '/api/products') return json(res, 200, listProducts());
  if (req.method === 'GET' && url.pathname.startsWith('/api/products/')) {
    const product = getProductBySlug(decodeURIComponent(url.pathname.slice('/api/products/'.length)));
    return product ? json(res, 200, product) : json(res, 404, { error: 'Produsul nu a fost găsit.' });
  }
  if (req.method === 'POST' && url.pathname === '/api/orders') {
    const body = await readJson(req);
    const customer = body.customer || {};
    if (!Array.isArray(body.items) || body.items.length === 0) return json(res, 400, { error: 'Coșul este gol.' });
    if (!customer.name || !customer.address || !customer.phone || !/^\S+@\S+\.\S+$/.test(customer.email || '')) {
      return json(res, 400, { error: 'Datele de livrare nu sunt complete.' });
    }
    return json(res, 201, createOrder(body));
  }
  if (req.method === 'POST' && url.pathname === '/api/admin/login') {
    const body = await readJson(req);
    const email = process.env.ADMIN_EMAIL || 'admin@glam-essence.local';
    const password = process.env.ADMIN_PASSWORD || 'glam-demo-2026';
    if (!equal(body.email, email) || !equal(body.password, password)) return json(res, 401, { error: 'Date de autentificare incorecte.' });
    const token = randomBytes(32).toString('hex');
    sessions.set(token, Date.now());
    return json(res, 200, { authenticated: true }, { 'Set-Cookie': `ge_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${process.env.NODE_ENV === 'production' ? '; Secure' : ''}` });
  }
  if (req.method === 'GET' && url.pathname === '/api/admin/session') return json(res, isAdmin(req) ? 200 : 401, { authenticated: isAdmin(req) });
  if (req.method === 'POST' && url.pathname === '/api/admin/logout') {
    sessions.delete(sessionId(req));
    return json(res, 200, { authenticated: false }, { 'Set-Cookie': 'ge_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0' });
  }
  if (url.pathname.startsWith('/api/admin/') && !isAdmin(req)) return json(res, 401, { error: 'Autentificare necesară.' });
  if (req.method === 'GET' && url.pathname === '/api/admin/orders') return json(res, 200, listOrders());
  if (req.method === 'PATCH' && /^\/api\/admin\/orders\/[^/]+$/.test(url.pathname)) {
    const body = await readJson(req);
    if (!allowedStatuses.has(body.status)) return json(res, 400, { error: 'Status invalid.' });
    const order = updateOrderStatus(decodeURIComponent(url.pathname.split('/').pop()), body.status);
    return order ? json(res, 200, order) : json(res, 404, { error: 'Comanda nu există.' });
  }
  if (req.method === 'DELETE' && /^\/api\/admin\/orders\/[^/]+$/.test(url.pathname)) {
    return deleteOrder(decodeURIComponent(url.pathname.split('/').pop())) ? json(res, 204, {}) : json(res, 404, { error: 'Comanda nu există.' });
  }
  if (req.method === 'POST' && url.pathname === '/api/admin/products') return json(res, 201, createProduct(validateProduct(await readJson(req))));
  if (req.method === 'PATCH' && /^\/api\/admin\/products\/[^/]+$/.test(url.pathname)) {
    const product = updateProduct(decodeURIComponent(url.pathname.split('/').pop()), validateProduct(await readJson(req)));
    return product ? json(res, 200, product) : json(res, 404, { error: 'Produsul nu există.' });
  }
  if (req.method === 'DELETE' && /^\/api\/admin\/products\/[^/]+$/.test(url.pathname)) {
    return deleteProduct(decodeURIComponent(url.pathname.split('/').pop())) ? json(res, 204, {}) : json(res, 404, { error: 'Produsul nu există.' });
  }
  return json(res, 404, { error: 'Rută API inexistentă.' });
}

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon' };

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try {
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    const requested = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
    let file = path.resolve(dist, requested);
    if (!file.startsWith(dist)) return json(res, 403, { error: 'Acces interzis.' });
    try { if (!(await stat(file)).isFile()) file = path.join(dist, 'index.html'); } catch { file = path.join(dist, 'index.html'); }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch (error) {
    console.error(error);
    json(res, error instanceof SyntaxError ? 400 : 422, { error: error.message || 'Eroare internă.' });
  }
});

server.listen(port, () => console.log(`Glam Essence API: http://localhost:${port} | SQLite: ${databasePath}`));
