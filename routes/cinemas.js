// routes/cinemas.js
const express = require('express');
const router = express.Router();
const cinemasController = require('../controllers/cinemasController');

router
    .post('/', cinemasController.createCinema);

router
    .get('/:id', cinemasController.getCinemaByUid)
    .delete('/:id', cinemasController.deleteCinemaByUid)
    .put('/:id', cinemasController.updateCinemaByUid);

router
    .post('/:cinemaUid/rooms', cinemasController.createRoom)
    .get('/:cinemaUid/rooms',cinemasController.getAllRoomsByUidCinema)

router
    .get('/:cinemaUid/rooms/:uid', cinemasController.getRoomByIdAndIdCinema)
    .put('/:cinemaUid/rooms/:uid', cinemasController.updateRoomById)
    .delete('/:cinemaUid/rooms/:uid', cinemasController.deleteRoomById)

module.exports = router;
