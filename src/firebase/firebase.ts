import {initializeApp} from "@firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAZSYr5mcw_Pp_lhcUaIzJXVUDZhgR9lQ8",
    authDomain: "tarkerasistant.firebaseapp.com",
    projectId: "tarkerasistant",
    storageBucket: "tarkerasistant.appspot.com",
    messagingSenderId: "225387543040",
    appId: "1:225387543040:web:db524bc9df55e0c79fb6e5",
    measurementId: "G-5XR0CKE8PL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };