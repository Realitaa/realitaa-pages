<template>
  <div class="flex items-center justify-between">
    <button :class="configLink">
      <Icon name="ph:sun-bold" class="w-5 h-5" />
      <span>Theme</span>
    </button>
    
    <button :class="configLink">
      <Icon name="ph:globe-bold" class="w-5 h-5" />
      <span>English</span>
    </button>
  </div>
</template>

<script setup lang="ts">
// Reused Style
const configLink = "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300"
</script>