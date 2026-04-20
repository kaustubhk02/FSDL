// server/routes/cart.js
// Cart routes - Get, Add, Remove, Update, Clear

const express = require('express');
const router = express.Router();
const { 
  getCart, 
  addToCart, 
  removeFromCart, 
  updateQuantity,
  clearCart,
  authMiddleware 
} = require('../controllers/cartController');

// All cart routes require authentication
router.use(authMiddleware);

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', getCart);

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', addToCart);

// @route   PUT /api/cart/:productId
// @desc    Update item quantity
// @access  Private
router.put('/:productId', updateQuantity);

// @route   DELETE /api/cart/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/:productId', removeFromCart);

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Private
router.delete('/', clearCart);

module.exports = router;