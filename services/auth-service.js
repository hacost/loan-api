const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const helper = require('../utils/helper-util');
const {jwtConfig} = require('../configs/config');
const UsersService = require('./users-service');
const emailsService = require('./emails-service');
const userService = new UsersService();

//private
const jwtSignOptions = {
  expiresIn: jwtConfig.tokenExpiration,
}

//public
const authService = {

  async login(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.notFound();
    }
    const isMatch = helper.verifyPassword(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    await userService.update(user.id, {lastLogin: Date.now()});
     emailsService.sendEmail({
      to: user.email,
      subject: `Hola Héctor`,
      html: 'En está parte va a ir el Template HTML que voy a formar'
    }); 
  
    helper.hidePassword(user);
    return user;
  },

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.roleId
    }
    const token = jwt.sign(payload, jwtConfig.privateKey, jwtSignOptions);
    return {
      user,
      token
    }
  },

  verifyToken(token) {
    return jwt.verify(token, jwtConfig.privateKey);
  }
}

module.exports = authService;