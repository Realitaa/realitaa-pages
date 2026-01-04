<template>
  <div>
    <!-- Trigger Button -->
    <button @click="isOpen = true" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-white" aria-label="Open Menu">
      <Icon name="ph:list-bold" class="w-6 h-6" />
    </button>

    <!-- Sidebar Drawer -->
    <SideBar :is-open="isOpen" @close="isOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>
