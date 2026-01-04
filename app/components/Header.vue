<template>
  <header class="fixed top-0 left-0 right-0 z-40 transition-all duration-300" :class="{'bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-sm': isScrolled}">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Mobile View -->
      <div class="flex md:hidden items-center gap-4 w-full">
         <Side /> <!-- Left Hamburger -->
         <NavBrand /> <!-- Right Brand -->
      </div>

      <!-- Desktop View -->
      <div class="hidden md:block w-full">
        <Nav />
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
