const express = require('express');
const router = express.Router();
const { calculatePrice, createBooking, getBookingById, getMyBookings } = require('../controllers/bookingController');

router.post('/calculate-price', calculatePrice);
router.post('/', createBooking);
router.get('/my-bookings', getMyBookings);
router.get('/:bookingId', getBookingById);

module.exports = router;
