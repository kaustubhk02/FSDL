const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.getHomePage);
router.get('/packages', pageController.getPackagesPage);
router.get('/packages/:id', pageController.getPackageDetails);
router.get('/booking', pageController.getBookingPage);

module.exports = router;