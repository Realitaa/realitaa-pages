<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  caption?: string
}>()
</script>

<template>
  <figure class="my-8 text-center">
    <NuxtImg
      :src="src"
      :alt="alt || caption || 'Image'"
      class="mx-auto max-w-full rounded-xl shadow-lg"
      loading="lazy"
    />
    <figcaption 
      v-if="caption" 
      class="mt-3 text-sm italic text-gray-500 dark:text-white/50"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
