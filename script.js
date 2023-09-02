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
}

function resetTimer() {
    alert("reset")
    updateDisplay();
}

function updateDisplay() {
    alert("display")
}
