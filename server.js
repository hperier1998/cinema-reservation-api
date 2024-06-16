const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./data/reservationDb.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS reservations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                uid TEXT,
                sceance TEXT,
                nbSeats INTEGER,
                room TEXT,
                status TEXT,
                createdAt TEXT,
                updatedAt TEXT,
                expiresAt TEXT,
                userId INTEGER
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS cinemas(
                uid TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                createdAt TEXT,
                updatedAt TEXT
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS rooms(
                uid TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                seats INTEGER NOT NULL,
                uidCinema TEXT,
                createdAt TEXT,
                updatedAt TEXT,
                FOREIGN KEY (uidCinema) REFERENCES cinemas(uid)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS seances(
                uid TEXT PRIMARY KEY NOT NULL,
                movieId TEXT NOT NULL,
                date TEXT NOT NULL,
                createdAt TEXT,
                updatedAt TEXT
            )`);
        });
    }
});

// Routes
app.use('/api', require('./routes'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

    // Close the database connection when the server is stopped
    process.on('SIGINT', () => {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
            process.exit(0);
        });
    });
});
