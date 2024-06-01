<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const links = computed(() => [{
  label: 'Возможнсти',
  to: '#features',
  icon: 'i-heroicons-cube-transparent',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('pricing')
}, {
  label: 'Тарифы',
  to: '#pricing',
  icon: 'i-heroicons-credit-card',
  active: activeHeadings.value.includes('pricing') && !activeHeadings.value.includes('feedback')
},
//   {
//   label: 'Узнать о запуске проекта',
//   to: '#CTA',
//   icon: 'i-heroicons-academic-cap',
//   active: route.hash.includes('CTA')
// },
{
  label: 'Обратная связь',
  to: '#feedback',
  icon: 'i-heroicons-question-mark-circle',
  active: activeHeadings.value.includes('feedback')
}
])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#pricing'),
    // document.querySelector('#testimonials'),
    document.querySelector('#CTA'),
    document.querySelector('#feedback')
  ])
})
const { public: { adminUrl } } = useRuntimeConfig()
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      GoStore <UBadge
        label="telegram service"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <template #right>
      <UButton
        label="Демонстрация сервиса"
        color="white"
        variant="ghost"
        trailing-icon="i-heroicons-arrow-right-20-solid"
        class="hidden lg:flex"
        @click="navigateTo('/#CTA')"
      />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />
      <UButton
        block
        label="Демонстрация сервиса"
        color="white"
        trailing-icon="i-heroicons-arrow-right-20-solid"
        class="my-6"
        @click="navigateTo('/#CTA')"
      />
      <UButton
        block
        label="Создать магазин"
        color="blue"
        trailing-icon="i-heroicons-arrow-right-20-solid"
        @click="navigateTo(adminUrl, { external: true })"
      />
    </template>
  </UHeader>
</template>
