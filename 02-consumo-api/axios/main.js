import axios from 'axios';

// URL base de la API de productos
const BASE_URL = 'http://localhost:8000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API usando axios
async function fetchProducts() {
  try {
    const res = await axios.get(BASE_URL); // Realiza una petición GET
    const products = res.data; // Axios retorna los datos en la propiedad 'data'
    list.innerHTML = '';
    products.forEach(prod => {
      const li = document.createElement('li');
      li.textContent = `${prod.name} - $${prod.price}`;
      // Llama a showDetails al hacer clic en el nombre del producto
      li.onclick = () => showDetails(prod.id);
      // Crea el botón de eliminar y llama a deleteProduct
      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.onclick = e => {
        e.stopPropagation(); // Evita que se dispare el evento de detalles
        deleteProduct(prod.id).then(fetchProducts);
      };
      li.appendChild(btn);
      list.appendChild(li);
    });
  } catch (err) {
    alert('Error al obtener productos');
  }
}

// Crear producto usando axios POST
async function createProduct(name, price, description) {
  try {
    console.log('Datos enviados:', { name, price, description });
    const response = await axios.post(BASE_URL, { name, price, description });
    console.log('Respuesta del servidor:', response.data);
  } catch (err) {
    console.error('Error al crear producto:', err.response?.data || err.message);
    alert('Error al crear producto');
  }
}

// Eliminar producto usando axios DELETE
async function deleteProduct(id) {
  try {
    console.log('ID del producto a eliminar:', id);
    const response = await axios.delete(`${BASE_URL}/${id}`);
    console.log('Respuesta del servidor:', response.data);
  } catch (err) {
    console.error('Error al eliminar producto:', err.response?.data || err.message);
    alert('Error al eliminar producto');
  }
}

// Mostrar detalles de producto usando axios GET /products/:id
async function showDetails(id) {
  try {
    console.log('ID del producto a mostrar:', id);
    const response = await axios.get(`${BASE_URL}/${id}`);
    console.log('Detalles del producto:', response.data);
    alert(`Nombre: ${response.data.name}\nPrecio: $${response.data.price}\nDescripción: ${response.data.description}`);
  } catch (err) {
    console.error('Error al obtener detalles del producto:', err.response?.data || err.message);
    alert('Error al obtener detalles del producto');
  }
}

// Maneja el submit del formulario para crear un producto
form.onsubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  await createProduct(name, price, description);
  form.reset();
  fetchProducts();
};

// Llama a la función para mostrar los productos al cargar la página
fetchProducts();