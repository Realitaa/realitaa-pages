<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition transform duration-300 ease-out"
      enter-from-class="-translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition transform duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-full opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-y-0 left-0 z-50 w-64 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-2xl border-r border-white/20 dark:border-white/10 flex flex-col overflow-hidden">
          <div class="p-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
              <slot name="header"></slot>
              <button @click="$emit('close')" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                <Icon name="ph:x-bold" class="w-5 h-5 text-gray-500" />
              </button>
          </div>
          <div class="flex-1 overflow-y-auto py-4">
              <slot></slot>
          </div>
          <div class="p-4 border-t border-gray-100 dark:border-gray-800">
              <slot name="footer"></slot>
          </div>
      </div>
    </Transition>
    
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" @click="$emit('close')" class="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-sm"></div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
