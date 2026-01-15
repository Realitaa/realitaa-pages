<script setup lang="ts">
const items = useHowIBuildProducts()
</script>

<template>
  <SectionWrapper :title="$t('how_i_build_products.title')" containerClass="max-w-6xl bg-base-200">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(item, index) in items" :key="index">
        <Card
          :title="$t('how_i_build_products.card' + (index + 1) + '.title')"
          :description="$t('how_i_build_products.card' + (index + 1) + '.body')"
          :icon="item.icon"
          :floatingEffect="true"
          :glow="true"
        />
      </div>
    </div>
  </SectionWrapper>
</template>
