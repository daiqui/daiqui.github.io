//script.js
import { navigateTo } from './router.js';

const contentContainer = document.getElementById("content");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Handle initial load (default route)
const initialRoute = window.location.pathname;
navigateTo(initialRoute);

// Handle navigation when links are clicked
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior (page reload)
        const route = link.getAttribute("data-route");
        navigateTo(route);
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Handle hamburger menu click
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Handle back/forward navigation using browser history
window.addEventListener("popstate", () => {
    const newRoute = window.location.pathname;
    navigateTo(newRoute);
});
