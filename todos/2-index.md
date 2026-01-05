# Portofolio Website - Beranda

Beranda website portofolio digunakan sebagai landing page dan ringkasan singkat dari seluruh halaman yang ada.

## Struktur Halaman Beranda

Berikut adalah struktur halaman beranda berurutan dari paling atas ke paling bawah:

halaman beranda
├── hero section
│   ├── headline nama
│   ├── subheadline profesi
│   └── CTA
├── about me
├── how i build products
├── tech stack
├── featured projects
├── certificate
├── what's new?
├── contact me
└── quote

### Hero section

Bagian Hero section berisi headline nama, subheadline profesi, dan CTA, ditampilkan di tengah halaman secara vertikal dan horizontal.

Headline nama: Reza Mulia Putra
Subheadline Profesi: ['Fullstack Web Developer', 'AI/ML Enthusiast']
CTA: Contact Me

Output yang diharapkan:
* ~/app/components/home/Hero.vue

### About Me

Bagian about me berisi ringkasan singkat tentang diri sendiri. Kamu hanya perlu membuat komponen dan berikan slot, saya akan mengisinya sendiri di file `content/index.md` nanti.

Output yang diharapkan:
* ~/app/components/home/About.vue

### How I Build Products

Bagian ini berisi ringkasan singkat tentang bagaimana saya membuat produk dalam bentuk grid 3 kolom yang masing-masing berupa sebuah card yang berisi ringkasan singkat tentang bagaimana saya membuat produk. Kamu hanya perlu membuat komponen dan lakukan perulangan yang memanggil nilai dari `composables/useHowIBuildProducts.ts`.

Output yang diharapkan:
* ~/app/components/Card.vue                     # Komponen Card yang akan digunakan di HowIBuildProducts.vue dan di universal
* ~/app/components/home/HowIBuildProducts.vue   # Komponen How I Build Products yang akan digunakan di halaman beranda

### Tech Stack

Bagian ini berisi tabel tech stack yang ditampilkan di halaman beranda dengan format tampilan tabel yang hanya memiliki border-left mulai kolom kedua. Setiap kolom akan berisi icon yang sesuai dengan nama kolom tersebut, dan memiliki nama dari kolom tersebut. Ini adalah contoh header yang bisa diterapkan, bisa dirapikan lagi. Saya memberikan gambaran kasar di bawah ini.

#### Desktop

| Language   | Frontend Frameworks | Backend Frameworks | Fullstack Frameworks | Cloud    | Infrastructure | Tools        |
|------------|---------------------|--------------------|----------------------|----------|----------------|--------------|
| PHP        | Bootstrap 5         | HapiJS             | NuxtJS 4             | AWS      | Redis          | Git          |
| Javascript | TailwindCSS 4       | ExpressJS          | Laravel 12           | GCP      | RabbitMQ       | Github       |
| Typescript | Alpinejs            |                    | Codeigniter 4        | Supabase | Netlify        | Postman      |
| Python     | VueJS               |                    |                      | Unsplash |                | Dbeaver      |
|            | Livewire            |                    |                      |          |                | Google Colab |

#### Mobile

Language
------------
PHP Javascript Typescript Python
Frontend Frameworks
------------
Bootstrap 5 TailwindCSS 4 Alpinejs VueJS Livewire
Backend Frameworks
------------
HapiJS ExpressJS Codeigniter 4
Fullstack Frameworks
------------
NuxtJS 4 Laravel 12
Cloud
------------
AWS GCP Supabase Unsplash
Infrastructure
------------
Redis RabbitMQ Netlify
Tools
------------
Git Github Postman Dbeaver Google Colab


Output yang diharapkan:
* ~/app/components/home/TechStack.vue

### Featured Projects

Bagian ini berisi grid 3 kolom yang masing-masing berisi sebuah card yang berisi ringkasan singkat tentang proyek yang akan ditampilkan di halaman beranda. Setiap card akan berisi gambar, nama proyek, deskripsi singkat, dan CTA. Setiap card akan memanggil nilai dari `composables/useFeaturedProjects.ts` (buat dummy dulu). 

Output yang diharapkan:
* ~/app/components/home/FeaturedProjects.vue

### Certificate

Bagian ini berisi grid 3 kolom yang masing-masing berisi sebuah card yang berisi ringkasan singkat tentang sertifikat yang akan ditampilkan di halaman beranda. Setiap card akan berisi gambar, nama sertifikat, deskripsi singkat, dan CTA. Setiap card akan memanggil nilai dari `composables/useCertificate.ts` (buat dummy dulu). 

Output yang diharapkan:
* ~/app/components/home/Certificate.vue

### What's New?

Bagian ini berisi grid 3 kolom yang masing-masing berisi sebuah card yang berisi ringkasan singkat tentang blog yang akan ditampilkan di halaman beranda. Setiap card akan berisi gambar, nama blog, deskripsi singkat, dan CTA. Setiap card akan memanggil nilai dari `composables/useWhatsNew.ts` (buat dummy dulu). 

Output yang diharapkan:
* ~/app/components/home/WhatsNew.vue

### Contact Me

Bagian ini berisi call to action yang akan ditampilkan di halaman beranda. Call to action ini akan berisi tombol-tombol dengan ikon ke sosial media.

Output yang diharapkan:
* ~/app/components/home/CallToAction.vue

### Quote

Bagian ini berisi quote yang akan ditampilkan di halaman beranda. Format tampilan sebagai berikut:

foto profil dari: https://github.com/Realitaa.png
quote: "Quote from useQuote.ts (akan ada beberapa random quotes, saat ini isi dengan dummy dulu)"

Output yang diharapkan:
* ~/app/components/home/Quote.vue

### Penyatuan Layout

Menyatukan layout di `content/index.md`.