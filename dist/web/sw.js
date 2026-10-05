const CACHE_NAME = 'agra-shell-v0.7.3';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './storage.js',
  './app.js',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Do not fail installation if a file is missing
      return Promise.allSettled(APP_SHELL.map(url => cache.add(url).catch(e => console.warn('SW Cache fail:', url))));
    })
  );
  self.skipWaiting(); // Force immediately taking over
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim()) // Immediately control all pages to break the 404 loop
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Network-First Strategy to prevent caching 404s and force updates
  event.respondWith(
    fetch(event.request).then((response) => {
      // ONLY cache valid responses
      if (response && response.status === 200 && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => {
      // Offline fallback
      return caches.match(event.request).then((cached) => cached || caches.match('./index.html'));
    })
  );
});
