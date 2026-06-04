const express = require('express');
const app = express();
require('dotenv').config();
const startConsumer = require('./consumers/bookingConsumers');
const { connectProducer } = require('./producers/flightBookingUpdateProducers');

const port = process.env.PORT || 8080;
const connectDB = require('./config/db');
const flightRoutes = require('./routes/flight');
const planeRoutes = require('./routes/plane');

connectDB();
connectProducer();
startConsumer();

app.use(express.json());

// Define routes
app.use('/flights', flightRoutes);
app.use('/planes', planeRoutes);


app.get('/health', (req, res) => {
  res.send('Flight service is healthy!');
});

app.listen(port, () => {
  console.log(`Flight service is running on port ${port}`);
});
