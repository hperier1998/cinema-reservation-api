// controllers/reservationsController.js
const { v4: uuidv4 } = require('uuid');
const { getReservationById, updateReservation } = require('../models/reservationModel');

exports.reserveSeat = (req, res) => {
    const { sceance, nbSeats, room } = req.body;

    if (!sceance || !nbSeats || !room) {
        return res.status(422).json({ error: "Invalid reservation object" });
    }

    try {
        // Logic to handle reservation
        const reservation = {
            uid: uuidv4(),
            sceance,
            nbSeats,
            room,
            status: "reserved",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 3600000).toISOString(), // Example: expires in 1 hour
            userId: req.user.userId // Assuming the user ID is available in the user object
        };

        // Save reservation to the database
        db.run(`INSERT INTO reservations (uid, sceance, nbSeats, room, status, createdAt, updatedAt, expiresAt, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [reservation.uid, reservation.sceance, reservation.nbSeats, reservation.room, reservation.status, reservation.createdAt, reservation.updatedAt, reservation.expiresAt, reservation.userId],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                } else {
                    res.status(201).json(reservation);
                }
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.confirmReservation = async (req, res) => {
    const { uid } = req.params;
    const user = req.user;

    try {
        // Fetch the reservation
        const reservation = await getReservationById(uid);

        // Check if the reservation exists
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }

        // Check if the reservation belongs to the connected user
        if (reservation.userId !== user.userId) {
            return res.status(403).json({ error: "Unauthorized. This reservation does not belong to you" });
        }

        // Check if the reservation has expired
        if (new Date(reservation.expiresAt) < new Date()) {
            return res.status(410).json({ error: "The reservation has expired" });
        }

        // Logic to confirm the reservation
        reservation.status = "confirmed";
        reservation.updatedAt = new Date().toISOString();

        // Update reservation in the database
        await updateReservation(reservation);

        res.status(201).json({ message: "Reservation confirmed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
