const User = require('../models/userModel');

// Register user
exports.registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};