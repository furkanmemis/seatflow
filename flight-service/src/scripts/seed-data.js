const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Plane = require('../models/Plane');
const Flight = require('../models/Flight');

dotenv.config();

const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
const totalRows = 30;

const buildSeatTemplate = () => {
  return Array.from({ length: totalRows }, (_, index) => {
    const rowNumber = index + 1;
    const seatClass = rowNumber <= 4 ? 'business' : 'economy';

    return {
      rowNumber,
      seats: seatLetters.map((letter) => ({
        seatNumber: letter,
        seatClass,
      })),
    };
  });
};

const planeDefinitions = [
  {
    tailNumber: 'TUR-001',
    manufacturer: 'Boeing',
    model: '737-800',
    seatCapacity: totalRows * seatLetters.length,
  },
  {
    tailNumber: 'TUR-002',
    manufacturer: 'Airbus',
    model: 'A320-200',
    seatCapacity: totalRows * seatLetters.length,
  },
  {
    tailNumber: 'TUR-003',
    manufacturer: 'Airbus',
    model: 'A330-300',
    seatCapacity: totalRows * seatLetters.length,
  },
  {
    tailNumber: 'TUR-004',
    manufacturer: 'Boeing',
    model: '777-200',
    seatCapacity: totalRows * seatLetters.length,
  },
  {
    tailNumber: 'TUR-005',
    manufacturer: 'Embraer',
    model: 'E195-E2',
    seatCapacity: totalRows * seatLetters.length,
  },
];

const buildSeatMap = (seatTemplate) => {
  return seatTemplate.map((row) => ({
    rowNumber: row.rowNumber,
    seats: row.seats.map((seat) => ({
      seatNumber: seat.seatNumber,
      seatClass: seat.seatClass,
    })),
  }));
};

const seedData = async () => {
  await connectDB();

  const seatTemplate = buildSeatTemplate();

  const planes = await Promise.all(
    planeDefinitions.map(async (planeDef) => {
      const plane = await Plane.findOneAndUpdate(
        { tailNumber: planeDef.tailNumber },
        {
          ...planeDef,
          status: 'active',
          seatTemplate,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      console.log(`Plane created or updated: ${plane.tailNumber} (${plane.manufacturer} ${plane.model})`);
      return plane;
    })
  );

  const selectedPlane = planes[0];

  const flightData = {
    flightNumber: 'SF100',
    departureAirport: 'IST',
    arrivalAirport: 'AMS',
    departureTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    arrivalTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 4),
    status: 'scheduled',
    planeId: selectedPlane._id,
    seatMap: buildSeatMap(selectedPlane.seatTemplate),
  };

  const flight = await Flight.findOneAndUpdate(
    { flightNumber: flightData.flightNumber },
    flightData,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  console.log(`Flight created or updated: ${flight.flightNumber} using plane ${selectedPlane.tailNumber}`);
  process.exit(0);
};

seedData().catch((error) => {
  console.error('Seed data error:', error);
  process.exit(1);
});
