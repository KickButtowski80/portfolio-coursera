// Dark mode toggle functionality
const darkModeToggles = document.querySelectorAll(".darkmode-toggle");

// Add keyboard activation when focused
darkModeToggles.forEach((toggle) => {
  toggle.addEventListener("keydown", (event) => {
    // Enter or Space key when focused
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault(); // Prevent page scroll on space
      toggle.checked = !toggle.checked;
      toggle.dispatchEvent(new Event('change'));
    }
  });
});

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  darkModeToggles.forEach(
    (toggle) => (toggle.checked = savedTheme === "dark")
  );
}

// Handle theme toggle
darkModeToggles.forEach((toggle) =>
  toggle.addEventListener("change", (event) => {
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
  })
);

// Hamburger menu functionality
const hamburgerIcon = document.getElementById("hamburger-icon");
hamburgerIcon.addEventListener("change", (event) => {
  // Handle hamburger menu toggle
  event.target.setAttribute("aria-expanded", event.target.checked);
});

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
  // Only trigger if no input elements are focused
  if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    // 'D' key for dark mode toggle
    if (event.key.toLowerCase() === 'd') {
      const firstToggle = darkModeToggles[0];
      console.log(firstToggle)
      firstToggle.checked = !firstToggle.checked;
      firstToggle.dispatchEvent(new Event('change'));
    }
    
    // 'M' key for menu toggle
    if (event.key.toLowerCase() === 'm') {
      hamburgerIcon.checked = !hamburgerIcon.checked;
      hamburgerIcon.dispatchEvent(new Event('change'));
    }
  }
});

// Keyboard shortcuts panel functionality
const shortcutsToggle = document.getElementById('shortcuts-toggle');
const shortcutsPanel = document.getElementById('shortcuts-panel');

shortcutsPanel.addEventListener('toggle', (event) => {
  shortcutsPanel.hidden = !event.detail.show;
});

shortcutsToggle.addEventListener('click', () => {
  const isHidden = shortcutsPanel.hidden;
  const toggleEvent = new CustomEvent('toggle', { 
    detail: { show: isHidden }
  });
  shortcutsPanel.dispatchEvent(toggleEvent);
});

// Close shortcuts panel when clicking outside
document.addEventListener('click', (event) => {
  if (!shortcutsPanel.hidden && 
      !shortcutsPanel.contains(event.target) && 
      event.target !== shortcutsToggle) {
    shortcutsPanel.hidden = true;
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

// Cleanup on page unload
window.addEventListener("unload", () => {
  observers.forEach((observer) => observer.disconnect());
});
