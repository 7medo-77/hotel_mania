const express = require('express');
const governateRouter = require('./governateRoutes');
const cityRouter = require('./cityRoutes');
const hotelRouter = require('./hotelRoutes');

const allRouter = express.Router();

allRouter.use('/', governateRouter);
allRouter.use('/governates', governateRouter);
allRouter.use('/cities', cityRouter);
allRouter.use('/hotels', hotelRouter);

module.exports = allRouter;
