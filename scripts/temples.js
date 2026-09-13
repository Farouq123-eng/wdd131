const yearSpan = document.querySelector("#year");
yearSpan.textContent = new Date().getFullYear();
// update last modified date
const lastModifiedSpan =  document.querySelector("#lastModified");
lastModifiedSpan.textContent = document.lastModified;
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

menuButton.addEventListener("click", () => {
    if (navMenu.style.display === "flex") {
    navMenu.style.display = "none";
    menuButton.textContent = "☰"; // hamburger
   } else {
    navMenu.style.display = "flex";
    menuButton.textContent = "✖"; // close symbol
  }
});