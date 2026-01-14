<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  labels?: string[]
}>()

const activeTab = ref(0)
</script>

<template>
  <div class="my-6 overflow-hidden rounded-xl border border-black/10 dark:border-white/15">
    <!-- Tabs -->
    <div 
      v-if="labels && labels.length > 1" 
      class="flex border-b border-black/10 bg-gray-50 dark:border-white/10 dark:bg-white/5"
    >
      <button
        v-for="(label, index) in labels"
        :key="label"
        :class="[
          'px-4 py-2 text-sm font-medium transition-colors',
          activeTab === index
            ? 'border-b-2 border-primary bg-white text-primary dark:bg-black/20'
            : 'text-gray-500 hover:text-gray-700 dark:text-white/50 dark:hover:text-white'
        ]"
        @click="activeTab = index"
      >
        {{ label }}
      </button>
    </div>
    
    <!-- Code Panels -->
    <div class="bg-gray-900 dark:bg-black/50 [&>pre]:m-0 [&>pre]:rounded-none">
      <slot :active="activeTab" />
    </div>
  </div>
</template>
