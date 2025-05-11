// main.js
const cart = JSON.parse(localStorage.getItem('cart') || '[]');

document.addEventListener('click', e => {
  const btn = e.target.closest('.buy-btn');
  if (!btn) return;

  cart.push({ id: btn.dataset.id, name: btn.dataset.name, price: +btn.dataset.price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateBadge();
});

function updateBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = cart.length;
}

// показати число одразу після завантаження
updateBadge();
