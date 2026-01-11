<script setup lang="ts">
const quote = useQuote()
</script>

<template>
  <SectionWrapper class="bg-base-100 border-t border-base-200 h-[calc(100vh-25rem)] flex items-center" containerClass="text-center max-w-4xl">
    <div class="mb-6">
      <div class="w-24 overflow-hidden rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
        <img :src="quote.avatar" :alt="quote.author" />
      </div>
    </div>
    <blockquote class="text-2xl md:text-3xl font-serif italic mb-6 text-base-content/80">
      "{{ quote.text }}"
    </blockquote>
    <cite class="not-italic flex flex-col items-center">
      <span class="font-bold text-lg">{{ quote.author }}</span>
      <span class="text-primary text-sm">{{ quote.role }}</span>
    </cite>
  </SectionWrapper>
</template>
