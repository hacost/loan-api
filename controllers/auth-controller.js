const Service = require('../services/auth-service');
const email =require('../emails/strategies/nodeMailer');
const service = new Service();
const login = async (req, res, next) => {
  try {
    email.sendMail();
    res.json(service.signToken(req.user));
  } catch (error) {
    next(error);
  }
};

module.exports = {login};
