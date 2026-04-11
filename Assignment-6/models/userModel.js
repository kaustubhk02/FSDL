const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Username is required'], unique: true, trim: true },
  password: { type: String, required: [true, 'Password is required'] },
  name:     { type: String, required: [true, 'Full name is required'], trim: true },
  email:    { type: String, trim: true, lowercase: true, default: '' },
  phone:    { type: String, trim: true, default: '' },
  role:     { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' }
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(plainText) {
  return bcrypt.compare(plainText, this.password);
};

module.exports = mongoose.model('User', userSchema);