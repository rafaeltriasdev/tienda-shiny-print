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
        class="w-10 h-10 md:hidden cursor-pointer p-2 hover:bg-pink-300 rounded-lg">

        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <!-- version desktop -->
        <div class="hidden md:flex flex-row gap-1">
          <a href="/login" class="transition ease-in-out text-black font-bold bg-pink-300 hover:bg-pink-400 py-2 px-4 rounded-lg">Login</a>
          <a href="/signup" class="transition ease-in-out text-black font-bold bg-pink-300 hover:bg-pink-400 py-2 px-4 rounded-lg">Sign Up</a>
        </div>
    </div>
      `;
};

if (window.location.pathname === '/') {
    createNavHome();
}