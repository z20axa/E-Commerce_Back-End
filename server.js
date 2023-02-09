// packages/modules imports
const express = require('express');
const routes = require('./routes');
const path = require('path');

// allow access to .env
require('dotenv').config(); 

// import sequelize connection
const sequelize = require('./config/connection');

// initialize our app variable by setting it to the value of express()
const app = express();

// setting computer port number for service and Heruko deployment
const PORT = process.env.PORT || 3001;

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
