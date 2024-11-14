document.addEventListener('DOMContentLoaded', function () {
  const allMenuItems = document.querySelectorAll('nav ul li a');

  allMenuItems.forEach((item) => {
    const targetElement = document.getElementById(item.hash.split('#')[1]);
    if (!targetElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width < 769) {
          thresholdValue = [0.111];
          rootMarginValue = '-200px 0px';
        } else {
          thresholdValue = [0.4];
          rootMarginValue = '-100px 0px';
        }
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              console.log(entry.intersectionRatio, entry.target.id);
          
              if (entry.isIntersecting ) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
                if (width< 769) {
                  item.style.transform = 'scale(1)';
                }
              }
            });
          },
          { threshold: thresholdValue, rootMargin: rootMarginValue }
        );
        observer.observe(targetElement);
      }
    });
    resizeObserver.observe(targetElement);

 
  });
});
