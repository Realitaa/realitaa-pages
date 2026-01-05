<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  icon?: string
  image?: string
  cta?: string
  link?: string
}>()
</script>

<template>
  <div class="transition-all transform hover:-translate-y-2 duration-300 h-full rounded-3xl border border-gray-300 hover:border-gray-500 dark:border-white/30 dark:hover:border-white/50 dark:hover:border-primary/50">
    <figure v-if="image">
      <img :src="image" :alt="title" class="w-full h-48 object-cover" />
    </figure>
    <div class="p-4 text-center">
      <div v-if="icon" class="text-4xl">
        <Icon :name="icon" />
      </div>
      <h2 v-if="title" class="text-xl font-bold mb-2">{{ title }}</h2>
      <p v-if="description" class="text-base-content/80 mb-6">{{ description }}</p>
    </div>
  </div>
</template>
