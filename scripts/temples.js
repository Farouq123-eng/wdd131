const yearSpan = document.querySelector("#year");
yearSpan.textContent = new Date().getFullYear();
// update last modified date
const lastModifiedSpan =  document.querySelector("#lastModified");
lastModifiedSpan.textContent = document.lastModified;
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "×" : "☰";
});