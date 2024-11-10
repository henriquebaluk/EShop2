import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBKfF1FSODK7xlF9VY04nTAhVTCiwdmACw",
    authDomain: "eshop-8023d.firebaseapp.com",
    projectId: "eshop-8023d",
    storageBucket: "eshop-8023d.firebasestorage.app",
    messagingSenderId: "539477622928",
    appId: "1:539477622928:web:c9faae887848d7978d1815",
    measurementId: "G-PZQ5M329ZC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 