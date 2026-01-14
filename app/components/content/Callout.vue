<script setup lang="ts">
defineProps<{
  type?: 'note' | 'tip' | 'warning' | 'danger'
}>()

const icons: Record<string, string> = {
  note: 'mdi:information-outline',
  tip: 'mdi:lightbulb-outline',
  warning: 'mdi:alert-outline',
  danger: 'mdi:alert-circle-outline',
}

const typeClasses: Record<string, string> = {
  note: 'border-blue-500 bg-blue-500/10 dark:bg-blue-500/15',
  tip: 'border-green-500 bg-green-500/10 dark:bg-green-500/15',
  warning: 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15',
  danger: 'border-red-500 bg-red-500/10 dark:bg-red-500/15',
}

const iconClasses: Record<string, string> = {
  note: 'text-blue-500',
  tip: 'text-green-500',
  warning: 'text-amber-500',
  danger: 'text-red-500',
}
</script>

<template>
  <div 
    :class="[
      'my-6 flex gap-4 rounded-lg border-l-4 p-4',
      typeClasses[type || 'note']
    ]"
  >
    <div :class="['shrink-0 text-xl', iconClasses[type || 'note']]">
      <Icon :name="icons[type || 'note']" />
    </div>
    <div class="flex-1 text-gray-700 dark:text-white/80 [&>p:last-child]:mb-0">
      <slot />
    </div>
  </div>
</template>
