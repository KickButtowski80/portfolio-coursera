// Export a function to display form data
export function displayFormData(data, outputDiv) {
  // Create the blockquote element
  const blockquote = document.createElement("blockquote");
  blockquote.classList.add("recommendation-card");
  blockquote.setAttribute("tabindex", "0");

  // Add the pin div
  const pinDiv = document.createElement("div");
  pinDiv.classList.add("pin");
  pinDiv.setAttribute("aria-hidden", "true");
  blockquote.appendChild(pinDiv);

  // Add the recommendation text
  const recommendationText = document.createElement("p");
  recommendationText.textContent = data.recommendation;
  blockquote.appendChild(recommendationText);

  // Add the footer with the citation
  const footer = document.createElement("footer");
  const cite = document.createElement("cite");
  cite.textContent = `${data.name || "Anonymous"}`;
  const time = document.createElement("time");
  // the first way of getting the date in seconds
  //  const date = new Date(data.timestamp.seconds * 1000);
  const date = data.timestamp.toDate();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  time.dateTime = date.toISOString();
  time.textContent = formattedDate;
  footer.appendChild(cite);
  footer.appendChild(time);
  blockquote.appendChild(footer);

  // Append the blockquote to the output div
  outputDiv.appendChild(blockquote);
}
