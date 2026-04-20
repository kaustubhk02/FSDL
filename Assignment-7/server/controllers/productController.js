// server/controllers/productController.js
// Product controller - GET all products, GET single product, POST new product

const Product = require('../models/Product');

// Get all products (with optional category filter)
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category && category !== '') {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching products' 
    });
  }
};

// Get single product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching product' 
    });
  }
};

// Create new product (admin endpoint)
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, rating, image } = req.body;

    const product = new Product({ name, category, price, rating, image });
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error creating product' 
    });
  }
};

// Seed initial products (for demo purposes)
exports.seedProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Classic Black Dress",
        category: "dresses",
        price: 999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1660891950285-71ed267bf04d?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "White Crop Top",
        category: "tops",
        price: 499,
        rating: 4.2,
        image: "https://plus.unsplash.com/premium_photo-1664475957205-1e26211b1aec?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "Blue Denim Jeans",
        category: "bottoms",
        price: 599,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1609831190577-04538764f438?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "Summer Floral Dress",
        category: "dresses",
        price: 799,
        rating: 4.6,
        image: "https://media.istockphoto.com/id/1009480924/photo/photo-portrait-of-attractive-pretty-cute-lovable-fascinating-delicate-alluring-gorgeous-nice.webp?a=1&b=1&s=612x612&w=0&k=20"
      },
      {
        name: "Leather Handbag",
        category: "accessories",
        price: 1199,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1598099947145-e85739e7ca28?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "Striped T-Shirt",
        category: "tops",
        price: 299,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1768696081925-9ba14856b13c?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "High Waist Skirt",
        category: "bottoms",
        price: 499,
        rating: 4.4,
        image: "https://plus.unsplash.com/premium_photo-1763933179956-c50f8c924a8c?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "Gold Necklace",
        category: "accessories",
        price: 3999,
        rating: 4.5,
        image: "https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "Red Evening Dress",
        category: "dresses",
        price: 999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1651084310370-3620a5ac94fc?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "Oversized Blazer",
        category: "tops",
        price: 799,
        rating: 4.6,
        image: "https://media.istockphoto.com/id/2153525486/photo/handsome-business-male-model-with-sunglasses-in-fashionable-outfit-with-boots-stands-in-the.webp?a=1&b=1&s=612x612&w=0&k=20"
      },
      {
        name: "Black Skinny Jeans",
        category: "bottoms",
        price: 599,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1566475664769-58f79d50457f?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "Sunglasses",
        category: "accessories",
        price: 49.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1566421966482-ad8076104d8e?w=600&auto=format&fit=crop&q=60"
      }
    ];

    // Clear existing products and add new ones
    await Product.deleteMany({});
    const products = await Product.insertMany(sampleProducts);

    res.json({
      success: true,
      message: 'Products seeded successfully',
      count: products.length
    });
  } catch (error) {
    console.error('Seed products error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error seeding products' 
    });
  }
};