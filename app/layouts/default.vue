<template>
  <div class="min-h-screen w-full relative flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-black overflow-x-hidden selection:bg-indigo-500/30">
    
    <!-- Global Background Gradients (Bottom Radial / Azure Depths) -->
    <!-- Mode Terang: Bottom Gradient Radial -->
    <!-- Mode Gelap: Azure Depths -->
    <!-- Using Tailwind classes for convenience or style binding -->
    <div ref="host" class="fixed inset-0 z-0 pointer-events-none">
       <!-- Dark Mode Azure Depths -->
       <div class="absolute inset-0 hidden dark:block bg-[radial-gradient(125%_125%_at_50%_100%,#000000_40%,#010133_100%)]"></div>
       <!-- Light Mode Bottom Gradient -->
       <div class="absolute inset-0 block dark:hidden bg-[radial-gradient(125%_125%_at_50%_90%,#fff_40%,#6366f1_100%)]"></div>
    </div>

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="grow relative z-10 pt-16">
       <slot />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useStarfieldBackground } from '../composables/useStarfieldBackground'

const host = ref<HTMLElement | null>(null)

useStarfieldBackground(host, {
  density: 1,
  speed: 1,
  trailAlpha: 0.18,
  safeRadius: 160
})
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
