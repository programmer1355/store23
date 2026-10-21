/* ========================================================
   متجر اونمي — منطق مشترك بين كل الصفحات
   التخزين: localStorage (مناسب لموقع ثابت على GitHub Pages)
   ======================================================== */

const CART_KEY = "onemi_cart_v1";

/* ---------- أدوات عامة ---------- */
function formatPrice(n){
  return n.toLocaleString("ar-SA") + " ر.س";
}
function findProduct(id){
  return ONEMI_PRODUCTS.find(p => p.id === id);
}
function starRow(rating){
  return `<span class="product-rating">
    <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5Z"/></svg>
    ${rating.toFixed(1)}
  </span>`;
}

/* ---------- سلة التسوق ---------- */
function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e){ return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(id, qty = 1){
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (line) line.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  showToast("تمت إضافة المنتج إلى السلة");
}
function removeFromCart(id){
  saveCart(getCart().filter(l => l.id !== id));
}
function setQty(id, qty){
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (!line) return;
  line.qty = Math.max(1, qty);
  saveCart(cart);
}
function cartCount(){
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}
function cartLines(){
  return getCart()
    .map(l => ({ ...l, product: findProduct(l.id) }))
    .filter(l => l.product);
}
function cartSubtotal(){
  return cartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
}
function updateCartBadge(){
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = cartCount();
  });
}

/* ---------- إشعار توست ---------- */
let toastTimer = null;
function showToast(msg){
  let toast = document.querySelector(".toast");
  if (!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- بطاقة منتج (تُستخدم في الرئيسية وصفحة المنتجات) ---------- */
function productCardHTML(p){
  return `
  <article class="product-card">
    <a href="product.html?id=${p.id}" class="product-thumb">
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      ${onemiIcon(p.category)}
    </a>
    <div class="product-body">
      <span class="product-cat">${p.categoryName}</span>
      <h3 class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      ${starRow(p.rating)}
      <div class="price-row">
        <span class="price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
      </div>
      <div class="product-actions">
        <button class="btn btn-dark" onclick="addToCart('${p.id}')">أضف للسلة</button>
        <a class="btn btn-ghost" style="border-color:var(--line); color:var(--ink);" href="product.html?id=${p.id}">التفاصيل</a>
      </div>
    </div>
  </article>`;
}

/* ---------- تهيئة مشتركة عند تحميل أي صفحة ---------- */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  // روابط القائمة النشطة
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(a => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  // البحث السريع من الهيدر -> صفحة المنتجات
  const headerSearch = document.querySelector("[data-header-search]");
  if (headerSearch){
    headerSearch.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = headerSearch.querySelector("input").value.trim();
      location.href = "products.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  }
});
