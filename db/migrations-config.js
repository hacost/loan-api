const config = require('../configs/config');

module.exports = {
  development: {
    url: config.dbUrl, 
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl, 
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
   }
  } 
}