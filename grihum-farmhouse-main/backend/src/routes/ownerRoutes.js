const express = require('express');
const router = express.Router();
const {
  getDashboardKPIs,
  getOwnerBookings,
  updateBookingStatus,
  toggleBlockDate,
  updateRoomPrice,
  getOwnerInquiries
} = require('../controllers/ownerController');
const { verifyAdmin } = require('../middleware/authMiddleware');

router.get('/kpis', getDashboardKPIs);
router.get('/bookings', getOwnerBookings);
router.put('/bookings/:id/status', updateBookingStatus);
router.post('/calendar/block', toggleBlockDate);
router.put('/rooms/:id', updateRoomPrice);
router.get('/inquiries', getOwnerInquiries);

module.exports = router;
