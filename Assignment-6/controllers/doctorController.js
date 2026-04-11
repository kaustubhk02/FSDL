const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');

// GET /doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.render('pages/doctors', { doctors });
  } catch (err) {
    console.error('getAllDoctors error:', err);
    res.status(500).send('Could not load doctors list.');
  }
};

// GET /doctor/:id
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).send('Doctor not found.');
    }

    // ✅ Populate 'user' (the patient) on each appointment
    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate('user')
      .sort({ date: -1 });

    res.render('pages/doctorDetails', { doctor, appointments });

  } catch (err) {
    console.error('getDoctorById error:', err);
    res.status(500).send('Could not load doctor details.');
  }
};
