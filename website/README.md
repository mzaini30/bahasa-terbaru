# Website Ujian Bahasa Arab

Aplikasi web sederhana untuk menampilkan 10 kalimat acak dalam bahasa Arab beserta terjemahannya. Aplikasi ini dibangun dengan HTML, CSS, dan JavaScript murni, serta mendukung mode offline melalui Service Worker.

## Fitur

- Menampilkan 10 kalimat acak dalam bahasa Arab dan terjemahannya
- Tombol melayang untuk mengacak ulang daftar kalimat
- Mendukung mode offline (dapat digunakan tanpa internet setelah dibuka pertama kali)
- Progressive Web App (PWA) yang dapat diinstal ke layar utama perangkat
- Responsif untuk desktop dan perangkat mobile

## Cara Menjalankan

### Pengembangan Lokal

1. Clone atau download repositori ini
2. Buka folder proyek di editor kode favorit Anda
3. Jalankan dengan server lokal sederhana, misalnya dengan:
   - Python: `python -m http.server`
   - Node.js: `npx serve`
   - Ekstensi Live Server di VS Code

### Deployment ke Surge

1. Pastikan Surge CLI sudah terinstal:
   ```
   npm install -g surge
   ```

2. Deploy ke Surge:
   ```
   surge ./folder-proyek nama-domain.surge.sh
   ```
   Ganti `nama-domain` dengan nama domain yang Anda inginkan.

## Struktur Proyek

- `index.html` - Struktur halaman utama
- `styles.css` - Styling untuk aplikasi
- `app.js` - Logika aplikasi (pengacakan kalimat, dll)
- `data.js` - Data kalimat bahasa Arab dan terjemahannya
- `service-worker.js` - Service worker untuk mendukung mode offline
- `manifest.json` - Manifest untuk fitur PWA
- `icon-192.svg` & `icon-512.svg` - Ikon aplikasi

## Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript (ES6+)
- Service Worker API
- Web App Manifest

## Lisensi

MIT