document.addEventListener("DOMContentLoaded", (event) => {
const hamburgerMenu = document.getElementById("hamburger-menu");
 
 

hamburgerIcon.addEventListener("change", (event) => {
    const isMenuExpanded = event.target.getAttribute("aria-expanded");
    console.log("Menu is expanded:", isMenuExpanded);

    if (isMenuExpanded === "true") {
        document.querySelector("#back-to-top").setAttribute("tabindex", "-1");
    } else {
        document.querySelector("#back-to-top").removeAttribute("tabindex");
    }
});

});