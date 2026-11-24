const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Inquiry = require('../models/Inquiry');
const Review = require('../models/Review');

const getDashboardKPIs = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.find({ status: { $in: ['confirmed', 'checked_in', 'completed'] } });

    let totalRevenue = 0;
    confirmedBookings.forEach(b => {
      totalRevenue += (b.pricing?.totalAmount || 0);
    });

    const reviews = await Review.find();
    let totalRating = 0;
    reviews.forEach(r => totalRating += r.rating);
    const avgRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(2) : 4.92;

    const todayStr = new Date().toISOString().split('T')[0];
    const todayCheckIns = await Booking.countDocuments({ checkIn: todayStr, status: 'confirmed' });
    const todayCheckOuts = await Booking.countDocuments({ checkOut: todayStr, status: 'checked_in' });

    res.json({
      totalBookings,
      totalRevenue,
      occupancyRate: '78%',
      avgRating,
      todayCheckIns,
      todayCheckOuts,
      reviewsCount: reviews.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('room').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const toggleBlockDate = async (req, res) => {
  try {
    const { roomId, dateStr } = req.body;
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    if (room.blockedDates.includes(dateStr)) {
      room.blockedDates = room.blockedDates.filter(d => d !== dateStr);
    } else {
      room.blockedDates.push(dateStr);
    }
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRoomPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { pricePerNight, weekendPricePerNight, status } = req.body;
    const room = await Room.findByIdAndUpdate(id, {
      pricePerNight,
      weekendPricePerNight,
      status
    }, { new: true });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOwnerInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDashboardKPIs,
  getOwnerBookings,
  updateBookingStatus,
  toggleBlockDate,
  updateRoomPrice,
  getOwnerInquiries
};
