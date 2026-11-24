const Room = require('../models/Room');
const Booking = require('../models/Booking');
const { parseISO, eachDayOfInterval, format } = require('date-fns');

const presentRoomPricing = (room) => {
  const data = room.toObject();
  const nightlyPrice = room.slug === 'entire-farmhouse' ? 21000 : 7000;
  return { ...data, pricePerNight: nightlyPrice, weekendPricePerNight: nightlyPrice };
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ status: 'active' });
    res.json(rooms.map(presentRoomPricing));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRoomBySlugOrId = async (req, res) => {
  try {
    const { param } = req.params;
    let room = await Room.findOne({ slug: param });
    if (!room && param.match(/^[0-9a-fA-F]{24}$/)) {
      room = await Room.findById(param);
    }
    if (!room) {
      return res.status(404).json({ message: 'Room not found at Grihum Farms' });
    }
    res.json(presentRoomPricing(room));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkAvailability = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, guests } = req.body;
    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: 'Check-in and check-out dates are required' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check capacity
    const totalGuests = (guests?.adults || 1) + (guests?.children || 0);
    if (totalGuests > room.capacity.maxGuests) {
      return res.json({
        available: false,
        reason: `Selected guests (${totalGuests}) exceeds max capacity for this room (${room.capacity.maxGuests}).`
      });
    }

    // Check if dates conflict with blocked dates
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const datesRequested = [];
    let cur = new Date(start);
    while (cur < end) {
      datesRequested.push(format(cur, 'yyyy-MM-dd'));
      cur.setDate(cur.getDate() + 1);
    }

    // Check manual room blocked dates
    const isManuallyBlocked = datesRequested.some(d => room.blockedDates.includes(d));
    if (isManuallyBlocked) {
      return res.json({
        available: false,
        reason: 'Selected dates are unavailable or blocked for maintenance.'
      });
    }

    // Check existing confirmed/checked_in bookings for this room
    const existingBookings = await Booking.find({
      room: room._id,
      status: { $in: ['confirmed', 'checked_in'] },
      $or: [
        { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }
      ]
    });

    if (existingBookings.length > 0) {
      return res.json({
        available: false,
        reason: 'Room is already booked for these dates at Grihum Farms.'
      });
    }

    res.json({
      available: true,
      room: presentRoomPricing(room),
      nights: datesRequested.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllRooms, getRoomBySlugOrId, checkAvailability };
