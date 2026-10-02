import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist', 'web');
const webFiles = [
  'index.html',
  'styles-base.css',
  'styles.css',
  'storage.js',
  'feedback-config.js',
  'app.js',
  'sw.js',
  'manifest.webmanifest'
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of webFiles) {
  await cp(resolve(root, file), resolve(output, file));
}
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const serviceWorkerPath = resolve(output, 'sw.js');
const serviceWorker = await readFile(serviceWorkerPath, 'utf8');
await writeFile(serviceWorkerPath, serviceWorker.replace('agra-shell-v1', `agra-shell-v${packageJson.version}`), 'utf8');
console.log(`AGRA web build ready: ${output}`);
