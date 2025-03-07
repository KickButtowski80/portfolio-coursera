// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// Create a function to load Firebase configuration
// async function loadFirebaseConfig() {
//   try {
//     const response = await fetch('/js/config/firebase-config.json');
//     const config = await response.json();
    
//     // Map the config keys to the expected format
//     return {
//       apiKey: config.FIREBASE_API_KEY,
//       authDomain: config.FIREBASE_AUTH_DOMAIN,
//       projectId: config.FIREBASE_PROJECT_ID,
//       storageBucket: config.FIREBASE_STORAGE_BUCKET,
//       messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
//       appId: config.FIREBASE_APP_ID
//     };
//   } catch (error) {
//     console.error("Error loading Firebase config:", error);
//     throw error; // Rethrow to handle in calling code
//   }
// }


// Add this function
async function loadFirebaseConfig() {
  try {
    const response = await fetch('/js/config/firebase-config.json');
    
    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error("Response is not JSON");
    }
    
    const config = await response.json();
    
    // Map the config keys to the expected format
    return {
      apiKey: config.FIREBASE_API_KEY || config.apiKey,
      authDomain: config.FIREBASE_AUTH_DOMAIN || config.authDomain,
      projectId: config.FIREBASE_PROJECT_ID || config.projectId,
      storageBucket: config.FIREBASE_STORAGE_BUCKET || config.storageBucket,
      messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID || config.messagingSenderId,
      appId: config.FIREBASE_APP_ID || config.appId
    };
  } catch (error) {
    console.error("Error loading Firebase config:", error);
    throw error;
  }
}
// Initialize Firebase
let db;
let firebaseInitialized = false;

async function initializeFirebase() {
  try {
    const firebaseConfig = await loadFirebaseConfig();
    console.log("Firebase Config:", firebaseConfig); // Add this for debugging
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