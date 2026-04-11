const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET  /login
router.get('/login', userController.getLogin);

// POST /login
router.post('/login', userController.loginUser);

// GET  /signup
router.get('/signup', userController.getSignup);  // ✅ Now uses controller, not inline handler

// POST /signup  — ✅ User is imported inside the controller; no missing-variable crash
router.post('/signup', userController.signupUser);

module.exports = router;
