<script setup lang="ts">
const { featuredProjects } = useProjects()
const { assetsBaseUrl } = useRuntimeConfig().public

const imageUrl = (img: string) =>
  `${assetsBaseUrl}/projects/${img}`
</script>

<template>
  <SectionWrapper title="Featured Projects" containerClass="max-w-6xl">
    <template #description>
      Here are some of the projects that I have built.
    </template>
    
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(project, index) in featuredProjects" :key="index">
        <Card
          :title="project.title"
          :description="project.description"
          :image="imageUrl(project.image)"
          cta="View Project" 
          :link="project.link"
          :truncate="true"
        />
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <NuxtLink
        to="/projects"
        class="group p-2 btn btn-primary inline-flex items-center gap-2"
      >
        See All Projects
        <span
          class="inline-block transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </NuxtLink>
    </div>
  </SectionWrapper>
</template>
