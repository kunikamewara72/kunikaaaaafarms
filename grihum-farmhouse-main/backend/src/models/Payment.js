const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['successful', 'failed', 'pending', 'refunded'], default: 'successful' },
  method: { type: String, default: 'Razorpay Simulation' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
