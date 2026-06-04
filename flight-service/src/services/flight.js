const Flight = require("../models/Flight");
const Plane = require("../models/Plane");
const {
  publishFlightBookingUpdate,
} = require("../producers/flightBookingUpdateProducers");

exports.createFlight = async (flightData) => {
  const plane = await Plane.findById(flightData.planeId);

  if (!plane) {
    console.log("Plane not found");
  }

  const seatMap = plane.seatTemplate.map((row) => ({
    rowNumber: row.rowNumber,
    seats: row.seats.map((seat) => ({
      seatNumber: seat.seatNumber,
      seatClass: seat.seatClass,
      status: "available",
    })),
  }));

  const flight = new Flight({
    ...flightData,
    seatMap,
  });

  return await flight.save();
};

exports.getAllFlights = async () => {
  return await Flight.find();
};

exports.getFlightById = async (id) => {
  return await Flight.findById(id);
};

exports.updateFlightSeats = async (
  flightId,
  seatRow,
  seatNumber,
  status,
  userId,
  bookingId,
) => {
  const flight = await Flight.findById(flightId);

  if (!flight) {
    await publishFlightBookingUpdate(bookingId, flightId, "failed");
    console.log("Flight not found");
    return;
  }

  const row = flight.seatMap.find((r) => r.rowNumber === seatRow);
  if (!row) {
    await publishFlightBookingUpdate(bookingId, flightId, "failed");
    console.log("Seat row not found");
    return;
  }

  const seat = row.seats.find((s) => s.seatNumber === seatNumber);
  console.log("bulunan koltuk:", seat);
  if (!seat) {
    await publishFlightBookingUpdate(bookingId, flightId, "failed");
    console.log("Seat number not found");
    return;
  }

  if (seat.status !== "available") {
    await publishFlightBookingUpdate(bookingId, flightId, "failed");
    console.log("Seat is not available");
    return;
  }

  seat.status = status;
  seat.userId = userId;
  await flight.save();
  await publishFlightBookingUpdate(bookingId, flightId, "success");
};
