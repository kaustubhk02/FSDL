const Doctor = require('../models/doctorModel');

exports.getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.render('pages/doctors', { doctors });
};

const Appointment = require('../models/appointmentModel');

exports.getDoctorById = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  const appointments = await Appointment.find({ doctor: doctor._id })
    .populate('user');

  res.render('pages/doctorDetails', { doctor, appointments });
};