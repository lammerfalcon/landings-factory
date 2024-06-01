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
  ],
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['heliotrope', 'fuego', 'lavender-rose', 'shakespeare', 'river-bed']
  },
  site: {
    url: 'https://go-store.space'
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
      baseApiUrl: process.env.NUXT_BASE_API_URL
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
