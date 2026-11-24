const Review = require('../models/Review');

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { guestName, guestLocation, rating, comment, stayDate, roomName } = req.body;
    if (!guestName || !rating || !comment) {
      return res.status(400).json({ message: 'Name, rating, and review comment are required.' });
    }
    const review = await Review.create({
      guestName,
      guestLocation: guestLocation || 'India',
      rating,
      comment,
      stayDate: stayDate || 'Recent Stay',
      roomName: roomName || 'Grihum Farms Eco Stay',
      verifiedStay: true
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getReviews, createReview };
