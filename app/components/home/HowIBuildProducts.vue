<script setup lang="ts">
const items = useHowIBuildProducts()
</script>

<template>
  <SectionWrapper
    :title="$t('how_i_build_products.title')"
    containerClass="max-w-6xl"
  >
    <div class="flex flex-wrap justify-center gap-8">
      <div
        v-for="item in items"
        :key="item.key"
        class="sm:max-w-88"
      >
        <Card
          :title="$t(`how_i_build_products.${item.key}.title`)"
          :description="$t(`how_i_build_products.${item.key}.body`)"
          :icon="item.icon"
          floatingEffect
          glow
        />
      </div>
    </div>
  </SectionWrapper>
</template>
