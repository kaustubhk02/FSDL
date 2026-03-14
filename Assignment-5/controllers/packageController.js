const { Package, Booking } = require('../models/packageModel');

// Create package
exports.createPackage = (req, res) => {
    res.status(200).send("Package Created");
};

// Get all packages
exports.getAllPackages = (req, res) => {
    res.status(200).send("List of all Packages");
};

// Get single package
exports.getPackageById = (req, res) => {
    res.status(200).send(`Package no: ${req.params.id}`);
};

// Create booking
exports.createBooking = (req, res) => {
   
};

// Get all bookings
exports.getAllBookings = (req, res) => {
    
};