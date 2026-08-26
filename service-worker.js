const CACHE_NAME = "cybersafe-v1";

self.addEventListener("install", event => {
    console.log("CyberSafe Service Worker installed");
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    console.log("CyberSafe Service Worker activated");
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});