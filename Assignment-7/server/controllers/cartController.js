// server/controllers/cartController.js
// Cart controller - Add, Remove, Update items in cart

const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authMiddleware } = require('./authController');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId })
      .populate('items.product', 'name category price rating image');

    if (!cart) {
      // Create empty cart for new user
      cart = new Cart({ user: req.user.userId, items: [] });
      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching cart' 
    });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: req.user.userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      // Check if product already in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ product: productId, quantity });
      }
    }

    cart.updatedAt = Date.now();
    await cart.save();

    // Populate product details before sending response
    await cart.populate('items.product', 'name category price rating image');

    res.json({
      success: true,
      message: 'Item added to cart',
      cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error adding to cart' 
    });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.userId });
    
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart not found' 
      });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    cart.updatedAt = Date.now();
    await cart.save();

    await cart.populate('items.product', 'name category price rating image');

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error removing from cart' 
    });
  }
};

// Update item quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Quantity must be at least 1' 
      });
    }

    const cart = await Cart.findOne({ user: req.user.userId });
    
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart not found' 
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found in cart' 
      });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();

    await cart.populate('items.product', 'name category price rating image');

    res.json({
      success: true,
      message: 'Cart updated',
      cart
    });
  } catch (error) {
    console.error('Update quantity error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating cart' 
    });
  }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    
    if (cart) {
      cart.items = [];
      cart.updatedAt = Date.now();
      await cart.save();
    }

    res.json({
      success: true,
      message: 'Cart cleared',
      cart: { items: [], totalPrice: 0 }
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error clearing cart' 
    });
  }
};

// Apply auth middleware to all cart routes
exports.authMiddleware = authMiddleware;