// Función para calcular el total de un carrito
function totalCarrito(carrito) {
  return carrito.reduce((acc, prod) => acc + prod.precio, 0);
}

// Pruebas para totalCarrito
console.assert(totalCarrito([{precio: 10}, {precio: 5}]) === 15, 'Total debe ser 15');
console.assert(totalCarrito([]) === 0, 'Total de carrito vacío debe ser 0');
console.assert(totalCarrito([{precio: 2}, {precio: 3}, {precio: 5}]) === 10, 'Total debe ser 10');

// Prueba que falla a propósito
// console.assert(totalCarrito([{precio: 1}]) === 2, 'Esto debe fallar');
