require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProduction: process.env.NODE_ENV === 'production',
  apiPort: process.env.API_PORT || 3000,
  apiVersion: process.env.API_VERSION,
  dbUrl: process.env.DATABASE_URL,
}

module.exports = config;
