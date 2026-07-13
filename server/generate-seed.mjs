import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const compiledPath = path.join(root, 'node_modules', '.cache', 'glam-products.mjs');

await mkdir(path.dirname(compiledPath), { recursive: true });
await build({
  entryPoints: [path.join(root, 'src/data/products.ts')],
  outfile: compiledPath,
  platform: 'node',
  format: 'esm',
});

const { products } = await import(`${pathToFileURL(compiledPath).href}?v=${Date.now()}`);
await mkdir(path.join(root, 'server'), { recursive: true });
await writeFile(
  path.join(root, 'server', 'seed-products.json'),
  `${JSON.stringify(Object.values(products), null, 2)}\n`,
);

console.log(`Generated seed for ${Object.keys(products).length} products.`);
