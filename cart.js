class CartItem {
    constructor(id, name, price, quantity = 1, img = '') {
      this.id       = id;           // унікальний код товару
      this.name     = name;         // назва
      this.price    = price;        // ціна за одиницю
      this.quantity = quantity;     // кількість
      this.img      = img;          // мініатюра (url)
    }
  }
  
  class Cart {
    constructor() {
      this.items = JSON.parse(localStorage.getItem('cart')) || [];
      this.updateIcon();            // показати бейдж після перезавантаження
    }
  
    /* --- CRUD --- */
    add(item) {
      const ex = this.items.find(i => i.id === item.id);
      if (ex) ex.quantity += item.quantity;
      else    this.items.push(item);
      this.save();
    }
  
    updateQuantity(id, qty) {
      const it = this.items.find(i => i.id === id);
      if (!it) return;
      it.quantity = qty;
      if (it.quantity <= 0) this.remove(id);
      this.save();
    }
  
    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
      this.save();
    }
  
    clear() {
      this.items = [];
      this.save();
    }
  
    /* --- Підрахунки --- */
    getTotalCount()  { return this.items.reduce((s,i) => s + i.quantity, 0); }
    getSubtotal()    { return this.items.reduce((s,i) => s + i.price * i.quantity, 0); }
    getTax()         { return this.getSubtotal() * 0.10; }        // 10 % ПДВ
    getShipping()    { return this.getSubtotal() > 500 ? 0 : 50 } // безкоштовна від 500 грн
    getGrandTotal()  { return this.getSubtotal() + this.getTax() + this.getShipping(); }
  
    /* --- Збереження + бейдж --- */
    save() {
      localStorage.setItem('cart', JSON.stringify(this.items));
      this.updateIcon();
    }
    updateIcon() {
      const badge = document.getElementById('cart-count');
      if (badge) badge.textContent = this.getTotalCount();
    }
  }
  
  /* ----------  Ініціалізація ---------- */
  const cart = new Cart();
  
  /* ----------  Делегований обробник “Купити” ---------- */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.buy-btn');      // будь-який елемент із класом buy-btn
    if (!btn) return;
  
    const { id, name, price, img = '' } = btn.dataset;
    if (!id) { console.warn('Кнопка Купити без data-id'); return; }
  
    cart.add(new CartItem(id, name || 'Товар', parseFloat(price || 0), 1, img));
    alert(`${name || 'Товар'} додано до кошика!`);
  });
  