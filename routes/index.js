const express = require('express');
const router = express.Router();

const movieRoutes = require('./movie');
const reservationRoutes = require('./reservations');

router.use('/movie', movieRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;
