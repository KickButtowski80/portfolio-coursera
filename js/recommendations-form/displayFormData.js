// Export a function to display form data
export function displayFormData(data, outputDiv) {
  // Create the blockquote element
  const blockquote = document.createElement("blockquote");
  blockquote.classList.add("recommendation-card");
  blockquote.setAttribute("tabindex", "0");
  
  // Add proper ARIA attributes for screen readers
  blockquote.setAttribute("aria-label", `Recommendation from ${data.name || "Anonymous"}`);
  blockquote.setAttribute("role", "article");

  // Add the pin div
  const pinDiv = document.createElement("div");
  pinDiv.classList.add("pin");
  pinDiv.setAttribute("aria-hidden", "true");
  blockquote.appendChild(pinDiv);

  // Add the recommendation text
  const recommendationText = document.createElement("p");
  recommendationText.textContent = data.recommendation;
  // Add proper ARIA attributes to ensure screen readers can access the content
  recommendationText.id = `recommendation-${Math.random().toString(36).substring(2, 10)}`;
  blockquote.setAttribute("aria-describedby", recommendationText.id);
  blockquote.appendChild(recommendationText);

  // Add the footer with the citation
  const footer = document.createElement("footer");
  const cite = document.createElement("cite");
  cite.textContent = `${data.name || "Anonymous"}`;
  
  // Create time element with proper datetime attribute
  const time = document.createElement("time");
  time.textContent = data.displayDate; // Use formatted date
  footer.appendChild(cite);
  footer.appendChild(time);
  blockquote.appendChild(footer);

  // Add animation with reduced motion preference support
  blockquote.style.animation = "none"; // Initially no animation
  
  // Check for reduced motion preference
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Only apply animation if user hasn't requested reduced motion
    blockquote.style.animation = "fadeIn 0.5s ease-in-out forwards";
  }

  // Append the blockquote to the output div
  outputDiv.prepend(blockquote); // Use prepend to show newest first
}
