const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  roomName: { type: String, required: true },
  checkIn: { type: String, required: true }, // YYYY-MM-DD
  checkOut: { type: String, required: true }, // YYYY-MM-DD
  nights: { type: Number, required: true },
  guests: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    infants: { type: Number, default: 0 },
    pets: { type: Number, default: 0 }
  },
  experiences: [{
    id: String,
    name: String,
    price: Number,
    count: Number
  }],
  pricing: {
    roomSubtotal: { type: Number, required: true },
    experiencesTotal: { type: Number, default: 0 },
    cleaningFee: { type: Number, default: 0 },
    taxes: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true }
  },
  rateType: { type: String, enum: ['refundable', 'non_refundable'], default: 'non_refundable' },
  specialRequests: { type: String, default: '' },
  status: { type: String, enum: ['confirmed', 'checked_in', 'completed', 'cancelled'], default: 'confirmed' },
  paymentStatus: { type: String, enum: ['paid', 'pending', 'failed', 'refunded'], default: 'paid' },
  paymentDetails: {
    orderId: String,
    paymentId: String,
    method: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
