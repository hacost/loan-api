const authService = require('../services/auth-service');

const signToken = async (req, res, next) => {
  try {
    res.json(authService.signToken(req.user));
  } catch (error) {
    next(error);
  }
};

module.exports = {signToken};
