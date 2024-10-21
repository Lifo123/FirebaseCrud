import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig1 = {
  apiKey: "AIzaSyArvjuee8AFC7zaiO_50iv__IoJtYK7m60",
  authDomain: "realtimecrud-11026.firebaseapp.com",
  databaseURL: "https://realtimecrud-11026-default-rtdb.firebaseio.com",
  projectId: "realtimecrud-11026",
  storageBucket: "realtimecrud-11026.appspot.com",
  messagingSenderId: "897023153493",
  appId: "1:897023153493:web:4d18a5d01f493aa6c10bdc",
  measurementId: "G-CF39TWSFBM"
};
const fb = initializeApp(firebaseConfig1);
const db = getDatabase(fb);
const auth = getAuth(fb);
const analytics = getAnalytics(fb);

export { db, auth, analytics };