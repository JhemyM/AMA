import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist', 'web');
const webFiles = [
  'index.html',
  'styles-base.css',
  'styles.css',
  'storage.js',
  'app.js',
  'sw.js',
  'manifest.webmanifest'
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of webFiles) {
  await cp(resolve(root, file), resolve(output, file));
}
console.log(`AGRA web build ready: ${output}`);
