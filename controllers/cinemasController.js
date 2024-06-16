const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

// controllers/cinemasController.js
exports.createCinema = (req, res) => {
    const {name} = req.params
    const uid = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = `INSERT INTO cinemas (uid, name, createdAt, updatedAt) VALUES (?, ?, ?, ?)`;
    const params = [uid, name, createdAt, updatedAt];

    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ uid, name, createdAt, updatedAt });
    });
};

exports.updateCinemaByUid = (req, res) => {
    const {uid, name} = req.body
    const updatedAt = new Date().toISOString()

    const query = `UPDATE cinemas SET name = ?, updatedAt = ? WHERE uid = ?`
    const params = [name, updatedAt, uid]
    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ uid, name, createdAt, updatedAt });
    });
}

exports.deleteCinemaByUid = (req, res) => {
    const {uid} = req.params

    const query = `DELETE cinemas WHERE uid = ?`
    const params = [uid]
    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(`cinema deleted`);
    });
}

exports.getCinemaByUid = (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM cinemas WHERE uid = ?`;
    db.all(query, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(rows);
    });
};

exports.getAllRoomsByUidCinema = (req,res) => {
    const { cinemaUid } = req.params;

    const query = `SELECT * FROM rooms WHERE uidCinema = ?`;
    db.all(query, [cinemaUid], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(rows);
    });
}

exports.getRoomByIdAndIdCinema = (req,res) => {
    const { cinemaUid, uid } = req.params;
    const query = `SELECT * FROM rooms WHERE uidCinema = ? AND uid = ?`;
    
    db.all(query, [cinemaUid, uid], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(rows);
    });
}

exports.createRoom = (req,res) => {
    const {uidCinema} = req.params
    const {name,seats} = req.body
    const uid = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = `INSERT INTO rooms (uid, name, seats, uidCinema, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [uid, name, seats, uidCinema, createdAt, updatedAt];

    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ uid, name, seats, uidCinema, createdAt, updatedAt });
    });
}

exports.updateRoomById = (req,res) => {
    const { uid, cinemaUid } = req.params
    const { name } = req.body
    const updatedAt = new Date().toISOString()

    const query = `UPDATE rooms SET name = ?, seats = ?, updatedAt = ? WHERE uid = ? AND uidCinema = ?`
    const params = [name, updatedAt, uid, cinemaUid]
    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ uid, name, seats, uidCinema, createdAt, updatedAt });
    });
}

exports.deleteRoomById = (req,res) => {
    const { uid, cinemaUid } = req.params

    const query = `DELETE rooms WHERE uid = ? AND uidCinema = ?`
    const params = [uid, cinemaUid]
    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(`room deleted`);
    });
}

// List sessions in a room
exports.listSessionsInRoom = (req, res) => {
    const { cinemaUid, roomUid } = req.params;

    const query = `
        SELECT s.uid, m.name as movie, s.date
        FROM sessions s
        JOIN movies m ON s.movieUid = m.uid
        WHERE s.cinemaUid = ? AND s.roomUid = ?
    `;

    db.all(query, [cinemaUid, roomUid], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        const response = rows.map(row => ({
            uid: row.uid,
            movie: row.movie,
            date: row.date
        }));
        res.status(200).json(response);
    });
};

// Create a session in a room
exports.createSessionInRoom = (req, res) => {
    const { cinemaUid, roomUid } = req.params;
    const { movie, date } = req.body;

    if (!movie || !date) {
        return res.status(422).json({ error: 'Movie and date are required' });
    }

    const uid = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const query = `
        INSERT INTO sessions (uid, movieUid, cinemaUid, roomUid, date, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [uid, movie, cinemaUid, roomUid, date, createdAt, updatedAt], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        const response = {
            uid,
            movie,
            date
        };

        res.status(201).json(response);
    });
};

// Modify a session in a room
exports.modifySessionInRoom = (req, res) => {
    const { cinemaUid, roomUid, uid } = req.params;
    const { movie, date } = req.body;

    if (!movie || !date) {
        return res.status(422).json({ error: 'Movie and date are required' });
    }

    const updatedAt = new Date().toISOString();

    const query = `
        UPDATE sessions
        SET movieUid = ?, date = ?, updatedAt = ?
        WHERE uid = ? AND cinemaUid = ? AND roomUid = ?
    `;

    db.run(query, [movie, date, updatedAt, uid, cinemaUid, roomUid], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const response = {
            uid,
            movie,
            date
        };

        res.status(200).json(response);
    });
};

// Delete a session in a room
exports.deleteSessionInRoom = (req, res) => {
    const { uid } = req.params;

    const query = `DELETE FROM seances WHERE uid = ?`;
    db.run(query, [uid], function (err) {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Session not found" });
        }

        res.status(200).json({ message: "Session deleted successfully" });
    });
};