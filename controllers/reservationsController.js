const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

// Create reservation
exports.createReservation = (req, res) => {
    const { movieUid } = req.params;
    const { sceance, nbSeats, room } = req.body;
    const uid = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // 2 hours from now

    const query = `INSERT INTO reservations (uid, sceance, nbSeats, room, status, createdAt, updatedAt, expiresAt, userId, movieUid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [uid, sceance, nbSeats, room, 'pending', createdAt, updatedAt, expiresAt, req.user.id, movieUid];

    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ uid, rank: this.lastID, status: 'pending', createdAt, updatedAt, expiresAt });
    });
};

// Confirm reservation
exports.confirmReservation = (req, res) => {
    const { uid } = req.params;

    const query = `UPDATE reservations SET status = ?, updatedAt = ? WHERE uid = ? AND userId = ?`;
    const params = ['confirmed', new Date().toISOString(), uid, req.user.id];

    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Reservation not found or not authorized' });
        }
        res.status(201).json({ message: 'Reservation confirmed successfully' });
    });
};

// List reservations for a movie
exports.listReservationsForMovie = (req, res) => {
    const { movieUid } = req.params;

    const query = `SELECT * FROM reservations WHERE movieUid = ?`;
    db.all(query, [movieUid], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(rows);
    });
};
