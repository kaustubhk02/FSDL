const Doctor = require('../models/doctorModel');

exports.getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.render('pages/doctors', { doctors });
};

exports.getDoctorById = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.render('pages/doctorDetails', { doctor });
};