<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-dark">
    <div class="card" style="width: 25rem;">
      <div class="card-header">
        Iniciar sesión
      </div>
      <div class="card-body">
        <form @submit.prevent="sendEmail">
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" id="email" v-model="email" placeholder="example@gmail.com" required>
            <!-- <div v-if="!isValidEmail" class="text-danger">Correo electrónico no válido. Por favor, revisa el formato
              "example@example.com".
            </div> -->
          </div>
          <button type="submit" class="btn btn-primary">Iniciar sesión</button>
          <!-- <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="password"
              :class="{ 'is-invalid': !isValidPassword }" required>
            <div v-if="!isValidPassword" class="invalid-feedback">La contraseña debe contener al menos una letra mayúscula
              y un número. No se permiten símbolos</div>
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirmar contraseña</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"
              :class="{ 'is-invalid': !isConfirmedPassword }" required>
            <div v-if="!isConfirmedPassword" class="invalid-feedback">Las contraseñas no coinciden</div>
          </div>
          <button type="submit" class="btn btn-primary">Iniciar sesión</button>
          <br><br>
          <a href="#">¿No tienes cuenta? Crea una</a> -->
        </form>
        <hr class="my-4">
        <div class="text-center">
          <p>¿No tienes una cuenta? Regístrate con:</p>
          <button type="button" class="btn btn-outline-primary btn-lg me-3" @click="crearCuentaGoogle">
            <i class="bi bi-google"></i>
          </button>
          <button type="button" class="btn btn-outline-primary btn-lg">
            <i class="bi bi-envelope"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../firebase"
const email = ref('');

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:5173/about',
  // This must be true.
  handleCodeInApp: true,
};
const sendEmail = () => {
  sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      console.log(email.value);
      window.localStorage.setItem('emailForSignIn', email.value);
      // ...
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
}
</script>

<!-- <script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    isValidEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (this.email.length === 0) {
        return true
      } else {
        return regex.test(this.email)
      }
    },
    isValidPassword() {
      const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      if (this.password.length === 0) {
        return true
      } else {
        return regex.test(this.password)
      }
    },
    isConfirmedPassword() {
      if (this.password.length === 0 && this.confirmPassword.length === 0) {
        return true
      } else {
        return this.password == this.confirmPassword
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log("hi")
      if (!this.isValidEmail || this.email.length === 0) {
        alert('Invalid email address')
        return
      }
      if (!this.isValidPassword || this.password.length === 0) {
        alert('Password must contain at least one uppercase letter and one number')
        return
      }
      // perform login logic here
    }
  }
}
</script> -->

<style scoped>
.card {
  background-color: #CE6A85;
  color: #fff;
}
</style>
