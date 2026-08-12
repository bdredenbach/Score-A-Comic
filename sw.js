/* Comic Scorer service worker.
   Caches the app shell so it launches with no connection. API calls to
   Anthropic and Stability always go to the network — they're never cached.

   v7: fluid playback progress bar build I3.1.
   The page itself remains network-first so new versions are picked up promptly. */
const CACHE = 'comic-scorer-v12-90sec-full';

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
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never cache the APIs — always live.
  if (
    url.hostname.endsWith('api.anthropic.com') ||
    url.hostname.endsWith('api.stability.ai')
  ) {
    return;
  }

  const isPage =
    req.mode === 'navigate' ||
    req.destination === 'document' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/');

  // Pages and the manifest: network first, with the cached version as the
  // offline fallback.
  if (isPage || url.pathname.endsWith('manifest.json')) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() =>
        caches.match(req).then(hit => hit || caches.match('./index.html'))
      )
    );
    return;
  }

  // Static assets: cache first, refresh in the background.
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
