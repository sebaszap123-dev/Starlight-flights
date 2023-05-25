<script setup>
import { RouterView } from 'vue-router'
// Components
import Navbar from './components/NavbarComponent.vue';
import NavbarAuth from './components/NavbarAuth.vue';
import { useUser } from './provider/services'

const user = useUser()
</script>

<template>
  <header>
    <NavbarAuth v-if="user.user.userData"></NavbarAuth>
    <Navbar v-if="!user.user.userData"></Navbar>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>

  </footer>
</template>

<style scoped></style>
