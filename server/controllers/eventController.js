const ParkingEvent = require("../models/ParkingEvent");

const getEventsByPlateChars = async (req, res) => {
  const { plate_chars } = req.body;

  // Validate param to prevent undefined errors
  if (!plate_chars) {
    return res.status(400).json({ message: "plate_chars parameter is required" });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows: events } = await ParkingEvent.findAndCountAll({
      where: { plate_chars },
      order: [['timestamp', 'DESC']],
      limit,
      offset,
    });

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for this plate number" });
    }

    res.status(200).json({
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        data: events
    });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getEventsByPlateChars,
};