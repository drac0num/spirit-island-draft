const CACHE_NAME = "spirit-island-draft-v1";
const urlsToCache = [
    "/spirit-island-draft/",
    "/spirit-island-draft/index.html",
    "/spirit-island-draft/styles.css",
    "/spirit-island-draft/app.js",
    "/spirit-island-draft/manifest.json",
    "/spirit-island-draft/icons/icon-192x192.png",
    "/spirit-island-draft/icons/icon-512x512.png"
];

// Install service worker and cache resources
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Service Worker: Caching files");
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate service worker and clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Service Worker: Clearing old cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event to serve cached content
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
