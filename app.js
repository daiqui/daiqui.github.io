// JavaScript for the single-page application

// Function to load content based on the URL hash
function loadContent() {
    const hash = window.location.hash;
    const contentDiv = document.getElementById('content');

    switch (hash) {
        case '#home':
            contentDiv.innerHTML = '<h1>Welcome to the Home Page</h1><p>This is the home page content.</p>';
            break;
        case '#about':
            contentDiv.innerHTML = '<h1>About Us</h1><p>Learn more about our company.</p>';
            break;
        case '#contact':
            contentDiv.innerHTML = '<h1>Contact Us</h1><p>Get in touch with us.</p>';
            break;
        default:
            contentDiv.innerHTML = '<h1>Page Not Found</h1><p>The requested page does not exist.</p>';
    }
}

// Event listener to handle hash changes
window.addEventListener('hashchange', loadContent);

// Initial content load
loadContent();
