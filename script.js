document.addEventListener('DOMContentLoaded', function () {
  const options = {
    root: null,
    rootMargin: '-20% 0px -20% 0px',
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
  };

  const allMenuLinks = document.querySelectorAll('nav ul li a');
  const sectionVisibility = new Map();

  allMenuLinks.forEach((menuLink) => {
    const section = document.querySelector(menuLink.getAttribute('href'));
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      sectionVisibility.set(entry.target.id, {
        visible: entry.isIntersecting,
        ratio: entry.intersectionRatio,
      });

      let maxRatio = 0;
      let mostVisibleSection = null;

      sectionVisibility.forEach((value, id) => {
        if (value.visible && value.ratio > maxRatio) {
          maxRatio = value.ratio;
          mostVisibleSection = id;
        }
      });

      if (mostVisibleSection) {
        allMenuLinks.forEach((menuLink) => {
          menuLink.classList.remove('active');
        });
        const mostVisibleSectionMenuItems = document.querySelectorAll(
          `a[href="#${mostVisibleSection}"]`
        );

        if (mostVisibleSectionMenuItems) {
          mostVisibleSectionMenuItems.forEach((menuLink) =>
            menuLink.classList.add('active')
          );
        }
      }
    }, options);

    observer.observe(section);
  });
});
