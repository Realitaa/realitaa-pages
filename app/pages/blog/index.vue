<script setup lang="ts">
const { getAllArticles, filterArticles, extractTags, formatDate } = useBlog()
const { assetsBaseUrl } = useRuntimeConfig().public

// Fetch all articles
const { data: articles } = await useAsyncData('blog-list', () => getAllArticles())

// Reactive search and filter state
const searchQuery = ref('')
const selectedTags = ref<string[]>([])

// Extract all unique tags from articles
const allTags = computed(() => {
  return articles.value ? extractTags(articles.value) : []
})

// Filtered articles based on search and tags
const filteredArticles = computed(() => {
  if (!articles.value) return []
  return filterArticles(articles.value, searchQuery.value, selectedTags.value)
})

// Toggle tag selection
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedTags.value = []
}

// Generate placeholder image URL based on article title
const getArticleImage = (article: { title: string; image?: string }) => {
  if (article.image) {
    return article.image.startsWith('http') ? article.image : `${assetsBaseUrl}/${article.image}`
  }
  // Fallback to a gradient placeholder
  return null
}

// SEO
useSeoMeta({
  title: 'Blog | Reza Mulia Putra',
  description: 'Tutorial dan Wawasan Tentang Web Development, AI/ML, dan Backend.',

  ogTitle: 'Blog | Reza Mulia Putra',
  ogDescription: 'Tutorial dan Wawasan Tentang Web Development, AI/ML, dan Backend.',
  ogType: 'website',
  ogImage: 'https://assets.realitaa.dev/img/cover.png',
  ogUrl: 'https://realitaa.dev/blog',

  twitterTitle: 'Blog | Reza Mulia Putra',
  twitterDescription: 'Tutorial dan Wawasan Tentang Web Development, AI/ML, dan Backend.',
  twitterImage: 'https://assets.realitaa.dev/img/cover.png',

  robots: 'index, follow'
})
</script>

<template>
  <SectionWrapper title="Blog" containerClass="max-w-6xl">
    <template #description>
      Tutorial dan Wawasan Tentang Web Development, AI/ML, dan Backend.
    </template>

    <!-- Search and Filter Section -->
    <div class="mb-8 space-y-4">
      <!-- Search Box -->
      <div class="relative">
        <Icon 
          name="mdi:magnify" 
          class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 text-xl" 
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search articles..."
          class="w-full rounded-xl border border-black/10 bg-white/70 py-3 pl-12 pr-4 
                 text-gray-900 backdrop-blur-sm transition-all
                 placeholder:text-gray-400
                 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                 dark:border-white/15 dark:bg-black/10 dark:text-white dark:placeholder:text-white/40"
        />
      </div>

      <!-- Tags Filter -->
      <div v-if="allTags.length > 0" class="flex flex-wrap items-center gap-2">
        <button
          v-for="tag in allTags"
          :key="tag"
          :class="[
            'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
            selectedTags.includes(tag)
              ? 'bg-primary text-white'
              : 'border border-black/10 bg-white/50 text-gray-600 hover:border-primary hover:text-primary dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:hover:border-primary'
          ]"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
        <button
          v-if="selectedTags.length > 0 || searchQuery"
          class="ml-2 text-sm text-gray-500 underline hover:text-primary dark:text-white/50"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>
    </div>

    <!-- Articles Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="article in filteredArticles"
        :key="article.path"
        :to="article.path"
        class="block"
      >
        <Card :floatingEffect="true" :glow="true">
          <!-- Article Image -->
          <div class="relative h-48 w-full overflow-hidden">
            <img
              v-if="getArticleImage(article)"
              :src="getArticleImage(article)!"
              :alt="article.title"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div 
              v-else 
              class="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/20 via-primary/10 to-transparent"
            >
              <Icon name="mdi:post-outline" class="text-6xl text-primary/40" />
            </div>
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            
            <!-- Draft Badge -->
            <span 
              v-if="article.draft" 
              class="absolute right-3 top-3 rounded-full bg-amber-500/90 px-2 py-0.5 text-xs font-medium text-white"
            >
              Draft
            </span>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Date -->
            <time 
              :datetime="article.date" 
              class="text-sm text-gray-500 dark:text-white/50"
            >
              {{ formatDate(article.date) }}
            </time>

            <!-- Title -->
            <h3 class="mt-2 text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
              {{ article.title }}
            </h3>

            <!-- Description -->
            <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/70 line-clamp-3">
              {{ article.description }}
            </p>

            <!-- Tags -->
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags?.slice(0, 3)"
                :key="tag"
                class="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-white/10 dark:text-white/60"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </Card>
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div 
      v-if="filteredArticles.length === 0" 
      class="py-16 text-center"
    >
      <Icon name="mdi:file-document-outline" class="mx-auto mb-4 text-6xl text-gray-300 dark:text-white/20" />
      <p v-if="searchQuery || selectedTags.length > 0" class="text-gray-500 dark:text-white/50">
        No articles match your filters.
        <button class="text-primary underline" @click="clearFilters">Clear filters</button>
      </p>
      <p v-else class="text-gray-500 dark:text-white/50">
        No articles yet. Check back soon!
      </p>
    </div>
  </SectionWrapper>
</template>
