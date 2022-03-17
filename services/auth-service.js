const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const helper = require('../utils/helper-util');
const {jwtConfig} = require('../configs/config');
const Service = require('./users-service');

const service = new Service();

class AuthService {
  constructor() {}

  //use static read-only properties to declare constant values that are scoped to a class
  static get jwtSignOptions() {
    return {
      expiresIn: jwtConfig.tokenExpiration,
    };
  }

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.notFound();
    }
    const isMatch = helper.verifyPassword(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    helper.hidePassword(user);
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.roleId
    }
    const token = jwt.sign(payload, jwtConfig.privateKey, this.jwtSignOptions);
    return {
      user,
      token
    }
  }

  verifyToken(token) {
    return jwt.verify(token, jwtConfig.privateKey);
  }

}

module.exports = AuthService;