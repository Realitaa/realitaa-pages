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
    imageClass="w-full h-auto"
    preview
  />

  <figcaption v-if="caption" class="mt-3 text-sm text-center italic text-gray-500 dark:text-white/50">
    {{ caption }}
  </figcaption>
</template>