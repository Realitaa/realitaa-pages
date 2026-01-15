<script setup lang="ts">
const route = useRoute()
const { getArticle, getRelatedArticles, formatDate } = useBlog()

// Get slug from route params
const slug = computed(() => {
  const params = route.params.slug
  return Array.isArray(params) ? params.join('/') : params
})

// Fetch article
const { data: article, error } = await useAsyncData(
  `blog-${slug.value}`,
  () => getArticle(slug.value || '')
)

// Handle 404
if (error.value || !article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article not found',
    fatal: true,
  })
}

// Fetch related articles
const { data: relatedArticles } = await useAsyncData(
  `related-${slug.value}`,
  () => getRelatedArticles(article.value?.tags || [], article.value?.path || '')
)

// Check if ToC should be displayed (at least 2 headings)
const showToc = computed(() => {
  return article.value?.toc && article.value.toc.length >= 2
})

// SEO
useSeoMeta({
  title: article.value?.title,
  description: article.value?.description,
  ogTitle: article.value?.title,
  ogDescription: article.value?.description,
  ogType: 'article',
  articlePublishedTime: article.value?.date,
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] px-4 py-8">
    <!-- Back Link -->
    <div class="mx-auto mb-6 max-w-7xl">
      <NuxtLink 
        to="/blog" 
        class="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary dark:text-white/50 dark:hover:text-primary"
      >
        <Icon name="mdi:arrow-left" class="text-lg" />
        Back to Blog
      </NuxtLink>
    </div>

    <!-- Main Card Wrapper -->
    <div class="mx-auto max-w-7xl">
      <Card>
        <div class="flex h-[calc(100vh-12rem)] flex-col lg:flex-row">
          <!-- Left: Scrollable Content Area -->
          <div class="flex-1 overflow-y-auto lg:border-r lg:border-black/10 lg:dark:border-white/10">
            <div class="p-6 lg:p-8">
              <!-- Article Header -->
              <header class="mb-8 border-b border-black/10 pb-8 dark:border-white/10">
                <div class="mb-4 flex items-center gap-3">
                  <time 
                    :datetime="article?.date" 
                    class="text-sm text-gray-500 dark:text-white/50"
                  >
                    {{ formatDate(article?.date || '') }}
                  </time>
                  <span 
                    v-if="article?.draft" 
                    class="rounded-full bg-amber-500/90 px-2 py-0.5 text-xs font-medium text-white"
                  >
                    Draft
                  </span>
                </div>

                <h1 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                  {{ article?.title }}
                </h1>

                <p class="text-lg text-gray-600 dark:text-white/70">
                  {{ article?.description }}
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="tag in article?.tags"
                    :key="tag"
                    class="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                  >
                    {{ tag }}
                  </span>
                </div>
              </header>

              <!-- Article Content -->
              <UApp>
                <article>
                  <ContentRenderer :value="article" />
                </article>
              </UApp>
            </div>
          </div>

          <!-- Right: Sticky Table of Contents (Desktop Only) -->
          <aside 
            v-if="showToc" 
            class="hidden w-64 shrink-0 lg:block"
          >
            <div class="sticky top-0 p-6">
              <h4 class="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/50">
                On this page
              </h4>
              <nav>
                <ul class="space-y-2">
                  <li 
                    v-for="item in article?.toc" 
                    :key="item.id"
                    :class="[
                      'text-sm transition-colors',
                      item.depth === 3 ? 'pl-4' : '',
                      item.depth === 4 ? 'pl-8' : ''
                    ]"
                  >
                    <a 
                      :href="`#${item.id}`"
                      class="block text-gray-500 hover:text-primary dark:text-white/50 dark:hover:text-primary"
                    >
                      {{ item.text }}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>

        <!-- Bottom: Related Articles -->
        <div 
          v-if="relatedArticles && relatedArticles.length > 0" 
          class="border-t border-black/10 p-6 dark:border-white/10 lg:p-8"
        >
          <h2 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
            Related Articles
          </h2>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <NuxtLink
              v-for="related in relatedArticles"
              :key="related.path"
              :to="related.path"
              class="group rounded-xl border border-black/10 bg-white/50 p-4 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
            >
              <time 
                :datetime="related.date" 
                class="text-xs text-gray-500 dark:text-white/50"
              >
                {{ formatDate(related.date) }}
              </time>
              <h3 class="mt-1 font-semibold text-gray-900 transition-colors group-hover:text-primary dark:text-white line-clamp-2">
                {{ related.title }}
              </h3>
              <div class="mt-2 flex flex-wrap gap-1">
                <span
                  v-for="tag in related.tags?.slice(0, 2)"
                  :key="tag"
                  class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 dark:bg-white/10 dark:text-white/50"
                >
                  {{ tag }}
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
