const { Sequelize } = require('sequelize');

const config = require('./../config/config');
const setupModels = require('../db/models/setup-models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

// call setup models 
setupModels(sequelize);
// sync to create structure in database
// not use in production
//sequelize.sync();

module.exports = sequelize;