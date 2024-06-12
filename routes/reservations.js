// routes/reservations.js
const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');
const authenticateUser = require('../middlewares/authenticate');

// Define routes for reservations
router.post('/movie/:movieUid/reservations', authenticateUser, reservationsController.reserveSeat);
router.post('/reservations/:uid/confirm', authenticateUser, reservationsController.confirmReservation);

module.exports = router;
