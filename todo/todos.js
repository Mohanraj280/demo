document.addEventListener('DOMContentLoaded', () => {
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
  

    saveTask(task);
  
  
    displayTask(task);
  
   
    input.value = '';
  }
  
  function displayTask(task) {
    const tasksContainer = document.getElementById('tasks-container');
  
    const taskElement = document.createElement('div');
    taskElement.className = `task ${task.completed ? 'completed' : ''}`;
    taskElement.innerHTML = `
      <span>${task.text}</span>
      <button onclick="toggleTask(${task.id})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
  
    tasksContainer.appendChild(taskElement);
  }
  
  function toggleTask(id) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks(tasks);
    updateUI();
  }
  
  function editTask(id) {
    const newText = prompt('Edit the task:');
    if (newText !== null) {
      const tasks = getTasks();
      const taskIndex = tasks.findIndex(task => task.id === id);
      tasks[taskIndex].text = newText;
      saveTasks(tasks);
      updateUI();
    }
  }
  
  function deleteTask(id) {
    const tasks = getTasks().filter(task => task.id !== id);
    saveTasks(tasks);
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
    tasksContainer.innerHTML = '';
    loadTasks();
  }
  