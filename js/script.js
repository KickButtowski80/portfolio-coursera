// Dark mode toggle functionality
const darkModeToggles = document.querySelectorAll(".darkmode-toggle");

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  darkModeToggles.forEach((toggle) => (toggle.checked = savedTheme === "dark"));
}

// Handle theme toggle
darkModeToggles.forEach((toggle) => {
  toggle.addEventListener("change", (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    const theme = event.target.checked ? "dark" : "light";
    // Update theme
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    toggle.setAttribute("aria-checked", event.target.checked);
    // Sync other toggles
    darkModeToggles.forEach((otherToggle) => {
      if (otherToggle !== event.target) {
        otherToggle.checked = event.target.checked;
        otherToggle.setAttribute("aria-checked", event.target.checked);
      }
    });
  });
});

// Hamburger menu functionality
const hamburgerIcon = document.getElementById("hamburger-icon");
hamburgerIcon.addEventListener("change", (event) => {
  // Handle hamburger menu toggle
  event.target.setAttribute("aria-expanded", event.target.checked);
  event.target.setAttribute("aria-checked", event.target.checked);
});

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  // Allow 'D' key to toggle dark mode only if not typing in input/textarea or if the toggle itself is focused
  const isTyping =
    document.activeElement.tagName === "INPUT" ||
    document.activeElement.tagName === "TEXTAREA";
  const isToggleFocused =
    document.activeElement.classList.contains("darkmode-toggle");

  // 'D' key for dark mode toggle
  if (
    (!isTyping || isToggleFocused) &&
    event.key.trim().toLowerCase() === "d"
  ) {
    const firstToggle = darkModeToggles[0];
    firstToggle.checked = !firstToggle.checked;
    // Trigger the change event to update theme and sync other toggles
    firstToggle.dispatchEvent(new Event("change"));
  }
  // 'M' key for menu toggle
  if (
    (!isTyping || isToggleFocused) &&
    event.key.trim().toLowerCase() === "m"
  ) {
    hamburgerIcon.checked = !hamburgerIcon.checked;
    hamburgerIcon.dispatchEvent(new Event("change"));
  }
});

//show back to top button

const backToTopButton = document.querySelector("#back-to-top");

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      backToTopButton.style.opacity = "1";
    } else {
      backToTopButton.style.opacity = "0";
    }
  });
}


// Helper function for screen reader announcements
function announceToScreenReader(message) {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("class", "visually-hidden");
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
}

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  observers.forEach((observer) => observer.disconnect());
});
