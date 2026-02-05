<script setup lang="ts">
import { useError } from "#app";

// Set the meta for the page
definePageMeta({
  layout: "default",
});

// Trigger the error
const error = useError();
error.value = {
  statusCode: 404,
  statusMessage:
    "You were redirected here because you tried to access a link that was not found in the link shortener <a href='https://go.realitaa.dev' class='text-primary'>https://go.realitaa.dev</a>",
};
</script>

<template>
  <div>
    <!-- This page will redirect to the error layout -->
  </div>
</template>
