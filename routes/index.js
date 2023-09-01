const express = require('express');

const authentication = require('../middlewares/authentication');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const hospitalRoutes = require('./hospital');
const bookingRoutes = require('./booking');
const router = express.Router();

router.use('/', authRoutes);

router.use('/hospitals', hospitalRoutes);

router.use(authentication);
router.use('/users', userRoutes);
router.use('/bookings', bookingRoutes);

module.exports = router;
