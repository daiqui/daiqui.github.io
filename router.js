// router.js

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

export { navigateTo }