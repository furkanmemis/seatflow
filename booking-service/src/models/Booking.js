const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    seatRow: {
      type: Number,
      required: true,
      min: 1,
    },
    seatNumber: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D", "E", "F"],
    },
    bookingStatus: {
      type: String,
      enum: ["confirmed", "cancelled", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);