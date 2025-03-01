 // Import functions from other modules
import { readFormData } from './readFormData.js';
import { displayFormData } from './displayFormData.js';
import { db } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';


// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the form and output div
    const form = document.querySelector('.recommendation-form');
    const outputDiv = document.querySelector('.recommendation-cards');

    // Add a submit event listener to the form
    form.addEventListener('submit', async function (event) {
        // Prevent the form from submitting (to avoid page reload)
        event.preventDefault();

        // Read the form data
        const formData = readFormData(form);    
        try {
            await addDoc(collection(db, 'recommendations'), {
              name: formData.name,
              recommendation: formData.recommendation,
              timestamp: new Date()
            });
            alert('Recommendation submitted successfully!');
            form.reset();
          } catch (error) {
            console.error('Error adding document: ', error);
            alert('An error occurred. Please try again.');
          }
        // Display the submitted data
        displayFormData(formData, outputDiv);
        form.reset();
    });

});