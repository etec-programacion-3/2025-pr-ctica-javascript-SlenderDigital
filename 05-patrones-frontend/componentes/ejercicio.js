// Componente Tarjeta: genera un elemento visual para mostrar información
export function Tarjeta({ titulo, contenido }) {
  const div = document.createElement('div');
  div.className = 'tarjeta';
  div.innerHTML = `<h2>${titulo}</h2><p>${contenido}</p>`;
  return div;
}

// Componente Formulario: genera un formulario reutilizable
export function Formulario({ onSubmit }) {
  const form = document.createElement('form');
  // Estructura del formulario con un input y un botón
  form.innerHTML = `
    <input type="text" name="dato" placeholder="Dato" required />
    <button type="submit">Enviar</button>
  `;
  // Maneja el evento submit y llama al callback con el dato ingresado
  form.onsubmit = e => {
    e.preventDefault();
    const dato = form.dato.value;
    onSubmit(dato);
    form.reset();
  };
  return form;
}

// Montaje de componentes en la página
const app = document.getElementById('app');

// Función mostrarTarjeta que recibe un dato y agrega una tarjeta al DOM
function mostrarTarjeta(dato) {
  const tarjeta = Tarjeta({ titulo: 'Dato enviado', contenido: dato });
  app.appendChild(tarjeta);
}

// Monta el formulario en la página y le pasa la función mostrarTarjeta como callback
app.appendChild(Formulario({ onSubmit: mostrarTarjeta }));