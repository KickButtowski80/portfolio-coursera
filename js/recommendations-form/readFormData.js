// Export a function to read form data

// Sanitize input
function sanitizeInput(input) {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  export function readFormData(form) {
    const formData = {
        name: sanitizeInput(form.name.value),
        recommendation: sanitizeInput(form.recommendation.value)
      };
    return formData;
}