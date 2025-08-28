const bcrypt = require("bcryptjs");
require('dotenv').config();

const STATIC_USERNAME = process.env.STATIC_USERNAME;
const STATIC_PASSWORD_HASH = process.env.STATIC_PASSWORD_HASH;

const basicAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        res.set('WWW-Authenticate', 'Basic realm="Access to the API"');
        return res.status(401).json({ message: "Missing Authorization Header or invalid" });
    }

    const base64Credentials = authHeader.split(" ")[1];
    let credentials;
    try {
        credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    } catch (error) {
        return res.status(400).json({ message: "Invalid Base64 encoding" });
    }

    const [username, password] = credentials.split(":");
    if (!username || !password) {
        return res.status(401).json({ message: "Invalid Authentication Credentials" });
    }
    
    try {
        if (username !== STATIC_USERNAME || !bcrypt.compareSync(password, STATIC_PASSWORD_HASH)) {
            return res.status(401).json({ message: "Invalid Username or Password" });
        }
        
        req.user = { username }; // Attach basic user info to request object (customize as needed, e.g., add role: 'admin')
        next();
    } catch (error) {
        console.error("Error during basic authentication:", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }   
};

module.exports = basicAuthMiddleware;