

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swagger = require('swagger');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: ".env.development"})


// ENV variables assignments
const port = process.env.PORT || 3000,
    dbURI = process.env.DB_URI ||'mongodb://localhost:27017/myDatabase';


// back-end app instance
const app = express();


// setting up mongodb Cluster connection
mongoose
.connect(dbURI)
.then(() => {
    console.log('MongoDB connected...');
})
.catch(err => {
    console.log(err);
    
})


// Setting bacp-end app to run on a port
app.listen(port, () => {
    console.log(`AWAL is running on http://localhost:${port}`);
    
})