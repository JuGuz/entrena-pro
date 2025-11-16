const CACHE = 'entrena-pro-v1';
const staticAssets = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(staticAssets)));
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request).then(fetchRes => {
            return caches.open(CACHE).then(cache => {
                cache.put(e.request, fetchRes.clone());
                return fetchRes;
            });
        }).catch(() => new Response('Offline', {headers: {'Content-Type': 'text/plain'}}))
    );
});
