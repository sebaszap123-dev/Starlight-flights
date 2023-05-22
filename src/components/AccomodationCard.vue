<template>
    <div>
        <div class="card mb-3" style="max-width: 60rem;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="../assets/255300761.png" class="img-fluid rounded" alt="..." style="margin: 1rem;">
                </div>
                <div class="col-md-5">
                    <div class="card-body">
                        <h5 class="card-title">Hotel Sunshine</h5>
                        <p class="card-text">Ubicación: Cáncun</p>
                        <div class="row">
                            <div class="col-2">
                                <div class="card d-flex align-items-center justify-content-center"
                                    style="width: 3rem; height: 3rem; background-color: #CE6A85; color: white;">
                                    9.9
                                </div>
                            </div>
                            <div class="col-4" style="padding-top: 1.4rem;">
                                <p>Muy bueno</p>
                            </div>
                        </div>
                        <hr />
                        <p class="card-text"><small class="text-body-secondary">lun 19 jun - lun 26 jun</small></p>
                    </div>
                </div>
                <div class="col-3 vertical-divider">
                    <h3 style="padding-top: 2rem;">$100</h3>
                    <p style="font-size: x-small;">Booking.com</p>
                    <p class="info-text" style="padding-top: 1rem;">Wifi gratis</p>
                    <p class="info-text">Cancelación gratuita</p>
                    <p class="info-text" style="padding-bottom: 10px;">Cancelación a $20</p>
                    <button class="btn btn-color">Ver oferta</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({

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