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
    // Asegura que el id siempre sea user._id (Mongo) o user.id (por compatibilidad)
    const id = user._id || user.id;
    table.innerHTML += `
      <tr>
        <td class="py-2 px-4">${user.name}</td>
        <td class="py-2 px-4">${user.email}</td>
        <td class="py-2 px-4 text-center">
          <select onchange="changeRole('${id}', this.value)" class="border rounded p-1">
            <option value="false" ${user.isAdmin ? '' : 'selected'}>Usuario</option>
            <option value="true" ${user.isAdmin ? 'selected' : ''}>Admin</option>
          </select>
        </td>
        <td class="py-2 px-4 text-center">
          <span class="${user.verified ? 'text-green-600' : 'text-red-600'} font-bold">${user.verified ? 'Sí' : 'No'}</span>
          ${!user.verified ? `<button onclick=\"verifyUser('${id}')\" class=\"ml-2 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded\">Verificar</button>` : ''}
        </td>
        <td class="py-2 px-4 flex gap-2 justify-center">
          <button onclick="editUser('${id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">Editar</button>
          <button onclick="deleteUser('${id}')" class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">Eliminar</button>
        </td>
      </tr>
    `;
  });
}
// Cambiar rol de usuario
window.changeRole = async (id, value) => {
  await fetch(`${API_URL}/${id}/role`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isAdmin: value === 'true' })
  });
  fetchUsers();
};

// Verificar usuario manualmente
window.verifyUser = async (id) => {
  await fetch(`${API_URL}/${id}/verify`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ verified: true })
  });
  fetchUsers();
};

form.onsubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value
  };
  try {
    if (editingId) {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'No se pudo editar el usuario');
      }
      editingId = null;
    } else {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'No se pudo crear el usuario');
      }
    }
  } catch (err) {
    alert('Error de red al guardar usuario');
  }
  form.reset();
  fetchUsers();
};

window.editUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (res.status === 404) {
    alert('El usuario ya no existe.');
    fetchUsers();
    return;
  }
  const user = await res.json();
  form.name.value = user.name;
  form.email.value = user.email;
  form.password.value = '';
  editingId = id;
};

window.deleteUser = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.status === 404) {
      alert('El usuario ya no existe.');
    } else if (res.ok) {
      alert(data.message || 'Usuario eliminado correctamente');
    } else {
      alert(data.error || 'No se pudo eliminar el usuario');
    }
  } catch (err) {
    alert('Error de red al eliminar usuario');
  }
  fetchUsers();
};

fetchUsers();
