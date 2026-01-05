<script setup lang="ts">
const news = useWhatsNew()
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-3xl font-bold text-center mb-12">What's New?</h2>
      <p class="prose prose-lg prose-invert text-center leading-relaxed my-12">
        Here are some of the latest news and updates in my blog.
      </p>
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
    </div>
  </section>
</template>
