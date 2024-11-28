document.addEventListener('DOMContentLoaded', function () {

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkmode-toggle');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    darkModeToggle.checked = savedTheme === 'dark';
}

// Handle theme toggle
darkModeToggle.addEventListener('change', function() {
    const theme = this.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});


  // Hamburger menu functionality
  const hamburgerIcon = document.getElementById('hamburger-icon');
  hamburgerIcon.addEventListener('change', function() {
    this.setAttribute('aria-expanded', this.checked);
  });

  // Detect if mobile based on screen width
  const isMobile = window.innerWidth <= 768;

  const options = {
    root: null,
    rootMargin: isMobile ? "-10% 0px 5% 0px" : "-10% 0px",
    threshold: [0, 0.25, 0.5, 0.75, 1],
  };

  const allMenuLinks = document.querySelectorAll("nav ul li a");
  const sectionVisibility = new Map();

  allMenuLinks.forEach((menuLink) => {
    const section = document.querySelector(menuLink.getAttribute("href"));
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        sectionVisibility.set(entry.target.id, {
          visible: entry.isIntersecting,
          ratio: entry.intersectionRatio
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
        const currentActiveLinks = document.querySelectorAll(`[href="#${sectionId}"]`);
        currentActiveLinks.forEach((link) => {
          link.classList.add("active");
        });
      }
    }, options);
   
    observer.observe(section);
  });
});