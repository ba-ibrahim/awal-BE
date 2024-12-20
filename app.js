const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const routes = require("./routes/index");

// ENV variables assignments
const port = process.env.PORT || 3000,
      dbURI = process.env.DB_URI;

// Back-end app instance
const app = express();

// Apply CORS before routes
app.use(cors({
  origin: '*', // Allow only your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Parse JSON requests

// Define routes
app.use('/api/v1/', routes);


// MongoDB Cluster connection
mongoose
  .connect(dbURI)
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => {
    console.log(err);
  });

// Setting back-end app to run on a port
app.listen(port, () => {
  console.log(`AWAL is running on http://localhost:${port}`);
});
