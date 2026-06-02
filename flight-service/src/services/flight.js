const Flight = require('../models/Flight');

exports.createFlight = async (flightData) => {
    const flight = new Flight(flightData);
    return await flight.save();
};

exports.getAllFlights = async () => {
    return await Flight.find();
};

exports.getFlightById = async (id) => {
    return await Flight.findById(id);
};
