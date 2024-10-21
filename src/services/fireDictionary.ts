import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig2 = {
    apiKey: "AIzaSyAwmC0jcBFmuMxYJaGS1wjdiuOSPYYSZWo",
    authDomain: "dictionaries-15fdf.firebaseapp.com",
    databaseURL: "https://dictionaries-15fdf-default-rtdb.firebaseio.com",
    projectId: "dictionaries-15fdf",
    storageBucket: "dictionaries-15fdf.appspot.com",
    messagingSenderId: "250956565323",
    appId: "1:250956565323:web:494f59d70d787ecc7c36ce",
    measurementId: "G-S3KRN2E2FZ"
};
const fb = initializeApp(firebaseConfig2);
const DicDB = getDatabase(fb);
const DicAnalytics = getAnalytics(fb);

export { DicDB, DicAnalytics };