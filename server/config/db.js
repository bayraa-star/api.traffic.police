// config/db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");

// PostgreSQL configuration (for events)
const pgConfig = require("./config")[process.env.NODE_ENV || "development"];
const sequelize = new Sequelize(pgConfig.database, pgConfig.username, pgConfig.password, pgConfig);

// MongoDB configuration (for users and request logs)
const mongoUri = process.env.MONGO_URI;
const mongoDbName = process.env.MONGO_DBNAME || "invb";

// Connect to PostgreSQL
const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to PostgreSQL database: ${pgConfig.database}`);
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
const connectMongo = async () => {
  try {
    await mongoose.connect(mongoUri, {
      dbName: mongoDbName,
    });
    console.log(`Connected to MongoDB database: ${mongoDbName}`);
  } catch (error) {
    console.error("Unable to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

// Connect to both databases
const connectDB = async () => {
  await Promise.all([connectPostgres(), connectMongo()]);
};

module.exports = { connectDB, sequelize, mongoose };