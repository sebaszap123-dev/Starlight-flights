<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Barra lateral -->
            <div class="col-md-3 col-lg-2 sidebar vh-100 bg-dark">
                <div class="d-flex flex-column p-3">
                    <h5 class="text-white">Nombre de Usuario</h5>
                    <p class="text-white">usuario@correo.com</p>
                    <button class="btn btn-danger" @click="logout">Cerrar Sesión</button>
                </div>
            </div>

            <!-- Contenido principal -->
            <div class="col-md-9 col-lg-10">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Administración de Usuarios</h5>
                                    <div v-if="users.users.length > 0">
                                        <div class="d-flex justify-content-between align-items-center mb-2"
                                            v-for="user in users.users" :key="user.id">
                                            <span>{{ user.email }}</span>
                                            <label class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" :checked="user.admin"
                                                    @change="onChecked(user)">
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Administración de Vuelos</h5>
                                    <p class="card-text">Manda a volar esos vuelos mal baratados!.</p>
                                    <RouterLink to="/dashboard/flights" class="btn btn-primary">Ir a la Administración de
                                        Vuelos</RouterLink>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Administración de Hoteles</h5>
                                    <p class="card-text">Ahora de darle cuello a algun hotel?.</p>
                                    <RouterLink to="/dashboard/hotels" class="btn btn-primary">Ir a la Administración de
                                        Hoteles</RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { authApi } from '../../provider/api';
import { storeUsers } from '../../provider/services';

const { logout, getUsers, setUsers } = authApi();

const users = storeUsers()

onMounted(async () => {
    await getUsers()
})

const onChecked = (user) => {
    setUsers({ "email": user.email, "uid": user.uid, "admin": !user.admin }, user.id)
}

// import { ref } from 'vue'

// const accomodation = ref({
//     "cancellation": {
//         "hasCancellation": false,
//         "price": 0,
//         "type": "free"
//     },
//     "hasWifi": true,
//     "id": 0,
//     "image": 0,
//     "name": "",
//     "price": 0,
//     "puntuation": 0,
//     "ubication": "0"
// },);


// import { authApi } from "../../provider/api"
// const { pushAccommodations } = authApi();
</script>

<style lang="scss" scoped></style>