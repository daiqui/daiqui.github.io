// Taskliste
let tasks = [];

// DOM-Elemente abrufen
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Tasks laden, wenn die Seite geladen ist
window.addEventListener("DOMContentLoaded", loadTasks);

// Task hinzufügen
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      starred: false,
    };
    tasks.push(task);
    saveTasks();
    displayTask(task);
    taskInput.value = "";
  }
}

// Task anzeigen
function displayTask(task) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item" + (task.completed ? " completed" : "");
  taskItem.innerHTML = `
    <input type="checkbox" onchange="toggleTask(${task.id})" ${
    task.completed ? "checked" : ""
  }>
    <span>${task.text}</span>
    <span class="star-icon" onclick="toggleStar(${task.id})">${
    task.starred ? "★" : "☆"
  }</span>
    <button onclick="deleteTask(${task.id})">Löschen</button>
  `;
  taskList.appendChild(taskItem);
}

// Task abhaken/entabhalten
function toggleTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks();
    displayTasks();
  }
}

// Task als wichtig markieren/entmarkieren
function toggleStar(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].starred = !tasks[taskIndex].starred;
    saveTasks();
    displayTasks();
  }
}

// Task löschen
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  displayTasks();
}

// Tasks speichern
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Tasks laden
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
  }
}

// Tasks anzeigen
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => displayTask(task));
}
