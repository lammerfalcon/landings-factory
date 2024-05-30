<script setup lang="ts">
import { type InferType, object, string } from 'yup'

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
const toast = useToast()
const loading = ref(false)
const RequiredText = 'Поле обязательно для заполнения'
const schema = object({
  email: string().email('Введите корректный адрес эл. почты').required(RequiredText),
  tgUsername: string().required(RequiredText),
  feedback: string().required(RequiredText)
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  tgUsername: undefined,
  feedback: undefined
})

const pricingPlansCount = computed(() => {
  return page.value.pricing.plans.length
})

function onSubmit() {
  loading.value = true

  setTimeout(() => {
    toast.add({
      title: 'Отправили!',
      description: 'Спасибо за ваше сообщение. Мы обязательно ответим на него.'
    })

    loading.value = false
  }, 1000)
}
</script>

<template>
  <div>
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <template #headline>
        <UBadge
          v-if="page.hero.headline"
          variant="subtle"
          size="lg"
          class="relative rounded-full font-semibold"
        >
          <NuxtLink
            :to="page.hero.headline.to"
            target="_blank"
            class="focus:outline-none"
            tabindex="-1"
          >
            <span
              class="absolute inset-0"
              aria-hidden="true"
            />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon
            v-if="page.hero.headline.icon"
            :name="page.hero.headline.icon"
            class="ml-1 w-4 h-4 pointer-events-none"
          />
        </UBadge>
      </template>

      <NuxtImg
        v-for="heroImage in page.hero.image"
        :src="heroImage"
        alt="Hero image"
        class="w-full h-full object-cover"
      />
      <!--      <ImagePlaceholder/> -->

      <ULandingLogos
        v-if="page.logos"
        :title="page.logos.title"
        align="center"
      >
        <UIcon
          v-for="icon in page.logos.icons"
          :key="icon"
          :name="icon"
          class="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"
        />
      </ULandingLogos>
    </ULandingHero>

    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
      :headline="page.features.headline"
    >
      <UPageGrid
        id="features"
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      id="CTA"
      class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 h-full"
    >
      <ULandingCTA
        v-bind="page.cta"
        :card="false"
      />
    </ULandingSection>
    <ULandingSection
      :title="page.pricing.title"
      :description="page.pricing.description"
      :headline="page.pricing.headline"
    >
      <UPricingGrid
        id="pricing"

        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
        :class="[pricingPlansCount >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2']"
      >
        <UPricingCard
          v-for="(plan, index) in page.pricing.plans"
          :key="index"
          v-bind="plan"
        />
      </UPricingGrid>
    </ULandingSection>

    <ULandingSection
      v-if="page.testimonials"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns
        id="testimonials"
        class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>
    <ULandingSection
      id="feedback"
      headline="Обратная связь"
      title="Есть вопросы? Напишите нам!"
      description="Мы с радостью ответим на все ваши вопросы."
    >
      <template #links>
        <div class="md:w-1/2">
          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4 w-full"
            @submit="onSubmit"
          >
            <div class="flex flex-col md:flex-row gap-4">
              <UFormGroup
                class="w-full"
                label="Почта"
                name="email"
              >
                <UInput

                  v-model="state.email"
                  size="xl"
                />
              </UFormGroup>

              <UFormGroup
                class="w-full"
                label="Имя телеграм аккаунта"
                name="tgUsername"
              >
                <UInput
                  v-model="state.tgUsername"
                  size="xl"
                  type="text"
                />
              </UFormGroup>
            </div>
            <UFormGroup
              label="Напишите нам всё, что считаете важным! Мы обязательно ответим на ваше сообщение."
              name="feedback"
            >
              <UTextarea
                v-model="state.feedback"
                size="xl"
                type="text"
              />
            </UFormGroup>

            <UButton
              type="submit"
            >
              Отправить 🚀
            </UButton>
          </UForm>
        </div>
      </template>
    </ULandingSection>
    <!--    <ULandingSection -->
    <!--      id="faq" -->
    <!--      :title="page.faq.title" -->
    <!--      :description="page.faq.description" -->
    <!--      class="scroll-mt-[var(&#45;&#45;header-height)]" -->
    <!--    > -->
    <!--      <ULandingFAQ -->
    <!--        multiple -->
    <!--        :items="page.faq.items" -->
    <!--        :ui="{ -->
    <!--          button: { -->
    <!--            label: 'font-semibold', -->
    <!--            trailingIcon: { -->
    <!--              base: 'w-6 h-6' -->
    <!--            } -->
    <!--          } -->
    <!--        }" -->
    <!--        class="max-w-4xl mx-auto" -->
    <!--      /> -->
    <!--    </ULandingSection> -->
  </div>
</template>
