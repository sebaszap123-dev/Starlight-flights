<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title text-center mb-4">Inicio de sesión</h3>
        <form @submit.prevent="loginUser(email, password)">
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico</label>
            <input type="email" id="email" class="form-control" v-model="email" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" id="password" class="form-control" v-model="password" required>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Iniciar sesión</button>
          </div>
        </form>
        <hr>
        <div class="text-center mb-3">
          <button class="circle" style="border: 0;" @click="loginWithGoogle">
            <img src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
              alt="Google Logo">
          </button>
          <p class="text-center">Iniciar con Google</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authApi } from '../../provider/api'
const { loginUser, loginWithGoogle } = authApi();

const email = ref('');
const password = ref('');
</script>

<style scoped>
.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f5f5f5;
  margin: 0 auto;
}

.circle img {
  max-width: 80px;
  max-height: 80px;
}

.card {
  width: 50%;
}
</style>
