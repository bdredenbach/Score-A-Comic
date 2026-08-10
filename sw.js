/* Comic Scorer service worker.
   Caches the app shell so it launches with no connection. API calls to
   Anthropic and Stability always go to the network — they're never cached. */

const CACHE = 'comic-scorer-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './scorer-icon-192.png',
  './scorer-icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // addAll fails the whole install if any single file 404s, so add
      // them individually and tolerate misses.
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never cache the APIs — always live.
  if (url.hostname.endsWith('api.anthropic.com') || url.hostname.endsWith('api.stability.ai')) {
    return;
  }

  // Same-origin: cache first, so the app opens offline.
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then(hit =>
        hit || fetch(req).then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        }).catch(() => hit)
      )
    );
    return;
  }

  // Cross-origin (fonts): network first, fall back to cache if offline.
  e.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(req))
  );
});
