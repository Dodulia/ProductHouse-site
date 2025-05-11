document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    const catSelect = document.getElementById('category-filter');
  
    // Один список для всіх карток
    const cards = document.querySelectorAll('.category-card, .product-card');
  
    function applyFilter() {
      const q   = searchBox.value.trim().toLowerCase();
      const cat = catSelect.value;
  
      cards.forEach(card => {
        const name = (card.dataset.name || card.querySelector('h3').textContent).toLowerCase();
        const thisCat = card.dataset.cat || '';
  
        const matchText = name.includes(q);
        const matchCat  = (cat === '') || (thisCat === cat);
  
        card.style.display = (matchText && matchCat) ? '' : 'none';
      });
    }
  
    searchBox.addEventListener('input',  applyFilter);
    catSelect.addEventListener('change', applyFilter);
  });
  