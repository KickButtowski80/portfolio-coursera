// Export a function to read form data

// Sanitize input
function sanitizeInput(input) {
    return input
      .replace(/&/g, '&amp;')  // Escape &
      .replace(/</g, '&lt;')   // Escape <
      .replace(/>/g, '&gt;')   // Escape >
      .replace(/"/g, '&quot;') // Escape "
      .replace(/'/g, '&#039;'); // Escape '
  }
  export function readFormData(form) {
    const recommendationAuthorName = form.elements['recommendation-author-name']; // Access by name or id
    const recommendationAuthorMessage = form.elements['recommendation-author-message']; // Access by name or id
  
    const formData = {
      name: sanitizeInput(recommendationAuthorName.value),
      recommendation: sanitizeInput(recommendationAuthorMessage.value)
    };
    return formData;
  }