// src/firebaseConfig.js
import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqg0pw0_oh5G3lSg5g0SEVgthaZe4wdU0",
    authDomain: "wedding-page-724d0.firebaseapp.com",
    projectId: "wedding-page-724d0",
    storageBucket: "wedding-page-724d0.appspot.com",
    messagingSenderId: "267031687736",
    appId: "1:267031687736:web:e7f598268ecf469c672ccd"
};

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)

export { firestore, collection }
