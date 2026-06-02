const Booking = require("../models/Booking");

exports.createBooking = async (bookingData) => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

exports.getBookingsByUserId = async (userId) => {
  return await Booking.find({ userId });
};

exports.updateBookingStatus = async (bookingId, status) => {
  return await Booking.findByIdAndUpdate(bookingId, { bookingStatus: status }, { new: true });
}

exports.getBookingById = async (bookingId) => {
  return await Booking.findById(bookingId);
};

exports.getBookingsByFlightId = async (flightId) => {
  return await Booking.find({ flightId });
};

