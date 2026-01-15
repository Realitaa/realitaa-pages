<script setup lang="ts">
const route = useRoute()
const { getArticle, getRelatedArticles, formatDate } = useBlog()
const tocInlineRef = ref<HTMLElement | null>(null)
const showFloatingToc = ref(false)
const floatingStyle = ref<Record<string, string>>({})
const tocKey = ref(0)
const activeHeading = ref<string | null>(null)
const isTocOpen = ref(false)

onMounted(() => {
  if (!tocInlineRef.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      // Jika ToC inline sudah TIDAK terlihat → tampilkan fixed ToC
      showFloatingToc.value = !entry.isIntersecting
    },
    {
      root: null, // viewport
      threshold: 0,
    }
  )

  const updatePosition = () => {
    const rect = tocInlineRef.value!.getBoundingClientRect()

    floatingStyle.value = {
      left: `${rect.left}px`,
      width: `${rect.width}px`,
    }
  }

  updatePosition()
  window.addEventListener('resize', updatePosition)

  observer.observe(tocInlineRef.value)

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('resize', updatePosition)
  })
})

onMounted(() => {
  const headings = document.querySelectorAll(
    'article h2, article h3, article h4'
  )

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible.length > 0) {
        activeHeading.value = visible[0].target.id
      }
    },
    {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    }
  )

  headings.forEach(h => observer.observe(h))
})

function onTocClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null

  if (!link) return

  e.preventDefault()

  const id = link.getAttribute('href')?.slice(1)
  if (!id) return

  // 1. Tutup drawer
  isTocOpen.value = false

  // 2. Tunggu drawer benar-benar tertutup
  requestAnimationFrame(() => {
    setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return

      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      // Optional: update URL hash
      history.pushState(null, '', `#${id}`)
    }, 200) // sesuaikan dengan durasi animasi drawer
  })
}


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

// SEO
useSeoMeta({
  title: article.value?.title,
  description: article.value?.description,
  ogTitle: article.value?.title,
  ogImage: article.value?.image,
  ogDescription: article.value?.description,
  ogType: 'article',
  articlePublishedTime: article.value?.date,
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] px-4 py-8">
    <div class="mx-auto mb-6 max-w-6xl">
      <NuxtLink 
        to="/blog" 
        class="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary dark:text-white/50 dark:hover:text-primary"
      >
        <Icon name="mdi:arrow-left" class="text-lg" />
        Back to Blog
      </NuxtLink>
    </div>

    <div class="mx-auto max-w-6xl">
      <Card>
        <div class="flex flex-col lg:flex-row">
          <div class="flex-1 lg:border-r lg:border-black/10 lg:dark:border-white/10">
            <div class="p-6 lg:p-8">
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

              <UApp>
                <div class="mx-auto flex max-w-7xl gap-12">
                  <article class="w-full max-w-prose">
                    <ContentRenderer :value="article" />
                  </article>

                  <!-- TOC INLINE -->
                  <aside
                    ref="tocInlineRef"
                    class="hidden shrink-0 lg:block self-start"
                  >
                    <UContentToc
                      :key="`inline-${tocKey}`"
                      :links="article?.body?.toc?.links"
                      title="Daftar Isi"
                      :active-id="activeHeading"
                      trailingIcon="lineicons:folder"
                    />
                  </aside>
                </div>
              </UApp>
            </div>
          </div>
        </div>

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

    <!-- FLOATING TOC -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div  
        v-show="showFloatingToc"
        class="fixed top-20 z-50 hidden lg:block"
        :style="floatingStyle"
      >
        <UContentToc
          :active-id="activeHeading"
          :links="article?.body?.toc?.links"
          title="Daftar Isi"
          trailingIcon="lineicons:folder"
        />
      </div>
    </Transition>

    </div>
    <UDrawer v-model:open="isTocOpen" direction="right">
      <!-- Trigger -->
      <UButton
        color="neutral"
        variant="soft"
        class="fixed right-0 top-1/2 -translate-y-1/2 z-40 h-14 w-15 rounded-l-xl shadow-md lg:hidden"
        aria-label="Open Table of Contents"
        @click="isTocOpen = true"
      >
        <UIcon name="i-lucide-chevron-left" class="text-lg" />
        <UIcon name="lineicons:list" class="text-lg" />
      </UButton>

      <!-- Drawer Content -->
      <template #content>
        <div class="w-72 p-4">
          <!-- Custom ToC wrapper -->
          <UContentToc
            :active-id="activeHeading"
            :links="article?.body?.toc?.links"
            title="Daftar Isi"
            @click="onTocClick"
            :open="true"
            trailingIcon="lineicons:folder"
          />
        </div>
      </template>
    </UDrawer>
  </div>
</template>