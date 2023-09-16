// view-controller.js
import Controller from "./controller.js";

export default class ViewController extends Controller {
    constructor() {
        // Call the constructor of the superclass (Controller) with the default name 'view'.
        super("view");
    }
    navPanel() {
        navBar();
    }
}

function navBar() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navBranding = document.querySelector(".nav-branding");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    })

    document.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }))

    navBranding.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    })
}

