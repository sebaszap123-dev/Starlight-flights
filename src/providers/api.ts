import axios from 'axios';
import { Convert } from '@/models/flights';


export const apiStarlight = () => {
    const searchFlights = () => {
        axios
            .get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
                headers: {
                    Authorization: 'Bearer fAnyQwzmyGNGymXDqpbilYKASE8b'
                },
                params: {
                    originLocationCode: 'SYD',
                    destinationLocationCode: 'BKK',
                    departureDate: '2023-05-11',
                    adults: 1,
                    nonStop: false,
                    max: 250
                }
            })
            .then(
                (response) => {
                    let flight = Convert.toSearchFlight(JSON.stringify(response.data.data[0]))
                    console.log(flight.id);
                }
            )
    }
    return { searchFlights }
}