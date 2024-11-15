document.addEventListener('DOMContentLoaded', function () {
  let allLinkElements;
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: [0.4],
  };
  const setAddressHash = (id) => {
    window.history.replaceState({}, "", `#${id}`);
  }
  const getThreshold = (targetId, sectionHeight, viewportHeight, screenWidth) => {
    let targetVisiblePercent = 0.4;
    // if(screenWidth >= 768) {
    //   targetVisiblePercent = 0.45;
    // }
    // if (targetId === "skills" && screenWidth  < 768) {
    //   targetVisiblePercent = 0.26;
    // }
    if(screenWidth >= 768) 
    return Math.min(1, (viewportHeight * targetVisiblePercent) / sectionHeight);
    return  (viewportHeight * targetVisiblePercent) / sectionHeight;
  };

  const resizeObserver = new ResizeObserver((entries) => {
    const width = entries[0].contentRect.width;
    if (width < 768) {
      allLinkElements = document.querySelectorAll('nav#hamburger-menu ul li a');
    } else {
      allLinkElements = document.querySelectorAll('nav#main-menu ul li a');
    }

    allLinkElements.forEach((linkElement) => {
      const targetId = linkElement.getAttribute('href').replace('#', '');
      const targetElement = document.getElementById(targetId);

      const sectionHeight = targetElement.offsetHeight;
      const viewportHeight = window.innerHeight;
      options.threshold = getThreshold(
        targetId,
        sectionHeight,
        viewportHeight,
        width
      );
     console.log(options.threshold);
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          allLinkElements.forEach((linkElement) => {
            linkElement.classList.remove('active');
          })
          linkElement.classList.add('active');
          setAddressHash(targetId);
        }
      }, options);

      observer.observe(targetElement);
    });
  });

  resizeObserver.observe(document.body);
});
