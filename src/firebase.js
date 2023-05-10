// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyASLAhnrglX-KV31fyJ85rFEeA9Pdn_F20",
    authDomain: "starlightapi.firebaseapp.com",
    projectId: "starlightapi",
    storageBucket: "starlightapi.appspot.com",
    messagingSenderId: "915759540224",
    appId: "1:915759540224:web:eafab1bcf22cc07ad410e5",
    measurementId: "G-RDW4PVJ6ME"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp;

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};

export { db, auth, firebase, marcaTiempo };