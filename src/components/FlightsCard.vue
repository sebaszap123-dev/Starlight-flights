<template>
    <div class="card mb-3" style="max-width: 60rem">
        <div class="row g-0">
            <div class="col-10">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-2">
                            <div class="image-container">
                                <img src="luis.jpeg" alt="Logo" style="width: 40px; height: 40px;">
                            </div>
                        </div>
                        <div class="col-4">
                            <p class="mb-0">11:20-11:22</p>
                            <p class="mb-0">KoboCity</p>
                        </div>
                        <div class="col-3">
                            <p class="mb-0">1 escala</p>
                            <p class="mb-0">MEX</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-4">12:34</p>
                        </div>
                    </div>
                    <br>
                    <div class="row align-items-center">
                        <div class="col-2">
                            <div class="image-container">
                                <img src="luis.jpeg" alt="Logo" style="width: 40px; height: 40px;">
                            </div>
                        </div>
                        <div class="col-4">
                            <p class="mb-0">11:20-11:22</p>
                            <p class="mb-0">KoboCity</p>
                        </div>
                        <div class="col-3">
                            <p class="mb-0">1 escala</p>
                            <p class="mb-0">MEX</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-4">12:34</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2 vertical-divider justify-content-end align-items-end">
                <h3 style="padding-top: 2rem">$100</h3>
                <p style="font-size: x-small">Basica</p>
                <button class="btn btn-color">Seleccionar</button>
            </div>
        </div>
    </div>
</template>

<script setup>

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