import { readFormData } from "./readFormData.js";
import { displayFormData } from "./displayFormData.js";
import { db, collection, addDoc } from "../firebase.js";
import { displaySavedRecommendations } from "./fetchRecommendations.js"; // New import
import { showNotification } from "./notification.js";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".recommendation-form");
    const outputDiv = document.querySelector(".recommendation-cards");
    const submitButton = form.querySelector("button[type='submit']");
    // Display saved recommendations on page load
    displaySavedRecommendations(outputDiv);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        
        const formData = readFormData(form);
        formData['displayDate'] = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        try {
            await addDoc(collection(db, "recommendations"), {
                name: formData.name,
                recommendation: formData.recommendation,
                displayDate: formData.displayDate
            });
            showNotification("Recommendation submitted successfully!", "success");
            displayFormData(formData, outputDiv);
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = "Submit";

        } catch (error) {
            showNotification(`An error occurred: ${error.message}. Please try again.`, "error");
            submitButton.disabled = false;
            submitButton.textContent = "Submit";
        }
    });
});