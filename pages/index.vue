<script setup lang="ts">
import { type InferType, object, string } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { Notification } from '#ui/types/notification'

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
const { public: { baseApiUrl } } = useRuntimeConfig()
definePageMeta({
  title: 'Telegram магазин для вашего бизнеса'
})
useHead({
  title: 'Telegram магазин для вашего бизнеса'
})
useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  ogSiteName: 'go-store.space',
  description: page.value.description,
  ogDescription: page.value.description
})
const toast = useToast()
const loading = ref(false)
const RequiredText = 'Поле обязательно для заполнения'
const schema = object({
  email: string().email('Введите корректный адрес эл. почты'),
  tg_username: string().required(RequiredText),
  text: string().required(RequiredText)
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  tg_username: undefined,
  text: undefined
})

const pricingPlansCount = computed(() => {
  return page.value.pricing.plans.length
})

export interface ISuccessResponseFeedback {
  entities: any[]
  meta: any[]
  message: string
}
export interface Errors {
  [key: string]: string
}

export interface Data {}

export interface IErrorResponseFeedback {
  message: string
  errors: Errors
  data: Data
}
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true
    const { data, error } = await useFetch<ISuccessResponseFeedback | IErrorResponseFeedback>('/feedback', {
      baseURL: baseApiUrl,
      method: 'POST',
      body: event.data,
      watch: false
    })
    const toastText: Partial<Notification> = {
      title: error.value ? 'Ошибка' : 'Фидбэк получили!',
      description: error?.value?.data?.message || data?.value?.message
    }
    toast.add({
      ...toastText
    })
    state.email = ''
    state.text = ''
    state.tg_username = ''
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
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

      <div class="grid-cols-2 hidden md:grid">
        <NuxtImg
          v-for="(heroImage, index) in page.hero.image"
          :key="index"
          format="webp"
          loading="lazy"
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          :src="heroImage"
          alt="Hero image"
          class="w-full h-full object-cover"
        />
      </div>
      <UCarousel
        v-slot="{ item }"
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        :items="page.hero.image"
        :ui="{
          item: 'basis-full',
          container: 'rounded-lg'
        }"
        indicators
        class="w-full mx-auto block md:hidden"
      >
        <NuxtImg
          format="webp"
          :src="item"
          class="w-full"
          draggable="false"
        />
      </UCarousel>
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
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
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
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 h-full"
    >
      <ULandingCTA
        :ui="{ links: 'md:flex-row flex-col gap-y-4' }"
        v-bind="page.cta"
        :card="false"
      />
    </ULandingSection>
    <ULandingSection
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
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
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
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
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      :title="page.feedback.title"
      :description="page.feedback.description"
    >
      <template #links>
        <div class="md:w-1/2">
          <UForm
            id="feedback"
            :schema="schema"
            :state="state"
            class="space-y-4 w-full"
            @submit="onSubmit"
          >
            <div class="flex flex-col md:flex-row gap-4">
              <UFormGroup
                required
                class="w-full"
                :label="page.feedback.form.tgUsername"
                name="tg_username"
              >
                <UInput
                  v-model="state.tg_username"
                  size="xl"
                  type="text"
                />
              </UFormGroup>
              <UFormGroup
                class="w-full"
                :label="page.feedback.form.email"
                name="email"
              >
                <UInput

                  v-model="state.email"
                  size="xl"
                />
              </UFormGroup>
            </div>
            <UFormGroup
              required
              :label="page.feedback.form.feedback"
              name="text"
            >
              <UTextarea
                v-model="state.text"
                size="xl"
                type="text"
              />
            </UFormGroup>

            <UButton
              :loading="loading"
              type="submit"
            >
              {{ page.feedback.form.button }}
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
