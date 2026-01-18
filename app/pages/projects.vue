<script setup lang="ts">
useSeoMeta({
  title: 'Proyek | Reza Mulia Putra',
  description: 'Proyek Open Source yang dipublikasikan oleh Reza Mulia Putra',

  ogTitle: 'Proyek | Reza Mulia Putra',
  ogDescription: 'Proyek Open Source yang dipublikasikan oleh Reza Mulia Putra',
  ogType: 'website',
  ogImage: 'https://assets.realitaa.dev/img/cover.png',
  ogUrl: 'https://realitaa.dev/projects',

  twitterTitle: 'Proyek | Reza Mulia Putra',
  twitterDescription: 'Proyek Open Source yang dipublikasikan oleh Reza Mulia Putra',
  twitterImage: 'https://assets.realitaa.dev/img/cover.png',

  robots: 'index, follow'
})

const { projects, status, error } = useProjects()
const { locale } = useI18n()
</script>

<template>
  <SectionWrapper :title="$t('projects.title')" containerClass="max-w-6xl">
    <template #description>
      {{ $t('projects.subtitle') }}
    </template>

    <!-- Loading -->
    <div v-if="status === 'pending'" class="py-16 text-center opacity-70">
      Loading projects...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="py-16 text-center text-red-500">
      Failed to load projects.
    </div>

    <!-- Data -->
    <div v-else class="mx-auto flex max-w-6xl flex-col gap-12">
      <Card v-for="(project, index) in projects" :key="index" :title="project.title[locale]" :glow="true">
        <!-- Custom 70/30 Layout -->
        <div class="flex flex-col md:flex-row">
          <!-- DESKTOP LEFT (70%) / MOBILE BOTTOM Content -->
          <div class="flex flex-col justify-center p-8 md:w-[70%] md:order-1 order-2">
            <!-- Title -->
            <h3 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              {{ project.title[locale] }}
            </h3>
            
            <!-- Tech Stack (Mobile Position) -->
            <div class="mb-6 md:hidden">
              <h4 class="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Tech Stack
              </h4>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="tech in project.stack"
                  :key="tech.name"
                  class="flex items-center justify-center"
                >
                  <Icon
                    :name="tech.icon"
                    class="h-6 w-6"
                  />
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="mb-6 text-gray-600 dark:text-white/70 leading-relaxed text-lg">
              {{ project.description[locale] }}
            </p>

            <!-- CTA -->
            <div class="mt-auto flex gap-4">
              <a  
                v-for="cta in project.cta"
                :key="cta.label"
                :href="cta.link"
                class="hvr-indigo inline-flex items-center gap-2 rounded-full bg-indigo-400/10 py-2 text-sm font-semibold transition-colors hover:text-gray-500 dark:hover:text-white"
              >
                {{ cta.label[locale] }}
                <Icon :name="cta.icon || 'heroicons:arrow-right'" class="h-4 w-4" />
              </a>
            </div>
          </div>

          <!-- DESKTOP RIGHT (30%) / MOBILE TOP Media -->
          <div class="bg-black/5 p-8 dark:bg-white/5 md:w-[30%] md:order-2 order-1 border-b md:border-b-0 md:border-l border-black/10 dark:border-white/10">
            <!-- Project Images -->
            <PrimeVueImage
              v-for="(img, i) in project.images"
              :key="i"
              :img="imageUrl(`projects/${img}`, 'thumb')"
              :originalImg="imageUrl(`projects/${img}`, 'original')"
              :alt="project.title"
              class="mb-6 overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
            />

            <!-- Tech Stack (Desktop Position) -->
            <div class="hidden md:block">
              <h4 class="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Tech Stack
              </h4>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="tech in project.stack"
                  :key="tech.name"
                  class="relative flex items-center justify-center"
                >
                  <Icon
                    :name="tech.icon"
                    class="h-6 w-6"
                  />
                  <!-- Simple Tooltip -->
                  <span class="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover/tech:opacity-100 dark:bg-white dark:text-black whitespace-nowrap">
                    {{ tech.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </SectionWrapper>
</template>