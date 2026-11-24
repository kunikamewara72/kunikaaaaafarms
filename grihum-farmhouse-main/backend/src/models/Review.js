const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  guestLocation: { type: String, default: 'India' },
  avatar: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  stayDate: { type: String, required: true },
  roomName: { type: String, default: 'Grihum Farms Eco Stay' },
  comment: { type: String, required: true },
  verifiedStay: { type: Boolean, default: true },
  categories: {
    cleanliness: { type: Number, default: 5 },
    accuracy: { type: Number, default: 5 },
    communication: { type: Number, default: 5 },
    location: { type: Number, default: 5 },
    value: { type: Number, default: 5 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
