import { readFormData } from "./readFormData.js";
import { displayFormData } from "./displayFormData.js";
import { db, collection, addDoc } from "../firebase.js";
import { displaySavedRecommendations } from "./fetchRecommendations.js"; // New import
import { showNotification } from "./notification.js";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".recommendation-form");
    const outputDiv = document.querySelector(".recommendation-cards");

    // Display saved recommendations on page load
    displaySavedRecommendations(outputDiv);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = readFormData(form);
        displayFormData(formData, outputDiv);
        try {
            await addDoc(collection(db, "recommendations"), {
                name: formData.name,
                recommendation: formData.recommendation,
                timestamp: new Date(),
            });
            showNotification("Recommendation submitted successfully!", "success");
            form.reset();

        } catch (error) {
            showNotification(`An error occurred: ${error.message}. Please try again.`, "error");
        }
    });
});