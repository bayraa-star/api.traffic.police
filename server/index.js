require("dotenv").config();
const { connectDB } = require("./config/db");

// Connect to the database
connectDB();

// Export the database connection and app setup so it can be used in cluster.js
module.exports = require("./app");
