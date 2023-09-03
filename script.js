class Stopwatch {
    constructor() {
        this._startTime = null;
        this._endTime = null;
        this._running = false;
        this._duration = 0;
        this._statusDot = document.querySelector('.status-dot');
    }

    start() {
        if (this._running) {
            alert('Stopwatch has already started.');
        } else {
            //start the watch
            this._running = true;
            this._updateStatusDotColor('rgb(196, 77, 77)');
            this._startTime = new Date();
        }
    }

    stop() {
        if (this._running) {
            //stop the watch
            this._running = false;
            this._updateStatusDotColor('#222');
            this._endTime = new Date();
            const seconds = (this._endTime - this._startTime) / 1000;
            this._duration += seconds;
        } else {
            alert('Stopwatch is not started.');
        }
    }

    reset() {
        //start the watch   
        this._startTime = null;
        this._endTime = null;
        this._running = false;
        this._duration = 0;
    }
    updateDisplay() {
        //Update Display Data
        display.textContent = `${this._duration} sek`;
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
    sw.updateDisplay();
})

resetBtn.addEventListener('click', () => {
    sw.reset();
    sw.updateDisplay();
})

display.addEventListener('click', () => {
    sw.updateDisplay();
})