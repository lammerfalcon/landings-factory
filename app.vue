<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  ogImage: 'https://go-store.space/img.png',
  twitterImage: 'https://go-store.space/img.png',
  twitterCard: 'summary_large_image'
})
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
