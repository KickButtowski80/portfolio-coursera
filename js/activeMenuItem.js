document.addEventListener("DOMContentLoaded", () => {

// Detect if mobile based on screen width
const isMobile = window.innerWidth <= 768;
const observers = [];

// Create intersection observer options
// const options = {
//   root: null,
//   rootMargin: isMobile ? "-12% 0px 5% 0px" : "-10% 0px",
//   threshold: [0, 0.10,0.21, 0.25, 0.5, 0.75, 1],
// };
const options = {
    root: null,
    rootMargin: isMobile ? "-5% 0px" : "-5% 0px", // Less negative margin
    threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // More granular thresholds
  };
const allMenuLinks = document.querySelectorAll("nav ul li a");
const sectionVisibility = new Map();

allMenuLinks.forEach((menuLink) => {
  const section = document.querySelector(menuLink.getAttribute("href"));
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry.target.id, entry.intersectionRatio);
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
      link.addEventListener('click', (e) => {
        // Set a small timeout to allow scrolling to complete
        setTimeout(() => {
          // Force active class update
          allMenuLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }, 100);
      });
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

});
