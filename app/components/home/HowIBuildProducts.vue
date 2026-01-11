<script setup lang="ts">
const items = useHowIBuildProducts()
</script>

<template>
  <SectionWrapper title="How I Build Products" containerClass="max-w-6xl bg-base-200">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(item, index) in items" :key="index">
        <Card
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
        />
      </div>
    </div>
  </SectionWrapper>
</template>
