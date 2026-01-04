# Portofolio Website - Perkenalan

Saya akan membuat portofolio website untuk diri saya. Website ini ditargetkan untuk SEO, memiliki dark/light mode, dan multibahasa.

## Teknologi

- Vue 3 Composition API
- Vite
- Tailwind CSS 4
- Nuxt 4
- Nuxt Content 3
- Nuxt Fonts
- Nuxt icon
- Nuxt image

## Abstraksi

Nuxt 4 memiliki beberapa abstraksi yang harus diperhatikan:
* Auto Import pada file .vue. Beberapa fungsi bawaan Vue 3 Composition API di import secara otomatis, seperti `ref()`, `compute()`, `onMounted()` dan fungsi Vue 3 Composition API lainnya.
File pada component sebagai nama component. Contohnya `app/components/Alert.vue` otomatis dapat langsung digunakan tanpa di import. Selengkapnya dapat dibaca di https://nuxt.com/docs/4.x/getting-started/views 

## File & Folder Structure

Untuk setiap halaman yang diatur di folder `/content`, buatlah komponennya di dalam sebuah folder yang sesuai. Contohnya untuk halaman `index.md` komponennya akan berada di `/components/index/Hero.vue` atau `/components/index/Navbar.vue`. Perhatikan juga bahwa itu akan di import otomatis oleh Nuxt menjadi `IndexHero` atau `IndexNavbar`.

## MCP Server

Kita telah terhubung dengan server MCP Nuxt. Harap merujuk ke MCP Server sebagai dokumentasi terbaru dalam penulisan kode.

## Deployment

Akan di hosting di Netlify. Pemilik dapat melakukan hosting secara mandiri.

## Agent Compliance

Ada beberapa peraturan yang harus dilakukan AI Agent.

1. Patuh kepada struktur komponen di setiap step. 
2. Website merupakan Content Driven, sehingga hanya memiliki satu entri file. Pembuatan kode Vue dilakukan di component pada folder dan file yang sesuai.