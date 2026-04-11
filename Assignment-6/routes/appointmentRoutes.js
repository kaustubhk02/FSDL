const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

// POST /book       — protected
router.post('/book', auth, appointmentController.bookAppointment);

// GET  /appointments — protected
router.get('/appointments', auth, appointmentController.getAppointments);

module.exports = router;
