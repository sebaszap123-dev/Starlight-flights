<template>
    <div>
        <div class="container">
            <h1>Encuentra tu próxima estancia.</h1>
            <h2>Busca ofertas en hoteles, casas y mucho más...</h2>
            <AccomodationCard></AccomodationCard>
            <FlightsCard></FlightsCard>
            <div id="card-list" class="row" style="margin-top: 20px;">

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
import AccomodationCard from "../components/AccomodationCard.vue"
import FlightsCard from "../components/FlightsCard.vue"
import { onMounted } from 'vue';
import { ref, query, limitToFirst } from "firebase/database";
import { database } from "../firebase"

// Variable para almacenar el número de página
let page = 1;
// Función para cargar más tarjetas
function loadMoreCards() {
    // Mostrar el spinner de carga
    document.getElementById('loading').style.display = 'block';

    // Simular una llamada AJAX para obtener los datos de las tarjetas
    // Aquí deberías realizar una llamada real a tu servidor
    setTimeout(function () {
        // Obtener los datos de las tarjetas (por ejemplo, desde una API)
        const cardsData = [
            { title: 'Card 1', content: 'Lorem ipsum dolor sit amet' },
            { title: 'Card 2', content: 'Consectetur adipiscing elit' },
            { title: 'Card 2', content: 'Consectetur adipiscing elit' },
            { title: 'Card 2', content: 'Consectetur adipiscing elit' },
            { title: 'Card 2', content: 'Consectetur adipiscing elit' },
            { title: 'Card 2', content: 'Consectetur adipiscing elit' },
            { title: 'Card 2', content: 'Consectetur adipiscing elit' },
            { title: 'Card 2', content: 'Consectetur adipiscing elit' },
            { title: 'Card 3', content: 'Sed do eiusmod tempor incididunt' }
            // Agrega más objetos de tarjeta según sea necesario
        ];

        // Crear las tarjetas HTML utilizando los datos obtenidos
        const cardList = document.getElementById('card-list');
        cardsData.forEach(function (card) {
            //             const cardHTML = `
            //         <div class="col-md-12">
            //             <div class="card mb-3" style="max-width: 540px;">
            //   <div class="row g-0">
            //     <div class="col-md-4">
            //           <img src="..." class="img-fluid rounded-start" alt="...">
            //         </div>
            //         <div class="col-md-8">
            //             <div class="card-body">
            //                 <h5 class="card-title">${card.title}</h5>
            //                 <p class="card-text">${card.content}</p>
            //                 <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
            //             </div>
            //             </div>
            //         </div>
            //     </div>
            //         </div>
            //       `;
            // cardList.innerHTML += cardHTML;
        });

        // Ocultar el spinner de carga
        document.getElementById('loading').style.display = 'none';

        // Incrementar el número de página
        page++;
    }, 1000); // Simular un retraso de 1 segundo para la carga de datos
}

// Función para detectar el desplazamiento de la página y cargar más tarjetas cuando sea necesario
function checkScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop + windowHeight >= documentHeight) {
        loadMoreCards();
    }
}

// Evento de desplazamiento de la página
window.addEventListener('scroll', checkScroll);

onMounted(() => {
    // Cargar las primeras tarjetas al cargar la página

    const dbRef = ref(database);
    const recentPostsRef = query(ref(dbRef, 'flights'), limitToFirst(100));
    console.log(recentPostsRef)
    loadMoreCards();
})

</script>

<style lang="css" scoped></style>