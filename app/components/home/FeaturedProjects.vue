<script setup lang="ts">
const projects = useFeaturedProjects()
</script>

<template>
  <section class="py-20">
  <div class="container mx-auto max-w-6xl px-4">
      <h2
        class="mb-4 text-center text-3xl font-bold
               text-gray-900 dark:text-white">
        Featured Projects
      </h2>

      <p
        class="mx-auto mb-16 max-w-xl text-center text-lg
               text-gray-600 dark:text-white/70">
        Here are some of the projects that I have built.
      </p>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="(project, index) in projects"
          :key="index"
          v-bind="project"
        />
      </div>
    </div>
</section>
</template>
