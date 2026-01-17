import tailwindcss from "@tailwindcss/vite";
import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/hints',
    '@nuxtjs/color-mode',
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
    '@nuxt/ui',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      assetsBaseUrl:
        process.env.NUXT_PUBLIC_ASSETS_BASE_URL || 'https://assets.realitaa.dev/'
    }
  },
  app: {
    head: {
      title: 'Realitaa',
      htmlAttrs: {
        lang: 'id',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/elaina-witch-hat.ico' },
      ],
    },
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
  primevue: {
    autoImport: false,
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  i18n: {
    defaultLocale: 'id',
    locales: [
      { code: 'id', name: 'Bahasa Indonesia', file: 'id.json' },
    ],
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },
  ssr: true,
  nitro: {
    preset: 'cloudflare_pages',
  },
  compatibilityDate: '2026-01-05',
})