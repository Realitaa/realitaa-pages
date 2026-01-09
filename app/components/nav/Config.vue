<template>
  <div class="hidden md:flex items-center gap-2 px-1.5 rounded-full backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-lg">
     <!-- Theme Toggle -->
     <button 
       @click="toggleTheme" 
       class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors" 
       aria-label="Toggle Theme"
     >
      <Icon :name="isDark ? 'ph:moon-bold' : 'ph:sun-bold'" class="w-5 h-5" />
     </button>
     
     <!-- Language Toggle (Simulated for now) -->
     <button class="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 transition-colors text-gray-800 dark:text-white">
        EN
     </button>
  </div>
</template>

<script setup lang="ts">
import { toggleTheme, isDark } from '~/composables/useThemeToggle'
</script>
