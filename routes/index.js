// routes/index.js
const express = require('express');
const router = express.Router();

const cinemasRoutes = require('./cinemas');
const reservationsRoutes = require('./reservations');
const moviesRoutes = require('./movies');

router.use('/cinemas', cinemasRoutes);
router.use('/reservations', reservationsRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
