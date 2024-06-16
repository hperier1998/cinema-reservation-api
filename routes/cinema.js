// routes/cinema.js
const express = require('express');
const router = express.Router();
const cinemasController = require('../controllers/cinemasController');
const { checkAuth, checkAdmin } = require('../middleware/authMiddleware');

router
    .post('/', cinemasController.createCinema);

router
    .get('/:id', cinemasController.getCinemaByUid)
    .delete('/:id', cinemasController.deleteCinemaByUid)
    .put('/:id', cinemasController.updateCinemaByUid);

router
    .post('/:cinemaUid/rooms', cinemasController.createRoom)
    .get('/:cinemaUid/rooms',cinemasController.getAllRoomsByUidCinema);

router
    .get('/:cinemaUid/rooms/:uid', cinemasController.getRoomByIdAndIdCinema)
    .put('/:cinemaUid/rooms/:uid', cinemasController.updateRoomById)
    .delete('/:cinemaUid/rooms/:uid', cinemasController.deleteRoomById);

// Route to list sessions in a room
router.get('/:cinemaUid/rooms/:roomUid/sceances', checkAuth, cinemasController.listSessionsInRoom);

// Route to create a session in a room
router.post('/:cinemaUid/rooms/:roomUid/sceances', checkAuth, checkAdmin, cinemasController.createSessionInRoom);

// Route to modify a session in a room
router.put('/:cinemaUid/rooms/:roomUid/sceances/:uid', checkAuth, checkAdmin, cinemasController.modifySessionInRoom);

// Route to delete a session in a room
router.delete('/:cinemaUid/rooms/:roomUid/sceances/:uid', checkAuth, checkAdmin, cinemasController.deleteSessionInRoom);

module.exports = router;
