import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import test from 'node:test';

const dataDirectory = await mkdtemp(path.join(os.tmpdir(), 'glam-essence-test-'));
const port = await new Promise((resolve, reject) => {
  const probe = net.createServer();
  probe.once('error', reject);
  probe.listen(0, '127.0.0.1', () => {
    const address = probe.address();
    probe.close(() => resolve(address.port));
  });
});

const server = spawn(process.execPath, ['server/index.mjs'], {
  cwd: path.resolve(import.meta.dirname, '..'),
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: String(port),
    DATA_DIR: dataDirectory,
    ADMIN_EMAIL: '',
    ADMIN_PASSWORD: '',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let startupOutput = '';
server.stdout.on('data', (chunk) => { startupOutput += chunk; });
server.stderr.on('data', (chunk) => { startupOutput += chunk; });

await Promise.race([
  new Promise((resolve) => {
    const check = () => startupOutput.includes('Glam Essence API:') ? resolve() : setTimeout(check, 20);
    check();
  }),
  new Promise((_, reject) => setTimeout(() => reject(new Error(`Server startup timed out:\n${startupOutput}`)), 5_000)),
  once(server, 'exit').then(([code]) => { throw new Error(`Server exited with ${code}:\n${startupOutput}`); }),
]);

const request = (pathname, init) => fetch(`http://127.0.0.1:${port}${pathname}`, init);

test.after(async () => {
  server.kill('SIGTERM');
  await Promise.race([once(server, 'exit'), new Promise((resolve) => setTimeout(resolve, 1_000))]);
  await rm(dataDirectory, { recursive: true, force: true });
});

test('health and SPA fallback are available in production', async () => {
  const health = await request('/api/health');
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: 'ok', database: 'glam-essence.sqlite' });

  const route = await request('/parfumuri');
  assert.equal(route.status, 200);
  assert.match(route.headers.get('content-type'), /text\/html/);
  assert.match(await route.text(), /<div id="root">/);
});

test('production admin login fails closed when credentials are absent', async () => {
  const response = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'admin@glam-essence.local', password: 'glam-demo-2026' }),
  });

  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /nu este configurat/i);
});

test('checkout ignores browser prices and persists the server-owned total', async () => {
  const productsResponse = await request('/api/products');
  const products = await productsResponse.json();
  const product = products.find((candidate) => candidate.stock > 0);
  assert.ok(product, 'The seed must contain an in-stock product');

  const response = await request('/api/orders', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      customer: {
        name: 'Test Customer',
        email: 'test@example.com',
        address: '1 Test Street',
        phone: '+40 700 000 000',
      },
      items: [{ id: product.id, quantity: 1, price: 0 }],
    }),
  });

  assert.equal(response.status, 201);
  const order = await response.json();
  assert.equal(order.items[0].price, product.discount ? product.price * (1 - product.discount / 100) : product.price);
  assert.ok(order.total > 15, 'The total must be recomputed from catalog data plus shipping');

  const updatedProducts = await (await request('/api/products')).json();
  assert.equal(updatedProducts.find((candidate) => candidate.id === product.id).stock, product.stock - 1);
});
