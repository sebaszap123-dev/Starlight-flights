<script setup lang="ts">
import { onMounted } from "vue"
import TheWelcome from '../components/TheWelcome.vue'
import { apiStarlight } from "@/providers/api"

const { searchFlights } = apiStarlight();

onMounted(() => {
  searchFlights()
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
