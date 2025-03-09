document.addEventListener("DOMContentLoaded", (event) => {
  
  const hamburgerIcon = document.getElementById("hamburger-icon");

  hamburgerIcon.addEventListener("change", (event) => {
    const isMenuExpanded = event.target.getAttribute("aria-expanded");
    if (isMenuExpanded === "true") {
      document.querySelector("#back-to-top").setAttribute("tabindex", "-1");
    } else {
      document.querySelector("#back-to-top").removeAttribute("tabindex");
    }
  });

});
