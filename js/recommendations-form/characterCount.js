export function setupCharacterCount(form, maxLength = 300) {
    const recommendationInput = form.querySelector("textarea");
    const submitButton = form.querySelector("button[type='submit']");
    
    const charCount = document.createElement("div");
    charCount.className = "char-count";
    form.insertBefore(charCount, submitButton);
  
    recommendationInput.addEventListener("input", () => {
      const remaining = maxLength - recommendationInput.value.length;
      charCount.textContent = `${remaining} characters remaining`;
    });
  }