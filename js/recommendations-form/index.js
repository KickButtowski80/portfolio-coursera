// Import all necessary modules
import { initializeForm, handleFormSubmit } from './formHandler.js';
import { validateForm, initializeValidation } from './formValidator.js';

// Export all functionality
export { handleFormSubmit, validateForm, initializeForm, initializeValidation };

// Initialize everything when this module is imported
document.addEventListener("DOMContentLoaded", function() {
  initializeForm();
  initializeValidation();
});