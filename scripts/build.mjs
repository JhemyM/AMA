import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist', 'web');
const webFiles = [
  'index.html',
  'login.html',
  'login.js',
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
// Copy icons directory
await cp(resolve(root, 'icons'), resolve(output, 'icons'), { recursive: true });

// We no longer copy the modules directory directly. Instead, we bundle it.
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const serviceWorkerPath = resolve(output, 'sw.js');
const serviceWorker = await readFile(serviceWorkerPath, 'utf8');
await writeFile(serviceWorkerPath, serviceWorker.replace('agra-shell-v1', `agra-shell-v${packageJson.version}`), 'utf8');

// Bundle modules into index.html
let indexHtml = await readFile(resolve(output, 'index.html'), 'utf8');

const fieldsHtml = await readFile(resolve(root, 'modules/fields.html'), 'utf8');
const tasksHtml = await readFile(resolve(root, 'modules/tasks.html'), 'utf8');
const embrapaHtml = await readFile(resolve(root, 'modules/embrapa.html'), 'utf8');
const soilHtml = await readFile(resolve(root, 'modules/soil.html'), 'utf8');
const prodHtml = await readFile(resolve(root, 'modules/production.html'), 'utf8');
const invHtml = await readFile(resolve(root, 'modules/inventory.html'), 'utf8');
const weatherHtml = await readFile(resolve(root, 'modules/weather.html'), 'utf8');
const teamHtml = await readFile(resolve(root, 'modules/team.html'), 'utf8');

const fieldsJs = await readFile(resolve(root, 'modules/fields.js'), 'utf8');
const tasksJs = await readFile(resolve(root, 'modules/tasks.js'), 'utf8');
const embrapaJs = await readFile(resolve(root, 'modules/embrapa.js'), 'utf8');
const soilJs = await readFile(resolve(root, 'modules/soil.js'), 'utf8');
const prodJs = await readFile(resolve(root, 'modules/production.js'), 'utf8');
const invJs = await readFile(resolve(root, 'modules/inventory.js'), 'utf8');
const weatherJs = await readFile(resolve(root, 'modules/weather.js'), 'utf8');
const teamJs = await readFile(resolve(root, 'modules/team.js'), 'utf8');

const injectedScripts = `
<script>
  ${fieldsJs}
  ${tasksJs}
  ${embrapaJs}
  ${soilJs}
  ${prodJs}
  ${invJs}
  ${weatherJs}
  ${teamJs}
</script>
`;

const templates = `
<template id="tpl-fields">${fieldsHtml}</template>
<template id="tpl-tasks">${tasksHtml}</template>
<template id="tpl-embrapa">${embrapaHtml}</template>
<template id="tpl-soil">${soilHtml}</template>
<template id="tpl-production">${prodHtml}</template>
<template id="tpl-inventory">${invHtml}</template>
<template id="tpl-weather">${weatherHtml}</template>
<template id="tpl-team">${teamHtml}</template>
`;

indexHtml = indexHtml.replace('</body>', `${templates}\n${injectedScripts}\n</body>`);
await writeFile(resolve(output, 'index.html'), indexHtml, 'utf8');

console.log(`AGRA web build ready: ${output}`);
