// main-controller.js
import Controller from "./controller.js";
import createConfig from "./config.js";

export default class MainController extends Controller {
    constructor() {
        // Call the constructor of the superclass (Controller) with the default name 'view'.
        super("main");
    }
    // This function adds the navigation menu to the view using the provided 'visualController'.
    pageMenu(visualController) {
        visualController.navPanel();
    }
    // Updates the href attribute of <a> elements to redirect users to the real WhatsApp link.
    updateWhatsAppLink() {
        const configLink = createConfig().getWhatsAppLink();
        const linkElement = document.getElementById("whatsAppLink");
        linkElement.setAttribute('href', configLink);
    }
    // This function loads content based on the URL hash and sets a default hash if none is provided.
    loadPageContent() {
        loadPage();
    }
}

function loadPage() {
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
            contentMain.innerHTML = '<h1>Willkommen zum Buchklub</h1><p>Das ist der Inhalt des Buchklubs</p>';
            break;
        case '#overview':
            contentMain.innerHTML = '<h1>Übersicht</h1><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p><br><h1>At vero eos et accusam et</h1><p>Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>';
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
