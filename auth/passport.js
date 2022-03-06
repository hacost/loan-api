const boom = require('@hapi/boom');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { verifyPassword, hidePassword } = require('./../utils/helper-util');
const UserService = require('../services/users-service');

const service = new UserService()
const options = {
  usernameField: 'email',
  passwordField: 'password'
}
passport.use(new LocalStrategy(
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
}))