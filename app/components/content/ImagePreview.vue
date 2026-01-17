<script setup lang="ts">
type ImageVariant = 'original' | 'preview' | 'thumb' | 'external'

defineProps<{
  src: string
  alt: string
  caption?: string
  variant?: ImageVariant
}>()
</script>

<template>
  <PrimeVueImage
    :img="imageUrl(`blog/${src}`, variant)"
    :originalImg="imageUrl(`blog/${src}`, variant === 'external' ? 'external' : 'original')"
    :alt="alt"
    imgClass="w-full h-auto"
  />

  <figcaption v-if="caption" class="mt-3 text-sm text-center italic text-gray-500 dark:text-white/50">
    {{ caption }}
  </figcaption>
</template>