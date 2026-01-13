<template>
  <SectionWrapper id="about" class="bg-base-200/50" :title="$t('about.title')">
    <div class="max-w-6xl mx-auto prose prose-lg prose-invert text-center leading-relaxed text-gray-600 dark:text-white/70">
      <slot />
    </div>
  </SectionWrapper>
</template>
