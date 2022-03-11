const passport = require('passport')
const jwtStrategy = require('./strategies/jwt-strategy');
const localStrategy = require('./strategies/local-strategy');

passport.use('local',localStrategy);
passport.use(jwtStrategy);
