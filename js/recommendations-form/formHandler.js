import { readFormData } from "./readFormData.js";
import { displayFormData } from "./displayFormData.js";
import { db, collection, addDoc } from "../firebase.js";
import { displaySavedRecommendations } from "./fetchRecommendations.js"; // New import

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".recommendation-form");
    const outputDiv = document.querySelector(".recommendation-cards");

    // Display saved recommendations on page load
    displaySavedRecommendations(outputDiv);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = readFormData(form);

        try {
            await addDoc(collection(db, "recommendations"), {
                name: formData.name,
                recommendation: formData.recommendation,
                timestamp: new Date(),
            });
            alert("Recommendation submitted successfully!");
            form.reset();
            // Refresh the displayed recommendations
            displaySavedRecommendations(outputDiv);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("An error occurred. Please try again.");
        }
    });
});