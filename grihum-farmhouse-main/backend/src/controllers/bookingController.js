const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Experience = require('../models/Experience');

const calculatePricingServer = async (roomId, checkIn, checkOut, selectedExpIds = [], rateType = 'non_refundable') => {
  const room = await Room.findById(roomId);
  if (!room) throw new Error('Room not found');

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const baseNightPrice = room.slug === 'entire-farmhouse' ? 21000 : 7000;

  const roomSubtotal = Math.round(baseNightPrice * nights);

  // Experiences subtotal
  let experiencesTotal = 0;
  const experiencesList = [];
  if (selectedExpIds.length > 0) {
    const experiencesObj = await Experience.find({ _id: { $in: selectedExpIds } });
    for (const exp of experiencesObj) {
      experiencesTotal += exp.price;
      experiencesList.push({
        id: exp._id.toString(),
        name: exp.title,
        price: exp.price,
        count: 1
      });
    }
  }

  const cleaningFee = 500;
  const taxes = Math.round((roomSubtotal + experiencesTotal) * 0.12); // 12% GST
  const totalAmount = roomSubtotal + experiencesTotal + cleaningFee + taxes;

  return {
    room,
    nights,
    roomSubtotal,
    experiencesTotal,
    experiencesList,
    cleaningFee,
    taxes,
    totalAmount
  };
};

const calculatePrice = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, experiences = [], rateType = 'non_refundable' } = req.body;
    if (!roomId || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'Missing booking params' });
    }
    const calculation = await calculatePricingServer(roomId, checkIn, checkOut, experiences, rateType);
    res.json(calculation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const {
      roomId,
      checkIn,
      checkOut,
      guestName,
      guestEmail,
      guestPhone,
      guests,
      experiences = [],
      rateType = 'non_refundable',
      specialRequests = '',
      paymentMethod = 'Razorpay'
    } = req.body;

    if (!roomId || !checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      return res.status(400).json({ message: 'All required guest details and dates must be provided.' });
    }

    // Verify availability
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const existingConflict = await Booking.find({
      room: roomId,
      status: { $in: ['confirmed', 'checked_in'] },
      $or: [
        { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }
      ]
    });

    if (existingConflict.length > 0) {
      return res.status(400).json({ message: 'Sorry, this room was just booked for the selected dates.' });
    }

    // Server-side calculation
    const pricingCalc = await calculatePricingServer(roomId, checkIn, checkOut, experiences, rateType);

    const bookingId = 'GF-' + Date.now().toString().slice(-6);

    const newBooking = await Booking.create({
      bookingId,
      guestName,
      guestEmail,
      guestPhone,
      room: room._id,
      roomName: room.name,
      checkIn,
      checkOut,
      nights: pricingCalc.nights,
      guests: guests || { adults: 1, children: 0, infants: 0, pets: 0 },
      experiences: pricingCalc.experiencesList,
      pricing: {
        roomSubtotal: pricingCalc.roomSubtotal,
        experiencesTotal: pricingCalc.experiencesTotal,
        cleaningFee: pricingCalc.cleaningFee,
        taxes: pricingCalc.taxes,
        totalAmount: pricingCalc.totalAmount
      },
      rateType,
      specialRequests,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentDetails: {
        orderId: 'order_' + Math.random().toString(36).substring(2, 9),
        paymentId: 'pay_' + Math.random().toString(36).substring(2, 9),
        method: paymentMethod
      }
    });

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findOne({ bookingId }).populate('room');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const bookings = await Booking.find({ guestEmail: email }).populate('room').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculatePrice, createBooking, getBookingById, getMyBookings };
