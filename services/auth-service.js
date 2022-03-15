const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const config = require('../configs/config');
const Service = require('./users-service');

const service = new Service();

class AuthService {
  constructor() {}

  //use static read-only properties to declare constant values that are scoped to a class
  static get jwtSignOptions() {
    return {
      expiresIn: config.tokenExpiration,
    };
  }

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.notFound();
    }
    const isMatch = await this.verifyPassword(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    this.hidePassword(user);
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.roleId
    }
    const token = jwt.sign(payload, config.privateKey, this.jwtSignOptions);
    return {
      user,
      token
    }
  }

  verifyToken(token) {
    return jwt.verify(token, config.privateKey);
  }

}

module.exports = AuthService;