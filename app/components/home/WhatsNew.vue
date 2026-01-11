<script setup lang="ts">
const news = useWhatsNew()
</script>

<template>
  <SectionWrapper title="What's New?" containerClass="max-w-6xl">
    <template #description>
      Here are some of the latest news and updates in my blog.
    </template>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(item, index) in news" :key="index">
          <Card
            :title="item.title"
            :description="item.description"
            :image="item.image"
            :cta="item.cta"
            :link="item.link"
          />
        </div>
      </div>
  </SectionWrapper>
</template>
