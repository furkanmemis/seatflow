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

const planeSchema = new mongoose.Schema(
  {
    tailNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    seatCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["active", "maintenance", "retired"],
      default: "active",
    },
    seatTemplate: {
      type: [seatRowSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plane", planeSchema);
