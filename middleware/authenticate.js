const axios = require('axios');

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(422).json({ error: "Login and password are required" });
    }

    try {
        // Authenticate user
        const authResponse = await axios.post('http://localhost:5002/api/token', { login, password });
        const { accessToken } = authResponse.data;

        // Validate access token
        const validationResponse = await axios.get(`http://localhost:5002/api/validate/${accessToken}`);
        if (validationResponse.data.accessToken) {
            req.user = validationResponse.data; // Attach the user object to the request
            next(); // Proceed to the next middleware/handler
        } else {
            res.status(401).json({ error: "Invalid token" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = authenticateUser;
