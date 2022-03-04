const { Sequelize } = require('sequelize');
const config = require('./config');
const setupModels = require('../db/models/setup-models');

const options = {
  dialect: 'postgres',
  logging: true
}

if (config.isProduction) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, options);
// call setup models 
setupModels(sequelize);

// sync to create structure in database
// not use in production
//sequelize.sync();

module.exports = sequelize;