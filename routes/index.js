const express = require('express');
const router = express.Router();

const movieRoutes = require('./movie');
const reservationRoutes = require('./reservations');
const cinemaRoutes = require('./cinemas')

router.use('/movie', movieRoutes);
router.use('/reservations', reservationRoutes);
router.use('/cinema', cinemaRoutes)
module.exports = router;
