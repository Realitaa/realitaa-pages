<script setup lang="ts">
const projects = [
  {
    title: "Realitaa Portfolio",
    description: "A modern, high-performance portfolio website built with Nuxt 4, featuring a dynamic design, theme switching, and seamless transitions.",
    images: ["https://picsum.photos/seed/realitaa/800/600"],
    cta: "View Source",
    link: "https://github.com/realitaa/realitaa.netlify.app",
    stack: [
      { name: "Nuxt", icon: "devicon:nuxt" },
      { name: "Vue", icon: "logos:vue" },
      { name: "Tailwind", icon: "devicon:tailwindcss" },
      { name: "TypeScript", icon: "logos:typescript-icon" }
    ]
  },
  {
    title: "AI Task Manager",
    description: "An intelligent task management system that uses AI to prioritize and categorize tasks, helping users stay productive and focused.",
    images: ["https://picsum.photos/seed/ai-task/800/600"],
    cta: "Live Demo",
    link: "#",
    stack: [
      { name: "React", icon: "logos:react" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "OpenAI", icon: "logos:openai-icon" },
      { name: "Supabase", icon: "devicon:supabase" }
    ]
  },
  {
    title: "Eco-Shop E-commerce",
    description: "A sustainable e-commerce platform dedicated to eco-friendly products, featuring a clean design and seamless checkout experience.",
    images: ["https://picsum.photos/seed/eco-shop/800/600"],
    cta: "Case Study",
    link: "#",
    stack: [
      { name: "Laravel", icon: "logos:laravel" },
      { name: "Livewire", icon: "devicon:livewire" },
      { name: "Alpine.js", icon: "skill-icons:alpinejs-light" },
      { name: "PostgreSQL", icon: "logos:postgresql" }
    ]
  }
]
</script>

<template>
  <SectionWrapper title="Projects" containerClass="max-w-6xl">
    <template #description>
      A selection of my public projects, ranging from web applications to specialized tools.
    </template>

    <div class="mx-auto flex max-w-6xl flex-col gap-12">
      <Card v-for="(project, index) in projects" :key="index">
        <!-- Custom 70/30 Layout -->
        <div class="flex flex-col md:flex-row">
          <!-- DESKTOP LEFT (70%) / MOBILE BOTTOM Content -->
          <div class="flex flex-col justify-center p-8 md:w-[70%] md:order-1 order-2">
            <!-- Title -->
            <h3 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              {{ project.title }}
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
              {{ project.description }}
            </p>

            <!-- CTA -->
            <div class="mt-auto">
              <a
                :href="project.link"
                class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {{ project.cta }}
                <span>→</span>
              </a>
            </div>
          </div>

          <!-- DESKTOP RIGHT (30%) / MOBILE TOP Media -->
          <div class="bg-black/5 p-8 dark:bg-white/5 md:w-[30%] md:order-2 order-1 border-b md:border-b-0 md:border-l border-black/10 dark:border-white/10">
            <!-- Project Images -->
            <div class="mb-6 overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02]">
              <img
                v-for="(img, i) in project.images"
                :key="i"
                :src="img"
                :alt="project.title"
                class="aspect-video w-full object-cover"
              />
            </div>

            <!-- Tech Stack (Desktop Position) -->
            <div class="hidden md:block">
              <h4 class="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Tech Stack
              </h4>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="tech in project.stack"
                  :key="tech.name"
                  class="group/tech relative flex items-center justify-center"
                >
                  <Icon
                    :name="tech.icon"
                    class="h-6 w-6 grayscale transition-all hover:grayscale-0"
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