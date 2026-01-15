<script setup lang="ts">
useSeoMeta({
  title: 'Beranda | Reza Mulia Putra',
  description: 'Reza Mulia Putra adalah seorang mahasiswa dan freelance developer yang memiliki pengalaman dalam pengembangan aplikasi web.',

  ogTitle: 'Beranda | Reza Mulia Putra',
  ogDescription: 'Reza Mulia Putra adalah seorang mahasiswa dan freelance developer yang memiliki pengalaman dalam pengembangan aplikasi web.',
  ogType: 'website',
  ogImage: 'https://assets.realitaa.dev/img/cover.png',
  ogUrl: 'https://realitaa.dev',

  twitterTitle: 'Beranda | Reza Mulia Putra',
  twitterDescription: 'Reza Mulia Putra adalah seorang mahasiswa dan freelance developer yang memiliki pengalaman dalam pengembangan aplikasi web.',
  twitterImage: 'https://assets.realitaa.dev/img/cover.png',

  robots: 'index, follow'
})
</script>

<template>
  <HomeHero />
  <HomeAbout>
    {{ $t('about.body') }}
  </HomeAbout>
  <HomeHowIBuildProducts />
  <HomeTechStack />
  <HomeFeaturedProjects />
  <HomeFeaturedCertificate />
  <HomeWhatsNew />
  <HomeCallToAction />
  <HomeQuote />
</template>