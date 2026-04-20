const CACHE_NAME = "xnots-dynamic-v1";

self.addEventListener("install", e => {
self.skipWaiting();
});

self.addEventListener("activate", e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.map(k => caches.delete(k)))
)
);
self.clients.claim();
});

self.addEventListener("fetch", e => {
e.respondWith(
fetch(e.request)
.then(res => {
let copy = res.clone();
caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
return res;
})
.catch(() => caches.match(e.request))
);
});
