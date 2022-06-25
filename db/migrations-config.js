const { dataBaseConfig } = require('../configs/config');
module.exports = {
  development: {
    url: dataBaseConfig.dbUrl,
    dialect: 'postgres'
  },
  test: {
    url: dataBaseConfig.dbUrl,
    dialect: 'postgres'
  },
  production: {
    url: dataBaseConfig.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
   }
  } 
}