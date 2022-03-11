const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const options = {
  expiresIn: config.tokenExpiration
}

function signToken(payload) {
  return jwt.sign(payload, config.privateKey, options);
}

function verifyToken(token) {
  return jwt.verify(token, config.privateKey);
}

module.exports = {signToken, verifyToken};