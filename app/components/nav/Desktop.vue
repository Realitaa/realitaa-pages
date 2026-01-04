<template>
  <nav class="hidden md:flex items-center px-6 py-2 rounded-full relative overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-lg ring-1 ring-black/5">
    <!-- Liquid Glass Effect Background -->
    <div class="absolute inset-0 z-[-1] bg-gradient-to-br from-white/30 to-white/10 dark:from-white/5 dark:to-transparent opacity-50"></div>
    
    <ul class="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
      <li v-for="item in navList" :key="item.name">
        <NuxtLink :to="item.href" class="hover:text-primary transition-colors duration-200" active-class="text-indigo-600 dark:text-indigo-400 font-semibold">
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  const navList = useNavList()

// Logic for hash links (#projects) could be enhanced to handle cross-page navigation properly if not covered by NuxtLink default behavior.
// Current spec says:
// 1. If at index: #projects scrolls
// 2. If not at index: go to index#projects
// NuxtLink handles to="/#projects" reasonably well, but sticky active states might need global state or route watcher.
// For now, simple NuxtLink is a good start.
</script>

<style scoped>
/* liquid glass polish */
nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: skewX(-20deg);
  pointer-events: none;
  animation: shine 8s infinite linear;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) skewX(-20deg);
  }
  100% {
    transform: translateX(50%) skewX(-20deg);
  }
}
</style>
