// formValidator.js

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('recommendation-author-message');
  
    textarea.addEventListener('input', function() {
      if (this.value.trim() === '') {
        this.setCustomValidity('Please enter a recommendation (no empty spaces).');
      } else {
        this.setCustomValidity('');
      }
      this.reportValidity();
    });
  });
  