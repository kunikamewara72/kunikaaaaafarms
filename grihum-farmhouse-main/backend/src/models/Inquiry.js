const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  preferredDates: { type: String, default: '' },
  guestsCount: { type: Number, default: 2 },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'replied', 'archived'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
