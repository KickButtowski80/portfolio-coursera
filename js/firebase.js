// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgTlJM9BgJ8fSZQT-WT9E5RxaOBJGNIFM",
  authDomain: "portfolio-coursera-3d4c6.firebaseapp.com",
  projectId: "portfolio-coursera-3d4c6",
  storageBucket: "portfolio-coursera-3d4c6.appspot.com",
  messagingSenderId: "1015606911988",
  appId: "1:1015606911988:web:8c3e3b0c1a9b2c0c4c4c4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Re-export Firestore functions
export { collection, addDoc, getDocs };
