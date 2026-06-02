const express = require('express');
const app = express();
const port = 3000;


app.get('/health', (req, res) => {
  res.send('Flight service is healthy!');
});

app.listen(port, () => {
  console.log(`Flight service is running on port ${port}`);
});