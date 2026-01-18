<script setup lang="ts">
import Glide from '@glidejs/glide'

const glideRef = ref<HTMLElement | null>(null)
let glide: Glide | null = null

const { locale } = useI18n()

const props = defineProps<{
  title: string
  links?: string
  certificates: Array<any>
}>()

const activeCertificate = ref(props.certificates[0])

const goToSlide = (index: number, link?: string) => {
  if (!glide) return

  if (index === activeCertificate.value.id - 1 && link) {
    window.open(link, '_blank')
  } else {
    glide.go(`=${index}`)
  }
}

onMounted(() => {
  if (!glideRef.value) return

  glide = new Glide(glideRef.value, {
    type: 'slider',
    startAt: 0,
    perView: 2,
    focusAt: 'center',
    gap: 24,
    breakpoints: {
      768: {
        perView: 1,
      },
    },
  })

  glide.on(['mount.after', 'run'], () => {
    activeCertificate.value = props.certificates[glide!.index]
  })

  glide.mount()
})

onUnmounted(() => {
  glide?.destroy()
  glide = null
})
</script>


<template>
  <div class="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/10 backdrop-blur-xs p-8 shadow-sm">
    <div
      class="inline-block mb-8 rounded-full border border-black/50 dark:border-white/90 px-4 py-2 text-sm font-semibold"
    >
      <a :href="props.links" target="_blank" :class="{ 'hover:underline': props.links }">
        {{ props.title }}
      </a>
    </div>

    <div class="glide w-full mx-auto" ref="glideRef">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li
            v-for="(certificate, index) in certificates"
            :key="index"
            class="glide__slide group relative cursor-pointer overflow-hidden rounded-xl border border-black/5 dark:border-white/10"
            @click="goToSlide(index, certificate.link)"
          >
            <!-- Aspect Ratio Container -->
            <div class="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
               <img
                :src="imageUrl(`certificates/${certificate.image[locale] || certificate.image}`, 'preview')"
                :alt="certificate.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <!-- Overlay -->
              <div class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"></div>
              
              <!-- Action Button (only visible on active/hover) -->
               <div
                class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                  <span class="hvr-indigo rounded-full flex items-center gap-2 bg-white/90 px-4 py-2 text-sm font-bold text-gray-900 shadow-lg backdrop-blur-sm">
                    {{ $t('certificates.cta') }}
                    <Icon name="mingcute:arrow-right-up-line" />
                  </span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Controls -->
      <div
        class="mt-8 flex items-center justify-between"
        data-glide-el="controls"
        v-if="certificates.length > 1"
      >
        <button
          class="rounded-full p-2 w-10 h-10 flex items-center justify-center text-gray-500 transition-colors hover:bg-gray-100"
          data-glide-dir="<"
          aria-label="Previous slide"
        >
          <Icon name="ph:arrow-left-bold" class="h-8 w-8" />
        </button>

        <span class="text-sm font-medium text-gray-500">
          {{ glide ? glide.index + 1 : 1 }} / {{ certificates.length }}
        </span>

        <button
          class="rounded-full p-2 w-10 h-10 flex items-center justify-center text-gray-500 transition-colors hover:bg-gray-100"
          data-glide-dir=">"
          aria-label="Next slide"
        >
          <Icon name="ph:arrow-right-bold" class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Active Item Details -->
    <div class="mt-8 text-center" v-if="activeCertificate">
      <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        {{ activeCertificate.title[locale] }}
      </h3>
      <p class="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {{ activeCertificate.description[locale] }}
      </p>
    </div>
  </div>
</template>