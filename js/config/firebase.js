


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

// Firebase configuration
// This will be replaced with actual values during build by generate-config.js
// Firebase configuration using import.meta.env
let firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};




let db;
let firebaseInitialized = false;

async function initializeFirebase() {
  try {
    console.log("Firebase Config:", firebaseConfig);
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    firebaseInitialized = true;
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    throw error;
  }
}

// Export a function to get the database instance
export async function getDatabase() {
  if (!firebaseInitialized) {
    await initializeFirebase();
  }
  return db;
}

// Export other Firebase functions with initialization check
export async function getFirestoreCollection(collectionName) {
  const db = await getDatabase();
  return collection(db, collectionName);
}

export async function addFirestoreDocument(collectionName, data) {
  const colRef = await getFirestoreCollection(collectionName);
  return addDoc(colRef, data);
}

export async function getFirestoreDocuments(collectionName) {
  const colRef = await getFirestoreCollection(collectionName);
  return getDocs(colRef);
}