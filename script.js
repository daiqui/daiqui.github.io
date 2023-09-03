class Stopwatch {
    constructor() {
        this._startTime = null;
        this._endTime = null;
        this._running = false;
        this._duration = 0;
        this._statusDot = document.querySelector('.status-dot');
    }

    start() {
        //start the watch
        this._running = true;
        this._updateStatusDotColor('rgb(196, 77, 77)');
    }

    stop() {
        //stop the watch
        this._running = false;
        this._updateStatusDotColor('#222');
        this.updateDisplay();
    }

    reset() {
        //start the watch
        display.textContent = '00:00:00'
    }
    updateDisplay() {
        //Update Display Data
        alert('display')
        display.textContent = '00:11:12'
    }

    _updateStatusDotColor(color) {
        // Update the status dot's color
        this._statusDot.style.backgroundColor = color;
    }
}

// JavaScript for stopwatch functionality
const display = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

const sw = new Stopwatch();

startBtn.addEventListener('click', () => {
    sw.start();
})

stopBtn.addEventListener('click', () => {
    sw.stop();
})

resetBtn.addEventListener('click', () => {
    sw.reset();
})

display.addEventListener('click', () => {
    sw.updateDisplay();
})