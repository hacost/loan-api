const jwt = require('jsonwebtoken');
const config = require('../configs/config');
function signToken(payload) {
  return jwt.sign(payload, config.privateKey);
}

function verifyToken(token) {
  return jwt.verify(token, config.privateKey);
}

module.exports = {signToken, verifyToken};