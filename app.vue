<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

const { public: { siteUrl } } = useRuntimeConfig()
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-title', content: 'Магазин в telegram' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    {
      rel: 'canonical',
      href: siteUrl
    }
  ],
  htmlAttrs: {
    lang: 'ru'
  }
})

useSeoMeta({
  ogType: 'website',
  ogLocale: 'ru-RU',
  ogImage: 'https://go-store.space/img.png',
  twitterImage: 'https://go-store.space/img.png',
  twitterCard: 'summary_large_image'
})
useSchemaOrg([
  defineOrganization({
    name: 'Go-store.space'
  }),
  defineWebSite({
    name: 'Магазин в телеграм уже создан! Добавь товар и начни продавать!'
  }),
  defineWebPage()
])
</script>

<template>
  <SpeedInsights />
  <AppHeader />

  <UMain>
    <NuxtPage />
  </UMain>

  <AppFooter />

  <UNotifications />
</template>
