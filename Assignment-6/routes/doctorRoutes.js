const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/doctors', doctorController.getAllDoctors);
router.get('/doctor/:id', doctorController.getDoctorById);

module.exports = router;
