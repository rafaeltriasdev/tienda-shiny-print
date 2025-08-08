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
  const formData = new FormData();
  formData.append('nombre', form.nombre.value.trim());
  formData.append('descripcion', form.descripcion.value.trim());
  formData.append('precio', form.precio.value);
  // Solo requerir imagen al crear
  if (editingId) {
    if (form.imagen.files.length > 0) {
      formData.append('imagen', form.imagen.files[0]);
    }
    if (!form.nombre.value.trim() || !form.descripcion.value.trim() || !form.precio.value) {
      alert('Todos los campos son obligatorios');
      return;
    }
  } else {
    if (form.imagen.files.length > 0) {
      formData.append('imagen', form.imagen.files[0]);
    }
    if (!form.nombre.value.trim() || !form.descripcion.value.trim() || !form.precio.value || !form.imagen.files.length) {
      alert('Todos los campos son obligatorios');
      return;
    }
  }
  try {
    let res;
    if (editingId) {
      res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PATCH',
        body: formData
      });
      editingId = null;
    } else {
      res = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });
    }
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || 'No se pudo guardar el producto');
    }
  } catch (err) {
    alert('Error de red al guardar producto');
  }
  form.reset();
  fetchProducts();
};

window.editProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) {
      alert('No se pudo obtener los productos');
      return;
    }
    const products = await res.json();
    const product = products.find(p => p._id === id);
    if (!product) {
      alert('El producto ya no existe.');
      fetchProducts();
      return;
    }
    form.nombre.value = product.nombre;
    form.descripcion.value = product.descripcion;
    form.precio.value = product.precio;
    // No se puede asignar valor a input file por seguridad del navegador
    form.imagen.value = '';
    editingId = id;
  } catch (err) {
    alert('Error de red al editar producto');
  }
};


window.deleteProduct = async (id) => {
  if (confirm('¿Seguro que deseas eliminar este producto?')) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'No se pudo eliminar el producto');
      } else {
        alert(data.message || 'Producto eliminado correctamente');
      }
    } catch (err) {
      alert('Error de red al eliminar producto');
    }
    fetchProducts();
  }
};

// Inicializar
fetchProducts();
