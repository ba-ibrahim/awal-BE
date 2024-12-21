const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

dotenv.config();

const routes = require("./routes/index");

const port = process.env.PORT || 3000
      // dbURI = process.env.DB_URI;

const dbURI = "mongodb+srv://ibrahimbenamara76:admin@cluster0.iqvmf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const app = express();


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'AWAL API',
      version: '1.0.0',
      description: 'API documentation for AWAL project',
    },
    host: `localhost:${port}`,
    basePath: '/api/v1',
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/v1/', routes);

mongoose
  .connect(dbURI)
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`AWAL is running on http://localhost:${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});
