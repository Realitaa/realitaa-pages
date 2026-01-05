<script setup lang="ts">
const projects = useFeaturedProjects()
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-3xl font-bold text-center mb-12">Featured Projects</h2>
      <p class="prose prose-lg prose-invert text-center leading-relaxed my-12">
        Here are some of the projects that I have built.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(project, index) in projects" :key="index">
          <Card
            :title="project.title"
            :description="project.description"
            :image="project.image"
            :cta="project.cta"
            :link="project.link"
          />
        </div>
      </div>
    </div>
  </section>
</template>
