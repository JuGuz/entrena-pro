const CACHE = 'entrena-pro-v1';
const urls = ['/', '/index.html', '/manifest.json', '/offline.html', 'https://cdn.tailwindcss.com'];

// Instalación: precacheo básico
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(urls))
  );
});

// Activación: tomar control inmediatamente
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

// Estrategia: cache first para recursos estáticos, con fallback offline
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(networkRes => {
        // Guardar en cache una copia de lo que venga por la red (si es exitoso)
        try {
          const clone = networkRes.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        } catch (err) { /* no bloquear por errores de cache */ }
        return networkRes;
      }).catch(() => {
        // si falla la red, devolver página offline para navegación HTML
        return caches.match('/offline.html');
      });
    })
  );
});
