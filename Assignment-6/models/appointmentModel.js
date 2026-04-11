const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  // The logged-in patient who booked
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Display name (filled from user.name automatically in controller)
  patientName: {
    type: String,
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Booked', 'Cancelled', 'Completed'],
    default: 'Booked'
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
