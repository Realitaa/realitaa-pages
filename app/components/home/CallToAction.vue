<template>
  <SectionWrapper id="call-to-action" class="text-primary-content">
    <div class="text-center">
      <h2 class="text-3xl font-bold mb-8">{{ $t('call_to_action.title') }}</h2>
      <p class="text-xl mb-12 max-w-2xl mx-auto opacity-90">{{ $t('call_to_action.subtitle') }}</p>
      
      <div class="flex flex-wrap justify-center gap-6">
        <a v-for="c in cta" :key="c.label" :href="c.href" target="_blank" class="btn btn-lg btn-outline btn-circle bg-base-100 text-base-content border-none hover:bg-base-200">
           <Icon :name="c.icon" class="text-3xl" />
        </a>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup lang="ts">
  const cta = useCTA();
</script>