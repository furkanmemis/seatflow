const express = require('express');
const router = express.Router();

const flightController = require('../controllers/flight');

router.post('/', flightController.createFlight);
router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlightById);

module.exports = router;
