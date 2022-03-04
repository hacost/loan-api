require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  apiPort: process.env.API_PORT || 3000,
  isProduction: process.env.NODE_ENV === 'production',
  dbUrl: process.env.DATABASE_URL,
}

module.exports = config;
