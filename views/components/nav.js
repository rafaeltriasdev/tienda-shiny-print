const navbar = document.querySelector('#navbar');


// Función base para crear nav dinámico
function createNav({ links = [], active = '', showCart = false, showLogout = false, showMobile = true, logo = '/img/shiny.png' }) {
  let desktopLinks = links.map(link =>
    link.type === 'button'
      ? `<button id="${link.id || ''}" class="${link.class || ''}">${link.label}</button>`
      : `<a href="${link.href}" class="${link.class || ''}${active === link.activeKey ? ' border-b-2 border-pink-400 font-bold' : ''}">${link.label}</a>`
  ).join('');

  let cartSection = showCart ? `
    <div id="cart-overlay" class="fixed inset-0 bg-black/30 z-40 hidden"></div>
    <section class="cart hidden absolute top-16 right-0 w-96 max-w-full bg-white/90 border border-pink-200 shadow-2xl rounded-2xl flex-col overflow-auto z-50 animate-fade-in" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      <div class="flex items-center justify-between px-6 py-4 border-b border-pink-100">
        <h2 class="text-xl font-extrabold text-pink-900 flex items-center gap-2">
          <svg class="w-6 h-6 text-pink-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.5 19h9a2 2 0 001.85-1.3L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"/></svg>
          Carrito de Compras
        </h2>
        <button id="close-cart" class="text-pink-700 hover:text-pink-900 text-2xl font-bold" aria-label="Cerrar carrito">&times;</button>
      </div>
      <div id="cart-empty" class="text-center text-zinc-500 py-8 text-lg hidden">Tu carrito está vacío.</div>
      <table class="table-fixed text-center border-collapse w-full">
        <thead class="bg-pink-100">
          <tr>
            <th class="py-2">Imagen</th>
            <th class="py-2">Nombre</th>
            <th class="py-2">Precio</th>
            <th class="py-2">Cantidad</th>
            <th class="py-2">Eliminar</th>
          </tr>
        </thead>
        <tbody id="table-body"></tbody>
      </table>
      <div id="cart-total-section" class="flex flex-col gap-2 p-4 border-t border-pink-100">
        <div class="flex justify-between items-center text-lg font-bold text-pink-900">
          <span>Total:</span>
          <span id="cart-total">$0</span>
        </div>
        <div class="flex gap-2 mt-2">
          <button id="buy-btn" class="flex-1 transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg" disabled>Comprar</button>
          <button id="clear-cart-btn" class="flex-1 transition ease-in-out text-pink-800 font-bold border border-pink-800 hover:bg-pink-100 py-2 px-4 rounded-lg">Vaciar Carrito</button>
        </div>
      </div>
    </section>
  ` : '';

  // Icono de carrito con contador
  let cartIcon = showCart ? `
    <button id="shop-icon" class="relative group mx-2" aria-label="Abrir carrito" role="button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9 text-pink-800 hover:text-pink-900 transition">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L7.5 14.25A2.25 2.25 0 009.664 16.5h7.672a2.25 2.25 0 002.164-1.75l1.386-6.25a1.125 1.125 0 00-1.096-1.375H6.272" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="17" cy="20" r="1.5" />
      </svg>
      <span id="cart-count" class="absolute -top-1 -right-1 bg-pink-700 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg transition-transform">0</span>
    </button>
  ` : '';
  let desktopNav = `<div class="hidden md:flex flex-row gap-1 justify-end items-center">${desktopLinks}${cartIcon}${cartSection}</div>`;

  // Menú móvil
  let mobileLinks = links.filter(l => l.type !== 'button').map(link =>
    `<a href="${link.href}" class="text-white text-2xl font-bold hover:text-pink-950 transition">${link.label}</a>`
  ).join('');
  let mobileNav = showMobile ? `
    <div class="bg-pink-900/80 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-8 hidden">
      ${mobileLinks}
    </div>
  ` : '';

  // Detectar si es admin para cambiar color
  const isAdmin = window.location.pathname.startsWith('/admin');
  navbar.innerHTML = `
    <div class="max-w-full h-16 max-auto flex items-center px-4 justify-between relative ${isAdmin ? 'bg-pink-950' : ''}">
      <a href="${isAdmin ? '/admin' : '/'}"><img src="${logo}" alt="Logo" class="h-14 rounded-full"></a>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="white" 
        class="transition ease-in-out w-10 h-10 md:hidden cursor-pointer p-2 hover:bg-pink-900 rounded-lg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      ${desktopNav}
      ${mobileNav}
    </div>
  `;
}

