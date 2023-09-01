const express = require('express');
const BookingController = require('../controllers/booking');
const router = express.Router();

router.get('/', BookingController.getAllBookings);
router.get('/histories', BookingController.getAllBookingHistories);
router.get('/:bookingId', BookingController.getBookingById);

module.exports = router;
