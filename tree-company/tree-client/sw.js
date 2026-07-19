const CACHE_NAME = 'tree-client-cache-v8'; // Обновили версию для сброса старого кэша
const urlsToCache = [
  './',
  './index.html',
  './form.html',
  './jobs.html',
  './order-baseboards.html',
  './order-doors.html',
  './account.html',
  './style.css',
  './main.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Заставляем новый SW сразу браться за работу
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Удаляем старые кэши, оставляем только актуальный
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Стратегия Network First: Сначала проверяем сеть (интернет)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Если интернет есть, скачиваем свежий файл и обновляем кэш
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return response;
      })
      .catch(() => {
        // Если интернета нет, берем последний сохраненный файл из кэша
        return caches.match(event.request);
      })
  );
});
