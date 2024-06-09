// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/image',
    'nuxt-aos',
    'nuxt-og-image',
    '@nuxtjs/seo'
    // '@nuxtjs/i18n'
  ],
  // i18n: {
  //   locales: [
  //     {
  //       code: 'en',
  //       name: 'English'
  //     },
  //     {
  //       code: 'ru',
  //       name: 'Русский'
  //     }
  //   ],
  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     cookieKey: 'i18n_redirected',
  //     redirectOn: 'root' // recommended
  //   }
  // },
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['heliotrope', 'fuego', 'lavender-rose', 'shakespeare', 'river-bed']
  },
  site: {
    url: 'https://go-store.space',
    name: 'Go-Store'
  },
  seo: {
    fallbackTitle: false
  },
  devtools: {
    enabled: true
  },
  typescript: {
    strict: false
  },
  runtimeConfig: {
    public: {
      adminUrl: process.env.NUXT_ADMIN_URL,
      baseApiUrl: process.env.NUXT_BASE_API_URL,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
