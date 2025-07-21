import { products } from './data.js';

function showProducts(category) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  // ✅ Highlight the active button
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.textContent.trim() === category) {
      btn.classList.add("active");
    }
  });

  // ✅ Filter products by category
  const filtered = category === "All"
    ? products
    : products.filter(p => p.category === category);

  // ✅ Show message if no product found
  if (filtered.length === 0) {
    grid.innerHTML = `<p class="text-center text-gray-500 col-span-full">😕 No products found in this category.</p>`;
    return;
  }

  // ✅ Display products
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-[1.02]";

    card.innerHTML = `
      <div class="relative bg-gray-50 rounded-t-xl p-4 flex items-center justify-center h-48">
        <img src="${p.image}" alt="${p.name}" class="max-h-full object-contain" />
      </div>
      <div class="px-4 py-3">
        <h3 class="text-base font-semibold text-gray-800 truncate">${p.name}</h3>
        <p class="text-sm text-gray-600 mt-1">₹${p.price.toLocaleString()}</p>
        <div class="flex justify-between items-center mt-3">
          <a href="product.html?id=${p.id}" class="text-blue-600 text-sm hover:underline">View</a>
          <button onclick="addToCart(${p.id})" class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition">Add</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

window.addToCart = (id) => {
  const item = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
};

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "All";
  showProducts(category);
});
