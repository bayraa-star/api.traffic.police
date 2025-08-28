const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const loggerMiddleware = require("./middlewares/requestLog"); 
const cors = require('cors');
const authTokenMiddleware = require("./middlewares/authTokenMiddleware");
const basicAuth = require("./middlewares/basicAuth");

const app = express();


//Middleware 
app.use(cors({
    origin: [
        'http://10.71.71.67:3000', 
        'http://192.168.1.39:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies to be sent along with requests if necessary
}));
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

// Unprotected routes
// app.use("/api/v1", basicAuth, require("./routes/auth"));
app.use("/api/v1", require("./routes/auth"));
// Users 
app.use("/api/v1", authTokenMiddleware, require("./routes/users")); 
// Events 
app.use("/api/v1", authTokenMiddleware, require("./routes/events")); 

module.exports = app;