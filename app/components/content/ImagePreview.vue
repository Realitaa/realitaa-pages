<script setup lang="ts">
type ImageVariant = 'original' | 'preview' | 'thumb' | 'external'

const props = defineProps<{
  src: string
  alt: string
  caption?: string
  variant?: ImageVariant
}>()

const imgSrc = () => {
  if (props.variant === 'external') return props.src
  return `blog/${props.src}`
}
</script>

<template>
  <PrimeVueImage
    :img="imageUrl(imgSrc(), variant)"
    :originalImg="imageUrl(imgSrc(), variant === 'external' ? 'external' : 'original')"
    :alt="alt"
    imgClass="w-full h-auto"
  />

  <figcaption v-if="caption" class="mt-3 text-sm text-center italic text-gray-500 dark:text-white/50">
    {{ caption }}
  </figcaption>
</template>