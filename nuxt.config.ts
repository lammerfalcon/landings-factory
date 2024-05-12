// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/ui', '@nuxt/fonts', '@nuxt/image'],
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['heliotrope', 'fuego', 'lavender-rose', 'shakespeare', 'river-bed']
  },
  devtools: {
    enabled: true
  },
  typescript: {
    strict: false
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
