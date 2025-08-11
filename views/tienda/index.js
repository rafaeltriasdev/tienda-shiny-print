// El icono del carrito y el contador se insertan dinámicamente
let shopIcon = null;
let cartCount = null;
let cartOverlay = null;
let buyBtn = null;
const cart = document.querySelector('.cart');
const table = document.querySelector('#table-body');
const productBtn = document.querySelectorAll('.product-btn');
const cartEmpty = document.getElementById('cart-empty');
const cartTotal = document.getElementById('cart-total');
const cartTotalSection = document.getElementById('cart-total-section');
let closeCartBtn = null;
// const tableClear = document.querySelector('#table-clear');

// Función para actualizar el contador del carrito
function animateCartCount() {
  if (cartCount) {
    cartCount.classList.remove('scale-125');
    void cartCount.offsetWidth; // trigger reflow
    cartCount.classList.add('scale-125');
    setTimeout(() => cartCount.classList.remove('scale-125'), 200);
  }
}

function updateCartCount() {
  cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = table.children.length;
    animateCartCount();
  }
}

// Agregar productos al carrito
function addProductBtnListeners() {
  const productBtns = document.querySelectorAll('.product-btn');
  productBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const img = e.target.parentElement.parentElement.children[0].innerHTML;
      const name = e.target.parentElement.children[0].innerHTML;
      const price = e.target.parentElement.children[2].innerHTML;
      const exist = [...table.children].find(element => element.children[1].innerHTML === name);
      if (exist) {
        exist.children[3].innerHTML = Number(exist.children[3].innerHTML) + 1;
      } else {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${img}</td>
          <td>${name}</td>
          <td>${price}</td>
          <td>1</td>
          <td>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-btn size-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg> 
          </td>
        `;
        row.children[4].addEventListener('click', e => {
          e.currentTarget.parentElement.remove();
          updateCartUI();
        });
        table.appendChild(row);
      }
      updateCartUI();
    });
  });
}
function updateCartUI() {
  // Mostrar mensaje de vacío
  if (table.children.length === 0) {
    cartEmpty.classList.remove('hidden');
    cartTotalSection.classList.add('hidden');
    if (buyBtn) buyBtn.setAttribute('disabled', 'disabled');
  } else {
    cartEmpty.classList.add('hidden');
    cartTotalSection.classList.remove('hidden');
    if (buyBtn) buyBtn.removeAttribute('disabled');
  }
  // Calcular total
  let total = 0;
  [...table.children].forEach(row => {
    const price = Number(row.children[2].innerText.replace('$', ''));
    const qty = Number(row.children[3].innerText);
    total += price * qty;
  });
  cartTotal.innerText = `$${total}`;
  updateCartCount();
}

// Botón para vaciar carrito
let clearCartBtn = null;
const productsList = document.getElementById('products-list');

// Renderizar productos dinámicamente desde el backend
async function fetchAndRenderProducts() {
  try {
    const res = await fetch('/api/products');
    const products = await res.json();
    productsList.innerHTML = '';
    products.forEach(product => {
      const li = document.createElement('li');
      li.className = 'product-item bg-pink-100 shadow-md rounded-lg p-4 flex flex-col items-center hover:scale-105 hover:shadow-lg transition duration-300';
      li.innerHTML = `
        <div class="product-img">
          <img src="${product.imagen}" alt="${product.nombre}" class="w-40 h-40 object-contain rounded mx-auto mb-2 md:w-full md:h-48"> 
        </div>
        <div class="product-info mt-2 text-lg md:text-xl font-bold text-center">
          <p class="mt-2 text-lg md:text-xl font-bold text-center">${product.nombre}</p>
          <p class="text-gray-600 text-center text-sm md:text-base">${product.descripcion}</p>
          <p class="product-price">$${product.precio}</p>
          <br>
          <button class="product-btn mt-2 bg-pink-800 hover:bg-pink-900 text-white py-2 px-4 rounded">AÑADIR AL CARRITO</button>
        </div>
      `;
      productsList.appendChild(li);
    });
    addProductBtnListeners();
  } catch (err) {
    productsList.innerHTML = '<li class="text-red-600">No se pudieron cargar los productos.</li>';
  }
}

// Esperar a que el DOM esté listo para inicializar icono y eventos
window.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderProducts();
  setTimeout(() => {
    shopIcon = document.getElementById('shop-icon');
    cartCount = document.getElementById('cart-count');
    cartOverlay = document.getElementById('cart-overlay');
    buyBtn = document.getElementById('buy-btn');
    clearCartBtn = document.getElementById('clear-cart-btn');
    // Por defecto, ocultar el carrito y overlay
    cart.classList.add('hidden');
    if (cartOverlay) cartOverlay.classList.add('hidden');
    // Mostrar carrito y overlay
    function openCart() {
      cart.classList.add('h-96', 'p-4', 'transition-all', 'ease-in-out', 'duration-300');
      cart.classList.remove('hidden');
      if (cartOverlay) cartOverlay.classList.remove('hidden');
      updateCartUI();
    }
    // Ocultar carrito y overlay
    function closeCart() {
      cart.classList.remove('h-96', 'p-4', 'transition-all', 'ease-in-out', 'duration-300');
      cart.classList.add('hidden');
      if (cartOverlay) cartOverlay.classList.add('hidden');
    }
    if (shopIcon) {
      shopIcon.addEventListener('click', openCart);
    }
    // Cerrar con overlay
    if (cartOverlay) {
      cartOverlay.addEventListener('click', closeCart);
    }
    // Cerrar con equis
    closeCartBtn = document.getElementById('close-cart');
    if (closeCartBtn) {
      closeCartBtn.onclick = closeCart;
    }
    // Vaciar carrito
    if (clearCartBtn) {
      clearCartBtn.onclick = () => {
        table.innerHTML = '';
        updateCartUI();
      };
    }
    // Comprar (feedback demo)
    if (buyBtn) {
      buyBtn.onclick = () => {
        if (table.children.length > 0) {
          buyBtn.textContent = '¡Gracias por tu compra!';
          buyBtn.setAttribute('disabled', 'disabled');
          setTimeout(() => {
            buyBtn.textContent = 'Comprar';
            table.innerHTML = '';
            updateCartUI();
          }, 1500);
        }
      };
    }
    updateCartUI();
  }, 200);
});

// Eliminar todos los elementos de la tabla (soporte legacy)
if (typeof tableClear !== 'undefined' && tableClear) {
    tableClear.addEventListener('click', () => {
        table.innerHTML = '';
        updateCartUI();
    });
}

// Mostrar/ocultar el botón según el scroll
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollTopBtn.classList.remove('hidden');
    } else {
        scrollTopBtn.classList.add('hidden');
    }
});
// Scroll suave al inicio
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
