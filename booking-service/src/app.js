const express = require('express');
const app = express();
require('dotenv').config();
const { connectProducer } = require('./producer/bookingProducer');

const port = process.env.PORT || 8081;
const connectDB = require('./config/db');

const bookingRoutes = require('./routes/booking');

connectDB();
connectProducer();

app.use(express.json());

// Define routes
app.use('/bookings', bookingRoutes);

app.get('/health', (req, res) => {
  res.send('Booking service is healthy!');
});

app.listen(port, () => {
  console.log(`Booking service is running on port ${port}`);
});
