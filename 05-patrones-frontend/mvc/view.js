// Vista: Se encarga de la presentación y la interacción con el usuario
export class TaskView {
  constructor() {
    // Referencias a los elementos del DOM
    this.list = document.getElementById('task-list');
    this.form = document.getElementById('task-form');
    this.input = document.getElementById('task-input');
  }

  // Renderiza la lista de tareas en el DOM
  render(tasks) {
    this.list.innerHTML = '';
    tasks.forEach((task, idx) => {
      const li = document.createElement('li');
      
      // Crear span para el texto de la tarea
      const taskText = document.createElement('span');
      taskText.textContent = task;
      taskText.className = 'task-text';
      li.appendChild(taskText);
      
      // Crear contenedor para los botones
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'button-container';
      
      // Botón para editar la tarea
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.className = 'edit';
      editBtn.dataset.idx = idx;
      buttonContainer.appendChild(editBtn);
      
      // Botón para eliminar la tarea
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Eliminar';
      removeBtn.className = 'remove';
      removeBtn.dataset.idx = idx;
      buttonContainer.appendChild(removeBtn);
      
      li.appendChild(buttonContainer);
      this.list.appendChild(li);
    });
  }

  // Asocia el evento de agregar tarea al formulario
  bindAddTask(handler) {
    this.form.onsubmit = e => {
      e.preventDefault();
      if (this.input.value.trim()) {
        handler(this.input.value.trim()); // Llama al controlador con el valor ingresado
        this.input.value = '';
      }
    };
  }

  // Asocia el evento de eliminar tarea a la lista
  bindRemoveTask(handler) {
    this.list.addEventListener('click', e => {
      if (e.target.classList.contains('remove')) {
        const idx = Number(e.target.dataset.idx);
        handler(idx); // Llama al controlador con el índice
      }
    });
  }

  // Asocia el evento de editar tarea a la lista
  bindEditTask(handler) {
    this.list.addEventListener('click', e => {
      if (e.target.classList.contains('edit')) {
        const idx = Number(e.target.dataset.idx);
        const taskElement = e.target.closest('li').querySelector('.task-text');
        const currentTask = taskElement.textContent;
        const newTask = prompt('Editar tarea:', currentTask);
        
        if (newTask !== null && newTask.trim() !== '' && newTask.trim() !== currentTask) {
          handler(idx, newTask.trim());
        }
      }
    });
  }
}