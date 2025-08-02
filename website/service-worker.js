// Nama cache untuk menyimpan aset aplikasi
const CACHE_NAME = 'arabic-exam-cache-v1';

// Daftar aset yang akan di-cache untuk penggunaan offline
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/data.js',
    '/manifest.json'
];

// Event listener untuk instalasi service worker
self.addEventListener('install', event => {
    // Tunggu hingga cache dibuat dan aset ditambahkan
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache dibuka');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Event listener untuk aktivasi service worker
self.addEventListener('activate', event => {
    // Hapus cache lama jika ada pembaruan
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Menghapus cache lama:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

// Event listener untuk permintaan fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        // Coba ambil dari cache terlebih dahulu
        caches.match(event.request)
            .then(response => {
                // Jika ditemukan di cache, kembalikan respons dari cache
                if (response) {
                    return response;
                }
                
                // Jika tidak ditemukan di cache, ambil dari jaringan
                return fetch(event.request)
                    .then(networkResponse => {
                        // Jika respons tidak valid, kembalikan saja
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        
                        // Salin respons untuk disimpan di cache
                        const responseToCache = networkResponse.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                            
                        return networkResponse;
                    });
            })
            .catch(() => {
                // Jika terjadi kesalahan, coba tampilkan halaman offline jika ada
                if (event.request.url.indexOf('.html') > -1) {
                    return caches.match('/index.html');
                }
            })
    );
});