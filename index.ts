/* eslint-disable no-console */

const express = require('express');
const cors = require('cors');

const users = require('./api/routes/users.router');
const invoices = require('./api/routes/invoices.router');
const items = require('./api/routes/items.router');


import addPageInfo from './api/middleware/addPageInfo'

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(addPageInfo);

const { sequelize } = require('./config/DBConfig');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to mysql 💪 .');
  })
  .catch((err:Error) => {
    console.error('Unable to connect to mysql 😳 .', err);
  });


app.use('/api/users', users);
app.use('/api/invoices', invoices);
app.use('/api/items', items);


app.listen(port, () =>
  console.log(`Server up and running on ${port} 👍`),
);
