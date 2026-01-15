<script setup lang="ts">
const props = defineProps<{
  title?: string
  description?: string
  icon?: string
  image?: string
  cta?: string
  link?: string
  truncate?: boolean
  glow?: boolean
  floatingEffect?: boolean
}>()

const cardClass = computed(() => {
  return {
    'hover:-translate-y-2': props.floatingEffect,
    'hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.25)]': props.glow,
  }
})
</script>

<template>
  <article
    class="group relative h-full overflow-hidden rounded-3xl
           border border-black/10 dark:border-white/15
           bg-white/70 dark:bg-black/10
           backdrop-blur-xs
           transition-all duration-300"
    :class="cardClass">

    <!-- Glow accent (dark mode only) -->
    <div
      class="pointer-events-none absolute inset-0 rounded-3xl
             opacity-0 transition-opacity duration-300
             dark:group-hover:opacity-100
             bg-linear-to-br from-indigo-400/20 via-transparent to-transparent blur-xl"
      v-if="glow">
    </div>

    <!-- Image -->
    <figure v-if="image" class="relative">
      <img
        :src="image"
        :alt="title"
        class="h-48 w-full object-cover"
      />
      <!-- image overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
    </figure>

    <!-- Content -->
    <div class="relative z-10 h-full">
      <slot>
        <div class="p-6 text-center">
          <div v-if="icon" class="mb-4 text-4xl text-blue-500">
            <Icon :name="icon" />
          </div>

          <h3
            v-if="title"
            class="mb-3 text-xl font-semibold tracking-tight
                   text-gray-900 dark:text-white"
            :class="{ truncate }">
            {{ title }}
          </h3>

          <p
            v-if="description"
            class="mx-auto max-w-prose text-sm leading-relaxed
                   text-gray-600 dark:text-white/70"
            :class="{ truncate }">
            {{ description }}
          </p>

          <!-- CTA (optional) -->
          <a
            v-if="cta && link"
            :href="link"
            class="mt-6 inline-flex items-center gap-2 text-sm font-medium"
            target="_blank"
            >
            {{ cta }}
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </slot>
    </div>
  </article>
</template>
