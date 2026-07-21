// Версия 6 - Полностью обновленный кэш (принудительный сброс старых файлов)
const CACHE_NAME = 'tree-company-v6';
const ASSETS = [
  './',
  './index.html',
  './orders.html',
  './cabinet.html',
  './cooperation.html',
  './jobs.html',
  './form.html',
  './order-doors.html',
  './order-baseboards.html',
  './style.css?v=6.0',
  './main.js?v=6.0',
  './manifest.json',
  './assets/tree.svg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-512-maskable.png',
  './assets/apple-touch-icon.png',
  './assets/free-icon-armenia-197516.png',
  './assets/free-icon-russia-9994030.png',
  './assets/united-kingdom.png'
];

self.addEventListener('install', (event) => {
  // Заставляем Service Worker активироваться немедленно
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Получаем контроль над всеми клиентами сразу после активации
  event.waitUntil(clients.claim());
  
  // Удаляем все старые кэши (включая tree-company-v5)
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

// Стратегия "Сначала сеть, потом кэш"
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Если скачали новый файл из сети, обновляем его в кэше
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      })
      .catch(() => {
        // Если сети нет, берем из кэша
        return caches.match(event.request);
      })
  );
});
