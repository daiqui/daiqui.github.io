// main-controller.js
import Controller from "./controller.js";

export default class MainController extends Controller {
    constructor() {
        // Call the constructor of the superclass (Controller) with the default name 'view'.
        super("main");
    }
    loadNavi(viewControllerPlaceholder) {
        viewControllerPlaceholder.navigation();
    }
    getPage() {
        loadPage();
    }
}

/*************************** Please change code below accordingly */

function loadPage() {


    console.log("old mainController active!");
    // Event listener to handle hash changes
    window.addEventListener('hashchange', loadContent);

    // Initial content load
    loadContent();

    // Check if the hash is empty (no hash provided in the URL)
    if (window.location.hash === '') {
        // Set the default hash to '#club'
        window.location.hash = '#club';
    }
}

// Function to load content based on the URL hash
function loadContent() {
    const hash = window.location.hash;
    const contentMain = document.getElementById('content');

    switch (hash) {
        case '#club':
            contentMain.innerHTML = '<h1>Welcome to the Bookclub</h1><p>This is the Bookclub content.</p>';
            break;
        case '#overview':
            contentMain.innerHTML = '<h1>Overview</h1><p>Learn more about our club.</p>';
            break;
        case '#literature':
            contentMain.innerHTML = '<h1>Literature</h1><p>Explore our recommended books.</p>';
            break;
        case '#members':
            contentMain.innerHTML = '<h1>Members</h1><p>Meet our Bookclub members.</p>';
            break;
        default:
            contentMain.innerHTML = '<h1>Page Not Found</h1><p>The requested page does not exist.</p>';
    }
}


