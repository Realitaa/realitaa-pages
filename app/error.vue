<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col gap-4 min-h-[calc(100vh-4rem)] w-full items-center justify-center text-center">
      <h1 class="text-4xl font-bold">{{ error.statusCode }}</h1>
      <h2 class="text-xl font-semibold">{{ error.statusMessage }}</h2>
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-primary">Go back home</NuxtLink>
    </div>
  </NuxtLayout>
</template>