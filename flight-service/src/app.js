const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 8080;
const connectDB = require('./config/db');

connectDB();

app.use(express.json());

// Define routes  


app.get('/health', (req, res) => {
  res.send('Flight service is healthy!');
});

app.listen(port, () => {
  console.log(`Flight service is running on port ${port}`);
});
