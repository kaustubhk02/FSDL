const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Package routes
router.post('/packages', packageController.createPackage);
router.get('/packages', packageController.getAllPackages);
router.get('/packages/:id', packageController.getPackageById);

// Booking routes
router.post('/bookings', packageController.createBooking);
router.get('/bookings', packageController.getAllBookings);

module.exports = router;