const axios = require('axios');

// Middleware to validate if the movie exists
const validateMovie = async (req, res, next) => {
    const { movieUid } = req.params;

    try {
        const response = await axios.get(`http://localhost:5001/api/movies/${movieUid}`);
        if (response.data) {
            req.movie = response.data;
            next();
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Middleware to check if reservations are available for the movie
const checkReservationsAvailable = (req, res, next) => {
    if (req.movie && req.movie.hasReservationsAvailable) {
        next();
    } else {
        res.status(422).json({ error: 'No reservations available for this movie' });
    }
};

module.exports = { validateMovie, checkReservationsAvailable };
