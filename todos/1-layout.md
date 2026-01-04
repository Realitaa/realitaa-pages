# Portofolio Website - Layout

Beranda website portofolio digunakan sebagai landing page dan ringkasan singkat dari seluruh halaman yang ada.

## Gaya

Perhatikan file `/todos/theme.md`.
Untuk bagian atas dan konten halaman menggunakan Bottom Gradient Radial atau Azure Depths.
Untuk bagian footer halaman menggunakan Top Gradient Radial atau Azure Depths Top. 
Khusus untuk `content/index.md` akan menggunakan efek starfield yang dapat kamu baca di `/todos/starfield.md`.

Output yang diharapkan:
* ~/app/components/home/Starfield.vue
* ~/app/components/Header.vue
* ~/app/components/Footer.vue

## Navigation Bar

Halaman Navigasi untuk navigasi antar halaman.

### Desktop / Tab

Sebelah kiri adalah teks dengan href ke base_url. Teks: Realitaa
Di tengah: Navigation Bar dengan gaya liquid glass seperti iOS. Berisi: Home, Projects, Certificates, Blog, Tools
Di kanan adalah pengaturan seperti mode terang gelap dan bahasa, dengan gaya liquid glass iOS.

Dengan konfigurasi khusus sebagai berikut:
1. Jika halaman saat ini berada di index (http://base_url/), maka navigasi adalah sebagai berikut:
    * Home: # di hero section paling atas
    * Projects: pada #projects di halaman Home
    * Certificates: pada #certificates di halaman Home
2. Jika halaman saat ini berada di bukan index (bukan https://base_url), maka navigasi adalah sebagai berikut:
    * Home: # di hero section paling atas pada halaman index
    * Projects: ke halaman projects
    * Certificates: ke halaman certificates

Output yang diharapkan:
* ~/app/components/nav/Brand.vue            # Teks: Realitaa
* ~/app/components/nav/Desktop.vue          # Liquid glass iOS untuk Navigasi Desktop
* ~/app/components/nav/Config.vue           # Liquid glass iOS untuk Config Desktop
* ~/app/components/nav/index.vue            # Orkestrasi yang memanggil NavBrand, NavDesktop dan NavConfig

### Mobile

Sebelah kiri adalah tombol hamburger menu yang akan menampilkan sidebar jika di klik
Sebelah kanan tombol hamburger menu adalah teks dengan href ke base_url. Teks: Realitaa
Pengaturan seperti mode terang gelap dan bahasa akan ditampilkan di bagian bawah di dalam sidebar

Output yang diharapkan:
* ~/app/components/side/layouts/Bar.vue     # Template Untuk Menu Sidebar
* ~/app/components/side/Bar.vue             # Sidebar yang memanggil SideLayoutsBar dan mengirim properti seperti href dan teks
* ~/app/components/side/Config.vue          # Configuration untuk Menu Sidebar
* ~/app/components/side/index.vue           # Orkestrasi yang memanggil SideBar dan SideConfig

## Footer

Footer ini berfungsi sebagai penutup situs portofolio profesional yang memadukan personal branding dan utilitas navigasi dalam tata letak tiga kolom yang minimalis. Desain ini memfasilitasi interaksi pengguna di akhir halaman dengan menyediakan ringkasan identitas (nama, peran sebagai Backend Developer, dan ikon sosial media), akses cepat ke halaman utama (Quick Links), serta saluran komunikasi langsung (Get in Touch). Dibatasi dengan horizontal row tipis berwarna abu-abu (seperti separator)

Output yang diharapkan:
* ~/app/components/Footer.vue

## Credits

C {tahun saat ini} Reza mulia Putra. All Rights Reserved.

## Penyatuan Layout

Output yang diharapkan:
* ~/app/layouts/defaults.vue