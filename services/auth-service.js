const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const helper = require('../utils/helper-util');
const {jwtConfig} = require('../configs/config');
const UsersService = require('./users-service');
const emailsService = require('./emails-service');
const templatesService = require('./templates-service');
const {TEMPLATES} = require('../utils/constants');
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
      throw boom.unauthorized();
    }
    const isMatch = helper.verifyPassword(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    await userService.update(user.id, {lastLogin: Date.now()});
    emailsService.sendEmail({
      to: `${user.email}, he.acost@gmail.com`,
      cc: `hector@magicintelligence.com`,
      subject: `Comprobante de Pago`,
      html: await templatesService.getTemplate(TEMPLATES.main, 
        {company_name:'Magic Intelligence', 
        company_address:'Jeronimo Treviño 613, Apodaca NL, 66600', 
        company_logo:'https://res.cloudinary.com/hmyi1rv5d/image/upload/v1625794226/public/Logo_header_correo_pxlucu.png',
        email_title:'Comprobante de Pago'
       })
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