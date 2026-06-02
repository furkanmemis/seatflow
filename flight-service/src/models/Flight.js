const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D", "E", "F"],
    },
    seatClass: {
      type: String,
      enum: ["economy", "business"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "occupied", "reserved"],
      default: "available",
    },
  },
  { _id: false }
);

const seatRowSchema = new mongoose.Schema(
  {
    rowNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    seats: {
      type: [seatSchema],
      required: true,
      validate: {
        validator: (seats) => seats.length === 6,
        message: "Each row must have exactly 6 seats.",
      },
    },
  },
  { _id: false }
);

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      unique: true,
    },
    departureAirport: {
      type: String,
      required: true,
    },
    arrivalAirport: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "delayed", "cancelled", "departed", "arrived"],
      default: "scheduled",
    },
    planeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plane",
      required: true,
    },
    seatMap: {
      type: [seatRowSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);
