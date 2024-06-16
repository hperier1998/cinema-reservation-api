const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const { validateMovie, checkReservationsAvailable } = require('../middleware/moviesMiddleware');
const reservationsController = require('../controllers/reservationsController');
const authenticateUser = require('../middleware/authenticate');

// Route to create a reservation for a movie
router.post('/:movieUid/reservations', authenticateUser, validateMovie, checkReservationsAvailable, reservationsController.createReservation);

// Route to confirm a reservation
router.post('/:uid/confirm', checkAuth, reservationsController.confirmReservation);

router.get('/reservations/:uid',checkAuth, reservationsController.getAllReservationByUid)

module.exports = router;
