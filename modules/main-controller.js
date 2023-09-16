// main-controller.js

import { navigation } from "./view-controller.js";

export function mainController() {
    console.log("old mainController active!");

    //access navigation bar
    navigation();

    // Event listener to handle hash changes
    window.addEventListener('hashchange', loadContent);
    // Initial content load
    loadContent();
}

// Function to load content based on the URL hash
function loadContent() {
    const hash = window.location.hash;
    const contentDiv = document.getElementById('content');

    switch (hash) {
        case '#bookclub':
            contentDiv.innerHTML = '<h1>Welcome to the Bookclub</h1><p>This is the Bookclub content.</p>';
            break;
        case '#overview':
            contentDiv.innerHTML = '<h1>Overview</h1><p>Learn more about our club.</p>';
            break;
        case '#literature':
            contentDiv.innerHTML = '<h1>Literature</h1><p>Explore our recommended books.</p>';
            break;
        case '#members':
            contentDiv.innerHTML = '<h1>Members</h1><p>Meet our Bookclub members.</p>';
            break;
        default:
            contentDiv.innerHTML = '<h1>Page Not Found</h1><p>The requested page does not exist.</p>';
    }
}


