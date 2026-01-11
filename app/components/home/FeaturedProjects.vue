<script setup lang="ts">
const projects = useFeaturedProjects()
</script>

<template>
  <SectionWrapper title="Featured Projects" containerClass="max-w-6xl">
    <template #description>
      Here are some of the projects that I have built.
    </template>
    
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="(project, index) in projects"
        :key="index"
        v-bind="project"
      />
    </div>
  </SectionWrapper>
</template>
