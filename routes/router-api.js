const express = require('express');
const passport = require('passport');

const config = require('./../configs/config');
const rolesRouter = require('./roles-router');
const statusRouter = require('./status-router');
const usersRouter = require('./users-router');
const customersRouter = require('./customers-router');
const coordinatorsRouter = require('./coordinators-router');
const walletsRouter = require('./wallets-router');
const moneyCollectorsRouter = require('./money-collectors-router');
const loansRouter = require('./loans-router');
const paymentsRouter = require('./payments-router');
const authRouter = require('./auth-router');

const router = express.Router();

function routerApi(app){
  app.use(config.apiVersion, router);

  router.use('/roles', rolesRouter);
  router.use('/status', statusRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/coordinators', coordinatorsRouter);
  router.use('/wallets', passport.authenticate('jwt', { session: false }), walletsRouter);
  router.use('/money-collectors', moneyCollectorsRouter);
  router.use('/loans', loansRouter);
  router.use('/payments', paymentsRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
