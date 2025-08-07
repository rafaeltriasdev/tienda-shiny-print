// CRUD de productos
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
        <td class="py-2 px-4">${product.name}</td>
        <td class="py-2 px-4">${product.description}</td>
        <td class="py-2 px-4">$${product.price}</td>
        <td class="py-2 px-4"><img src="${product.image}" alt="img" class="w-16 h-16 object-contain mx-auto"></td>
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
    name: form.name.value,
    description: form.description.value,
    price: form.price.value,
    image: form.image.value
  };
  if (editingId) {
    await fetch(`${API_URL}/${editingId}`, {
      method: 'PUT',
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
  const res = await fetch(`${API_URL}/${id}`);
  const product = await res.json();
  form.name.value = product.name;
  form.description.value = product.description;
  form.price.value = product.price;
  form.image.value = product.image;
  editingId = id;
};

window.deleteProduct = async (id) => {
  if (confirm('¿Seguro que deseas eliminar este producto?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchProducts();
  }
};

fetchProducts();
