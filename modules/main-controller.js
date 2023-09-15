//main-controller
// Function to load content based on the URL hash
function loadContent() {
    const hash = window.location.hash;
    const contentMain = document.getElementById('content');

    switch (hash) {
        case '#bookclub':
            contentMain.innerHTML = '<h1>Willkommen zum Buchklub Wien</h1><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>';
            break;
        case '#overview':
            contentMain.innerHTML = '<h1>Overview</h1><p>Erfahre mehr über unseren Buchklub</p>';
            break;
        case '#literature':
            contentMain.innerHTML = '<h1>Literature</h1><p>Entdecke neue Bücher</p>';
            break;
        case '#members':
            contentMain.innerHTML = '<h1>Members</h1><p>Triff Mitglieder des Buchklub</p>';
            break;
        default:
            contentMain.innerHTML = '<h1>Page Not Found</h1><p>Die Angefragte Seite existiert nicht!</p>';
    }
}

export function initMainController() {
    // Event listener to handle hash changes
    window.addEventListener('hashchange', loadContent);

    // Initial content load
    loadContent();
}
