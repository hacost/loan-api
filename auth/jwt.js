const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const jwtSignOptions = {
  expiresIn: config.tokenExpiration
}

function signToken(payload) {
  return jwt.sign(payload, config.privateKey, jwtSignOptions);
}

function verifyToken(token) {
  return jwt.verify(token, config.privateKey);
}

module.exports = {signToken, verifyToken};