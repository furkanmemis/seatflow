const {createBooking, getBookingById, getBookingsByFlightId, getBookingsByUserId, updateBookingStatus} = require("../services/booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingsByUserId = async (req, res) => {
  try {
    const bookings = await getBookingsByUserId(req.params.userId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingsByFlightId = async (req, res) => {
  try {
    const bookings = await getBookingsByFlightId(req.params.flightId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await updateBookingStatus(req.params.id, req.body.bookingStatus);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 