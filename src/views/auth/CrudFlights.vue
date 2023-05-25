<template>
    <div>
        <div class="container">
            <h1>Encuentra tu próxima estancia.</h1>
            <h2>Busca ofertas en hoteles, casas y mucho más...</h2>
            <div id="card-list" class="row" style="margin-top: 20px;" v-for="item in flights" :key="item['id']">
                <FlightsCard :id="item.id" :Arrival="item.Arrival" :Company="item.Company" :Departure="item.Departure"
                    :DepartureDate="item.DepartureDate" :Freeseats="item.Freeseats" :ReturnDate="item.ReturnDate"
                    :image="item.image" :price="item.price">
                </FlightsCard>
            </div>
            <div id="loading" class="text-center" style="display: none;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import FlightsCard from '../../components/FlightsCard.vue';
import { apiStarlight } from '../../provider/api';
const { getFlights, flights } = apiStarlight();
onMounted(() => {
    getFlights();
})

</script>

<style lang="css" scoped></style>