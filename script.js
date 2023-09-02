// JavaScript for stopwatch functionality
const display = document.getElementById("display");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const statusDot = document.querySelector(".status-dot");

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

function startTimer() {
    alert("start")
    statusDot.style.backgroundColor = "rgb(196, 77, 77)";
}

function stopTimer() {
    alert("stop")
    statusDot.style.backgroundColor = "#222";
    updateDisplay();
}

function resetTimer() {
    alert("reset")
    display.textContent = "00:00:00"
}

function updateDisplay() {
    alert("display")
    display.textContent = "00:11:12"
}
