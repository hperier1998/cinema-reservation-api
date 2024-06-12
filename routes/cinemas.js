// routes/cinemas.js
const express = require('express');
const router = express.Router();
const cinemasController = require('../controllers/cinemasController');

router.post('/', cinemasController.createCinema);
router.get('/:id', cinemasController.getCinema);

module.exports = router;
