// Importa las funciones del módulo de tareas
import { getTasks, addTask, removeTask } from './tareas.js';

// Referencias a los elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const filterSelect = document.createElement('select'); // Dropdown for filtering tasks
filterSelect.innerHTML = `
  <option value="all">Todas</option>
  <option value="completed">Completadas</option>
  <option value="pending">Pendientes</option>
`;
document.body.insertBefore(filterSelect, list);

// Estado de las tareas (con estado de completadas/pendientes)
let tasks = getTasks().map(task => ({ text: task, completed: false }));

// Renderiza la lista de tareas en el DOM
function renderTasks(filter = 'all') {
  list.innerHTML = '';
  tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .forEach((task, idx) => {
      const li = document.createElement('li');
      li.textContent = task.text;

      // Botón para editar la tarea
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.onclick = () => {
        const newTask = prompt('Edita la tarea:', task.text);
        if (newTask) {
          tasks[idx].text = newTask;
          renderTasks(filterSelect.value);
        }
      };
      li.appendChild(editBtn);

      // Checkbox para marcar como completada/pendiente
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.onchange = () => {
        tasks[idx].completed = checkbox.checked;
        renderTasks(filterSelect.value);
      };
      li.appendChild(checkbox);

      // Botón para eliminar la tarea
      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.onclick = () => {
        tasks.splice(idx, 1);
        renderTasks(filterSelect.value);
      };
      li.appendChild(btn);

      list.appendChild(li);
    });
}

// Maneja el evento submit del formulario para agregar una tarea
form.onsubmit = e => {
  e.preventDefault();
  tasks.push({ text: input.value, completed: false });
  input.value = '';
  renderTasks(filterSelect.value);
};

// Maneja el cambio de filtro
filterSelect.onchange = () => {
  renderTasks(filterSelect.value);
};

// Render inicial de las tareas
renderTasks();