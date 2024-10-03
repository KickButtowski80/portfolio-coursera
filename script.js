document.addEventListener('onLoad', function () {
  // setTimeout(() => {
    document.querySelectorAll('nav a, #hamburger-menu  a').forEach((item) => {
      const targetElement = document.getElementById(item.hash.split('#')[1]);
      if (!targetElement) return;
      let thresholdValue;
      if (window.innerWidth < 768) {
        thresholdValue = 0.1111;
      } else {
        thresholdValue = 0.5;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) item.classList.add('active');
            else item.classList.remove('active');
          });
        },
        { threshold: thresholdValue }
      );
      observer.observe(targetElement);
    });
  // }, 0);
});
