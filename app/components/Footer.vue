<template>
  <footer class="relative z-10 py-12 border-t border-white/10 dark:border-white/5">
    
    <!-- Top Gradient for Footer (Azure Depths Top / Top Gradient Radial) -->
    <div class="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
       <div class="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_10%,#fff_40%,#6366f1_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,#000000_40%,#010133_100%)] opacity-20"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Identity -->
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Reza Mulia Putra</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Backend Developer</p>
          <div class="flex gap-4">
            <template v-for="item in socialMedia" :key="item.label">
             <a :href="item.href" target="_blank" class="text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
               <Icon :name="item.outlineIcon" class="w-6 h-6" />
             </a>
            </template>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
           <h4 :class="sectionTitle">Quick Links</h4>
           <ul class="space-y-2">
             <li v-for="item in navList" :key="item.name">
              <NuxtLink :to="item.href" :class="footerLink">
                {{ item.name }}
              </NuxtLink>
             </li>
           </ul>
        </div>

        <!-- Get in Touch -->
        <div>
           <h4 :class="sectionTitle">Get in Touch</h4>
           <NuxtLink to="mailto:rezaputramulia@gmail.com" :class="footerLink">rezaputramulia@gmail.com</NuxtLink>
           <p class="text-gray-600 dark:text-gray-400">Medan, Indonesia</p>
        </div>
      </div>

      <div class="pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          &copy; {{ new Date().getFullYear() }} Reza Mulia Putra. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const navList = useNavList()
  const socialMedia = useCTA()

  // Reused Style
  const footerLink =
    "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"

  const sectionTitle =
    "text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4"
</script>