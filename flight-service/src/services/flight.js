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
