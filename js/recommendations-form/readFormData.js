// Export a function to read form data
export function readFormData(form) {
    const formData = {
        name: form['recommendation-author-name'].value.trim(),
        recommendation: form['recommendation-author-message'].value.trim()
    };
    return formData;
}