const axios = require('axios');

// Middleware to validate access token
const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const response = await axios.get(`http://localhost:5002/api/validate/${token}`);
        req.user = response.data;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

// Middleware to check admin role
const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ error: 'Forbidden' });
    }
};

module.exports = { checkAuth, checkAdmin };
