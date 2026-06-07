document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('taskInput');
  input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });
  renderTasks();
});

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = t.done ? 'done' : '';

    const span = document.createElement('span');
    span.textContent = t.text;
    span.addEventListener('click', () => toggleDone(i));
    li.appendChild(span);

    const btn = document.createElement('button');
    btn.className = 'del';
    btn.textContent = '🗑';
    btn.title = 'Supprimer';
    btn.addEventListener('click', () => removeTask(i));
    li.appendChild(btn);

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const value = input.value.trim();
  if (!value) return;
  tasks.push({ text: value, done: false });
  input.value = '';
  saveTasks();
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Expose addTask for inline onclick in index.html
window.addTask = addTask;
