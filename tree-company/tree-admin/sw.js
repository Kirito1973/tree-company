const CACHE_NAME = 'tree-admin-v5.3.0';
const ASSETS = [
    './',
    './index.html',
    './style.css?v=5.3.0',
    './js/core.js?v=5.3.0',
    './js/dashboard.js?v=5.3.0',
    './js/orders.js?v=5.3.0',
    './js/finance.js?v=5.3.0',
    './js/employees.js?v=5.3.0',
    './js/partners.js?v=5.3.0',
    './js/clients.js?v=5.3.0',
    './js/management.js?v=5.3.0',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        return Promise.allSettled(ASSETS.map(asset => cache.add(asset).catch(err => console.warn('Skip:', asset))));
    }));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    event.waitUntil(caches.keys().then((keys) => {
        return Promise.all(keys.map((key) => {
            if (key !== CACHE_NAME) return caches.delete(key);
        }));
    }));
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
            }
            return networkResponse;
        }).catch(() => {
            return caches.match(event.request, { ignoreSearch: true });
        })
    );
});
