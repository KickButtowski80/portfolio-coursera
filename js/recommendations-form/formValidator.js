// formValidator.js

document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("recommendation-author-message");

  textarea.addEventListener("input", function () {
    let message = "";
    let textAreaValue = this.value.trim();
    const regex = /[\s.,!?]/;
    if (textAreaValue === "") {
      message = "Please enter a recommendation (no empty spaces).";
    } else if (!regex.test(textAreaValue)) {
      message = "Input must contain spaces or punctuation.";
    }
    this.setCustomValidity(message);
    this.reportValidity();
  });
});
