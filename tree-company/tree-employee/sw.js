// Версия 2.1 - Принудительный сброс кэша и Network-First стратегия
const CACHE_NAME = 'tree-employee-v2.1';
const ASSETS = [
    './',
    './index.html',
    './style.css?v=2.1',
    './employee.js?v=2.1',
    './manifest.json',
    './assets/tree.svg',
    './assets/icon-192.png',
    './assets/icon-512.png',
    './assets/free-icon-armenia-197516.png',
    './assets/free-icon-russia-9994030.png',
    './assets/united-kingdom.png',
    './assets/phone.png',
    './assets/wa-icon.png',
    './assets/viber.png',
    './assets/telegram.png'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                return caches.match(event.request, { ignoreSearch: true });
            })
    );
});
