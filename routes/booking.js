const express = require('express');
const BookingController = require('../controllers/booking');
const authorization = require('../middlewares/authorization');
const router = express.Router();

router.get('/', BookingController.getAllBookings);
router.get('/histories', BookingController.getAllBookingHistories);
router.get('/:bookingId', authorization, BookingController.getBookingById);

module.exports = router;
