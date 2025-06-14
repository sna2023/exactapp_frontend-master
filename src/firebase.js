// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyABsUz-v9Z52jiTR5dnXYx7VHLiq10Nwc0",
    authDomain: "datanegocio-6b9e4.firebaseapp.com",
    projectId: "datanegocio-6b9e4",
    storageBucket: "datanegocio-6b9e4.firebasestorage.app",
    messagingSenderId: "785849162427",
    appId: "1:785849162427:web:3402ba2e793b40d5cda79e",
    measurementId: "G-YXLC7DM6TW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
