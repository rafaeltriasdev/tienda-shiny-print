const navbar = document.querySelector('#navbar');

const createNavHome = () => {
    navbar.innerHTML = `
    <div class="max-w-full h-16 max-auto flex items-center px-4 justify-between relative">
        <img src="/img/shiny.png" alt="Logo" class="h-14 rounded-full">
        
        <!-- version mobile -->
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        class="transition ease-in-out w-10 h-10 md:hidden cursor-pointer p-2 hover:bg-pink-900
         rounded-lg">

        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <!-- version desktop -->
        <div class="hidden md:flex flex-row gap-1 justify-end ">
        <a href="/" class="transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg justify-start">Home</a>
          <svg xmlns="http://www.w3.org/2000/svg" id="shop-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" transition ease-in-out w-10 h-10 cursor-pointer hover:bg-pink-900 rounded-lg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        <section class="absolute top-20 r-10 w-100% h-25 bg-slate-300">
  <table>
    <thead>
      <tr>
        <th class="table-title">Imagen</th>
        <th class="table-title">Nombre</th>
        <th class="table-title">Precio</th>
        <th class="table-title">Cantidad</th>
      </tr>
    </thead>
    <tbody id="table-body"></tbody>
    <tr>
      <td>Imagen</td>
      <td>Programcion</td>
      <td>15$</td>
      <td>4</td>
    </tr>
  </table>
  <button id="table-remove">Vaciar Carrito</button>
</section> 


        <a href="/login" class="transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Login</a>
          <a href="/signup" class="transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Sign Up</a>
          
        </div>
        
        <!-- menu mobile -->
        <div class="bg-slate-900/30 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
          <a href="/login" class="transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Login</a>
          <a href="/signup" class="transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Sign Up</a>
          <a href="/" class="transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>

        </div>

    </div>
      `;
};

const createNavSignup = () => {
    navbar.innerHTML = `
    <div class="max-w-full h-16 max-auto flex items-center px-4 justify-between">
        <img src="/img/shiny.png" alt="Logo" class="h-14 rounded-full">
        
        <!-- version mobile -->
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        class="transition ease-in-out w-10 h-10 md:hidden cursor-pointer p-2 hover:bg-pink-900
         rounded-lg">

        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <!-- version desktop -->
        <div class="hidden md:flex flex-row gap-1">
          <a href="/login" class="transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Login</a>
          <a href="/" class="transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>
        
          </div>
        
        <!-- menu mobile -->
        <div class="bg-slate-900/30 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
          <a href="/login" class="transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Login</a>
          <a href="/" class="transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>
        
          </div>

    </div>
      `;
};

const createNavLogin = () => {
    navbar.innerHTML = `
    <div class="max-w-full h-16 max-auto flex items-center px-4 justify-between">
        <img src="/img/shiny.png" alt="Logo" class="h-14 rounded-full">
        
        <!-- version mobile -->
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        class="transition ease-in-out w-10 h-10 md:hidden cursor-pointer p-2 hover:bg-pink-900
         rounded-lg">

        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <!-- version desktop -->
        <div class="hidden md:flex flex-row gap-1">
          <a href="/signup" class="transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Sign Up</a>
          <a href="/" class="transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>
        
          </div>
        
        <!-- menu mobile -->
        <div class="bg-slate-900/30 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
          <a href="/signup" class="transition ease-in-out text-white font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Sign Up</a>
          <a href="/" class="transition ease-in-out text-white font-bold hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>
        
          </div>

    </div>
      `;
};

// verificar en que pagina estoy y crear el navbar correspondiente
if(window.location.pathname === '/') {
    createNavHome();
} else if (window.location.pathname === '/signup/') {
    createNavSignup()
} else if (window.location.pathname === '/login/') {
    createNavLogin();
} 


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

// agregar el evento de click al boton de cerrar sesion
const closeBtnDescktop = navbar.children[0].children[3].children[0];
const closeBtnMobile = navbar.children[0].children[2].children[0];
// verificar si el boton de cerrar sesion existe
closeBtnDescktop.addEventListener('click', async e => {
    try {
        await axios.get('/api/logout');
        window.location.pathname = '/login';
    } catch (error) {
        console.log(error);
    }
})
closeBtnMobile.addEventListener('click', async e => {
    try {
        await axios.get('/api/logout');
        window.location.pathname = '/login';
    } catch (error) {
        console.log(error);
    }
})