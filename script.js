document.querySelectorAll('nav a, #hamburger-menu  a').forEach((item) => {
  console.log('item', item.hash);
  const targetElement = document.getElementById(item.hash.split('#')[1]);
  if (!targetElement) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) 
            item.classList.add('active');
        else 
        item.classList.remove('active');
      });
    },
    { threshold:[0.1, 0.5] }
  );
  observer.observe(targetElement);
});
