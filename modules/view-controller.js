// view-controller.js
import Controller from "./controller.js";

export default class ViewController extends Controller {
    constructor() {
        // Call the constructor of the superclass (Controller) with the default name 'view'.
        super("view");
    }
    navigation() {
        _navigation();
        //////////////// BETTER NAME NEEDED !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
}


// nav-bar
function _navigation() {
    console.log("old visualController active!");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    })

    document.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }))
}
