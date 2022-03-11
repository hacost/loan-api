const {Strategy, ExtractJwt} = require('passport-jwt');
const config = require('../../configs/config');
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.privateKey
}

const jwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
})

module.exports = jwtStrategy;