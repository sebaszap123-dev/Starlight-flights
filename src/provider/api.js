import { ref as vueRef } from 'vue';
import { ref, child, get } from "firebase/database";
import { database } from "../firebase"
export const apiStarlight = () => {
    const accommodations = vueRef([])
    const flights = vueRef([])
    const dbRef = ref(database);

    // Cargar las primeras tarjetas al cargar la página
    const getAccommodations = () => {

        get(child(dbRef, '/accommodation')).then((snapshot) => {
            if (snapshot.exists()) {
                accommodations.value = snapshot.val()
                console.log(accommodations.value[0]['price']);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const getFlights = () => {
        get(child(dbRef, '/flights')).then((snapshot) => {
            if (snapshot.exists()) {
                flights.value = snapshot.val()
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return { getAccommodations, getFlights, flights, accommodations }
}