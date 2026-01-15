<script setup lang="ts">
const { getLatestArticles } = useBlog()

const { data: latestBlog } = await useAsyncData('latest-blog', () => getLatestArticles(3))
</script>

<template>
  <SectionWrapper :title="$t('whats_new.title')" containerClass="max-w-6xl">
    <template #description>
      {{ $t('whats_new.subtitle') }}
    </template>
      <div class="grid gap-8 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
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
