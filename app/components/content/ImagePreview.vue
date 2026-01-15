<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  caption?: string
}>()
</script>

<template>
  <Image
    :src="src"
    :alt="alt"
    imageClass="aspect-video w-full object-cover"
    preview
  />

  <figcaption v-if="caption" class="mt-3 text-sm text-center italic text-gray-500 dark:text-white/50">
    {{ caption }}
  </figcaption>
</template>