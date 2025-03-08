// fetchRecommendations.js
import { getFirestoreDocuments } from '../config/firebase.js';
import { displayFormData } from "./displayFormData.js";
import { showNotification } from "./notification.js";

export async function displaySavedRecommendations(outputDiv) {
  try {
    const querySnapshot = await getFirestoreDocuments('recommendations');
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      displayFormData(data, outputDiv);
    });
  } catch (error) {
    console.error("Error fetching recommendations: ", error);
    showNotification("Failed to load recommendations. Please try again.", "error");
  }
}