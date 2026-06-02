const express = require("express");
const router = express.Router();
const { createBooking, getBookingById, getBookingsByFlightId, getBookingsByUserId, updateBookingStatus } = require("../controllers/booking");

router.post("/", createBooking);
router.get("/:id", getBookingById);
router.get("/user/:userId", getBookingsByUserId);
router.get("/flight/:flightId", getBookingsByFlightId);
router.put("/:id/status", updateBookingStatus);

module.exports = router;