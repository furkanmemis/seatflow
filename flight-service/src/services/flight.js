const Flight = require('../models/Flight');
const Plane = require('../models/Plane');

exports.createFlight = async (flightData) => {
    const plane = await Plane.findById(flightData.planeId);

    if (!plane) {
        throw new Error("Plane not found");
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

exports.updateFlightSeats = async (flightId, seatRow, seatNumber, status, userId) => {
    const flight = await Flight.findById(flightId);

    if (!flight) {
        throw new Error("Flight not found");
    }

    const row = flight.seatMap.find((r) => r.rowNumber === seatRow);
    if (!row) {
        throw new Error("Seat row not found");
    }

    const seat = row.seats.find((s) => s.seatNumber === seatNumber);
    if (!seat) {
        throw new Error("Seat number not found");
    }

    seat.status = status;
    seat.userId = userId;
    await flight.save();
}