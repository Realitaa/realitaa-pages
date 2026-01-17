---
title: Kenapa Saya Memilih .dev untuk Website Portfolio Pertama Saya
description: Cerita di balik website portfolio pertama saya, filosofi memilih domain .dev, dan bagaimana saya mendapatkan domain gratis sebagai mahasiswa.
date: 2026-01-15
tags:
  - web-development
  - personal-website
  - domain
  - developer-journey
  - portfolio
draft: false
author: Reza Mulia Putra
image: https://assets.realitaa.dev/blog/why-i-choose-dot-dev-as-my-first-domain/og/web-ketiga.png
og:
  title: Kenapa Saya Memilih Domain .dev untuk Website Portfolio Pertama Saya
  description: Cerita di balik website portfolio pertama saya, filosofi memilih domain .dev, dan bagaimana saya mendapatkan domain gratis sebagai mahasiswa.
  type: article
  image: https://assets.realitaa.dev/blog/why-i-choose-dot-dev-as-my-first-domain/og/web-ketiga.png
---

## Awal yang Sederhana

Halo semuanya, ini adalah blog pertama saya di website personal saya yang baru. Saya akan bercerita tentang sejarah website saya dan bagaimana cara mendapatkan domain dengan gratis sebagai mahasiswa.

Membangun personal website adalah hal yang sudah beberapa kali saya lakukan. Saya masih ingat ketika pertama kali membuat personal website, hanya menggunakan teknologi sederhana seperti HTML dan Bootstrap 5, kemudian di hosting di GitHub Pages. Desainnya sederhana dan tidak ada fitur yang kompleks. Sayangnya saya tidak lagi memiliki source code nya.

Beberapa waktu berlalu, saya memutuskan untuk belajar Frontend framework, yaitu Vue. Pada saat itu, Vue sudah versi 3 dan menggunakan Composition API, teknologi yang modern dan digunakan saat ini. Saya memilih Vue karena melihat bahwa sintaks nya yang sederhana dan masih memiliki kode yang mirip dengan HTML, CSS dan Javascript biasanya, perhatikan kode `app.vue` dan `index.html` berikut ini:

<code-group>

```vue [app.vue]
<script setup>
  const greeting = 'Hello World';
</script>

<template>
  <h1>{{ greeting }}</h1>
</template>

<style scoped>
  h1 {
    color: red;
  }
</style>
```

```html [index.html]
<html>
  <head>
    <title>Website Title</title>
    <style>
      h1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1></h1>
    <script>
      const greeting = 'Hello World';
      document.querySelector('h1').textContent = greeting;
    </script>
  </body>
</html>
```

</code-group>

Mirip sekali kan? Itu lah alasan saya memilih Vue sebagai frontend framework yang pertama saya pelajari.

Website portfolio kedua saya dibuat menggunakan teknologi Vue 3 dan TailwindCSS. Pembuatan ulang ini sebenarnya merupakan salah satu cara saya memfamiliarkan diri dengan framework Vue yang sudah saya pelajari.

Website kedua saya memiliki beberapa keluhan seperti load yang lambat dan berjalan lambat di beberapa perangkat lawas. Wajar saja, saya memuat 3d grafis di hero section 😂.

::image-preview{src="why-i-choose-dot-dev-as-my-first-domain/web-kedua.png" alt="Screenshot web portfolio kedua saya" caption="Hero Section pada Web Portfolio Kedua Saya" variant="preview"}
::

