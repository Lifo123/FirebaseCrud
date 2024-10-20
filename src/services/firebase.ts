import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyArvjuee8AFC7zaiO_50iv__IoJtYK7m60",
    authDomain: "realtimecrud-11026.firebaseapp.com",
    projectId: "realtimecrud-11026",
    storageBucket: "realtimecrud-11026.appspot.com",
    messagingSenderId: "897023153493",
    appId: "1:897023153493:web:4d18a5d01f493aa6c10bdc"
  };
const fb = initializeApp(firebaseConfig);
const db = getDatabase(fb);
const auth = getAuth(fb);

export { db, auth };