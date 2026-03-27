const Appointment = require('../models/appointmentModel');

exports.bookAppointment = async (req, res) => {
  const { patientName, doctorId, date, slot } = req.body;

  const appointment = new Appointment({
    patientName,
    doctor: doctorId,
    date,
    slot
  });

  await appointment.save();
  res.redirect('/appointments');
};

exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    user: req.session.user._id   
  }).populate('doctor');

  res.render('pages/myAppointments', { appointments });
};