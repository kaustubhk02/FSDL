// server/seed.js
// Seed script to insert sample products into MongoDB

const mongoose = require('mongoose');
require('dotenv').config();

// Product Schema (inline for seed script)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['dresses', 'tops', 'bottoms', 'accessories'] },
  price: { type: Number, required: true, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Sample products data with images
const products = [
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
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=60"
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
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=60"
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
  },
  {
    name: "Pink Summer Top",
    category: "tops",
    price: 399,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1583744999763-9f9f3d1c9e38?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Beige Palazzo Pants",
    category: "bottoms",
    price: 699,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Silver Earrings",
    category: "accessories",
    price: 299,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Blue Maxi Dress",
    category: "dresses",
    price: 1299,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&auto=format&fit=crop&q=60"
  }
];

async function seedDatabase() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fashionstore';
  
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully inserted ${insertedProducts.length} products`);

    // Display inserted products
    console.log('\n📦 Inserted Products:');
    insertedProducts.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - ₹${p.price} (${p.category})`);
    });

    console.log('\n✅ Database seeding completed!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();