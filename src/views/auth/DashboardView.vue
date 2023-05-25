<template>
    <div>
        <div class="container">
            <h1>Prueba</h1>
            <p>pushear alguna wea</p>
            <div class="row">
                <div class="col">
                    <button @click.prevent="pushAccommodations(accomodation)" class="btn btn-primary">pushear</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const accomodation = ref({
    "cancellation": {
        "hasCancellation": false,
        "price": 0,
        "type": "free"
    },
    "hasWifi": true,
    "id": 0,
    "image": 0,
    "name": "",
    "price": 0,
    "puntuation": 0,
    "ubication": "0"
},);


import { authApi } from "../../provider/api"
const { pushAccommodations } = authApi();
</script>

<style lang="scss" scoped></style>