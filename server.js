const express = require('express');
const routes = require('./routes');
const path = require('path');

// allow access to .env
require('dotenv').config(); 


// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(require('./controllers'));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
