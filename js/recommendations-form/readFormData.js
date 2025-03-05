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
    const formData = {
        name: sanitizeInput(form.name.value),
        recommendation: sanitizeInput(form.recommendation.value)
      };
    return formData;
}