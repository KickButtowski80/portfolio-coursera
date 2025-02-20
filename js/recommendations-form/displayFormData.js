// Export a function to display form data
export function displayFormData(data, outputDiv) {
    // Create the blockquote element
    const blockquote = document.createElement('blockquote');
    blockquote.classList.add('recommendation-card');
    blockquote.setAttribute('tabindex', '0');

    // Add the pin div
    const pinDiv = document.createElement('div');
    pinDiv.classList.add('pin');
    pinDiv.setAttribute('aria-hidden', 'true');
    blockquote.appendChild(pinDiv);

    // Add the recommendation text
    const recommendationText = document.createElement('p');
    recommendationText.textContent = data.recommendation;
    blockquote.appendChild(recommendationText);

    // Add the footer with the citation
    const footer = document.createElement('footer');
    const cite = document.createElement('cite');
    cite.textContent = `- ${data.name || 'Anonymous'}`;
    footer.appendChild(cite);
    blockquote.appendChild(footer);

    // Append the blockquote to the output div
    outputDiv.appendChild(blockquote);
}