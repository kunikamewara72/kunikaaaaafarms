const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  priceUnit: { type: String, default: 'per person / session' },
  category: { type: String, default: 'Outdoor & Nature' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
