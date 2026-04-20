// server/routes/products.js
// Product routes - Get all, Get one, Create, Seed

const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProduct, 
  createProduct,
  seedProducts 
} = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products (optional: ?category=dresses)
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/seed
// @desc    Seed sample products (for demo)
// @access  Public
router.get('/seed', seedProducts);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', getProduct);

// @route   POST /api/products
// @desc    Create new product
// @access  Public (can be made private for admin)
router.post('/', createProduct);

module.exports = router;