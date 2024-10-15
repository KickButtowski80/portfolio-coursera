document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('nav ul li a').forEach((item) => {
    const targetElement = document.getElementById(item.hash.split('#')[1]);
    if (!targetElement) return;
    let thresholdValue = [0.6];
    let rootMarginValue = '0px';
    if (window.innerWidth < 769) {
      thresholdValue = [0.1111];
      rootMarginValue = '200px 0px 0px 0px';
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) item.classList.add('active');
          else {
            item.classList.remove('active');         
            item.style.transform = 'scale(1)';
           
          }
        });
      },
      { threshold: thresholdValue, rootMargin: rootMarginValue }
    );
    observer.observe(targetElement);
  });
});
