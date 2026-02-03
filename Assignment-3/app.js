// Product Data
const products = [
  {
    id: 1,
    name: "Classic Black Dress",
    category: "dresses",
    price: 999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1660891950285-71ed267bf04d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBkcmVzcyUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    name: "White Crop Top",
    category: "tops",
    price: 499,
    rating: 4.2,
    image: "https://plus.unsplash.com/premium_photo-1664475957205-1e26211b1aec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2hpdGUlMjBjcm9wJTIwdG9wfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Blue Denim Jeans",
    category: "bottoms",
    price: 599,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1609831190577-04538764f438?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMGRlbmltJTIwamVhbnN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Summer Floral Dress",
    category: "dresses",
    price: 799,
    rating: 4.6,
    image: "https://media.istockphoto.com/id/1009480924/photo/photo-portrait-of-attractive-pretty-cute-lovable-fascinating-delicate-alluring-gorgeous-nice.webp?a=1&b=1&s=612x612&w=0&k=20&c=mfpOelzi2mw_9Q8jwSeMfbd21Wt8QR3Iigul5ZfNbB0=",
  },
  {
    id: 5,
    name: "Leather Handbag",
    category: "accessories",
    price: 1199,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1598099947145-e85739e7ca28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TGVhdGhlciUyMEhhbmRiYWd8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 6,
    name: "Striped T-Shirt",
    category: "tops",
    price: 299,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1768696081925-9ba14856b13c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFN0cmlwZWQlMjBULXNoaXJ0fGVufDB8fDB8fHww",
  },
  {
    id: 7,
    name: "High Waist Skirt",
    category: "bottoms",
    price: 499,
    rating: 4.4,
    image: "https://plus.unsplash.com/premium_photo-1763933179956-c50f8c924a8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGlnaCUyMFdhaXN0JTIwU2tpcnR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 8,
    name: "Gold Necklace",
    category: "accessories",
    price: 3999,
    rating: 4.5,
    image: "https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R29sZCUyMG5lY2tsYWNlfGVufDB8fDB8fHww",
  },
  {
    id: 9,
    name: "Red Evening Dress",
    category: "dresses",
    price: 999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1651084310370-3620a5ac94fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFJlZCUyMEV2ZW5pbmclMjBEcmVzcyUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 10,
    name: "Oversized Blazer",
    category: "tops",
    price: 799,
    rating: 4.6,
    image: "https://media.istockphoto.com/id/2153525486/photo/handsome-business-male-model-with-sunglasses-in-fashionable-outfit-with-boots-stands-in-the.webp?a=1&b=1&s=612x612&w=0&k=20&c=KMjCpLpZuwZr1ye6_NSyiPWBRgDbjCXJPPODk-wFIR0=",
  },
  {
    id: 11,
    name: "Black Skinny Jeans",
    category: "bottoms",
    price: 599,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566475664769-58f79d50457f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEJsYWNrJTIwU2tpbm55JTIwSmVhbnMlMjBtZW58ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 12,
    name: "Sunglasses",
    category: "accessories",
    price: 49.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566421966482-ad8076104d8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFN1bmdsYXNzZXN8ZW58MHx8MHx8fDA%3D",
  },
]

// State Management
let cart = []
const wishlist = []
let currentFilter = ""

// DOM Elements
const productsContainer = document.getElementById("productsContainer")
const cartBtn = document.getElementById("cartBtn")
const cartModal = document.getElementById("cartModal")
const closeCart = document.getElementById("closeCart")
const cartItemsContainer = document.getElementById("cartItems")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const categorySelect = document.getElementById("categorySelect")
const categoryFilters = document.querySelectorAll(".category-filter")

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products)
  updateCartCount()
  loadCart()
});



document.getElementById("accountBtn").addEventListener("click", () => {
  window.location.href = "login.html"
});

const storedUser = localStorage.getItem("username")
  const greeting = document.getElementById("userGreeting")
  const accountBtn = document.getElementById("accountBtn")

  if (storedUser) {
    greeting.textContent = "Hello " + storedUser
  }

  // If user already logged in, clicking account does nothing
  // If not logged in, go to login page
  accountBtn.addEventListener("click", () => {
    if (!storedUser) {
      window.location.href = "login.html"
    }
  })

  if (storedUser) {
    greeting.textContent = `Hello ${storedUser}`;
  } else {
    greeting.textContent = "Hello Guest";
  }

function renderProducts(productsToRender) {
  productsContainer.innerHTML = ""

  if (productsToRender.length === 0) {
    productsContainer.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found</p>'
    return
  }

  productsToRender.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card" ;

    const rating = "★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating));
    const isInWishlist = wishlist.some((item) => item.id === product.id);

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
                    <button class="btn btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-wishlist" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
                        <i class="fa-solid fa-heart" style="color: ${isInWishlist ? "#e94560" : "currentColor"}"></i>
                    </button>
                </div>
            </div>
        `
    productsContainer.appendChild(productCard);
  })
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  saveCart()
  updateCartCount()
  updateCartModal()
  showNotification("Added to cart!")
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  saveCart()
  updateCartCount()
  updateCartModal()
}

function updateQuantity(productId, change) {
  const item = cart.find((p) => p.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      saveCart()
      updateCartModal()
    }
  }
}

function toggleWishlist(productId) {
  const product = products.find((p) => p.id === productId)
  const index = wishlist.findIndex((item) => item.id === productId)

  if (index > -1) {
    wishlist.splice(index, 1)
  } else {
    wishlist.push(product)
  }

  updateWishlistCount()
  renderProducts(getFilteredProducts())
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById("cartCount").textContent = count
}

function updateWishlistCount() {
  document.getElementById("wishlistCount").textContent = wishlist.length
}

function updateCartModal() {
  cartItemsContainer.innerHTML = ""

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon"><i class="fa-solid fa-shopping-bag"></i></div>
                <p>Your cart is empty</p>
            </div>
        `
    return
  }

  let subtotal = 0

  cart.forEach((item) => {
    subtotal += item.price * item.quantity
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `
    cartItemsContainer.appendChild(cartItem)
  })

  const shipping = 9.99
  const total = subtotal + shipping

  document.getElementById("subtotal").textContent = subtotal.toFixed(2)
  document.getElementById("total").textContent = total.toFixed(2)
}

function getFilteredProducts() {
  let filtered = products

  if (currentFilter) {
    filtered = filtered.filter((p) => p.category === currentFilter)
  }

  const searchTerm = searchInput.value.toLowerCase()
  if (searchTerm) {
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm),
    )
  }

  return filtered
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

function loadCart() {
  const saved = localStorage.getItem("cart")
  if (saved) {
    cart = JSON.parse(saved)
    updateCartCount()
  }
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 2000;
        animation: slideDown 0.3s;
    `
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => notification.remove(), 2000)
}

// Event Listeners
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex"
  updateCartModal()
})

closeCart.addEventListener("click", () => {
  cartModal.style.display = "none"
})

cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none"
  }
})

searchBtn.addEventListener("click", () => {
  renderProducts(getFilteredProducts())
})

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    renderProducts(getFilteredProducts())
  }
})

categorySelect.addEventListener("change", (e) => {
  currentFilter = e.target.value
  renderProducts(getFilteredProducts())
})

categoryFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    categoryFilters.forEach((f) => f.classList.remove("active"))
    filter.classList.add("active")
    currentFilter = filter.dataset.category
    renderProducts(getFilteredProducts())
  })
})
