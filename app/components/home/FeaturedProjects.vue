<script setup lang="ts">
const { featuredProjects } = useProjects()
const { locale } = useI18n()
</script>

<template>
  <SectionWrapper :title="$t('featured_projects.title')" containerClass="max-w-6xl">
    <template #description>
      {{ $t('featured_projects.subtitle') }}
    </template>
    
    <div class="grid gap-8 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      <div v-for="(project, index) in featuredProjects" :key="index">
        <Card
          :title="project.title[locale]"
          :description="project.description[locale]"
          :image="imageUrl(`projects/${project.image}`, 'preview')"
          :cta="$t('featured_projects.cta')" 
          :link="project.link"
          :truncate="true"
          :floatingEffect="true"
          :glow="true"
        />
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <NuxtLink
        to="/projects"
        class="group p-2 btn btn-primary inline-flex items-center gap-2"
      >
        {{ $t('featured_projects.section_cta') }}
        <span
          class="inline-block transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </NuxtLink>
    </div>
  </SectionWrapper>
</template>
