const shopIcon = document.querySelector('#shop-icon');
const cart = document.querySelector('.cart');
const table = document.querySelector('#table-body');
const productBtn = document.querySelectorAll('.product-btn');

productBtn.forEach(btn => {
    btn.addEventListener('click', e => {
console.log(e.target.parentElement.parentElement);
    })
});

shopIcon.addEventListener('click', () => {
    cart.classList.toggle('h-96');
    cart.classList.toggle('p-4');
    cart.classList.toggle('transition-all');
    cart.classList.toggle('ease-in-out');
    cart.classList.toggle('duration-300');
});