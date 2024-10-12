const express = require('express');
const governateRouter = require('./governateRoutes');
const cityRouter = require('./cityRoutes');
const hotelRouter = require('./hotelRoutes');
const roomRouter = require('./roomRoutes');

const allRouter = express.Router();

allRouter.use('/', governateRouter);
allRouter.use('/governates', governateRouter);
allRouter.use('/cities', cityRouter);
allRouter.use('/hotels', hotelRouter);
allRouter.use('/rooms', roomRouter);

module.exports = allRouter;
