var mysql = require('mysql2');
const { connectToDb } = require('../DB/tables/connectToDB');
const bodyParser = require("body-parser");
const secretKey = "myVerySecretAndComplexKey123!";
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

// Token Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // If there's no token, return 401 Unauthorized

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // If the token is invalid or expired, return 403 Forbidden
        req.user = user; // Attach the user object to the request
        next(); // Call the next middleware/route handler
    });
}

module.exports = { authenticateToken }