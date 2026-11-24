const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subtitle: { type: String, default: '' },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  capacity: {
    adults: { type: Number, default: 2 },
    maxGuests: { type: Number, default: 4 }
  },
  bedrooms: { type: Number, default: 1 },
  beds: { type: String, default: '1 King Bed' },
  bathrooms: { type: Number, default: 1 },
  pricePerNight: { type: Number, required: true },
  weekendPricePerNight: { type: Number, default: 0 },
  images: [{ type: String }],
  coverImage: { type: String, default: '' },
  amenities: [{ type: String }],
  features: [{ type: String }],
  status: { type: String, enum: ['active', 'maintenance'], default: 'active' },
  blockedDates: [{ type: String }] // 'YYYY-MM-DD'
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
