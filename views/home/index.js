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
  // No hay productos dinámicos en home, así que solo inicializamos listeners si existen
  addProductBtnListeners();
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
      cart.classList.add('h-96', 'p-4', 'transition-all', 'ease-in-out', 'duration-500', 'scale-95', 'opacity-0');
      cart.classList.remove('hidden');
      setTimeout(() => {
        cart.classList.remove('scale-95', 'opacity-0');
        cart.classList.add('scale-100', 'opacity-100');
      }, 10);
      if (cartOverlay) {
        cartOverlay.classList.remove('hidden');
        cartOverlay.classList.add('transition-all', 'duration-500', 'opacity-100');
      }
      updateCartUI();
    }
    // Ocultar carrito y overlay
    function closeCart() {
      cart.classList.add('scale-95', 'opacity-0');
      cart.classList.remove('scale-100', 'opacity-100');
      setTimeout(() => {
        cart.classList.remove('h-96', 'p-4', 'transition-all', 'ease-in-out', 'duration-500', 'scale-95', 'opacity-0', 'scale-100', 'opacity-100');
        cart.classList.add('hidden');
      }, 400);
      if (cartOverlay) {
        cartOverlay.classList.add('opacity-0');
        setTimeout(() => {
          cartOverlay.classList.add('hidden');
          cartOverlay.classList.remove('transition-all', 'duration-500', 'opacity-100', 'opacity-0');
        }, 400);
      }
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

