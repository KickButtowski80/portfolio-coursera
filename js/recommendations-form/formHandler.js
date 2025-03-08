import { readFormData } from "./readFormData.js";
import { displayFormData } from "./displayFormData.js";
import { addFirestoreDocument } from '../config/firebase.js';
import { displaySavedRecommendations } from "./fetchRecommendations.js"; // New import
import { showNotification } from "./notification.js";
import { setupCharacterCount } from "./characterCount.js";

// Export the main form handler function
export function handleFormSubmit(event) {
  event.preventDefault();

  // Honeypot validation
  const honeypotField = document.getElementById("website").value;
  if (honeypotField) {
    console.log("Spam detected: Honeypot field was filled out.");
    showNotification("Spam detected!", "error");
    return; // Stop further execution
  }

  const submitButton = event.target.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  const formData = readFormData(event.target);
  formData["displayDate"] = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  addFirestoreDocument('recommendations', formData)
  .then(() => {
    showNotification("Recommendation submitted successfully!", "success");
    const outputDiv = document.querySelector(".recommendation-cards");
    displayFormData(formData, outputDiv);
    event.target.reset();
    submitButton.focus();
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
  })
  .catch((error) => {
    showNotification(
      `An error occurred: ${error.message}. Please try again.`,
      "error"
    );
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
  });
}

// Initialize form functionality
export function initializeForm() {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".recommendation-form");
    const outputDiv = document.querySelector(".recommendation-cards");
    
    // Display saved recommendations on page load
    displaySavedRecommendations(outputDiv);
    setupCharacterCount(form);
    
    // Add event listener using the exported function
    form.addEventListener("submit", handleFormSubmit);
  });
}

// Auto-initialize when imported
initializeForm();
