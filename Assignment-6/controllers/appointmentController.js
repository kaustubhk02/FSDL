const Appointment = require('../models/appointmentModel');

// POST /book
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, slot } = req.body;
    const loggedInUser = req.session.user;

    if (!doctorId || !date || !slot) {
      return res.status(400).send('All fields are required.');
    }

    const appointment = new Appointment({
      user: loggedInUser._id,         
      patientName: loggedInUser.name, 
      doctor: doctorId,
      date: new Date(date),
      slot
    });

    await appointment.save();
    res.redirect('/appointments');

  } catch (err) {
    console.error('bookAppointment error:', err);
    res.status(500).send('Something went wrong while booking. Please try again.');
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.session.user._id
    }).populate('doctor').sort({ date: -1 });

    res.render('pages/myAppointments', { appointments });

  } catch (err) {
    console.error('getAppointments error:', err);
    res.status(500).send('Could not fetch appointments.');
  }
};
