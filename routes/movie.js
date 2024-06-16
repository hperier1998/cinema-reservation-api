const express = require('express');
const router = express.Router();
const { checkAuth, checkAdmin } = require('../middleware/authMiddleware');
const { validateMovie } = require('../middleware/moviesMiddleware');
const reservationsController = require('../controllers/reservationsController');

// Route to list all current reservations for a film
router.get('/:movieUid/reservations', checkAuth, checkAdmin, validateMovie, reservationsController.listReservationsForMovie);

module.exports = router;
