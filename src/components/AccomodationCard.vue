<template>
    <div>
        <div class="card mb-3" style="max-width: 60rem;">
            <div class="row g-0 align-items-center justify-content-center">
                <div class="col-md-4 ">
                    <img :src="image($props.imageId)" v-if="imageId" class="img-fluid rounded" alt="..."
                        style="margin: 1rem; width: 18rem; height: min-content;">
                </div>
                <div class="col-md-5">
                    <div class="card-body">
                        <h5 class="card-title">{{ $props.title }}</h5>
                        <p class="card-text">Ubicación: {{ $props.ubication }}</p>
                        <div class="row">
                            <div class="col-2">
                                <div class="card d-flex align-items-center justify-content-center"
                                    style="width: 3rem; height: 3rem; background-color: #CE6A85; color: white;">
                                    {{ puntation }}
                                </div>
                            </div>
                            <div class="col-10" style="padding-top: 1.4rem;">
                                <p>{{ qualified(puntation) }}</p>
                            </div>
                        </div>
                        <hr />
                        <p class="card-text"><small class="text-body-secondary">2 noches, 2 adultos</small></p>
                    </div>
                </div>
                <div class="col-3 vertical-divider">
                    <h3>${{ $props.price }}</h3>
                    <p style="font-size: x-small;">Booking.com</p>
                    <p class="info-text" style="padding-top: 1rem;" v-if="hasWifi">Wifi gratis</p>
                    <div v-if="hasCancellation">
                        <p class="info-text">Cancelación: {{ $props.typeCancellation }}</p>
                        <p class="info-text" style="padding-bottom: 10px;" v-if="cancellationPrice > 0">Cancelación a
                            ${{ $props.cancellationPrice }}</p>
                    </div>
                    <a class="btn btn-color"
                        href="https://www.booking.com/hotel/mx/gloden-crown-paradise.es.html?label=gen173nr-1BCAEoggI46AdIM1gEaKABiAEBmAEKuAEXyAEV2AEB6AEBiAIBqAIDuAKI3LyjBsACAdICJDBjNDc2M2RjLThmYjMtNGE4ZS05ZGZiLTg2YWQxZjQ2ZGZkN9gCBeACAQ&sid=ceb421e1b9de70304254f29cb0e54bc9&aid=304142&ucfs=1&arphpl=1&checkin=2023-05-28&checkout=2023-05-30&dest_id=-1690444&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=1&hapos=1&sr_order=popularity&srpvid=1ea94487b4e70001&srepoch=1685007889&all_sr_blocks=712137001_0_2_21_0&highlighted_blocks=712137001_0_2_21_0&matching_block_id=712137001_0_2_21_0&sr_pri_blocks=712137001_0_2_21_0__722496&from=searchresults#hotelTmpl">Ver
                        oferta</a>
                    <button class="btn btn-danger" v-if="canDelete"
                        @click.prevent="deleteAccommodation(id)">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { auth } from '../firebase';
import { useUser } from '../provider/services';
import { apiStarlight } from '../provider/api';

const { deleteAccommodation } = apiStarlight()

const user = useUser()

const canDelete = computed(() => {
    return auth.currentUser && user.user.userData && user.user.admin
})

const qualified = (puntuation: number): string => {
    if (puntuation >= 9.5) {
        return 'FABULOSO'
    } else if (puntuation >= 9) {
        return 'FANTASTICO'
    } else if (puntuation >= 8) {
        return 'EXCEPCIONAL';
    } else if (puntuation >= 7) {
        return 'MUY BUENO';
    } else if (puntuation >= 6) {
        return 'PIENSALO DOS VECES';
    } else {
        return '¿PORQUE ESTA ESTO AQUÍ?';
    }
}

const image = (id: number) => {
    let url = `https://picsum.photos/id/${id}/330/250`;
    return url;
}

defineProps({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: "Hotel California",
    },
    ubication: {
        type: String,
        default: "Cancún",
    },
    puntation: {
        type: Number,
        default: 5.0,
    },
    hasCancellation: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 1200
    },
    typeCancellation: {
        type: String,
        default: "GRATIS"
    },
    cancellationPrice: {
        type: Number,
        default: 0,
    },
    hasWifi: {
        type: Boolean,
        default: false,
    },
    imageId: {
        type: Number,
        default: 200,
    }

})
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