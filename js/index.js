// Import all necessary modules
import { initializeForm, handleFormSubmit } from './recommendations-form/formHandler.js';
import { validateForm, initializeValidation } from './recommendations-form/formValidator.js';



// Initialize modules if needed
// Add any initialization code here if your modules require it
// Export all functionality
export { handleFormSubmit, validateForm, initializeForm, initializeValidation };

// Initialize everything when this module is imported
document.addEventListener("DOMContentLoaded", function() {
  initializeForm();
  initializeValidation();
});