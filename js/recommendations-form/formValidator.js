// formValidator.js

// formValidator.js

// Main validation function
export function validateForm(textarea) {
  let message = "";
  let textAreaValue = textarea.value.trim();
  const regex = /[\s.,!?]/;
  
  if (textAreaValue === "") {
    message = "Please enter a recommendation (no empty spaces).";
  } else if (!regex.test(textAreaValue)) {
    message = "Input must contain spaces or punctuation.";
  }
  
  textarea.setCustomValidity(message);
  textarea.reportValidity();
  
  return message === ""; // Returns true if valid, false if invalid
}

// Initialize validation
export function initializeValidation() {
  document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("recommendation-author-message");

    textarea.addEventListener("input", function() {
      validateForm(this);
    });
  });
}

// Auto-initialize when imported
initializeValidation();