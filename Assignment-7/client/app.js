// client/app.js
// Frontend JavaScript - API calls for products, auth, and cart

const API_BASE = '/api';

// ==================== STATE ====================
let products = [];
let cart = [];
let wishlist = [];
let currentFilter = '';
let authToken = localStorage.getItem('token');
let currentUser = JSON.parse(localStorage.getItem('user'));

// ==================== DOM ELEMENTS ====================
const productsContainer = document.getElementById("productsContainer");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categorySelect = document.getElementById("categorySelect");
const categoryFilters = document.querySelectorAll(".category-filter");

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
  updateAuthUI();
  if (authToken) {
    await loadCart();
  }
});

// ==================== API FUNCTIONS ====================

// Fetch products from API
async function loadProducts() {
  try {
    const category = categorySelect.value;
    const url = category ? `${API_BASE}/products?category=${category}` : `${API_BASE}/products`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.success) {
      products = data.products;
      renderProducts(products);
    } else {
      showNotification('Failed to load products', 'error');
    }
  } catch (error) {
    console.error('Error loading products:', error);
    // Fallback: try to seed products first time
    await seedProducts();
  }
}

// Seed products (first time setup)
async function seedProducts() {
  try {
    const response = await fetch(`${API_BASE}/products/seed`);
    const data = await response.json();
    if (data.success) {
      await loadProducts();
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

// Login user
async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(currentUser));
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Network error' };
  }
}

// Register user
async function registerUser(username, email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(currentUser));
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: 'Network error' };
  }
}

// Load cart from API
async function loadCart() {
  if (!authToken) return;
  
  try {
    const response = await fetch(`${API_BASE}/cart`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    
    const data = await response.json();
    if (data.success) {
      cart = data.cart.items.map(item => ({
        ...item.product,
        quantity: item.quantity
      }));
      updateCartCount();
      updateCartModal();
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
}

// Add to cart API
async function addToCartAPI(productId) {
  if (!authToken) {
    showNotification('Please login to add items to cart', 'error');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    
    const data = await response.json();
    
    if (data.success) {
      cart = data.cart.items.map(item => ({
        ...item.product,
        quantity: item.quantity
      }));
      updateCartCount();
      updateCartModal();
      showNotification('Added to cart!');
    } else {
      showNotification(data.message, 'error');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    showNotification('Failed to add to cart', 'error');
  }
}

// Remove from cart API
async function removeFromCartAPI(productId) {
  try {
    const response = await fetch(`${API_BASE}/cart/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    
    const data = await response.json();
    
    if (data.success) {
      cart = data.cart.items.map(item => ({
        ...item.product,
        quantity: item.quantity
      }));
      updateCartCount();
      updateCartModal();
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
}

// Update quantity API
async function updateQuantityAPI(productId, change) {
  const item = cart.find(p => p._id === productId);
  if (!item) return;
  
  const newQuantity = item.quantity + change;
  if (newQuantity < 1) {
    await removeFromCartAPI(productId);
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/cart/${productId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ quantity: newQuantity })
    });
    
    const data = await response.json();
    
    if (data.success) {
      cart = data.cart.items.map(item => ({
        ...item.product,
        quantity: item.quantity
      }));
      updateCartModal();
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
}

// ==================== UI FUNCTIONS ====================

function renderProducts(productsToRender) {
  productsContainer.innerHTML = "";

  if (productsToRender.length === 0) {
    productsContainer.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found</p>';
    return;
  }

  productsToRender.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const rating = "★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating));
    const isInWishlist = wishlist.some((item) => item._id === product._id);

    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">${rating} (${product.rating})</div>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                </div>
                <div class="product-buttons">
                    <button class="btn btn-add-cart" onclick="addToCart('${product._id}')">Add to Cart</button>
                    <button class="btn btn-wishlist" onclick="toggleWishlist('${product._id}')" title="Add to Wishlist">
                        <i class="fa-solid fa-heart" style="color: ${isInWishlist ? "#e94560" : "currentColor"}"></i>
                    </button>
                </div>
            </div>
        `;
    productsContainer.appendChild(productCard);
  });
}

function addToCart(productId) {
  addToCartAPI(productId);
}

function removeFromCart(productId) {
  removeFromCartAPI(productId);
}

function updateQuantity(productId, change) {
  updateQuantityAPI(productId, change);
}

function toggleWishlist(productId) {
  const product = products.find((p) => p._id === productId);
  const index = wishlist.findIndex((item) => item._id === productId);

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(product);
  }

  updateWishlistCount();
  renderProducts(getFilteredProducts());
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = count;
}

function updateWishlistCount() {
  document.getElementById("wishlistCount").textContent = wishlist.length;
}

function updateCartModal() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon"><i class="fa-solid fa-shopping-bag"></i></div>
                <p>Your cart is empty</p>
            </div>
        `;
    document.getElementById("subtotal").textContent = "0.00";
    document.getElementById("total").textContent = "0.00";
    return;
  }

  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity('${item._id}', -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item._id}', 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item._id}')">Remove</button>
            </div>
        `;
    cartItemsContainer.appendChild(cartItem);
  });

  const shipping = 9.99;
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}

function getFilteredProducts() {
  let filtered = products;

  if (currentFilter) {
    filtered = filtered.filter((p) => p.category === currentFilter);
  }

  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm),
    );
  }

  return filtered;
}

function updateAuthUI() {
  const greeting = document.getElementById("userGreeting");
  const accountBtn = document.getElementById("accountBtn");
  
  if (currentUser) {
    greeting.textContent = `Hello ${currentUser.username}`;
    accountBtn.style.cursor = "default";
  } else {
    greeting.textContent = "Hello Guest";
  }

  accountBtn.onclick = () => {
    if (!currentUser) {
      window.location.href = "login.html";
    }
  };
}

function logout() {
  authToken = null;
  currentUser = null;
  cart = [];
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  updateAuthUI();
  updateCartCount();
  showNotification("Logged out successfully");
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === "error" ? "#dc3545" : "#28a745"};
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 2000;
        animation: slideDown 0.3s;
    `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 2000);
}

// ==================== EVENT LISTENERS ====================

cartBtn.addEventListener("click", () => {
  if (!authToken) {
    showNotification("Please login to view cart", "error");
    window.location.href = "login.html";
    return;
  }
  cartModal.style.display = "flex";
  updateCartModal();
});

closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

searchBtn.addEventListener("click", () => {
  renderProducts(getFilteredProducts());
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    renderProducts(getFilteredProducts());
  }
});

categorySelect.addEventListener("change", async (e) => {
  currentFilter = e.target.value;
  await loadProducts();
});

categoryFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    categoryFilters.forEach((f) => f.classList.remove("active"));
    filter.classList.add("active");
    currentFilter = filter.dataset.category;
    renderProducts(getFilteredProducts());
  });
});

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleWishlist = toggleWishlist;
