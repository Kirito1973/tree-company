// Версия 18.1 - Принудительный сброс кэша
const CACHE_NAME = 'tree-company-v18.1';
const ASSETS = [
  './',
  './index.html',
  './orders.html',
  './cabinet.html',
  './cooperation.html',
  './jobs.html',
  './order-doors.html',
  './order-baseboards.html',
  './style.css?v=18.1',
  './main.js?v=18.1',
  './manifest.json',
  './assets/tree.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-512-maskable.png',
  './assets/apple-touch-icon.png',
  './assets/free-icon-armenia-197516.png',
  './assets/free-icon-russia-9994030.png',
  './assets/united-kingdom.png',
  './assets/phone.png',
  './assets/wa-icon.png',
  './assets/viber.png',
  './assets/telegram.png',
  './assets/list-icon.png',
  './assets/tt-icon.png'
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
