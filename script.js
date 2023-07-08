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
  const taskText =
    task.text.length > 25 ? task.text.substr(0, 22) + "..." : task.text;
  taskItem.innerHTML = `
    <div class="task-content">
      <input type="checkbox" onchange="toggleTask(${task.id})" ${
    task.completed ? "checked" : ""
  }>
      <span>${taskText}</span>
    </div>
    <div class="task-controls">
      <span class="star-icon" onclick="toggleStar(${task.id})">${
    task.starred ? "★" : "☆"
  }</span>
      <button class="delete-button" onclick="deleteTask(${
        task.id
      })">&#x2190;</button>
    </div>
  `;
  taskList.appendChild(taskItem);
}

// Task abhaken
function toggleTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks();
    displayTasks();
  }
}

// Task markieren
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
