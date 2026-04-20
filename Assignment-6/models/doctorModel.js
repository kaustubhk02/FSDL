const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  availableSlots: {
    type: [String],
    default: []
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
