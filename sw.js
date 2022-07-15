let cacheName = 'list_cache'
let staticAssets = [
    './',
    './index.html',
    './about.html',
    './robots.txt',
    './sw.js',
    './README.md',
    './logo.png',
    './icons/manifest-icon-192.maskable.png',
    './icons/manifest-icon-512.maskable.png',
    './manifest.json'
]

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName)
    await cache.addAll(staticAssets)
    return self.skipWaiting()
})

self.addEventListener('activate', async e => {
    self.clients.claim()
})

self.addEventListener('fetch', async e => {
    const req = e.request
    const url = new URL(req.url)

    if(req.origin === location.origin) {
        e.respondWith(cacheFirst(req))
    } else {
        e.respondWith(networkThenCache(req))
    }
})

async function cacheFirst(req) {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)
    return cached || fetch(req)
}

async function networkThenCache(req) {
    const cache = await caches.open(cacheName)
    try {
        const fresh = await fetch(req)
        await cache.put(req, fresh.clone())
        return fresh
    } catch (e) {
        const cached = cache.match(req)
        return cached
    }
}