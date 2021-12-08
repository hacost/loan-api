const config = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}`;

module.exports = {
  development: {
    url: URI, 
    dialect: 'postgres',
  },
  production: {
    url: URI, 
    dialect: 'postgres',
  } 
}