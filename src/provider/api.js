import { ref as vueRef, computed } from 'vue';
import { ref, child, get, push } from "firebase/database";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { database, auth } from "../firebase";
import Swal from 'sweetalert2';
import { useUser } from '../provider/services'


const accommodations = vueRef([])
const flights = vueRef([])

export const apiStarlight = () => {
    const dbRef = ref(database);

    // Cargar las primeras tarjetas al cargar la página
    const getAccommodations = () => {
        if (accommodations.value.length !== 0) {
            return;
        }
        get(child(dbRef, '/accommodation')).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const accommodationId = childSnapshot.key; // Obtener el ID del elemento
                    const accommodationData = childSnapshot.val(); // Obtener los datos del elemento

                    // Agregar el ID al objeto de datos
                    const accommodationWithId = {
                        id: accommodationId,
                        ...accommodationData
                    };

                    accommodations.value.push(accommodationWithId);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Data no available',
                    text: 'Ops.. no encontramos información amigo'
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    };
    const getFlights = () => {
        if (flights.value.length !== 0) {
            return;
        }
        get(child(dbRef, '/flights')).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const flightId = childSnapshot.key; // Obtener el ID del elemento
                    const flightData = childSnapshot.val(); // Obtener los datos del elemento

                    // Agregar el ID al objeto de datos
                    const flightWithId = {
                        id: flightId,
                        ...flightData
                    };

                    flights.value.push(flightWithId);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Data no available',
                    text: 'Ops.. no encontramos información amigo'
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    return { getAccommodations, getFlights, flights, accommodations }
}

export const authApi = () => {
    const user = useUser()
    // DATABASE REALTIME
    const dbRef = ref(database);
    // AUTH
    const idUser = vueRef('');

    const provider = new GoogleAuthProvider();

    const logout = () => {
        auth.signOut().then(() => {
            console.log('logged out');
            user.user.userData = null;
        });
    }

    const saveDataUser = async (userCredential) => {
        const newUser = userCredential.user;
        user.user.userData = newUser
        user.user.admin = await getUserPermissions(newUser.uid)
        window.localStorage.setItem('admin', user.user.admin);
        idUser.value = userCredential.id;
        if (user.user.admin) {
            user.verifiedUser()
        } else {
            console.log("User feo")
        }
    }

    const createuser = (email, password, confirmPw) => {
        const validated = computed(() => password == confirmPw);
        if (!validated.value) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid password',
                text: 'Porfavor revisa que tus contraseñas coincidan'
            })
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                saveDataUser(userCredential)
                Swal.fire(
                    'Cuenta registrada!',
                    'Tu cuenta fue registrada exitosamente!',
                    'success'
                );
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                    footer: `<a href="">Why do I have this issue?</a>`
                })
            });
    }
    const loginUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                saveDataUser(userCredential)
                Swal.fire(
                    'LOGEADO',
                    'Ingresaste a tu cuenta!',
                    'success'
                );
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                    footer: `<a href="">Why do I have this issue?</a>`
                })
            });
    }
    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // accessToken.value = credential.accessToken;
                // The signed-in user info.
                saveDataUser(userCredential)
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage + credential + email,
                })
            });
    }
    const pushAccommodations = (accommodation) => {

        push(child(dbRef, '/accommodation'), accommodation).then((snapshot) => {
            if (snapshot) {
                accommodation.id = snapshot.key;
                accommodations.value.unshift(accommodation)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // GET PERMISSIONS
    const getUserPermissions = async (uid) => {
        try {
            const snapshot = await get(child(dbRef, '/permissionUsers/' + uid));

            if (snapshot.exists()) {
                console.log(snapshot.val());
                return snapshot.val().admin;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Data no available',
                    text: 'Ops.. no encontramos información amigo'
                });
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    return { createuser, loginUser, loginWithGoogle, logout, pushAccommodations }
}