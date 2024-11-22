// Tabs wechseln
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Matrix A und B erstellen
document.getElementById('generateMultiplicationMatrices').addEventListener('click', () => {
    const rowsA = parseInt(document.getElementById('rowsA').value);
    const columnsA = parseInt(document.getElementById('columnsA').value);
    const rowsB = parseInt(document.getElementById('rowsB').value);
    const columnsB = parseInt(document.getElementById('columnsB').value);

    createMatrix('matrixAContainer', rowsA, columnsA, true); // Einheitsmatrix für Matrix A
    createMatrix('matrixBContainer', rowsB, columnsB, true); // Einheitsmatrix für Matrix B
});

// Matrix für eine Einzelmatrix erstellen
document.getElementById('generateSingleMatrix').addEventListener('click', () => {
    const rows = parseInt(document.getElementById('singleRows').value);
    const columns = parseInt(document.getElementById('singleColumns').value);
    createMatrix('singleMatrixContainer', rows, columns, true); // Einheitsmatrix beim Erstellen
});

// Matrizen multiplizieren
document.getElementById('multiplyMatrices').addEventListener('click', () => {
    const matrixA = getMatrixData('matrixAContainer');
    const matrixB = getMatrixData('matrixBContainer');

    if (matrixA[0].length !== matrixB.length) {
        alert("Die Matrizen können nicht multipliziert werden! Die Spalten von A müssen gleich der Zeilenanzahl von B sein.");
        return;
    }

    const result = multiplyMatrices(matrixA, matrixB);
    createMatrix('resultMatrixContainer', result.length, result[0].length, false, result);
});

// Matrix erstellen und mit Einheitsmatrix füllen (falls benötigt)
function createMatrix(containerId, rows, columns, isIdentity = false, matrixData = null) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Zurücksetzen
    const table = document.createElement('table');
    table.classList.add('matrix-table');

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('matrix-cell');
            input.addEventListener('focus', () => (input.value = '')); // Inhalt löschen beim Hineinklicken
            input.addEventListener('blur', () => {
                input.value = formatFraction(input.value); // Kürzen bei Verlassen des Feldes
            });
            input.addEventListener('keydown', e => handleNavigation(e, input, table));

            // Wenn es die Einheitsmatrix ist, fülle das entsprechende Feld
            if (isIdentity && i === j) {
                input.value = '1'; // Diagonale der Einheitsmatrix
            } else if (matrixData) {
                input.value = formatResult(matrixData[i][j]); // Falls Matrixdaten existieren, richtig formatieren
            } else {
                input.value = '0'; // Alle anderen Werte auf 0 setzen
            }

            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
}

// Navigation mit ENTER und TAB
function handleNavigation(event, input, table) {
    const key = event.key;
    if (key !== 'Enter') return;

    event.preventDefault(); // Standardfunktion von ENTER verhindern
    const inputs = Array.from(table.querySelectorAll('.matrix-cell'));
    const currentIndex = inputs.indexOf(input);

    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % inputs.length; // Zum nächsten Feld springen, bei Bedarf zurück zum Anfang
    inputs[nextIndex].focus();
}

// Matrizen-Daten extrahieren
function getMatrixData(containerId) {
    const rows = document.querySelectorAll(`#${containerId} .matrix-table tr`);
    const matrix = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td input');
        const rowData = [];
        cells.forEach(cell => {
            rowData.push(parseFraction(cell.value)); // Konvertiere in Bruch
        });
        matrix.push(rowData);
    });

    return matrix;
}

// Explore-Button: Matrix als String in die Zwischenablage kopieren
document.getElementById('exploreMatrix').addEventListener('click', () => {
    const matrixData = getMatrixData('singleMatrixContainer');
    const matrixString = matrixData.map(row => `{${row.map(formatForString).join(',')}}`).join(',');
    const clipboardString = `{${matrixString}}`;

    navigator.clipboard.writeText(clipboardString)
        .then(() => alert(`Matrix wurde kopiert:\n${clipboardString}`))
        .catch(err => alert(`Fehler beim Kopieren: ${err}`));
});

// Matrizen multiplizieren
function multiplyMatrices(A, B) {
    const result = [];
    for (let i = 0; i < A.length; i++) {
        result[i] = [];
        for (let j = 0; j < B[0].length; j++) {
            let numerator = 0;
            let denominator = 1;

            for (let k = 0; k < B.length; k++) {
                const [numA, denA] = A[i][k];
                const [numB, denB] = B[k][j];
                numerator = numerator * denA * denB + numA * numB * denominator;
                denominator *= denA * denB;
            }

            result[i][j] = reduceFraction([numerator, denominator]);
        }
    }
    return result;
}

// Funktion zum Kürzen eines Bruchs
function reduceFraction([numerator, denominator]) {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    numerator /= divisor;
    denominator /= divisor;

    return [numerator, denominator];
}

// Funktion zum Parsen eines Bruchs
function parseFraction(value) {
    if (value.includes('/')) {
        const [numerator, denominator] = value.split('/').map(Number);
        return [numerator, denominator];
    }
    return [parseInt(value) || 0, 1]; // Standardmäßig Nenner 1
}

// Bruch formatieren
function formatFraction(value) {
    const [numerator, denominator] = parseFraction(value);
    const reduced = reduceFraction([numerator, denominator]);
    return reduced[1] === 1 ? reduced[0].toString() : `${reduced[0]}/${reduced[1]}`;
}

// Funktion zum Formatieren von Bruchdaten für Wolfram Alpha
function formatForString([numerator, denominator]) {
    return denominator === 1 ? `${numerator}` : `${numerator}/${denominator}`;
}

// Funktion zur Formatierung der Ergebnisse
function formatResult(fraction) {
    const [numerator, denominator] = fraction;
    return denominator === 1 ? numerator.toString() : `${numerator}/${denominator}`;
}
