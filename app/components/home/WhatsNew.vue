<script setup lang="ts">
const { getLatestArticles } = useBlog()

const { data: latestBlog } = await useAsyncData('latest-blog', () => getLatestArticles(3))
</script>

<template>
  <SectionWrapper :title="$t('whats_new.title')" containerClass="max-w-6xl">
    <template #description>
      {{ $t('whats_new.subtitle') }}
    </template>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(item, index) in latestBlog" :key="index">
          <Card
            :title="item.title"
            :description="item.description"
            :image="item.image"
            :cta="item.cta"
            :link="item.link"
            :floatingEffect="true"
            :glow="true"
            :truncate="true"
          />
        </div>
      </div>
  </SectionWrapper>
</template>
