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

    // Sync other toggles
    darkModeToggles.forEach((otherToggle) => {
      if (otherToggle !== event.target) {
        otherToggle.checked = event.target.checked;
      }
    });
  });
});

// Hamburger menu functionality
const hamburgerIcon = document.getElementById("hamburger-icon");
hamburgerIcon.addEventListener("change", (event) => {
  // Handle hamburger menu toggle
  event.target.setAttribute("aria-expanded", event.target.checked);
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
  if (event.key.toLowerCase() === "d" && (!isTyping || isToggleFocused)) {
    const firstToggle = darkModeToggles[0];
    firstToggle.checked = !firstToggle.checked;
    // Trigger the change event to update theme and sync other toggles
    firstToggle.dispatchEvent(new Event("change"));
  }
  // 'M' key for menu toggle
  if (event.key.toLowerCase() === "m" && (!isTyping || isToggleFocused)) {
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

// Detect if mobile based on screen width
const isMobile = window.innerWidth <= 768;
const observers = [];

// Create intersection observer options
const options = {
  root: null,
  rootMargin: isMobile ? "-12% 0px 5% 0px" : "-10% 0px",
  threshold: [0, 0.25, 0.5, 0.75, 1],
};

const allMenuLinks = document.querySelectorAll("nav ul li a");
const sectionVisibility = new Map();

allMenuLinks.forEach((menuLink) => {
  const section = document.querySelector(menuLink.getAttribute("href"));
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      sectionVisibility.set(entry.target.id, {
        visible: entry.isIntersecting,
        ratio: entry.intersectionRatio,
      });
    });

    // Find the most visible section
    let maxRatio = 0;
    let mostVisibleSection = null;

    sectionVisibility.forEach((value, id) => {
      if (value.visible && value.ratio > maxRatio) {
        maxRatio = value.ratio;
        mostVisibleSection = id;
      }
    });

    if (!mostVisibleSection) return;

    // Update active state for all menu items
    allMenuLinks.forEach((link) => {
      link.classList.remove("active");
    });

    const sectionId = document.getElementById(mostVisibleSection)?.id;
    if (sectionId) {
      const currentActiveLinks = document.querySelectorAll(
        `[href="#${sectionId}"]`
      );
      currentActiveLinks.forEach((link) => {
        link.classList.add("active");
      });
    }
  }, options);

  observer.observe(section);
  observers.push(observer);
});

// Helper function for screen reader announcements
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('class', 'visually-hidden');
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
}

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  observers.forEach((observer) => observer.disconnect());
});