// --- Eliminado bloque antiguo e incompleto tras refactorización ---
// verificar en que pagina estoy y crear el navbar correspondiente
// Configuración de navs según la ruta

// Obtener el rol del usuario desde localStorage
const userRole = localStorage.getItem('userRole');
const path = window.location.pathname;

// Definir el botón de logout si el usuario está autenticado
const logoutBtn = { type: 'button', id: 'logout-btn', label: 'Logout', class: 'transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg' };

if (path === '/') {
  createNav({
    links: [
      { href: '/tienda', label: 'Tienda', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' },
      ...(userRole === 'admin' ? [{ href: '/admin', label: 'Admin', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' }] : []),
      ...(userRole ? [logoutBtn] : [
        { href: '/login', label: 'Login', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' },
        { href: '/signup', label: 'Sign Up', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' }
      ])
    ],
    showCart: true,
    showMobile: true
  });
} else if (path === '/signup/') {
  createNav({
    links: [
      { href: '/', label: 'Home', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' },
      { href: '/tienda', label: 'Tienda', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' },
      ...(userRole === 'admin' ? [{ href: '/admin', label: 'Admin', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' }] : []),
      ...(userRole ? [logoutBtn] : [
        { href: '/login', label: 'Login', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' }
      ])
    ],
    showCart: false,
    showMobile: true
  });
} else if (path === '/login/') {
  createNav({
    links: [
      { href: '/', label: 'Home', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' },
      { href: '/tienda', label: 'Tienda', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' },
      ...(userRole === 'admin' ? [{ href: '/admin', label: 'Admin', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' }] : []),
      ...(userRole ? [logoutBtn] : [
        { href: '/signup', label: 'Sign Up', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' }
      ])
    ],
    showCart: false,
    showMobile: true
  });
} else if (path === '/tienda/') {
  createNav({
    links: [
      { href: '/', label: 'Home', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' },
      { href: '/tienda', label: 'Tienda', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' },
      ...(userRole === 'admin' ? [{ href: '/admin', label: 'Admin', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' }] : []),
      ...(userRole ? [logoutBtn] : [
        { href: '/login', label: 'Login', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' },
        { href: '/signup', label: 'Sign Up', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' }
      ])
    ],
    showCart: true,
    showMobile: true
  });
} else if (path.startsWith('/admin')) {
  let active = '';
  if (path.startsWith('/admin/users')) active = 'users';
  else if (path.startsWith('/admin/products')) active = 'products';
  else if (path.startsWith('/admin/orders')) active = 'orders';
  createNav({
    links: [
      { href: '/admin', label: 'Dashboard', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: 'dashboard' },
      { href: '/admin/users', label: 'Usuarios', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: 'users' },
      { href: '/admin/products', label: 'Productos', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: 'products' },
      { href: '/admin/orders', label: 'Órdenes', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: 'orders' },
      { href: '/tienda', label: 'Tienda', class: 'transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg', activeKey: '' },
      { type: 'button', id: 'logout-btn', label: 'Logout', class: 'transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg' }
    ],
    active: path === '/admin/' || path === '/admin' ? 'dashboard' : active,
    showCart: false,
    showMobile: true
  });
}


// Lógica para menú mobile y logout (todas las vistas)
if (
    window.location.pathname === '/' ||
    window.location.pathname === '/signup/' ||
    window.location.pathname === '/login/' ||
    window.location.pathname === '/tienda/'
) {
    const navBtn = navbar.children[0].children[1];
    navBtn.addEventListener('click', e => {
      const menuMobile = navbar.children[0].children[3];
      if (!navBtn.classList.contains('active')) {
        navBtn.classList.add('active');
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />'
        menuMobile.classList.remove('hidden');
        menuMobile.classList.add('flex');
      } else {
        navBtn.classList.remove('active');
        navBtn.innerHTML = '<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />'
        menuMobile.classList.add('hidden');
        menuMobile.classList.remove('flex');
      }
    });

    // Evento logout para el botón logout-btn (todas las vistas)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async e => {
            try {
                await axios.get('/api/logout');
                localStorage.removeItem('userRole');
                localStorage.removeItem('userName');
                window.location.pathname = '/login';
            } catch (error) {
                console.log(error);
            }
        });
    }
}

// Evento logout para cualquier vista (incluido admin)
const logoutBtnElement = document.getElementById('logout-btn');
if (logoutBtnElement) {
    logoutBtnElement.addEventListener('click', async e => {
        try {
            await axios.get('/api/logout');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            window.location.pathname = '/login';
        } catch (error) {
            console.log(error);
        }
    });
}