const jwt = require('../auth/jwt');

const authentication = async (req, res, next) => {
  try {
    const user = req.user;
    const token = jwt.signToken(getPayload(user));
    res.json({user,token});
  } catch (error) {
    next(error);
  }
};

function getPayload(user) {
  const payload = {
    sub: user.id,
    role: user.roleId
  }
  return payload;
}

module.exports = {authentication};