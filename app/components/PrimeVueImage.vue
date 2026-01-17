<script setup lang="ts">
const props = defineProps<{
  img: string
  originalImg: string
  alt: string
  class?: string
}>()
</script>

<template>
  <div :class="props.class">
    <Image
      imageClass="aspect-video w-full object-cover"
      :src="props.img"
      :alt="props.alt"
      preview
    >
      <template
        #original="{
          class: originalClass,
          style,
          previewCallback
        }"
      >
        <img
          :src="props.originalImg"
          :class="originalClass"
          :style="style"
          @click="previewCallback"
          loading="lazy"
        />
      </template>
    </Image>
  </div>
</template> 