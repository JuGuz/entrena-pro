const CACHE_NAME = 'entrena-pro-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Agrega aquí URLs de imágenes si quieres cachearlas explícitamente, pero el SW las cacheará dinámicamente al cargar
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.log('Error en cache durante install:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request)
          .then(fetchResponse => {
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }
            var responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
            return fetchResponse;
          })
          .catch(() => new Response('<h1>Modo Offline</h1><p>Conéctate para cargar imágenes nuevas.</p>', { headers: { 'Content-Type': 'text/html' } }));
      })
  );
});
