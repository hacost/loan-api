const Strategy = require('passport-local').Strategy;
const authService = require('../../services/auth-service');

const optionsStrategy = {
  usernameField: 'email',
  passwordField: 'password'
};

const localStrategy = new Strategy(
  optionsStrategy, 
  async (email, password, done) => {
  try {
    done(null, await authService.login(email, password))
  } catch (error) {
    done(error, false)
  }
});

module.exports = localStrategy;