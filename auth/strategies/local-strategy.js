const boom = require('@hapi/boom');
const Strategy = require('passport-local').Strategy;
const { verifyPassword, hidePassword } = require('../../utils/helper-util');
const UserService = require('../../services/users-service');

const service = new UserService();
const options = {
  usernameField: 'email',
  passwordField: 'password'
}
const localStrategy = new Strategy(
  options, 
  async (email, password, done) => {
  try {
    const user = await service.findByEmail(email)
    if(!user){
      done(boom.notFound(), false)
    }
    const isMatch = await verifyPassword(password, user.password)
    if(!isMatch){
      done(boom.unauthorized(), false)
    }
    hidePassword(user);
    done(null, user)
  } catch (error) {
    done(error, false)
  }
});

module.exports = localStrategy;