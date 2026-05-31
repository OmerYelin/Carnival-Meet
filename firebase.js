import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3ogweHbWqunD1Gb9z9-D708e06eTCCdQ",
  authDomain: "carnivalmeet.firebaseapp.com",
  projectId: "carnivalmeet",
  storageBucket: "carnivalmeet.firebasestorage.app",
  messagingSenderId: "503896953376",
  appId: "1:503896953376:web:891ac2d42e9ab8c861e245"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
