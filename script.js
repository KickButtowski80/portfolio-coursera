document.addEventListener('DOMContentLoaded', function () {
  const options = {
    root: null,
    rootMargin: '-10% 0px',  
    threshold: [0, 0.25, 0.5, 0.75, 1],  
  };

  const allMenuLinks = document.querySelectorAll('nav ul li a');
  const sectionVisibility = new Map();

  allMenuLinks.forEach((menuLink) => {
    const section = document.querySelector(menuLink.getAttribute('href'));
    if (!section) return;  

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      
      // Update visibility state
      sectionVisibility.set(entry.target.id, {
        visible: entry.isIntersecting,
        ratio: entry.intersectionRatio,
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

      // Update active state for all menu items
      allMenuLinks.forEach((link) => {
        const sectionId = link.getAttribute('href').substring(1);
        
        if (sectionId === mostVisibleSection) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }, options);

    observer.observe(section);
  });
});
