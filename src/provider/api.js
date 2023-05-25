import { ref as vueRef, computed } from 'vue';
import { ref, child, get, push, set, remove } from "firebase/database";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { database, auth } from "../firebase";
import Swal from 'sweetalert2';
import { useUser, storeUsers } from '../provider/services'
import router from '../router';


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

    const deleteAccommodation = (accommodationId) => {
        const accommodationIndex = accommodations.value.findIndex((accommodation) => accommodation.id === accommodationId);
        if (accommodationIndex !== -1) {
            const deletedAccommodation = accommodations.value.splice(accommodationIndex, 1)[0];
            // Eliminar el alojamiento de la base de datos
            remove(ref(database, `accommodation/${deletedAccommodation.id}`))
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Accommodation deleted',
                        text: 'The accommodation has been successfully deleted.'
                    });
                })
                .catch((error) => {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while deleting the accommodation. Please try again.'
                    });
                });
        }
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


    const deleteFlight = (flightId) => {
        console.log(flightId)
        const flightIndex = flights.value.findIndex((flight) => flight.id === flightId);
        if (flightIndex !== -1) {
            const deletedFlight = flights.value.splice(flightIndex, 1)[0];
            // Eliminar el vuelo de la base de datos
            remove(ref(database, `flights/${deletedFlight.id}`))
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Flight deleted',
                        text: 'The flight has been successfully deleted.'
                    });
                })
                .catch((error) => {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while deleting the flight. Please try again.'
                    });
                });
        }
    };

    return { getAccommodations, getFlights, flights, accommodations, deleteAccommodation, deleteFlight }
}

export const authApi = () => {
    const user = useUser()
    const users = storeUsers();
    // DATABASE REALTIME
    const dbRef = ref(database);
    // AUTH
    const idUser = vueRef('');

    const provider = new GoogleAuthProvider();

    const logout = () => {
        auth.signOut().then(() => {
            user.user.userData = null;
            router.replace('/')
        });
    }

    const saveDataUser = async (userCredential) => {
        const newUser = userCredential.user;
        user.user.userData = newUser
        await getUsers();
        user.user.admin = await getUserPermissions(newUser.uid)
        idUser.value = newUser.uid;
        if (user.user.admin) {
            user.verifiedUser()
        } else {
            user.clientUser()
        }
    }


    const saveRegisterDataOptional = (newUser) => {
        push(child(dbRef, '/users' + newUser.uid), { "email": newUser.email, "uid": newUser.uid, "admin": false }).then((snapshot) => {
            if (snapshot) {
                users.users.push({ "email": newUser.user.email, "uid": newUser.uid, "admin": false });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo guardar el usuario',
                })
            }
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error,
            })
        });
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
            .then(async (userCredential) => {
                // Signed in 
                await saveDataUser(userCredential)
                saveRegisterDataOptional(userCredential.user)
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
                Swal.fire({
                    icon: 'error',
                    title: 'No se encontraron datos',
                })
            }
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Data no available',
                text: 'Ops.. no encontramos información amigo'
            });
        });
    }

    // GET PERMISSIONS
    const getUserPermissions = async () => {
        let index = users.users.findIndex((u) =>
            u.uid === user.user.userData.uid
        )
        return users.users[index]['admin']
    };


    // admin
    const getUsers = async () => {

        users.users = [];
        await get(child(dbRef, '/users')).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val(); // Obtener los datos del elemento
                    // Agregar el ID al objeto de datos

                    const withId = {
                        id: childSnapshot.key,
                        ...data,
                    }
                    users.users.push(withId);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Data no available',
                    text: 'Ops.. no encontramos información amigo'
                });
            }
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Data no available',
                text: error
            });
        });
    }
    const setUsers = async (dbValue, id) => {

        console.log(dbValue);
        await set(child(dbRef, 'users/' + id), dbValue).then((snapshot) => {
            if (snapshot.exists()) {
                users.users = snapshot.val()
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val(); // Obtener los datos del elemento
                    // Agregar el ID al objeto de datos
                    const withId = {
                        id: childSnapshot.key,
                        ...data,
                    }
                    console.log(data)
                    users.users.push(withId);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Data no available',
                    text: 'Ops.. no encontramos información amigo'
                });
            }
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'PERMISSION DENIED',
                text: error
            });
        });
    }
    return { createuser, loginUser, loginWithGoogle, logout, pushAccommodations, getUsers, users, setUsers }
}