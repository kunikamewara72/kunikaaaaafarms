const express = require('express');
const router = express.Router();
const { getAllRooms, getRoomBySlugOrId, checkAvailability } = require('../controllers/roomController');

router.get('/', getAllRooms);
router.post('/check-availability', checkAvailability);
router.get('/:param', getRoomBySlugOrId);

module.exports = router;
