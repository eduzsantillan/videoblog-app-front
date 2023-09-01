import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGOSIjfnJjU_qR3G1tQn3t86euRa-GTRM",
  authDomain: "anyweb-5407f.firebaseapp.com",
  databaseURL: "https://anyweb-5407f.firebaseio.com",
  projectId: "anyweb-5407f",
  storageBucket: "anyweb-5407f.appspot.com",
  messagingSenderId: "218033457459",
  appId: "1:218033457459:web:9e89f198638ace79c01646",
  measurementId: "G-33MLDDHKZX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, provider, db };
