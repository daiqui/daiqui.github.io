const contentContainer = document.getElementById("content");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Define routes and their corresponding content
const routes = {
    "/": "Home",
    "/about": "About",
    "/contact": "Contact",
};

function loadContent(route) {
    const content = routes[route];
    if (content !== undefined) {
        contentContainer.innerHTML = `<h1>${content}</h1>`;
    } else {
        contentContainer.innerHTML = "<h1>Page not found</h1>";
    }
}

function navigateTo(route) {
    window.history.pushState({}, route, route);
    loadContent(route);
}

// Handle initial load (default route)
const initialRoute = window.location.pathname;
navigateTo(initialRoute);

// Handle navigation when links are clicked
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior (page reload)
        const route = link.getAttribute("data-route");
        console.log("Clicked on route:", route);
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
    loadContent(window.location.pathname);
});
