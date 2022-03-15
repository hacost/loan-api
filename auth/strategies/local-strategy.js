const Strategy = require('passport-local').Strategy;
const Service = require('../../services/auth-service');

const service = new Service();
const optionsStrategy = {
  usernameField: 'email',
  passwordField: 'password'
}
const localStrategy = new Strategy(
  optionsStrategy, 
  async (email, password, done) => {
  try {
    done(null, await service.getUser(email, password))
  } catch (error) {
    done(error, false)
  }
});

module.exports = localStrategy;