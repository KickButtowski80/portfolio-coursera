 
document.addEventListener('DOMContentLoaded', function () {
  const allMenuItems = document.querySelectorAll('nav ul li a');
  const hamburgerIcon = document.getElementById('hamburger-icon');

  hamburgerIcon.addEventListener('change', function() {
    this.setAttribute('aria-expanded', this.checked);
  });
 
window.addEventListener("DOMContentLoaded", function () {
  // Detect if mobile based on screen width (typical mobile breakpoint is 768px)
  const isMobile = window.innerWidth <= 768;
 

  const options = {
    root: null,
    rootMargin: isMobile ? "-10% 0px 5% 0px" : "-10% 0px", // Positive margin for mobile to detect sections earlier
    //threshold values
    threshold: [0, 0.25, 0.5, 0.75, 1], // Different thresholds for mobile/desktop
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
        // Update section opacity

      // Find the most visible section
      let maxRatio = 0;
      let mostVisibleSection = null;

      sectionVisibility.forEach((value, id) => {
        if (value.visible && value.ratio > maxRatio) {
          maxRatio = value.ratio;
          mostVisibleSection = id;
        }
      });
      
      if(!mostVisibleSection) return;
      //  debugger;
      // Update active state for all menu items
      allMenuLinks.forEach((link) => {
        link.classList.remove("active");
      });
      const sectionId = document.getElementById(mostVisibleSection)?.id;
      const currentActiveLinks = document.querySelectorAll(`[href="#${sectionId}"]`);
      currentActiveLinks.forEach((link) => {
        link.classList.add("active");
      });
 
   
    }, options);
   
    observer.observe(section);
  });
});
