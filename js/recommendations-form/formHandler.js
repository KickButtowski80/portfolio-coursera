 // Import functions from other modules
import { readFormData } from './readFormData.js';
import { displayFormData } from './displayFormData.js';

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the form and output div
    const form = document.querySelector('.recommendation-form');
    const outputDiv = document.querySelector('.recommendation-cards');

    // Add a submit event listener to the form
    form.addEventListener('submit', function (event) {
        // Prevent the form from submitting (to avoid page reload)
        event.preventDefault();

        // Read the form data
        const formData = readFormData(form);

        // Validate the recommendation field
        if (!formData.recommendation) {
            alert('Recommendation is required!');
            return;
        }
       
        // Display the submitted data
        displayFormData(formData, outputDiv);
        form.reset();
    });

});