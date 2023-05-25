<template>
    <div class="card mb-3" style="max-width: 60rem">
        <div class="row g-0">
            <div class="col-10">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-2">
                            <div class="image-container">
                                <img src="https://c4.wallpaperflare.com/wallpaper/142/751/831/landscape-anime-digital-art-fantasy-art-wallpaper-preview.jpg"
                                    alt="Logo" style="width: 40px; height: 40px;">
                            </div>
                        </div>
                        <div class="col-4">
                            <p class="mb-0">Salida: {{ DepartureDate }}</p>
                            <p class="mb-0">{{ Arrival }}</p>
                        </div>
                        <div class="col-3">
                            <p class="mb-0">1 escala</p>
                            <p class="mb-0">{{ Departure }}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-4">Asientos libres: {{ Freeseats }}</p>
                        </div>
                    </div>
                    <br>
                    <div class="row align-items-center">
                        <div class="col-2">
                            <div class="image-container">
                                <img src="https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg"
                                    alt="Logo" style="width: 40px; height: 40px;">
                            </div>
                        </div>
                        <div class="col-4">
                            <p class="mb-0">Regreso: {{ ReturnDate }}</p>
                            <p class="mb-0">KoboCity</p>
                        </div>
                        <div class="col-3">
                            <p class="mb-0">1 escala</p>
                            <p class="mb-0">MEX</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-4">Asientos libres: {{ Freeseats }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2 vertical-divider justify-content-end align-items-end">
                <h3 style="padding-top: 2rem">${{ price }}</h3>
                <p style="font-size: x-small">Basica</p>
                <p style="font-size: x-small">Aerolinea: {{ Company }}</p>
                <a class="btn btn-color"
                    href="https://flights.booking.com/checkout/ticket-type/d6a1f_H4sIAAAAAAAA_y2Q226jMBCGnya9w-ADhFSyViTZpuTYTRa69MYCxyFsabzCjgI8fSdhZWu-_5-xx9acrf1nnl33VFfl2Rrnq0WltrrMrUJSf7mnBkKh9Wd1Kd28atzFfP26S0i4iTKPLZOti10HlnzOfqjWOqaR_KkqFMqN5PjnavHfNDxA5FeSxMvpyyMlteUMUT9O_7xlH3s8JBu-ePdXfvRwR76Z3dpdH5nNb-Mdupt36E237W7dtjc2qWOzTpeHXb_Bh_QjS17qeP-Zjej8cVlJeB8hNp4MrXVu-Dgkg5aWk3CQR8v36Xg1Ww8WPhVMaDgUW44JmRCECWMUok_DJ6NqJW2lLyvV8XTqe54Dw8g7Qp1M3D12YC7Xy92PyAzTa13oFtSIRrBL4SEPeAZiYC4iD73OQRWCMYAUbAo4CjYuAqpAKuHgQAagTsK_n6wERkOXvyJ-B_SiCgJNy28JQy3MzQEAAA../5258496134df8be8bd5795f8dcb1c0b6c311527d1f9f6edf6517ae1b46f6fea510c6bc87dcd326453844d7fb5b675036af50e50d7901ff7a1b97e45d439fb280c898ffaa1b6b7e30565fa41187b7199bb58f06b7fb19d31b3d32?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaKABiAEBmAEKuAEXyAEV2AEB6AEB-AEMiAIBqAIDuAK727yjBsACAdICJGQ2MWIxMjU3LTI5ZGEtNDY1MC1hOGQ0LWRkOWJjODA1N2ZjZdgCBuACAQ">Ver
                    oferta</a>
                <button class="btn btn-danger" v-if="canDelete" @click.prevent="deleteFlight(id)">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { auth } from '../firebase';
import { useUser } from '../provider/services';
import { apiStarlight } from '../provider/api';

const { deleteFlight } = apiStarlight()

const user = useUser()

const canDelete = computed(() => {
    return auth.currentUser && user.user.userData && user.user.admin
})

defineProps([
    "id",
    "Arrival",
    "Company",
    "Departure",
    "DepartureDate",
    "Freeseats",
    "ReturnDate",
    "image",
    "price"
])


</script>

<style lang="css" scoped>
.vertical-divider {
    border-left: 1px solid #e5ebf0;
    height: 100%;
    padding-left: 1rem;
}

p {
    padding: 0;
    margin: 0;
}

.btn-color {
    background-color: #0EB1D2;
    color: white;
}

.info-text {
    font-size: small;
    color: #CE6A85;
}
</style>