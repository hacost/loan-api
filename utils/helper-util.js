const bcrypt = require('bcrypt');

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function hidePassword(model) {
  delete model.dataValues.password
} 

const removeWhiteSpace = (string) => {
  return string.replace(/\s/g, '');
}
const stringToArray = (string) => {
  return removeWhiteSpace(string).split(',');
}
module.exports = {hashPassword, verifyPassword, hidePassword, stringToArray}