class Stopwatch {
    constructor() {
        this._startTime = null;
        this._endTime = null;
        this._running = false;
        this._duration = 0;
        this._statusDot = document.querySelector('.status-dot');
        this._display = document.getElementById('display');
        this._startBtn = document.getElementById('start-btn');
        this._stopBtn = document.getElementById('stop-btn');
        this._resetBtn = document.getElementById('reset-btn');

        this._startBtn.addEventListener('click', () => this.start());
        this._stopBtn.addEventListener('click', () => this.stop());
        this._resetBtn.addEventListener('click', () => this.reset());
    }

    get running() {
        return this._running;
    }

    set running(value) {
        this._running = value;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this._updateStatusDotColor('rgb(196, 77, 77)');
            this._startTime = new Date();
            this._updateDisplay();
        }
    }

    stop() {
        if (this.running) {
            this.running = false;
            this._updateStatusDotColor('#222');
            this._endTime = new Date();
            const seconds = (this._endTime - this._startTime) / 1000;
            this._duration += seconds;
            this._updateDisplay();
        }
    }

    reset() {
        this._startTime = null;
        this._endTime = null;
        this.running = false;
        this._duration = 0;
        this._updateDisplay();
    }

    _updateStatusDotColor(color) {
        this._statusDot.style.backgroundColor = color;
    }

    _updateDisplay() {
        const formattedTime = this._formatTime(this._duration);
        this._display.textContent = formattedTime;
    }

    _formatTime(timeInSeconds) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}

// JavaScript for stopwatch functionality
const display = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const statusDot = document.querySelector('.status-dot');

const sw = new Stopwatch();

startBtn.addEventListener('click', () => {
    sw.start();
});

stopBtn.addEventListener('click', () => {
    sw.stop();
});

resetBtn.addEventListener('click', () => {
    sw.reset();
});

display.addEventListener('click', () => {
    sw.updateDisplay();
});
