const shopIcon = document.querySelector('#shop-icon');
const cart = document.querySelector('.cart');
const table = document.querySelector('#table-body');
const productBtn = document.querySelectorAll('.product-btn');
// const tableClear = document.querySelector('#table-clear');

// Agregar productos al carrito
// Se agrega un evento a cada botón de producto
// Al hacer clic, se obtiene la información del producto y se agrega a la tabla del carrito
// Si el producto ya existe en la tabla, se incrementa su cantidad
productBtn.forEach(btn => {
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
        
        // Agregar evento para eliminar el producto de la tabla
        // Al hacer clic en el icono de eliminar, se elimina la fila correspondiente
        row.children[4].addEventListener('click', e => {
            e.currentTarget.parentElement.remove();
        });
        
        table.appendChild(row);
    }   
    });
});

const tableClear = document.querySelector('#table-clear');
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
      // Evento para añadir al carrito
      li.querySelector('.product-btn').addEventListener('click', e => {
        const img = `<img src='${product.imagen}' class='w-16 h-16 object-contain mx-auto'>`;
        const name = product.nombre;
        const price = `$${product.precio}`;
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
          });
          table.appendChild(row);
        }
      });
      productsList.appendChild(li);
    });
  } catch (err) {
    productsList.innerHTML = '<li class="text-red-600">No se pudieron cargar los productos.</li>';
  }
}

fetchAndRenderProducts();

// Mostrar/ocultar el carrito al hacer clic en el icono de la tienda
shopIcon.addEventListener('click', () => {
    cart.classList.toggle('h-96');
    cart.classList.toggle('p-4');
    cart.classList.toggle('transition-all');
    cart.classList.toggle('ease-in-out');
    cart.classList.toggle('duration-300');
});

// Eliminar todos los elementos de la tabla
tableClear.addEventListener('click', () => {
    table.innerHTML = '';
});

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