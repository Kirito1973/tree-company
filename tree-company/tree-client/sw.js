const CACHE_NAME = 'tree-app-v11';
const ASSETS = [
    './',
    './index.html',
    './jobs.html',
    './form.html',
    './order-doors.html',
    './order-baseboards.html',
    './account.html',
    './style.css',
    './main.js',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Заставляем браузер немедленно принять эту версию
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    // Этот код уничтожит ВСЕ старые кэши на телефоне
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Стратегия: Сначала сеть (Интернет), если нет интернета — берем из кэша
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
