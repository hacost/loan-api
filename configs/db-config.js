const { Sequelize } = require('sequelize');
const {dataBaseConfig, config} = require('./config');
const setupModels = require('../db/models/setup-models');

const options = {
  dialect: 'postgres',
  logging: false
}

if (config.isProduction) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(dataBaseConfig.dbUrl, options);
// call setup models 
setupModels(sequelize);

// sync to create structure in database
// not use in production
//sequelize.sync();

module.exports = sequelize;