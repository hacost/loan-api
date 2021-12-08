const express = require('express');
const usersRouter = require('./users-router');
const customersRouter = require('./customers-router');

const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const router = express.Router();

function routerApi(app){
  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
