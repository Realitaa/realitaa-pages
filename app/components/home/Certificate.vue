<script setup lang="ts">
const certificates = useCertificate()
</script>

<template>
  <section class="py-20 bg-base-200/50">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-3xl font-bold text-center mb-12">Certificates</h2>
      <p class="prose prose-lg prose-invert text-center leading-relaxed my-12">
        Here are some of the certificates that I have earned.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(cert, index) in certificates" :key="index">
          <Card
            :title="cert.title"
            :description="cert.description"
            :image="cert.image"
            :cta="cert.cta"
            :link="cert.link"
          />
        </div>
      </div>
    </div>
  </section>
</template>
