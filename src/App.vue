<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';

</script>
<template>
  <header>
    <Navbar></Navbar>
    <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav> -->
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <div class="wrapper">
      <a href="https://github.com/vuejs/vue-router">Vue Router</a>
    </div>
  </footer>
</template>

<style scoped></style>
