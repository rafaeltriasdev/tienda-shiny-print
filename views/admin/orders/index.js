const API_URL = '/api/orders';
const table = document.getElementById('orders-table');

async function fetchOrders() {
  const res = await fetch(API_URL);
  const orders = await res.json();
  renderOrders(orders);
}

function renderOrders(orders) {
  table.innerHTML = '';
  orders.forEach(order => {
    table.innerHTML += `
      <tr>
        <td class="py-2 px-4">${order._id}</td>
        <td class="py-2 px-4">${order.user?.name || 'Sin usuario'}</td>
        <td class="py-2 px-4">${order.products.map(p => p.name).join(', ')}</td>
        <td class="py-2 px-4">$${order.total}</td>
        <td class="py-2 px-4">${order.status}</td>
        <td class="py-2 px-4 flex gap-2 justify-center">
          <button onclick="editOrder('${order._id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">Editar</button>
          <button onclick="deleteOrder('${order._id}')" class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

window.editOrder = async (id) => {
  // Implementar edición de pedido si es necesario
  alert('Funcionalidad de edición de pedido próximamente.');
};

window.deleteOrder = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchOrders();
};

fetchOrders();
