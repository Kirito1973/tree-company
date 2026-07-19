const CACHE_NAME = 'tree-dev-cache-v10';

self.addEventListener('install', event => {
    self.skipWaiting(); // Моментально активируем новый Service Worker
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim()); // Забираем контроль над страницей
});

// Стратегия Network First (Сначала сеть, потом кэш)
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET' || event.request.url.includes('/api/')) return;
    
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Если интернет есть, сохраняем свежий файл в кэш
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            })
            .catch(() => {
                // Если интернета нет, берем из кэша
                return caches.match(event.request);
            })
    );
});
