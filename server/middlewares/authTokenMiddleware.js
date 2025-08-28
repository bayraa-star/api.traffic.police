const jwt = require('jsonwebtoken');
require('dotenv').config();

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid Authorization Header" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error verifying JWT:", error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(401).json({ message: "Invalid Token" });
    }
}

module.exports = authTokenMiddleware;