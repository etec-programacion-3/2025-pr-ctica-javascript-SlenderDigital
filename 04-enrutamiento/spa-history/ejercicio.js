const app = document.getElementById('app');

// Definición de rutas y sus vistas asociadas (solo básicas)
const routes = {
  '/': () => '<h1>Inicio</h1><p>Bienvenido a la SPA.</p>',
  '/productos': () => '<h1>Productos</h1><p>Lista de productos aquí.</p>',
  '/contacto': () => '<h1>Contacto</h1><p>Formulario de contacto aquí.</p>',
  '/producto/:id': id => `<h1>Producto ${id}</h1><p>Detalles del producto ${id} aquí.</p>`
};

function matchRoute(path) {
  if (routes[path]) return { view: routes[path], params: [] };
  const productoMatch = path.match(/^\/producto\/(\d+)$/);
  if (productoMatch) {
    return { view: routes['/producto/:id'], params: [productoMatch[1]] };
  }
  return null;
}

const render = route => {
  const match = matchRoute(route);
  if (match) {
    app.innerHTML = match.view(...match.params);
  } else {
    app.innerHTML = '<h1>404</h1><p>Página no encontrada.</p>';
  }
};

// Cambia la ruta usando history.pushState y renderiza la nueva vista
const navigate = route => {
  window.history.pushState({}, '', route);
  render(route);
};

// Maneja los clics en la navegación para cambiar de vista sin recargar
// Usa delegación de eventos en el nav
// Actualiza la URL y la vista

document.querySelector('nav').addEventListener('click', e => {
  if (e.target.matches('button[data-route]')) {
    navigate(e.target.dataset.route);
  }
});

const originalProductos = routes['/productos'];
routes['/productos'] = () => `
  <h1>Productos</h1>
  <ul>
    <li><a href="/producto/1" data-link>Producto 1</a></li>
    <li><a href="/producto/2" data-link>Producto 2</a></li>
    <li><a href="/producto/3" data-link>Producto 3</a></li>
  </ul>
`;

document.body.addEventListener('click', e => {
  if (e.target.matches('a[data-link]')) {
    e.preventDefault();
    navigate(e.target.getAttribute('href'));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  render(window.location.pathname);
});
window.addEventListener('popstate', () => {
  render(window.location.pathname);
});

render(window.location.pathname);