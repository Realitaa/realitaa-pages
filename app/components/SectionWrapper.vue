<script setup lang="ts">
defineProps({
  title: String,
  containerClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="py-20">
    <div :class="['container mx-auto px-4', containerClass]">
      <div v-if="title || $slots.description" class="mb-12 text-center">
        <h2 v-if="title" class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          {{ title }}
        </h2>
        <div v-if="$slots.description" class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-white/70">
          <slot name="description" />
        </div>
      </div>
      <slot />
    </div>
  </section>
</template>
