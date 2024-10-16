// import { express } from 'express';
const express = require('express');
const cors = require('cors');
const allRouter = require('./routes/index');

const app = express();

app.set('json spaces', 2);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', allRouter);
app.listen(5000, () => {
  console.log('Server is running');
});

module.exports = app;
