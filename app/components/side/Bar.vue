<template>
  <SideLayoutsBar :is-open="isOpen" @close="$emit('close')">
    <template #header>
       <span class="font-bold text-lg tracking-wide text-gray-900 dark:text-white">Menu</span>
    </template>
    
    <nav v-for="item in navList" :key="item.name" class="flex flex-col gap-2 px-2">
      <NuxtLink :to="item.href" @click="$emit('close')" class="px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-200 font-medium">
        {{ item.name }}
      </NuxtLink>
    </nav>

    <template #footer>
      <SideConfig />
    </template>
  </SideLayoutsBar>
</template>

<script setup lang="ts">
  const navList = useNavList()

  defineProps<{
    isOpen: boolean
  }>()

  defineEmits<{
    (e: 'close'): void
  }>()
</script>
