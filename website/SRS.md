## **Software Requirements Specification (SRS)**

**Website Ujian Bahasa Arab – Versi Frontend Serverless + Offline Mode**

---

### **1. Pendahuluan**

#### 1.1 Tujuan

Website ini bertujuan untuk menampilkan daftar soal berupa 10 kalimat acak dalam bahasa Arab beserta terjemahan bahasa Indonesianya. Pengguna dapat menekan tombol melayang untuk mengacak ulang daftar tersebut dari kumpulan kalimat yang sudah tersedia. Sistem akan di-deploy secara **serverless** (Surge) dan dapat digunakan **offline** setelah dibuka pertama kali.

#### 1.2 Ruang Lingkup

* Platform berbasis frontend saja (HTML murni atau framework seperti Svelte, Vue, React).
* Deployment menggunakan **Surge**.
* Offline mode dengan **Service Worker** agar dapat digunakan tanpa internet setelah dibuka sekali.
* Data kalimat tersedia secara statis di file JavaScript/JSON.
* Fungsi utama:

  1. Menampilkan 10 kalimat acak.
  2. Menampilkan teks Arab di atas dan terjemahan di bawahnya.
  3. Menyediakan tombol melayang untuk mengacak ulang daftar.

#### 1.3 Definisi

* **Kalimat Bahasa Arab**: Teks Arab sebagai soal.
* **Terjemahan**: Teks Bahasa Indonesia yang menjelaskan arti kalimat Arab.
* **Acak Ulang**: Memilih 10 kalimat baru secara acak dari daftar penuh.
* **Offline Mode**: Kemampuan website diakses tanpa koneksi internet setelah dibuka pertama kali.

---

### **2. Kebutuhan Fungsional**

#### 2.1 Menampilkan 10 Kalimat Acak

* Memuat seluruh data kalimat dari file lokal.
* Saat halaman dibuka, otomatis memilih 10 kalimat acak tanpa pengulangan.
* Format tampilan:

  ```
  1. [Kalimat Arab]  
     [Terjemahan Indonesia]
  ```

#### 2.2 Tombol Melayang “Acak Ulang”

* Posisi: kanan bawah layar.
* Ikon: **🔄** atau refresh.
* Fungsi: memilih ulang 10 kalimat acak dan memperbarui tampilan.

#### 2.3 Penyimpanan Data Kalimat

* Format array objek:

  ```json
  [
    { "id": 1, "indo": "Jangan tidur di shaff depan", "arab": "لَا تَنَمْ فِي الصَّفِّ الْأَمَامِيِّ" }
  ]
  ```

#### 2.4 Offline Mode

* Menggunakan **Service Worker** untuk caching file HTML, CSS, JS, dan data kalimat.
* Pertama kali dibuka harus online untuk mengunduh dan menyimpan file.
* Saat offline, website tetap dapat berjalan normal.

---

### **3. Kebutuhan Non-Fungsional**

#### 3.1 Performa

* Loading < 1 detik di koneksi normal.
* Pengacakan tidak membutuhkan reload halaman.

#### 3.2 Kompatibilitas

* Browser modern (Chrome, Edge, Firefox, Safari).
* Responsive untuk desktop & mobile.
* Mendukung **PWA** agar dapat di-install ke home screen.

#### 3.3 Keamanan

* Tidak ada login atau enkripsi.
* Service Worker hanya menyimpan file yang diperlukan.

---

### **4. Antarmuka Pengguna**

#### 4.1 Tampilan Utama

* **Judul**: “Ujian Bahasa Arab”
* **Daftar**: Nomor, teks Arab (RTL, font besar), terjemahan di bawahnya.
* **Tombol Melayang**: Bulat, warna mencolok, ikon refresh.

#### 4.2 Contoh Layout

```
[ Judul: Ujian Bahasa Arab ]
--------------------------------
1. لَا تَنَمْ فِي الصَّفِّ الْأَمَامِيِّ
   Jangan tidur di shaff depan

2. ٱلْمَرْحَلَةُ ٱلثَّالِثَةُ فِي ٱلصَّفِّ ٱلْأَوَّلِ
   Kelas tiga di shaff pertama

...
[ Tombol 🔄 kanan bawah ]
```

---

### **5. Data Kalimat**

* Total: 46 kalimat.
* Setiap acak: 10 kalimat **tanpa pengulangan**.

---

### **6. Teknis Implementasi**

* **Framework**: HTML + JavaScript murni (atau Svelte/Vue/React).
* **Algoritma Pengacakan**: Fisher–Yates Shuffle.
* **Offline Mode**: Service Worker + Cache API.
* **Deployment**: Surge.sh

  * Command: `surge ./folder-proyek nama-domain.surge.sh`