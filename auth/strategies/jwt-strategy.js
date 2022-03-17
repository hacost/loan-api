const {Strategy, ExtractJwt} = require('passport-jwt');
const {jwtConfig} = require('../../configs/config');
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.privateKey
}

const jwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
})

module.exports = jwtStrategy;