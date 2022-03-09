require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProduction: process.env.NODE_ENV === 'production',
  apiPort: process.env.API_PORT || 3000,
  apiVersion: process.env.API_VERSION,
  apiKey: process.env.API_KEY,
  dbUrl: process.env.DATABASE_URL,
  privateKey: process.env.PRIVATE_KEY,
}

module.exports = config;
