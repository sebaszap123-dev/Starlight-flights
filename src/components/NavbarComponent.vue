<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Tenth navbar example">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08"
                aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                <ul class="navbar-nav">
                    <a class="navbar-brand" href="#">
                        <!-- <img src="../assets/logo.svg" alt="" width="30" height="24"> -->
                    </a>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/" style="text-decoration: none;"><i class="fas fa-bed"></i> Dormir
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/flights" style="text-decoration: none;"><i
                                class="fas fa-plane"></i>
                            Vuelos
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/login" style="text-decoration: none;"><i class="fas fa-user"></i>
                            Iniciar sesión
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/" style="text-decoration: none;">Haz tu cuenta
                        </RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-bs-toggle="dropdown"
                            aria-expanded="false">FAQS</a>
                        <ul class="dropdown-menu" aria-labelledby="dropdown08">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
  
  
<script setup>
import { RouterLink } from "vue-router"
</script>

<style scoped>
nav {
    margin-bottom: 50px;
}

.nav-link {
    border: white 1px solid !important;
    border-radius: 30px !important;
    margin: 5px;
}

.bg-dark {
    background-color: #0EB1D2 !important;
}

i {
    color: black;
}

a {
    color: black;
}
</style>
  