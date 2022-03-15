const Service = require('../services/auth-service');

const service = new Service();
const login = async (req, res, next) => {
  try {
    res.json(service.signToken(req.user));
  } catch (error) {
    next(error);
  }
};

module.exports = {login};