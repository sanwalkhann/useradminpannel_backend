const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log("Middleware called");

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
        if (err) {
            return res.status(402).json({ message: err.message });
        }

        console.log("User authenticated successfully");
        next();
    });
};

module.exports = authMiddleware;
