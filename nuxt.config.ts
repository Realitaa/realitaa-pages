import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/hints',
    '@nuxtjs/color-mode',
  ],
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  icon: {
    serverBundle: {
      collections: ['mdi', 'qlementine-icons']
    }
  },
  colorMode: {
    classSuffix: '',
    storageKey: 'theme',
    preference: 'system',
    fallback: 'dark',
  },
  compatibilityDate: '2026-01-05',
})