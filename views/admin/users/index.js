const API_URL = '/api/users';
const form = document.getElementById('user-form');
const table = document.getElementById('users-table');
let editingId = null;

async function fetchUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  renderUsers(users);
}

function renderUsers(users) {
  table.innerHTML = '';
  users.forEach(user => {
    table.innerHTML += `
      <tr>
        <td class="py-2 px-4">${user.name}</td>
        <td class="py-2 px-4">${user.email}</td>
        <td class="py-2 px-4 flex gap-2 justify-center">
          <button onclick="editUser('${user._id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">Editar</button>
          <button onclick="deleteUser('${user._id}')" class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value
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
  fetchUsers();
};

window.editUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  const user = await res.json();
  form.name.value = user.name;
  form.email.value = user.email;
  form.password.value = '';
  editingId = id;
};

window.deleteUser = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchUsers();
};

fetchUsers();
