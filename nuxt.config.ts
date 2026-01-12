import tailwindcss from "@tailwindcss/vite";
import Aura from '@primeuix/themes/aura';

const envBool = (value?: string) => value === 'true'

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
    '@primevue/nuxt-module',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      assetsBaseUrl:
        process.env.NUXT_PUBLIC_ASSETS_BASE_URL || 'https://assets.realitaa.dev'
    }
  },
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
  image: {
    domains: ['assets.realitaa.dev']
  },
  primevue: {
    autoImport: false,
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  compatibilityDate: '2026-01-05',
})