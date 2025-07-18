const navbar = document.querySelector('#navbar');

const createNavHome = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 max-auto flex items-center px-4 justify-between">
        <img src="/img/shiny.png" alt="Logo" class="h-14">
        
        <!-- version mobile -->
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        class="w-10 h-10 md:hidden cursor-pointer p-2 hover:bg-pink-900
         rounded-lg">

        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <!-- version desktop -->
        <div class="hidden md:flex flex-row gap-1">
          <a href="/login" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Login</a>
          <a href="/signup" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Sign Up</a>
          <a href="/" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>
        
          </div>
        
        <!-- menu mobile -->
        <div class="bg-slate-900/30 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
          <a href="/login" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Login</a>
          <a href="/signup" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Sign Up</a>
          <a href="/" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>

        </div>

    </div>
      `;
};

const createNavSignup = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 max-auto flex items-center px-4 justify-between">
        <img src="/img/shiny.png" alt="Logo" class="h-14">
        
        <!-- version mobile -->
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        class="w-10 h-10 md:hidden cursor-pointer p-2 hover:bg-pink-900
         rounded-lg">

        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <!-- version desktop -->
        <div class="hidden md:flex flex-row gap-1">
          <a href="/login" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Login</a>
          <a href="/signup" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Sign Up</a>
          <a href="/" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>
        
          </div>
        
        <!-- menu mobile -->
        <div class="bg-slate-900/30 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
          <a href="/login" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Login</a>
          <a href="/signup" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Sign Up</a>
          <a href="/" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>
        
          </div>

    </div>
      `;
};

const createNavLogin = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 max-auto flex items-center px-4 justify-between">
        <img src="/img/shiny.png" alt="Logo" class="h-14">
        
        <!-- version mobile -->
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        class="w-10 h-10 md:hidden cursor-pointer p-2 hover:bg-pink-900
         rounded-lg">

        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <!-- version desktop -->
        <div class="hidden md:flex flex-row gap-1">
          <a href="/login" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Login</a>
          <a href="/signup" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Sign Up</a>
          <a href="/" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>
        
          </div>
        
        <!-- menu mobile -->
        <div class="bg-slate-900/30 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
          <a href="/login" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Login</a>
          <a href="/signup" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Sign Up</a>
          <a href="/" class="transition ease-in-out text-black font-bold bg-pink-800 hover:bg-pink-900 py-2 px-4 rounded-lg">Home</a>
        
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