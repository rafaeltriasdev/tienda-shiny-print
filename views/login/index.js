const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-text');

form.addEventListener('submit', async e => {
    e.preventDefault();

    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value
        }
        const res = await axios.post('/api/login', user, { withCredentials: true });
        // Guardar el rol en localStorage
        localStorage.setItem('userRole', res.data.isAdmin ? 'admin' : 'user');
        // (Opcional) guardar el nombre si lo necesitas
        localStorage.setItem('userName', res.data.name || '');
        window.location.pathname = `/tienda/`;
    } catch (error) {
        console.log(error);
        errorText.innerHTML = error.response?.data?.error || 'Error de conexión o credenciales incorrectas.';
    }
});
