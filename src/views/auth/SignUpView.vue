<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <div class="text-center mb-3">
                    <div class="circle">
                        <img src="https://example.com/logo-google.png" alt="Google Logo">
                    </div>
                </div>
                <h5 class="card-title text-center mb-4">Crear cuenta</h5>
                <form @submit="createAccount">
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo electrónico</label>
                        <input type="email" id="email" class="form-control" v-model="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" id="password" class="form-control" v-model="password" required>
                    </div>
                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Confirmar contraseña</label>
                        <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword" required>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Crear cuenta</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const createAccount = () => {
    // Lógica para crear la cuenta con el correo electrónico y contraseña proporcionados
    // Aquí puedes integrar Firebase u otra solución de tu elección
};
</script>
  
<style>
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
</style>
  