Kalau kalian penasaran bagaimana saya membuat 3d grafis di hero section, saya menggunakan library [Vantajs](vantajs.com) dengan effect [Globe](https://www.vantajs.com/?effect=globe).

Lalu disinilah kita, website portfolio ketiga saya, dibuat menggunakan [Nuxt 4](https://nuxt.com). 

::image-preview{src="why-i-choose-dot-dev-as-my-first-domain/og/web-ketiga.png" alt="Screenshot web portfolio ketiga saya" caption="Hero Section pada Web Portfolio Ketiga Saya" variant="preview"}
::

Adapun tujuan penggunaan Nuxt 4 adalah untuk meningkatkan performa dan SEO dengan menggunakan teknologi seperti [Server Side Rendering](https://developer.mozilla.org/en-US/docs/Glossary/SSR) atau [Static Site Generation](https://developer.mozilla.org/en-US/docs/Glossary/SSG). Nuxt juga memiliki fitur dan ekosistem yang luas, seperti [Nuxt Content](https://content.nuxt.com) yang memudahkan pembuatan blog.

By the way, website ini terinspirasi dari [Kanish](https://kanishv.netlify.app/).

Saya harap dengan website ini, bisa menjadi portfolio yang relevan dan bisa memberikan manfaat bagi orang lain.

## Mengapa Memilih .dev Sebagai Domain Pertama Saya?

Pada awalnya saya ingin menggunakan domain yang lebih terkenal seperti `.com`. Tapi, saya berpikir seharusnya ada yang lebih cocok, untuk seorang developer. Akhirnya saya menemukan domain `.dev` yang cocok untuk saya. Domain ini punya makna yang lebih jujur:

> “Saya adalah developer, dan saya sedang berkembang.”

## Apa itu Domain, Subdomain dan Hosting?

::image-preview{src="https://www.ionos.co.uk/digitalguide/fileadmin/_processed_/3/a/csm_structure-of-an-inclusive-subdomain_92dda1c78b.webp" alt="Structure of an Inclusive Subdomain" caption="Struktur dari Domain (Sumber: ionos.co.uk)" variant="external"}
::

Domain adalah alamat unik yang digunakan untuk mengakses sebuah website. Contohnya adalah `google.com`. Domain ini terdiri dari dua bagian, yaitu nama domain (`google`) dan ekstensi domain (`.com`).

Subdomain adalah bagian dari domain yang digunakan untuk mengakses halaman tertentu dari sebuah website. Contohnya adalah `maps.google.com`. Subdomain ini terdiri dari tiga bagian, yaitu nama subdomain (`maps`), nama domain (`google`), dan ekstensi domain (`.com`).

Lalu apa bedanya dengan hosting? Hosting adalah tempat menyimpan file website. Kamu bisa menganggap domain itu sebagai alamat rumah, dan hosting sebagai rumah itu sendiri. Alamat rumah (domain) akan menunjukkan pengakses untuk menuju rumah (hosting) kamu.

## Bagaimana Cara Mendapatkan Domain Gratis?

Pada dasarnya, tidak ada domain yang gratis. Berbeda dengan hosting, domain adalah **aset global** yang diatur oleh registry resmi seperti [ICANN](https://www.icann.org/). Setiap domain itu:
* Terdaftar di sistem DNS Global
* Harus unik dan dipertahankan kepemilikannya
* Memiliki biaya tahunan

Jika ada yang menawarkan domain gratis, itu berarti ada yang membayarkan biaya domain tersebut untukmu, baik untuk tujuan edukasi, promosi, sponsor atau lainnya. Jika pun ada domain gratis yang eksperimental, bisa jadi domain tersebut tidak aman atau diselipkan iklan, serta bisa dicabut kapan saja.

Berbeda dengan subdomain, subdomain bisa didapatkan secara gratis, contohnya adalah `github.io`.  Meskipun begitu, subdomain tersebut tetaplah merupakan domain dari Github.

Lalu bagaimana cara mendapatkan domain gratis? Salah satu cara mendapatkan domain gratis sebagai mahasiswa adalah dengan cara mendaftar pada program [Student Developer Pack](https://education.github.com/pack) dari Github. Tidak hanya domain gratis, ada benefit lain yang bisa kamu dapatkan dari program tersebut, kamu bisa melihatnya dengan mengakses halaman tersebut.

Untuk mendaftar ke program tersebut, kamu perlu memiliki akun [Github](https://github.com) terlebih dahulu, mengatur keamanan seperti 2FA di halaman [Security](https://github.com/settings/security), mengatur [Payment Information](https://github.com/settings/billing/payment_information), dan memverifikasi status mahasiswa kamu menggunakan email kampus (.ac.id) di halaman [Education benefits](https://github.com/settings/education/benefits). Untuk diterima, kamu butuh bukti status mahasiswa (seperti Kartu Tanda Mahasiswa atau Surat Keterangan Aktif Kuliah), serta harus berada di lokasi kampus ketika mengajukan Student Benefit (lebih baik lagi jika kamu mengajukannya menggunakan WiFi kampus.)

::image-preview{src="why-i-choose-dot-dev-as-my-first-domain/status-mahasiswa-github-disetujui.png" alt="Status Mahasiswa Disetujui di Pengaturan Github" caption="Status Mahasiswa Disetujui di Pengaturan Github" variant="preview"}
::

Setelah status mahasiswa disetujui, kunjungi kembali halaman [Student Developer Pack](https://education.github.com/pack) dan lakukan *sign-in* menggunakan akun Github yang status mahasiswanya sudah disetujui. Di beranda halaman Github Education, pergi ke menu Student Developer Pack offers, carilah penawaran dari **name.com**.

::image-preview{src="why-i-choose-dot-dev-as-my-first-domain/penawaran-di-halaman-student-pack.png" alt="Penawaran di Halaman Student Pack Github" caption="Penawaran di Halaman Student Pack Github" variant="preview"}
::

Hubungkan akun Github ke `name.com`, lalu daftarkan akun menggunakan akun email (gmail). Jika akun Github kamu berhasil ditautkan dengan `name.com`, kamu akan melihat penawaran beberapa domain, seperti `.live`, `.app`, `.dev` dan masih banyak lagi.

::image-preview{src="why-i-choose-dot-dev-as-my-first-domain/domain-gratis.png" alt="Domain gratis di name.com" caption="Domain Gratis di name.com" variant="preview"}
::

Pilihlah domain yang kamu inginkan, saya memilih domain `.dev`. Pastikan kamu juga memasukkan SSL ke keranjang ya. Untuk domain `.dev` SSL adalah kewajiban, sehingga otomatis dimasukkan ke keranjang. Lanjutkan ke pembayaran, masukkan informasi pembayaran kartu debit/kredit yang mendukung transaksi internasional, seperti Visa/MasterCard. Kamu bisa mendapatkan kartu Visa gratis di Bank Jago.

Voila! Tunggu beberapa saat dan domainmu akan diaktifkan. Selamat atas domain barumu.