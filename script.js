// Erhalte alle Tab-Links
const tabLinks = document.querySelectorAll('#navbar a');

// Erhalte alle Sektionen
const sections = document.querySelectorAll('section');

// Funktion, um die aktive Sektion basierend auf dem Hash-Wert in der URL anzuzeigen
const showActiveSection = () => {
    const hash = window.location.hash.substring(1);
    sections.forEach(section => {
        section.style.display = 'none';
        if (section.id === hash) {
            section.style.display = 'block';
        }
    });
};

// Aktiviere die Event-Listener für die Tab-Links
tabLinks.forEach(link => {
    link.addEventListener('click', event => {
        // Verhindere das Standardverhalten des Links
        event.preventDefault();

        // Ändere die URL des Browsers
        const hash = link.getAttribute('href');
        history.pushState(null, null, hash);

        // Aktiviere die richtige Sektion
        showActiveSection();
    });
});

// Überprüfe beim Laden der Seite den Hash-Wert und zeige die entsprechende Sektion an
window.addEventListener('load', () => {
    showActiveSection();
});
