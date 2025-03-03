// fetchRecommendations.js
import { db, collection, getDocs } from "../firebase.js";
import { displayFormData } from "./displayFormData.js";

export async function displaySavedRecommendations(outputDiv) {
  try {
    const querySnapshot = await getDocs(collection(db, "recommendations"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      displayFormData(data, outputDiv);
    });
  } catch (error) {
    console.error("Error fetching recommendations: ", error);
    alert("Failed to load recommendations. Please try again.");
  }
}