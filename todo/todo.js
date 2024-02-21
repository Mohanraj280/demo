document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from local storage
    loadTasks();
  });
  
  function addTask() {
    const input = document.getElementById('new-task');
    const taskText = input.value.trim();
  
    if (taskText === '') return;
  
    const task = {
      id: new Date().getTime(),
      text: taskText,
      completed: false,
    };
  
    // Save the task to local storage
    saveTask(task);
  
    // Add the task to the UI
    displayTask(task);
  
    // Clear the input field
    input.value = '';
  }
  
  function displayTask(task) {
    const tasksContainer = document.getElementById('tasks-container');
  
    const taskElement = document.createElement('div');
    taskElement.className = `task ${task.completed ? 'completed' : ''}`;
    taskElement.innerHTML = `
      <span>${task.text}</span>
      <button onclick="toggleTask(${task.id})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
  
    tasksContainer.appendChild(taskElement);
  }
  
  function toggleTask(id) {
    // Toggle the completed status of a task
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
  
    // Save the updated tasks to local storage
    saveTasks(tasks);
  
    // Update the UI
    updateUI();
  }
  
  function deleteTask(id) {
    // Delete a task
    const tasks = getTasks().filter(task => task.id !== id);
  
    // Save the updated tasks to local storage
    saveTasks(tasks);
  
    // Update the UI
    updateUI();
  }
  
  function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
  }
  
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => displayTask(task));
  }
  
  function updateUI() {
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = ''; // Clear the existing tasks
  
    // Load and display the updated tasks
    loadTasks();
  }
  