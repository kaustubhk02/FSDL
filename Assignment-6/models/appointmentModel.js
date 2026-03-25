const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  date: Date,
  slot: String,
  status: {
    type: String,
    default: 'Booked'
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);