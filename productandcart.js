var products = [
  { id: 1, name: "Laptop",  price: 30000, icon: "💻" },
  { id: 2, name: "Mouse",   price: 450,   icon: "🖱️" },
  { id: 3, name: "Printer", price: 7500,  icon: "🖨️" }
];

var cart = [];

renderProducts();

/* ── Render ── */

function renderProducts() {
  var grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    var inCart = isInCart(p.id);
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      '<div class="icon">' + p.icon + '</div>' +
      '<h3>' + p.name + '</h3>' +
      '<p class="price">₱' + p.price.toLocaleString() + '</p>' +
      '<button ' + (inCart ? 'disabled' : 'onclick="addToCart(' + p.id + ')"') + '>' +
      (inCart ? 'In Cart' : 'Add to Cart') + '</button>';
    grid.appendChild(card);
  }
}

/* ── Cart helpers ── */

function isInCart(id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) return true;
  }
  return false;
}

function addToCart(id) {
  var product = products.find(function (p) { return p.id === id; });
  if (!product || isInCart(id)) return;
  cart.push({ id: product.id, name: product.name, price: product.price, icon: product.icon, qty: 1 });
  updateCart();
  renderProducts();
}

function removeFromCart(id) {
  cart = cart.filter(function (item) { return item.id !== id; });
  updateCart();
  renderProducts();
}

function increaseQty(id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) { cart[i].qty++; break; }
  }
  updateCart();
}

function decreaseQty(id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      if (cart[i].qty > 1) { cart[i].qty--; }
      else { removeFromCart(id); return; }
      break;
    }
  }
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
  renderProducts();
}

function checkout() {
  if (cart.length === 0) { alert("Your cart is empty!"); return; }
  alert("Order placed! Thank you 🎉");
  clearCart();
}

/* ── Update cart UI ── */

function updateCart() {
  var body      = document.getElementById("cart-body");
  var footer    = document.getElementById("cart-footer");
  var badge     = document.getElementById("badge");
  var totalItems = 0, totalPrice = 0;

  for (var i = 0; i < cart.length; i++) {
    totalItems += cart[i].qty;
    totalPrice += cart[i].price * cart[i].qty;
  }

  badge.textContent = totalItems;
  body.innerHTML = "";

  if (cart.length === 0) {
    body.innerHTML = '<p class="empty">Your cart is empty.</p>';
    footer.style.display = "none";
    return;
  }

  for (var j = 0; j < cart.length; j++) {
    var item = cart[j];
    var div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML =
      '<div class="cart-item-name">' + item.icon + ' ' + item.name + '</div>' +
      '<div class="item-row">' +
        '<div class="qty-ctrl">' +
          '<button onclick="decreaseQty(' + item.id + ')">−</button>' +
          '<span>' + item.qty + '</span>' +
          '<button onclick="increaseQty(' + item.id + ')">+</button>' +
        '</div>' +
        '<span>₱' + (item.price * item.qty).toLocaleString() + '</span>' +
        '<button class="remove-btn" onclick="removeFromCart(' + item.id + ')">Remove</button>' +
      '</div>';
    body.appendChild(div);
  }

  document.getElementById("total-price").textContent = "₱" + totalPrice.toLocaleString();
  footer.style.display = "block";
}

/* ── Scroll ── */

function scrollToCart() {
  document.getElementById("cart-panel").scrollIntoView({ behavior: "smooth" });
}
