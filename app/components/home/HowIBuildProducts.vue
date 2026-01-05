<script setup lang="ts">
const items = useHowIBuildProducts()
</script>

<template>
  <section class="py-20">
    <div class="container max-w-6xl bg-base-200 mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">How I Build Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(item, index) in items" :key="index">
          <Card
            :title="item.title"
            :description="item.description"
            :icon="item.icon"
          />
        </div>
      </div>
    </div>
  </section>
</template>
