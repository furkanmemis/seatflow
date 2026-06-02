const {createFlight, getAllFlights, getFlightById} = require("../services/flight");

exports.createFlight = async (req, res) => {
    try {
        const flight = await createFlight(req.body);
        res.status(201).json(flight);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllFlights = async (req, res) => {
    try {
        const flights = await getAllFlights();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFlightById = async (req, res) => {
    try {
        const flight = await getFlightById(req.params.id);
        if (!flight) {
            return res.status(404).json({ error: "Flight not found" });
        }
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};