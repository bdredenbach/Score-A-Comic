/* Comic Scorer service worker.
   Caches the app shell so it launches with no connection. API calls to
   Anthropic and Stability always go to the network — they're never cached.

   v2: the page itself is now network-first. v1 was cache-first for
   everything, which meant a stale index.html could be served forever
   after an update. Bumping the cache name also wipes the old one. */

const CACHE = 'comic-scorer-v2';
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
      // Add individually so one missing file doesn't fail the whole install.
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

  const isPage = req.mode === 'navigate' ||
                 req.destination === 'document' ||
                 url.pathname.endsWith('.html') ||
                 url.pathname.endsWith('/');

  // The page and the manifest: network first, so edits show up immediately.
  // Cache is only the offline fallback.
  if (isPage || url.pathname.endsWith('manifest.json')) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // Static assets (icons, fonts): cache first, refresh in the background.
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
