// Pruebas unitarias para suma y totalCarrito
function suma(a, b) {
  return a + b;
}

function totalCarrito(carrito) {
  return carrito.reduce((acc, prod) => acc + prod.precio, 0);
}

test('suma 2 + 2 debe ser 4', () => {
  expect(suma(2, 2)).toBe(4);
});

test('suma -1 + 1 debe ser 0', () => {
  expect(suma(-1, 1)).toBe(0);
});

test('totalCarrito suma precios correctamente', () => {
  expect(totalCarrito([{precio: 10}, {precio: 5}])).toBe(15);
});

test('totalCarrito de carrito vacío es 0', () => {
  expect(totalCarrito([])).toBe(0);
});

// Prueba que falla a propósito
test('esto debe fallar', () => {
  expect(suma(2, 2)).toBe(5);
});
