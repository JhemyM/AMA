import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import JavaScriptObfuscator from 'javascript-obfuscator';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist', 'web');
const webFiles = [
  'index.html',
  'demo.html',
  'login.html',
  'login.js',
  'styles-base.css',
  'styles.css',
  'storage.js',
  'database_sync.js',
  'feedback-config.js',
  'monetization.js',
  'app.js',
  'sw.js',
  'manifest.webmanifest',
  'supabase-client.js',
  'clear_cache.html'
];

const obfConfig = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 5,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 5,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of webFiles) {
  if (file.endsWith('.js') && file !== 'sw.js') {
    let content = await readFile(resolve(root, file), 'utf8');
    
    // Inject Supabase Key from Vercel Env
    if (file === 'supabase-client.js' && process.env.SUPABASE_ANON_KEY) {
      content = content.replace('__INJECT_SUPABASE_ANON_KEY__', process.env.SUPABASE_ANON_KEY);
    }
    
    const obfuscated = JavaScriptObfuscator.obfuscate(content, obfConfig).getObfuscatedCode();
    await writeFile(resolve(output, file), obfuscated, 'utf8');
  } else {
    await cp(resolve(root, file), resolve(output, file));
  }
}

// Copy icons directory and background image
await cp(resolve(root, 'icons'), resolve(output, 'icons'), { recursive: true });
await cp(resolve(root, 'bg-login.jpg'), resolve(output, 'bg-login.jpg'));

// Handle sw.js separately
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const serviceWorkerPath = resolve(output, 'sw.js');
const serviceWorker = await readFile(serviceWorkerPath, 'utf8');
await writeFile(serviceWorkerPath, serviceWorker.replace(/agra-shell-v[0-9.]+/, `agra-shell-v${packageJson.version}`), 'utf8');

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
const carbonHtml = await readFile(resolve(root, 'modules/carbon.html'), 'utf8');

function obf(code) { return JavaScriptObfuscator.obfuscate(code, obfConfig).getObfuscatedCode(); }

const fieldsJs = obf(await readFile(resolve(root, 'modules/fields.js'), 'utf8'));
const tasksJs = obf(await readFile(resolve(root, 'modules/tasks.js'), 'utf8'));
const embrapaJs = obf(await readFile(resolve(root, 'modules/embrapa.js'), 'utf8'));
const soilJs = obf(await readFile(resolve(root, 'modules/soil.js'), 'utf8'));
const prodJs = obf(await readFile(resolve(root, 'modules/production.js'), 'utf8'));
const invJs = obf(await readFile(resolve(root, 'modules/inventory.js'), 'utf8'));
const weatherJs = obf(await readFile(resolve(root, 'modules/weather.js'), 'utf8'));
const teamJs = obf(await readFile(resolve(root, 'modules/team.js'), 'utf8'));
const carbonJs = obf(await readFile(resolve(root, 'modules/carbon.js'), 'utf8'));

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
  ${carbonJs}
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
<template id="tpl-carbon">${carbonHtml}</template>
`;

indexHtml = indexHtml.replace('</body>', () => `${templates}\n${injectedScripts}\n</body>`);
await writeFile(resolve(output, 'index.html'), indexHtml, 'utf8');

try {
  let demoHtml = await readFile(resolve(output, 'demo.html'), 'utf8');
  demoHtml = demoHtml.replace('</body>', () => `${templates}\n${injectedScripts}\n</body>`);
  await writeFile(resolve(output, 'demo.html'), demoHtml, 'utf8');
} catch (e) {}

console.log(`AGRA web build ready: ${output} (Obfuscated)`);
