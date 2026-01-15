<script setup lang="ts">
const headline = "Reza Mulia Putra"
const subheadline = ['Backend Developer', 'AI/ML Enthusiast']
</script>

<template>
  <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <div class="text-center z-10 px-4">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 -m-16 bg-clip-text bg-linear-to-r from-primary to-secondary animate-gradient">
        {{ headline }}
      </h1>
      <div class="text-xl md:text-2xl text-base-content/80 mb-8 font-light tracking-wide">
        <span v-for="(job, index) in subheadline" :key="index">
          {{ job }}
          <span v-if="index < subheadline.length - 1" class="mx-2">•</span>
        </span>
      </div>
      <div class="flex flex-col md:flex-row gap-4 justify-center">
        <NuxtLink to="#contact" class="px-8 transform hover:-translate-y-2 border rounded-3xl py-2 transition-all duration-300 border-gray-300 hover:border-gray-500 dark:border-white/30 dark:hover:border-white/50 dark:hover:border-primary/50">
          {{ $t('hero.cta') }}
        </NuxtLink>
      </div>
    </div>
    
    <!-- Optional: Add some decorative background elements here if needed later -->
  </section>
</template>

<style scoped>
.animate-gradient {
  background-size: 200%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
