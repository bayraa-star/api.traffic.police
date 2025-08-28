require("dotenv").config();
const express = require("express");
const basicAuth = require("../middlewares/basicAuth");
const { register, login } = require("../controllers/authController");

const router = express.Router();



//Post /api/register
//router.post("/register", basicAuth, register);

// User login route to generate JWT
router.post("/login", login);


module.exports = router;
