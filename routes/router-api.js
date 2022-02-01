const express = require('express');
const rolesRouter = require('./roles-router');
const statusRouter = require('./status-router');
const usersRouter = require('./users-router');
const customersRouter = require('./customers-router');
const coordinatorsRouter = require('./coordinators-router');
const walletsRouter = require('./wallets-router');
const moneyCollectorsRouter = require('./money-collectors-router');

const router = express.Router();

function routerApi(app){
  app.use('/api/v1', router);

  router.use('/roles', rolesRouter);
  router.use('/status', statusRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/coordinators', coordinatorsRouter);
  router.use('/wallets', walletsRouter);
  router.use('/money-collectors', moneyCollectorsRouter);
}

module.exports = routerApi;
