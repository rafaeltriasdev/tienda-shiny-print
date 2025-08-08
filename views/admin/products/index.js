// CRUD de productos para admin/products
const API_URL = '/api/products';
const form = document.getElementById('product-form');
const table = document.getElementById('products-table');
let editingId = null;

async function fetchProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();
  renderProducts(products);
}

function renderProducts(products) {
  table.innerHTML = '';
  products.forEach(product => {
    table.innerHTML += `
      <tr>
        <td class="py-2 px-4">${product.nombre}</td>
        <td class="py-2 px-4">${product.descripcion}</td>
        <td class="py-2 px-4">$${product.precio}</td>
        <td class="py-2 px-4"><img src="${product.imagen}" alt="img" class="w-16 h-16 object-contain mx-auto"></td>
        <td class="py-2 px-4 flex gap-2 justify-center">
          <button onclick="editProduct('${product._id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">Editar</button>
          <button onclick="deleteProduct('${product._id}')" class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const data = {
    nombre: form.nombre.value,
    descripcion: form.descripcion.value,
    precio: form.precio.value,
    imagen: form.imagen.value
  };
  if (editingId) {
    await fetch(`${API_URL}/${editingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    editingId = null;
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  form.reset();
  fetchProducts();
};

window.editProduct = async (id) => {
  const res = await fetch(`${API_URL}`);
  const products = await res.json();
  const product = products.find(p => p._id === id);
  form.nombre.value = product.nombre;
  form.descripcion.value = product.descripcion;
  form.precio.value = product.precio;
  form.imagen.value = product.imagen;
  editingId = id;
};

window.deleteProduct = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchProducts();
};

// Inicializar
fetchProducts();

window.deleteProduct = async (id) => {
  if (confirm('¿Seguro que deseas eliminar este producto?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchProducts();
  }
};

fetchProducts();
