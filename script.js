document.addEventListener('DOMContentLoaded', function () {
  let allLinkElements;
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: [0.4],
  };
  let observers = [];
  const setAddressHash = (id) => {
    window.history.replaceState({}, "", `#${id}`);
  }
  const getThreshold = (targetId, sectionHeight, viewportHeight, screenWidth) => {
    let targetVisiblePercent = 0.4;
    let thresholdValue = (viewportHeight * targetVisiblePercent) / sectionHeight;
    if(screenWidth >= 768) {

      
      thresholdValue =  Math.min(1, (viewportHeight * targetVisiblePercent) / sectionHeight);
      console.log(thresholdValue, targetId);
    }
    return thresholdValue;
 
  };

  const resizeObserver = new ResizeObserver((entries) => {
    observers.forEach((observer) => observer.disconnect());
    observers = [];
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
      observers.push(observer);
    });
  });

  resizeObserver.observe(document.body);
});
