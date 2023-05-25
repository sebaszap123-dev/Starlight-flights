<script setup>
import { RouterView } from 'vue-router'
// Components
import Navbar from './components/NavbarComponent.vue';

</script>

<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>

  </footer>
</template>

<style scoped></style>
