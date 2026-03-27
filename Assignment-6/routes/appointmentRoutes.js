const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

// PROTECTED ROUTES
router.post('/book', auth, appointmentController.bookAppointment);
router.get('/appointments', auth, appointmentController.getAppointments);

module.exports = router;