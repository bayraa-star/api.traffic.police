const express = require("express");
const router = express.Router();
const { 
  getEventsByPlateChars,
 } = require("../controllers/eventController");

// GET /api/v1/events/:plate_chars - Fetch events by plate_chars
router.post("/events/", getEventsByPlateChars);

module.exports = router;