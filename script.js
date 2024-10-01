document.querySelectorAll('#hamburger-menu  a').forEach((item) => {
  console.log('item', item.hash);
  const targetElement = document.getElementById(item.hash.split('#')[1]);
  if (!targetElement) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        //    debugger;
        console.log(
          'entry target',
          entry.target,
          entry.isIntersecting,
          targetElement
        );
        if (entry.isIntersecting) item.classList.add('active');
        else item.classList.remove('active');
      });
    },
    { threshold: [0.4, 0.5] }
  );
  observer.observe(targetElement);
});
